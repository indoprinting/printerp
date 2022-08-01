<?php

declare(strict_types=1);

class Adjustment
{
  /**
   * Add new adjustments.
   * @param array $data [ name, code ]
   */
  public static function add(array $data)
  {
    DB::table('adjustments')->insert($data);
    return DB::insertID();
  }

  /**
   * Delete adjustments.
   * @param array $clause [ id, name, code ]
   */
  public static function delete(array $clause)
  {
    DB::table('adjustments')->delete($clause);
    return DB::affectedRows();
  }

  /**
   * Get adjustments collections.
   * @param array $clause [ id, name, code ]
   */
  public static function get($clause = [])
  {
    return DB::table('adjustments')->get($clause);
  }

  /**
   * Get adjustments row.
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
   * Update adjustments.
   * @param int $id adjustments ID.
   * @param array $data [ name, code ]
   */
  public static function update(int $id, array $data)
  {
    DB::table('adjustments')->update($data, ['id' => $id]);
    return DB::affectedRows();
  }
}
