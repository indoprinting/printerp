<?php

defined('BASEPATH') or exit('No direct script access allowed');

class ProductTransfer extends MY_Model {
  public function __construct () {
    parent::__construct();
    $this->rdlog->setFileName('ProductTransfer');
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
          $data['items'] .= "- ({$product->code}) ". getExcerpt($product->name) . '<br>';

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
   * @param array $clause [ id, status, from_warehouse_id, to_warehouse_id, created_by, updated_by,
   *  start_date, end_date, order ]
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
   * @param array $clause [ id, status, from_warehouse_id, to_warehouse_id, created_by, updated_by,
   *  start_date, end_date, order ]
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

  /**
   * Update product transfer.
   * @param int $ptId Product transfer ID.
   * @param array $data []
   * @param array $items [[ product_id ]]
   */
  public function updateProductTransfer($ptId, array $data, $items = [])
  {

  }
}