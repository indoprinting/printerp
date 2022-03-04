<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Debug extends MY_Controller {
  public function __construct () {
    parent::__construct();
  }

  public function biller() {
    $biller_online = $this->site->getBillerByName('online');
    rd_print($biller_online);
  }

  public function blank()
  {
    echo('Server is working properly');
  }

  public function explode () {
    $result = explode(' ', 'Durian');
    rd_print($result);
  }

  public function striped () {
    echo strip_tags('<b>A</b>', '');
  }

  public function safestock ()
  {
    echo getSafetyStock(4, 5, 15); // Return 12.
  }

  public function month ()
  {
    echo getMonthName(1);
  }

  public function numberformat ()
  {
    echo filterDecimal('23245.02');
  }

  public function excel () {
    $sheet1 = $this->ridintek->spreadsheet();
    $sheet1->setTitle('Contoh');
    $sheet1->setBold('A1:C1');
    $sheet1->setFillColor('A1:C1', 'FFFF00');
    $sheet1->setColor('A1:C1', 'FF0000');
    $sheet1->setItalic('A1:C1');
    $sheet1->setAlignment('A1:C3', 'right');
    $sheet1->setCellValue('A1', 'No');
    $sheet1->setCellValue('B1', 'Name');
    $sheet1->setCellValue('C1', 'Age');
    $sheet1
      ->setCellvalue('A2', '1')
      ->setCellValue('B2', 'Riyan')
      ->setCellValue('C2', 29);
    $sheet1->save(FCPATH . 'Ridintek');
    //$sheet1->export('Export_it');
  }

  public function barcode () {
    $barcode = $this->ridintek->barcode('92898299');
    echo $barcode;
  }

  public function balance () {
    echo $this->site->getStockQuantity(381, NULL, ['from_date' => '2020-08-18 00:00:00', 'to_date' => '2020-08-25 23:59:59']);
  }

  public function file () {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      if ($_FILES['file']['size'] > 0) {
        move_uploaded_file($_FILES['file']['tmp_name'], FCPATH . 'files/' . $_FILES['file']['name']);
        sendJSON(['error' => 0, 'msg' => 'Upload sucess']);
      } else {
        sendJSON(['error' => 1, 'msg' => 'Upload failed']);
      }
    } else {
      $this->load->view($this->theme . 'debug');
    }
  }

  public function stock () {
    $r = $this->site->addStock([
      'sale_id' => 1,
      'product_id' => 381, // Postmn
      'warehouse_id' => 2, // Durian
      'quantity' => 200,
      'status' => 'sent'
    ]);
    echo $r;
  }

  public function revision ($p = NULL) {
    //if ($p != 'execute') return FALSE;

    $sales = $this->site->getAllSales(); // Get all sales
    $counter = 0;
    foreach ($sales as $sale) {
      $counter++;
      if ($sale->id > 2) break; // Security
      if ($sale->id != 2) continue; // Security
      $sale_items = $this->site->getSaleItemsBySaleID($sale->id); // Get all sale items.
      foreach ($sale_items as $sale_item) {
        if ($sale_item->product_type == 'combo') {
          $combo_items = $this->site->getProductComboItems($sale_item->product_id, $sale_item->warehouse_id); // Get combo items for each sale item.
          foreach ($combo_items as $combo_item) { // standard or service (klikpod)
            $this->site->updateStockQuantity([
              'sale_id' => $sale->id,
              'saleitem_id' => $sale_item->product_id,
              'product_id' => $combo_item->id
            ], [
              'quantity' => floatval($combo_item->qty) * floatval($sale_item->quantity)
            ]);
          }
        } else if ($sale_item->product_type == 'service') { // jasa edit design
          $this->site->updateStockQuantity([
            'sale_id' => $sale->id,
            'product_id' => $sale_item->product_id
          ], [
            'product_id' => $sale_item->product_id,
            'quantity' => floatval($sale_item->quantity)
          ]);
        }
      }
    }
    echo('success ' . $counter);
  }

  public function remove_duplicate () {
    $reference = $this->input->post('reference');
    $sale_id   = 0;

    if ( ! $reference) sendJSON(['error' => 1, 'msg' => 'No reference.']);

    $sales = $this->site->getSalesByReference($reference);
    $is_duplicate_exists = FALSE; $total = 0;
    $list  = '';
    $saleitem_ids = [];

    if (empty($sales)) sendJSON(['error' => 1, 'msg' => 'Sales reference is invalid.']);

    foreach ($sales as $sale) {
      $sale_id = $sale->id;
      $sale_items = $this->site->getSaleItemsBySaleID($sale->id);

      foreach ($sale_items as $sale_item) {
        //sendJSON(['error' => 1, 'msg' => "{$sale_item->id}"]);
        //if ($sale_item->product_type !== 'combo') continue;
        $combo_items = $this->site->getComboItemsByProductID($sale_item->product_id);
        $attempt = 0;

        if ( ! $sale_item->id) continue;

        $stocks = $this->site->getStocks(['sale_id' => $sale_id, 'saleitem_id' => $sale_item->id]);

        //sendJSON(['error' => 0, 'msg' => "sale_id: {$sale_id}, saleitem_id: {$sale_item->id}, stock_count: " . count($stocks)]);

        //if (empty($stocks)) sendJSON(['error' => 1, 'msg' => 'Stock is not found.']);

        foreach ($stocks as $stock) { // Stock per Sale Item.
          if (array_search($stock->saleitem_id, $saleitem_ids) === FALSE) {
            $saleitem_ids[] = $stock->saleitem_id;
            if ($attempt === 0) $attempt = count($combo_items);
          } else {
            if ($attempt) $attempt--;

            if ($attempt === 0) {
              $this->site->deleteStockQuantity(['id' => $stock->id]);
              $is_duplicate_exists = TRUE;
              $total++;
              $list .= "- [{$stock->id}] Sale ID: {$stock->sale_id}, Sale Item ID: {$stock->saleitem_id}, {$stock->product_name} ({$stock->product_code}).<br>";
            }
          }
        }
      }
    }

    if ($is_duplicate_exists) {
      sendJSON(['error' => 0, 'msg' => "Success. Sale ID [{$sale_id}] with ({$total}) duplicated stocks have been removed successfully:<br><br>" . $list]);
    }
    sendJSON(['error' => 0, 'msg' => "OK. Sale ID [{$sale_id}] with no duplicated stocks found."]);
  }

  public function exploder () {
    $a = ['one', 'two', 'three'];
    $c = 0;
    foreach ($a as $b) {
      echo current($a) . '<br>';
      prev($a);
      if ($c == 5) break;
      $c++;
    }
  }

  public function sync_purchase () {
    $purchases = $this->site->getAllStockPurchases();

    foreach ($purchases as $purchase) {
      if ($purchase->payment_status == 'paid' || $purchase->payment_status == 'partial') {
        $payments = $this->site->getPayments(['purchase_id' => $purchase->id]);
        foreach ($payments as $payment) {
          $payment_date = $payment->date;
        }

        if ($payment_date) {
          $this->site->updateStockPurchase($purchase->id, ['payment_date' => $payment_date]);
        }
      }
    }
  }

  public function sync_purchase2 ()
  {
    $purchases = $this->site->getAllStockPurchases();
    if ($purchases) {
      foreach ($purchases as $purchase) {
        $stocks = $this->site->getStocks(['purchase_id' => $purchase->id]);
        if ($stocks) {
          $item_r = 0; $item_nr = 0;
          foreach ($stocks as $stock) {
            if ($stock->status == 'received' && $stock->purchased_qty > 0) {
              $this->site->updateStockQuantity(['purchase_id' => $stock->purchase_id], ['quantity' => $stock->purchased_qty]);
              $item_r++;
            } else if ($stock->quantity > 0) {
              $this->site->updateStockQuantity(['purchase_id' => $stock->purchase_id], ['purchased_qty' => $stock->quantity, 'quantity' => 0]);
              $item_nr++;
            }
          }
        }
      }
      echo('Received: ' . $item_r . ', ' . 'Not Received: ' . $item_nr);
    }
  }

  public function logtest () {
    $this->rdlog->setFileName('debug');

    for ($a = 0; $a < 10; $a++) {
      $this->rdlog->info(['method' => __METHOD__, 'message' => "It's OKEY"]);
    }
  }

  public function group_permissions () {
    $r = $this->site->getGroupPermissions(5);
    rd_print($r);
  }

  public function index () {
    $this->load->model('test_model');

    $this->test_model->testmsg();
  }
}
