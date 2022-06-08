<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Payment extends MY_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('Payment');

    $this->load->model('Bank');
  }

  public function addPayment($data)
  {
    $data = setCreatedBy($data);

    $this->db->insert('payments', $data);

    if ($this->db->affected_rows()) {
      $insertId = $this->db->insert_id();

      if ($data['amount'] > 0) {
        $this->increaseBankAmount($data['bank_id'], $data['amount']);
      } else if ($data['amount'] < 0) {
        $this->decreaseBankAmount($data['bank_id'], $data['amount']);
      } else {
        setLastError('Amount is zero.');
      }

      return $insertId;
    }
    return FALSE;
  }

  public function decreaseBankAmount($bankId, $amount)
  {
    if ($bank = $this->Bank->getBank(['id' => $bankId])) {
      if ($this->Bank->updateBank($bankId, ['amount' => $bank->amount - $amount])) {
        return TRUE;
      }
    }
    return FALSE;
  }

  public function increaseBankAmount($bankId, $amount)
  {
    if ($bank = $this->Bank->getBank(['id' => $bankId])) {
      if ($this->Bank->updateBank($bankId, ['amount' => $bank->amount + $amount])) {
        return TRUE;
      }
    }
    return FALSE;
  }
}