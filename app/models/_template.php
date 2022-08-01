<?php

declare(strict_types=1);

class Template
{
  /**
   * Add new tableName.
   * @param array $data [ name, code ]
   */
  public static function add(array $data)
  {
    $db = get_instance()->db;
    $db->insert('tableName', $data);
    return $db->insert_id();
  }

  /**
   * Delete tableName.
   * @param array $clause [ id, name, code ]
   */
  public static function delete(array $clause)
  {
    $db = get_instance()->db;
    $db->delete('tableName', $clause);
    return $db->affected_rows();
  }

  /**
   * Get tableName collections.
   * @param array $clause [ id, name, code ]
   */
  public static function get($clause = [])
  {
    $q = get_instance()->db->where($clause)->get('tableName');
    return ($q ? $q->result() : []);
  }

  /**
   * Get tableName row.
   * @param array $clause [ id, name, code ]
   */
  public static function getRow($clause = [])
  {
    if ($rows = self::get($clause)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Update tableName.
   * @param int $id tableName ID.
   * @param array $data [ name, code ]
   */
  public static function update(int $id, array $data)
  {
    $db = get_instance()->db;
    $db->update('tableName', $data, ['id' => $id]);
    return $db->affected_rows();
  }
}
