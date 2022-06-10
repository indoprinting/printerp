<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Bank extends MY_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('Bank');
  }

  /**
   * Add new bank
   * @param array $data [ *code, *biller_id, *name, number, holder,
   * amount, type(cash|transfer), bic, active(1|0) ]
   */
  public function addBank ($data) {
    if (isset($data['balance'])) {
      $balance = $data['balance'];
      unset($data['balance']);
    }

    if (isset($data['date'])) {
      $date = $data['date'];
      unset($data['date']);
    }

    $this->db->insert('banks', $data);

    if ($this->db->affected_rows()) {
      $insertId = $this->db->insert_id();

      if (!empty($balance)) {
        $payment = $this->Payment->getPayment(['bank_id' => $insertId, 'status' => 'beginning']);

        if ($balance > 0) {
          $paymentData = [
            'date'       => ($date ?? date('Y-m-d H:i:s')),
            'bank_id'    => $insertId,
            'method'     => $data['type'],
            'amount'     => $balance,
            'created_by' => $this->session->userdata('user_id'),
            'status'     => 'beginning',
            'type'       => 'received',
            'note'       => 'BEGINNING OF BANK'
          ];

          if ($payment) {
            $this->Payment->updatePayment($payment->id, $paymentData);
          } else {
            $this->Payment->addPayment($paymentData);
          }
        } else if ($payment) {
          $this->Payment->deletePayment($payment->id);
        }
      }
      return $insertId;
    }
    return FALSE;
  }

  public function addBanks($data)
  {
    $ids = [];

    if (is_array($data)) {
      foreach ($data as $bankData) {
        if ($id = $this->addBank($bankData)) {
          $ids[] = $id;
        } else {
          return FALSE;
        }
      }
    }
    return $ids;
  }

  /**
   * Get bank.
   * @param array $clause [ id, code, biller_id, name, number, holder, type, bic, active ]
   */
  public function getBank($clause = [])
  {
    if ($rows = $this->getBanks($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Get banks.
   * @param array $clause [ id, code, biller_id, name, number, holder, type, bic, active ]
   */
  public function getBanks($clause = [])
  {
    $q = $this->db->get_where('banks', $clause);

    if ($q && $q->num_rows()) {
      return $q->result();
    }
    return [];
  }

  /**
   * Add new bank
   * @param array $data [ *code, *biller_id, *name, number, holder,
   * amount, type(cash|transfer), bic, active(1|0) ]
   */
  public function updateBank($bankId, $data)
  {
    $this->db->update('banks', $data, ['id' => $bankId]);

    if ($this->db->affected_rows()) {
      return TRUE;
    }
    return FALSE;
  }
}