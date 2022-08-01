<?php

declare(strict_types=1);

class Warehouse
{
  /**
   * Add new warehouses.
   * @param array $data [ name, code ]
   */
  public static function add(array $data)
  {
    $db = get_instance()->db;
    $db->insert('warehouses', $data);
    return $db->insert_id();
  }

  /**
   * Delete warehouses.
   * @param array $clause [ id, name, code ]
   */
  public static function delete(array $clause)
  {
    $db = get_instance()->db;
    $db->delete('warehouses', $clause);
    return $db->affected_rows();
  }

  /**
   * Get warehouses collections.
   * @param array $clause [ id, name, code ]
   */
  public static function get($clause = [])
  {
    $q = get_instance()->db->where($clause)->get('warehouses');
    return ($q ? $q->result() : []);
  }

  /**
   * Get warehouses row.
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
   * Update warehouses.
   * @param int $id warehouses ID.
   * @param array $data [ name, code ]
   */
  public static function update(int $id, array $data)
  {
    $db = get_instance()->db;
    $db->update('warehouses', $data, ['id' => $id]);
    return $db->affected_rows();
  }
}
