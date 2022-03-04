<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Db_model extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function getBestSeller($start_date = null, $end_date = null)
  {
    if (!$start_date) {
      $start_date = date('Y-m-d', strtotime('first day of this month')) . ' 00:00:00';
    }
    if (!$end_date) {
      $end_date = date('Y-m-d', strtotime('last day of this month')) . ' 23:59:59';
    }

    $this->db
      ->select('product_name, product_code')
      ->select_sum('quantity')
      ->from('sale_items')
      ->join('sales', 'sales.id = sale_items.sale_id', 'left')
      ->where('sales.date >=', $start_date)
      ->where('sales.date <', $end_date)
      ->group_by('product_name, product_code')
      ->order_by('sum(quantity)', 'desc')
      ->limit(10);

    $q = $this->db->get();
    if ($q->num_rows() > 0) {
      foreach (($q->result()) as $row) {
        $data[] = $row;
      }
      return $data;
    }
    return false;
  }

  public function getChartData_() // old
  {
    $myQuery = "SELECT S.month,
    COALESCE(S.sales, 0) as sales,
    COALESCE( P.purchases, 0 ) as purchases,
    COALESCE(S.tax1, 0) as tax1,
    COALESCE(S.tax2, 0) as tax2,
    COALESCE( P.ptax, 0 ) as ptax
    FROM (  SELECT  date_format(date, '%Y-%m') Month,
        SUM(total) Sales,
        SUM(product_tax) tax1,
        SUM(order_tax) tax2
        FROM " . $this->db->dbprefix('sales') . "
        WHERE date >= date_sub( now( ) , INTERVAL 12 MONTH )
        GROUP BY date_format(date, '%Y-%m')) S
      LEFT JOIN ( SELECT  date_format(date, '%Y-%m') Month,
            SUM(product_tax) ptax,
            SUM(order_tax) otax,
            SUM(total) purchases
            FROM " . $this->db->dbprefix('purchases') . "
            GROUP BY date_format(date, '%Y-%m')) P
      ON S.Month = P.Month
      ORDER BY S.Month";
    $q = $this->db->query($myQuery);
    if ($q->num_rows() > 0) {
      foreach (($q->result()) as $row) {
        $data[] = $row;
      }
      return $data;
    }
    return false;
  }

  public function getChartData()
  {
    //return false;
    $myQuery = "SELECT Penjualan.bulan,
    COALESCE(Penjualan.grand_total, 0) AS grand_total,
    COALESCE(Penjualan.total_paid, 0) AS total_paid,
    COALESCE(Penjualan.total_balance, 0) AS total_balance
    FROM (
      SELECT date_format(date, '%Y-%m') AS bulan,
      SUM(grand_total) AS grand_total,
      SUM(paid) AS total_paid,
      SUM(balance) AS total_balance
      FROM sales
      WHERE date >= date_sub( now(), INTERVAL 12 MONTH )
      GROUP BY date_format(date, '%Y-%m')
    ) AS Penjualan
    ORDER BY Penjualan.bulan ASC";

    $q = $this->db->query($myQuery);

    if ($q->num_rows() > 0) {
      foreach ($q->result() as $row) {
        $data[] = $row;
      }
      return $data;
    }
    return false;
  }

  public function getLatestCustomers()
  {
    $this->db->order_by('id', 'desc');
    $q = $this->db->get_where('customers', ['group_name' => 'customer'], 5);
    if ($q->num_rows() > 0) {
      foreach (($q->result()) as $row) {
        $data[] = $row;
      }
      return $data;
    }
  }

  public function getLatestPurchases()
  {
    if (!$this->Owner && !$this->Admin && !getPermission('purchases-index')) {
      $this->db->where('created_by', $this->session->userdata('user_id'));
    }

    $this->db->order_by('id', 'desc');

    $q = $this->db->get('purchases');

    if ($q->num_rows() > 0) {
      foreach (($q->result()) as $row) {
        $data[] = $row;
      }
      return $data;
    }
  }

  public function getLatestSales()
  {
    if (!$this->Owner && !$this->Admin && !getPermission('sales-index')) {
      $this->db
      ->group_start()
        ->where('warehouse_id', $this->session->userdata('warehouse_id'))
        ->or_where('created_by', $this->session->userdata('user_id'))
      ->group_end();
    }

    $data = [];

    $opt = getCurrentMonthPeriod(getPastMonthPeriod(2));

    $this->db
    ->group_start()
      ->not_like('status', 'completed', 'none')
      ->not_like('status', 'delivered', 'none')
    ->group_end();

    $this->db->where("date BETWEEN '{$opt['start_date']} 00:00:00' AND '{$opt['end_date']} 23:59:59'");

    $this->db->order_by('id', 'desc');

    $q = $this->db->get('sales');

    if ($q->num_rows() > 0) {
      foreach ($q->result() as $row) {
        $data[] = $row;
      }
      return $data;
    }
    return [];
  }

  public function getLatestSuppliers()
  {
    $this->db->order_by('id', 'desc');
    $q = $this->db->get_where('suppliers', ['group_name' => 'supplier'], 5);
    if ($q->num_rows() > 0) {
      foreach (($q->result()) as $row) {
        $data[] = $row;
      }
      return $data;
    }
  }

  public function getLatestTransfers()
  {
    if (!$this->Owner && !$this->Admin && !getPermission('transfers-index')) {
      $this->db->where('to_warehouse_id', $this->session->userdata('warehouse_id'));
    }

    $this->db->order_by('id', 'desc');

    $q = $this->db->get('transfers');

    if ($q->num_rows() > 0) {
      foreach ($q->result() as $row) {
        $data[] = $row;
      }
      return $data;
    }
  }

  public function getStockValue()
  {
    $q = $this->db->query('SELECT SUM(qty*price) as stock_by_price, SUM(qty*cost) as stock_by_cost
    FROM (
      Select sum(COALESCE(' . $this->db->dbprefix('warehouses_products') . '.quantity, 0)) as qty, price, cost
      FROM ' . $this->db->dbprefix('products') . '
      JOIN ' . $this->db->dbprefix('warehouses_products') . ' ON ' . $this->db->dbprefix('warehouses_products') . '.product_id=' . $this->db->dbprefix('products') . '.id
      GROUP BY ' . $this->db->dbprefix('warehouses_products') . '.id ) a');
    if ($q->num_rows() > 0) {
      return $q->row();
    }
    return false;
  }
}
