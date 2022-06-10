<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Payment extends MY_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('Payment');
  }

  /**
   * Add new payment.
   * @param array $data [date, *(expense_id, income_id, mutation_id, sale_id, purchase_id, transfer_id),
   * *bank_id, *method(cash/transfer), *amount, created_by, attachment, status, *type(pending/sent/received),
   * note ]
   */
  public function addPayment($data)
  {
    $data = setCreatedBy($data);

    if (isset($data['expense_id'])) {
      $inv = $this->Expense->getExpense(['id' => $data['expense_id']]);
    } else if (isset($data['income_id'])) {
      $inv = $this->Income->getIncome(['id' => $data['income_id']]);
    }

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

  /**
   * Decrease bank amount.
   * @param int $bankId Bank ID.
   * @param float $amount Amount to increase (Must positive value).
   */
  public function decreaseBankAmount($bankId, $amount)
  {
    if ($bank = $this->Bank->getBank(['id' => $bankId])) {
      if ($this->Bank->updateBank($bankId, ['amount' => $bank->amount - $amount])) {
        return TRUE;
      }
    }
    return FALSE;
  }

  public function deletePayments($clause = [])
  {
    $this->db->delete('payments', $clause);

    if ($c = $this->db->affected_rows()) {
      return $c;
    }
    return 0;
  }

  /**
   * Get payment.
   * @param array $clause [ id, expense_id, income_id, mutation_id, purchase_id, sale_id, transfer_id,
   *   bank_id, biller_id, method, status, start_date, end_date, order(column|sort) ]
   */
  public function getPayment($clause = [])
  {
    if ($rows = $this->getPayments($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Get payments.
   * @param array $clause [ id, expense_id, income_id, mutation_id, purchase_id, sale_id, transfer_id,
   *   bank_id, biller_id, method, status, start_date, end_date, order(column|sort) ]
   */
  public function getPayments($clause = [])
  {
    $q = $this->db->get_where('payments', $clause);

    if ($q && $q->num_rows()) {
      return $q->result();
    }
    return [];
  }

  /**
   * Increase bank amount.
   * @param int $bankId Bank ID.
   * @param float $amount Amount to increase.
   */
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