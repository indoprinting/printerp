<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Payment
{
  /**
   * Add new payment.
   * If **amount** is plus the type is received, sent if minus.
   * @param array $data [date, *(expense_id, income_id, mutation_id, sale_id, purchase_id, transfer_id),
   *  *bank_id, *method(cash/transfer), *amount, created_by, attachment, status(paid/pending),
   *  type(pending/sent/received), note ]
   */
  public function add($data)
  {
    $data = setCreatedBy($data);

    if (isset($data['expense_id'])) {
      $inv = $this->Expense->getExpense(['id' => $data['expense_id']]);
    } else if (isset($data['income_id'])) {
      $inv = $this->Income->getIncome(['id' => $data['income_id']]);
    } else if (isset($data['sale_id'])) {
      $inv = $this->site->getSale(['id' => $data['sale_id']]);
    } else if (isset($data['purchase_id'])) {
      $inv = $this->site->getStockPurchaseByID($data['purchase_id']);
    } else if (isset($data['pt_id'])) {
      // Since ProductTransfer using same transfer_id in payments. We filtered it.
      $inv = $this->ProductTransfer->getProductTransfer(['id' => $data['pt_id']]);
      $data['transfer_id'] = $data['pt_id'];
      unset($data['pt_id']);
    } else if (isset($data['transfer_id'])) {
      $inv = $this->site->getStockTransferByID($data['transfer_id']);
    } else if (isset($data['mutation_id'])) {
      $inv = $this->site->getBankMutationByID($data['mutation_id']);
    }

    $bank = Bank::getRow(['id' => $data['bank_id']]);

    $data['reference'] = $inv->reference;
    $data['biller_id'] = $bank->biller_id;

    DB::table('payments')->insert($data);

    if (DB::affectedRows()) {
      $insertId = DB::insertID();

      if ($data['amount'] > 0) {
        $this->increaseBankAmount($bank->id, $data['amount']);
      } else if ($data['amount'] < 0) {
        $this->decreaseBankAmount($bank->id, $data['amount'] * -1);
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
    if ($bank = Bank::getRow(['id' => $bankId])) {
      if (Bank::update($bankId, ['amount' => $bank->amount - $amount])) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * Delete payments.
   * @param array $clause [ id ]
   * @return int Return total deleted rows. 0 if no rows deleted.
   */
  public function delete($clause = [])
  {
    DB::table('payments')->delete($clause);
    return DB::affectedRows();
  }

  /**
   * Get payments.
   * @param array $clause [ id, expense_id, income_id, mutation_id, purchase_id, sale_id, transfer_id,
   *   bank_id, biller_id, method, status, start_date, end_date, order[column,sort(asc|desc)] ]
   */
  public static function get($clause = [])
  {
    $qb = DB::table('payments');

    if (!empty($clause['start_date'])) {
      $qb->where("created_at >= '{$clause['start_date']} 00:00:00'");
      unset($clause['start_date']);
    }
    if (!empty($clause['end_date'])) {
      $qb->where("created_at <= '{$clause['end_date']} 23:59:59'");
      unset($clause['end_date']);
    }
    if (!empty($clause['order'])) {
      $qb->orderBy($clause['order'][0], $clause['order'][1]);
      unset($clause['order']);
    }

    return $qb->get($clause);
  }

  public static function getPaidBalance(int $bankId)
  {
    $payment = DB::table('payments')->selectSum('amount', 'balance')->where(['bank_id' => $bankId])
      ->where('status', 'paid')->getRow();
    return floatval($payment ? $payment->balance : 0);
  }

  /**
   * Get payment.
   * @param array $clause [ id, expense_id, income_id, mutation_id, purchase_id, sale_id, transfer_id,
   *   bank_id, biller_id, method, status, start_date, end_date, order(column|sort) ]
   */
  public static function getRow($clause = [])
  {
    if ($rows = self::get($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Increase bank amount.
   * @param int $bankId Bank ID.
   * @param float $amount Amount to increase.
   */
  public function increaseBankAmount($bankId, $amount)
  {
    if ($bank = Bank::getRow(['id' => $bankId])) {
      if (Bank::update($bankId, ['amount' => $bank->amount + $amount])) {
        return TRUE;
      }
    }
    return FALSE;
  }
}
