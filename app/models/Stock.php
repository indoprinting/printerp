<?php

declare(strict_types=1);

class Stock
{
  /**
   * Add new stocks.
   * @param array $data [ name, code ]
   */
  public static function add(array $data)
  {
    $db = get_instance()->db;
    $db->insert('stocks', $data);
    return $db->insert_id();
  }

  /**
   * Delete stocks.
   * @param array $clause [ id, name, code ]
   */
  public static function delete(array $clause)
  {
    $db = get_instance()->db;
    $db->delete('stocks', $clause);
    return $db->affected_rows();
  }

  /**
   * Get stocks collections.
   * @param array $clause [ id, name, code ]
   */
  public static function get($clause = [])
  {
    $q = get_instance()->db->where($clause)->get('stocks');
    return ($q ? $q->result() : []);
  }

  /**
   * Get stocks row.
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
   * Update stocks.
   * @param int $id stocks ID.
   * @param array $data [ name, code ]
   */
  public static function update(int $id, array $data)
  {
    $db = get_instance()->db;
    $db->update('stocks', $data, ['id' => $id]);
    return $db->affected_rows();
  }
}
