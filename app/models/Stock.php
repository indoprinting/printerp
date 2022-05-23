<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Stock extends MY_Model {
  public function __construct () {
    parent::__construct();
    $this->rdlog->setFileName('Stock');
  }

  /**
   * Insert new stock.
   * @param array $data [ *(adjustment_id, internal_use_id, pm_id, purchase_id, sale_id, transfer_id),
   *  saleitem_id, *product_id, cost, price, *quantity, adjustment_qty, purchased_qty, spec,
   *  *status(received|sent), *warehouse_id, machine_id, created_at, created_by, json_data ]
   */
  public function addStock($data)
  {
    $data = setCreatedBy($data);

    $this->db->insert('stocks', $data); // Change to stock soon.

    if ($this->db->affected_rows()) {
      $insertId = $this->db->insert_id();

      return $insertId;
    }
    return FALSE;
  }
}