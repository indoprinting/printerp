<?php

declare(strict_types=1);

class ProductCategory
{
  /**
   * Add new ProductCategory.
   */
  public static function add(array $data)
  {
    DB::table('categories')->insert($data);
    
    if ($insertID = DB::insertID()) {
      return $insertID;
    }

    setLastError(DB::error()['message']);

    return false;
  }

  /**
   * Delete ProductCategory.
   */
  public static function delete(array $where)
  {
    DB::table('categories')->delete($where);
    
    if ($affectedRows = DB::affectedRows()) {
      return $affectedRows;
    }

    setLastError(DB::error()['message']);

    return false;
  }

  /**
   * Get ProductCategory collections.
   */
  public static function get($where = [])
  {
    return DB::table('categories')->get($where);
  }

  /**
   * Get ProductCategory row.
   */
  public static function getRow($where = [])
  {
    if ($rows = self::get($where)) {
      return $rows[0];
    }
    return NULL;
  }

  /**
   * Select ProductCategory.
   */
  public static function select(string $columns, $escape = TRUE)
  {
    return DB::table('categories')->select($columns, $escape);
  }

  /**
   * Update ProductCategory.
   */
  public static function update(int $id, array $data)
  {
    DB::table('categories')->update($data, ['id' => $id]);
    
    if ($affectedRows = DB::affectedRows()) {
      return $affectedRows;
    }

    setLastError(DB::error()['message']);

    return false;
  }
}
