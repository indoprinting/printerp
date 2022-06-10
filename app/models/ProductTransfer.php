<?php

defined('BASEPATH') or exit('No direct script access allowed');

class ProductTransfer extends MY_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('ProductTransfer');
  }

  /**
   * Add product transfer payment.
   * @param array $data [ *pt_id, *bank_id_from, *bank_id_to, *amount, created_at, created_by ]
   */
  public function addPayment($data)
  {
    $bankFrom = $this->site->getBank(['id' => $data['bank_id_from']]);
    $bankTo   = $this->site->getBank(['id' => $data['bank_id_to']]);
    $pt       = $this->getProductTransfer(['id' => $data['pt_id']]);

    $data = setCreatedBy($data); // created_at, created_by

    $paymentDataFrom = [
      'transfer_id' => $data['pt_id'],
      'reference'   => $pt->reference,
      'bank_id'     => $bankFrom->id,
      'method'      => $bankFrom->type,
      'amount'      => $data['amount'],
      'type'        => 'sent',
      'note'        => ($data['note'] ?? ''),
      'created_at' => $data['created_at'],
      'created_by' => $data['created_by']
    ];

    $paymentDataTo = [
      'transfer_id' => $data['pt_id'],
      'reference'   => $pt->reference,
      'bank_id'     => $bankTo->id,
      'method'      => $bankTo->type,
      'amount'      => $data['amount'],
      'type'        => 'received',
      'note'        => ($data['note'] ?? ''),
      'created_at' => $data['created_at'],
      'created_by' => $data['created_by']
    ];

    if ($this->Payment->addPayment($paymentDataFrom) && $this->Payment->addPayment($paymentDataTo)) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * Add new product transfer.
   * @param array $data [ attachment, *warehouse_id_from, *warehouse_id_to, note,
   *  created_at, created_by ]
   * @param array $items [[ *product_id, *markon_price, *quantity ]]
   */
  public function addProductTransfer(array $data, array $items)
  {
    $data['reference'] = $this->site->getReference('transfer');
    $data = setCreatedBy($data);

    $data['status'] = 'packing'; // Default status for new transfer
    $data['payment_status'] = 'pending'; // Default payment status for new transfer

    if ($items) {
      $data['items'] = '';
      $data['grand_total'] = 0;

      foreach ($items as $item) {
        $product = $this->site->getProductByID($item['product_id']);

        if ($product) {
          $data['items'] .= "- ({$product->code}) " . getExcerpt($product->name) . '<br>';

          $data['grand_total'] += $item['markon_price'] * $item['quantity'];
        }
      }
    }

    $this->db->insert('product_transfer', $data);

    if ($this->db->affected_rows()) {
      $insertId = $this->db->insert_id();

      $this->site->updateReference('transfer');

      if ($items) {
        foreach ($items as $item) {
          $product = $this->site->getProductByID($item['product_id']);
          $item['pt_id'] = $insertId;
          $item['product_code'] = $product->code;
          $item['status'] = 'packing';

          $this->db->insert('product_transfer_item', $item);
        }
      }
      return $insertId;
    }
    return FALSE;
  }

  public function addProductTransferByWarehouseId($warehouseId)
  {
    $whFrom = $this->site->getWarehouse(['code' => 'LUC']); // Default warehouse from.
    $whTo   = $this->site->getWarehouse(['id' => $warehouseId]);

    $settingsJSON     = $this->site->getSettingsJSON();
    // Return [start_date, end_date, days]
    $opt              = getPastMonthPeriod($settingsJSON->safety_stock_period);
    // Remove unnecessary 'days'
    unset($opt['days']);
    // Get sold items by warehouse id.
    $whStocks = $this->site->getSoldItemsByWarehouseID($warehouseId, $opt);

    if ($whStocks && $whTo) {
      $grand_total    = 0;
      $transferItems = [];
      $transferQty   = 0;

      foreach ($whStocks as $stock) {
        $item = $this->site->getProductByID($stock->product_id);
        // No transfer item if safety_stock is 0 or not valid integer > 0
        // If safety stock = 0 or
        if ($item->safety_stock <= 0 || !$item->safety_stock) continue;
        // Get warehouse products.
        $whpFrom = $this->site->getWarehouseProduct($item->id, $whFrom->id);
        $whpTo   = $this->site->getWarehouseProduct($item->id, $whTo->id);

        if ($whpFrom->quantity <= 0) continue; // Ignore if no stock available from source.

        // Calculate formula to get quantity of transfer.
        $transferQty = getOrderStock($whpTo->quantity, $item->min_order_qty, $whpTo->safety_stock);

        if ($transferQty <= 0) continue; // If transfer qty is 0 or less then ignore.

        // if ($item->code == 'POCT15') {
        //   sendJSON(['error' => 1, 'msg' => [
        //       'product_code' => $item->code,
        //       'whp_quantity' => $whp->quantity,
        //       'min_order' => $item->min_order_qty,
        //       'safety_stock' => $whp->safety_stock,
        //       'transfer_qty' => $transfer_qty
        //     ]
        //   ]);
        // }

        $transferItem = [
          'product_id'   => $item->id, // Required.
          'markon_price' => roundDecimal($item->markon_price),
          'quantity'     => $transferQty
        ];

        $transferItems[] = $transferItem;
        $grand_total += ($transferQty * $item->markon_price);
      }

      $transferData = [
        'warehouse_id_from' => $whFrom->id,
        'warehouse_id_to'   => $whTo->id,
        'note'              => '',
      ];

      // sendJSON(['error' => 1, 'msg' => [
      //   'transfer_data'  => $transfer_data,
      //   'transfer_items' => $transfer_items
      // ]]);

      if ($this->addProductTransfer($transferData, $transferItems)) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * Add new payment for product transfer.
   * @param int $ptId Product Transfer ID.
   * @param array $data [ *bank_id_from, *bank_id_to, *amount ]
   */
  public function addProductTransferPayment($ptId, array $data)
  {
    $bankFrom = $this->site->getBank(['id' => $data['bank_id_from']]);
    $bankTo = $this->site->getBank(['id' => $data['bank_id_to']]);

    $paymentFromData = [
      'transfer_id' => $ptId,
      'bank_id'     => $bankFrom->id,
      'method'      => $bankFrom->type,
      'amount'      => $data['amount'],
      'type'        => 'sent',
      'note'        => ($data['note'] ?? '')
    ];

    $paymentToData = [
      'transfer_id' => $ptId,
      'bank_id'     => $bankTo->id,
      'method'      => $bankTo->type,
      'amount'      => $data['amount'],
      'type'        => 'received',
      'note'        => ($data['note'] ?? '')
    ];

    if ($paymentFromId = $this->site->addPayment($paymentFromData)) {
      if ($paymentToId = $this->site->addPayment($paymentToData)) {

      }
    }
    return FALSE;
  }

  /**
   * Delete product transfers.
   * @param array $clause [ reference, status, payment_status, warehouse_id_from, warehouse_id_to,
   * created_by, start_date, end_date ]
   */
  public function deleteProductTransfers($clause = [])
  {
    $pts = $this->getProductTransfers($clause);
    $deleted = 0;

    foreach ($pts as $pt) {
      $this->db->delete('product_transfer', ['id' => $pt->id]);

      if ($this->db->affected_rows()) {
        $this->db->delete('product_transfer_item', ['pt_id' => $pt->id]);
        $this->db->delete('stocks', ['transfer_id' => $pt->id]);

        $ptitems = $this->getProductTransferItems(['pt_id' => $pt->id]);

        foreach ($ptitems as $ptitem) {
          $this->site->syncProductQty($ptitem->product_id, $pt->warehouse_id_from);
          $this->site->syncProductQty($ptitem->product_id, $pt->warehouse_id_to);
        }

        $attachment = getAttachmentPaths('products_transfer') . $pt->attachment;

        if (is_file($attachment)) unlink($attachment);

        $deleted++;
      }
    }

    return $deleted;
  }

  /**
   * Get product mutation.
   * @param array $clause [ id, status, payment_status warehouse_id_from, warehouse_id_to,
   *  created_by, updated_by, start_date, end_date, order ]
   */
  public function getProductTransfer($clause = [])
  {
    if ($rows = $this->getProductTransfers($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Get product transfer items.
   * @param array $clause [ id, pt_id, product_id, product_code, status ]
   */
  public function getProductTransferItems($clause = [])
  {
    $q = $this->db->get_where('product_transfer_item', $clause);

    if ($q && $q->num_rows()) {
      return $q->result();
    }
    return [];
  }

  /**
   * Get product transfers.
   * @param array $clause [ id, reference, status, payment_status, warehouse_id_from, warehouse_id_to,
   *  created_by, updated_by, start_date, end_date, order ]
   */
  public function getProductTransfers($clause = [])
  {

    if (!empty($clause['start_date'])) {
      $this->db->where("created_at >= '{$clause['start_date']} 00:00:00'");
      unset($clause['start_date']);
    }

    if (!empty($clause['end_date'])) {
      $this->db->where("created_at >= '{$clause['end_date']} 00:00:00'");
      unset($clause['end_date']);
    }

    if (!empty($clause['order']) && is_array($clause['order'])) {
      $this->db->order_by($clause['order'][0], $clause['order'][1]);
      unset($clause['order']);
    }

    $q = $this->db->get_where('product_transfer', $clause);

    if ($q && $q->num_rows()) {
      return $q->result();
    }
    return [];
  }

  public function syncProductTransferPayment($ptId)
  {
    $pt = $this->getProductTransfer(['id' => $ptId]);
    $payments = $this->Payment->getPayments(['transfer_id' => $ptId]);
    $amount = 0;

    foreach ($payments as $payment) {
      if ($payment->type == 'received')
        $amount += $payment->amount;
    }

    $data['paid'] = $amount;
    $data['payment_status'] = $pt->payment_status;

    if ($amount == $pt->grand_total) {
      $data['payment_status'] = 'paid';
    } else if ($amount > 0 && $amount < $pt->grand_total) {
      $data['payment_status'] = 'partial';
    } else {
      $data['payment_status'] = 'pending';
    }

    if ($this->updateProductTransfer($ptId, $data)) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * Update product transfer.
   * @param int $ptId Product transfer ID.
   * @param array $data [ reference, status, payment_status, warehouse_id_from, warehouse_id_to,
   *  paid, created_by, updated_by, start_date, end_date, order ]
   * @param array $items [[ product_id, markon_price, quantity ]]
   */
  public function updateProductTransfer($ptId, array $data, $items = [])
  {
    $pt = $this->getProductTransfer(['id' => $ptId]);

    $data = setUpdatedBy($data);

    $json = (json_decode($pt->json) ?? (object)[]);

    if (isset($data['send_date']))     $json->send_date     = $data['send_date'];
    if (isset($data['received_date'])) $json->received_date = $data['received_date'];

    $data['json'] = json_encode($json);


    $this->db->update('product_transfer', $data, ['id' => $ptId]);

    if ($this->db->affected_rows()) {
      if ($items) {
        $this->db->delete('product_transfer_item', ['pt_id' => $ptId]);
        $this->db->delete('stocks', ['transfer_id' => $ptId]);

        $receivedTotal = 0;
        $receivedPartialTotal = 0;

        foreach ($items as $item) {
          $product = $this->site->getProductByID($item['product_id']);

          if ($product) {
            $item['pt_id'] = $pt->id;
            $item['product_code'] = $product->code;
            $item['status'] = ($item['status'] ?? $pt->status);

            if ($item['status'] == 'received' || $item['status'] == 'received_partial') {
              $balance = ($item['quantity'] - $item['received_qty']);

              // Change item status.
              $item['status'] = ($balance == 0 ? 'received' : 'received_partial');

              if ($item['status'] == 'received_partial') {
                $receivedPartialTotal++;
              } else if ($item['status'] == 'received') {
                $receivedTotal++;
              }
            }

            $this->db->insert('product_transfer_item', $item);

            if ($this->db->affected_rows()) {
              if ($item['status'] == 'sent') {
                $this->site->decreaseStockQuantity([
                  'transfer_id'  => $ptId,
                  'product_id'   => $item['product_id'],
                  'quantity'     => $item['quantity'],
                  'warehouse_id' => $pt->warehouse_id_from,
                  'created_at'   => $pt->created_at
                ]);
              }

              if ($item['status'] == 'received' || $item['status'] == 'received_partial') {
                $this->site->decreaseStockQuantity([
                  'transfer_id'  => $ptId,
                  'product_id'   => $item['product_id'],
                  'quantity'     => $item['quantity'],
                  'warehouse_id' => $pt->warehouse_id_from,
                  'created_at'   => $pt->created_at
                ]);
                $this->site->increaseStockQuantity([
                  'transfer_id'  => $ptId,
                  'product_id'   => $item['product_id'],
                  'quantity'     => $item['quantity'],
                  'warehouse_id' => $pt->warehouse_id_to,
                  'created_at'   => $pt->created_at
                ]);
              }
            }
          }
        }

        if ($receivedTotal == count($items)) {
          $this->db->update('product_transfer', ['status' => 'received'], ['id' => $ptId]);
        } else if ($receivedPartialTotal > 0) {
          $this->db->update('product_transfer', ['status' => 'received_partial'], ['id' => $ptId]);
        }
      }
      return TRUE;
    }
    return FALSE;
  }
}
