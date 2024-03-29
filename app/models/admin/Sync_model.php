<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Sync_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function deleteExtraTables()
    {
        $this->db->update('settings', ['version' => '3.2.10'], ['setting_id' => 1]);
        $this->load->dbforge();
        $this->dbforge->drop_table('billers');
        $this->dbforge->drop_table('customers');
        $this->dbforge->drop_table('suppliers');
        $this->dbforge->drop_table('users_groups');
        $this->dbforge->drop_table('invoice_types');
        $this->dbforge->drop_table('discounts');
        $this->dbforge->drop_table('comment');
        return true;
    }

    public function getAllBillers()
    {
        $this->db->order_by('id', 'desc');
        $q = $this->db->get('billers');
        if ($q->num_rows() > 0) {
            foreach (($q->result()) as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    public function getAllCustomers()
    {
        $this->db->order_by('id', 'desc');
        $q = $this->db->get('customers');
        if ($q->num_rows() > 0) {
            foreach (($q->result()) as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    public function getAllSuppliers()
    {
        $this->db->order_by('id', 'desc');
        $q = $this->db->get('suppliers');
        if ($q->num_rows() > 0) {
            foreach (($q->result()) as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    public function getAllTransferItems()
    {
        $this->db->order_by('id', 'desc');
        $q = $this->db->get('transfer_items');
        if ($q->num_rows() > 0) {
            foreach (($q->result()) as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    public function getUserGroups()
    {
        $this->db->order_by('id', 'desc');
        $q = $this->db->get('users_groups');
        if ($q->num_rows() > 0) {
            foreach (($q->result()) as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    public function importBillers()
    {
        $billers = $this->getAllBillers();
        if ($billers) {
            foreach ($billers as $biller) {
                $bid = $biller->id;
                unset($biller->id);
                $biller->group_name = 'biller';
                $this->db->insert('billers', $biller);
                $biller_id = $this->db->insert_id();
                $ids[]     = ['new' => $biller_id, 'old' => $bid];
            }
            if (isset($ids)) {
                krsort($ids);
                foreach ($ids as $id) {
                    $this->db->update('sales', ['biller_id' => $id['new']], ['biller_id' => $id['old']]);
                    $this->db->update('quotes', ['biller_id' => $id['new']], ['biller_id' => $id['old']]);
                }
            }
            return true;
        }
        return false;
    }

    public function importCustomers()
    {
        $customers = $this->getAllCustomers();
        if ($customers) {
            foreach ($customers as $customer) {
                $cid = $customer->id;
                unset($customer->id);
                $customer->group_id            = 3;
                $customer->group_name          = 'customer';
                $customer->customer_group_id   = 1;
                $customer->customer_group_name = 'General';
                $this->db->insert('customers', $customer);
                $customer_id = $this->db->insert_id();
                $ids[]       = ['new' => $customer_id, 'old' => $cid];
            }
            if (isset($ids)) {
                krsort($ids);
                foreach ($ids as $id) {
                    $this->db->update('sales', ['customer_id' => $id['new']], ['customer_id' => $id['old']]);
                    $this->db->update('quotes', ['customer_id' => $id['new']], ['customer_id' => $id['old']]);
                }
            }
            return true;
        }
        return false;
    }

    public function importSuppliers()
    {
        $suppliers = $this->getAllSuppliers();
        if ($suppliers) {
            foreach ($suppliers as $supplier) {
                $sid = $supplier->id;
                unset($supplier->id);
                $supplier->group_id   = 4;
                $supplier->group_name = 'supplier';
                $this->db->insert('suppliers', $supplier);
                $supplier_id = $this->db->insert_id();
                $ids[]       = ['new' => $supplier_id, 'old' => $sid];
            }
            if (isset($ids)) {
                krsort($ids);
                foreach ($ids as $id) {
                    $this->db->update('purchases', ['supplier_id' => $id['new']], ['supplier_id' => $id['old']]);
                }
            }
            return true;
        }
        return false;
    }

    public function resetDamageProductsTable()
    {
        $this->db->truncate('adjustments');
        return true;
    }

    public function resetDeliveriesTable()
    {
        $this->db->truncate('deliveries');
        return true;
    }

    public function resetProductsTable()
    {
        $this->db->truncate('products');
        return true;
    }

    public function resetPurchasesTable()
    {
        $this->db->truncate('purchases');
        $this->db->truncate('purchase_items');
        return true;
    }

    public function resetQuotesTable()
    {
        $this->db->truncate('quotes');
        $this->db->truncate('quote_items');
        return true;
    }

    public function resetSalesTable()
    {
        $this->db->truncate('sales');
        $this->db->truncate('sale_items');
        return true;
    }

    public function resetTransfersTable()
    {
        $this->db->truncate('transfers');
        $this->db->truncate('transfer_items');
        return true;
    }

    public function updatePurchases()
    {
        $this->db->query('UPDATE ' . $this->db->dbprefix('purchases') . " SET paid=grand_total, status='received', payment_status='paid'");
        return true;
    }

    public function updateQuotes()
    {
        $this->db->query('UPDATE ' . $this->db->dbprefix('quotes') . " SET status='completed'");
        return true;
    }

    public function updateSales()
    {
        $this->db->query('UPDATE ' . $this->db->dbprefix('sales') . " SET paid=grand_total, status='completed', payment_status='paid'");
        return true;
    }

    public function updateTransfers()
    {
        $transfers = $this->getAllTransferItems();
        foreach ($transfers as $transfer) {
            unset($transfer->id, $transfer->product_unit);
            $this->db->insert('purchase_items', $transfer);
        }
        $this->db->truncate('transfer_items');
        $this->db->query('UPDATE ' . $this->db->dbprefix('transfers') . " SET status='completed'");
        return true;
    }

    public function userGroups()
    {
        $ugs = $this->getUserGroups();
        if ($ugs) {
            foreach ($ugs as $ug) {
                if ($ug->group_id > 2) {
                    $this->db->update('users', ['group_id' => ($ug->group_id + 2)], ['id' => $ug->user_id]);
                } else {
                    $this->db->update('users', ['group_id' => $ug->group_id], ['id' => $ug->user_id]);
                }
            }
            return true;
        }
        return false;
    }
}
