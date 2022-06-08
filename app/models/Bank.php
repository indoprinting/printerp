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

  public function updateBank($bankId, $data)
  {
    $this->db->update('banks', $data, ['id' => $bankId]);

    if ($this->db->affected_rows()) {
      return TRUE;
    }
    return FALSE;
  }
}