<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Attachment extends MY_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('Attachment');
  }

  /**
   * Add new attachment.
   * @param array $data [ *filename, *mime, *data, created_at, created_by ]
   */
  public function addAttachment($data) {
    $data = setCreatedBy($data);

    $this->db->insert('attachment', $data);

    if ($this->db->affected_rows()) {
      return $this->db->insert_id();
    }
    return FALSE;
  }

  /**
   * Delete attachments.
   * @param array $clause [ id, filename, mime, created_by, updated_by ]
   */
  public function deleteAttachments($clause = [])
  {
    $this->db->delete('attachment', $clause);

    if ($c = $this->db->affected_rows()) {
      return (int)$c;
    }
    return 0;
  }

  /**
   * Get attachments.
   * @param array $clause [ id, filename, mime, created_by, updated_by ]
   */
  public function getAttachment($clause = [])
  {
    if ($rows = $this->getAttachments($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Get attachments.
   * @param array $clause [ id, filename, mime, created_by, updated_by ]
   */
  public function getAttachments($clause = [])
  {
    $q = $this->db->get_where('attachment', $clause);

    if ($this->db->affected_rows()) {
      return $q->result();
    }
    return [];
  }

  /**
   * Add new attachment.
   * @param array $data [ filename, mime, data, created_at, created_by, updated_at, updated_by ]
   */
  public function updateAttachment($attachmentId, $data) {
    $data = setUpdatedBy($data);

    $this->db->update('attachment', $data, ['id' => $attachmentId]);

    if ($this->db->affected_rows()) {
      return $this->db->insert_id();
    }
    return FALSE;
  }
}