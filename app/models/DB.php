<?php

declare(strict_types=1);

/**
 * Convenient static class for CI3 database.
 * 
 * Usage: place it on app/models/DB.php
 * 
 * Copyright (C) 2022 Ridintek Industri.
 */
class DB
{
  protected static $ciInstance;
  /**
   * @var DB
   */
  protected static $classInstance;
  /**
   * @var string
   */
  protected static $tableName;

  /**
   * Return affected rows for select, insert, update and delete.
   */
  public static function affectedRows()
  {
    return (int)self::$ciInstance->db->affected_rows();
  }

  /**
   * Manual begin transaction.
   */
  public static function beginTransaction()
  {
    return get_instance()->db->trans_begin();
  }

  /**
   * Automatic end and commit transaction.
   */
  public static function completeTransaction()
  {
    return get_instance()->db->trans_complete();
  }

  /**
   * Automatic commit start transactions.
   */
  public static function startTransaction()
  {
    return get_instance()->db->trans_start();
  }

  /**
   * Get transaction status.
   */
  public static function statusTransaction()
  {
    return (bool)get_instance()->db->trans_status();
  }

  /**
   * Manual commit transaction.
   */
  public static function commitTransaction()
  {
    return get_instance()->db->trans_commit();
  }

  /**
   * Delete rows.
   * @param array $clause Filter clause.
   */
  public function delete(array $clause)
  {
    return self::$ciInstance->db->delete(self::$tableName, $clause);
  }

  /**
   * Get compiled select.
   */
  public function getCompiledSelect()
  {
    return self::$ciInstance->db->get_compiled_select();
  }

  /**
   * Return error DB message. ['code', 'message']
   */
  public static function error()
  {
    return self::$ciInstance->db->error();
  }

  /**
   * Find single row.
   */
  public function find()
  {
    $q = self::$ciInstance->db->get(self::$tableName);
    return ($q ? $q->row() : NULL);
  }

  /**
   * Find all or filtered rows.
   */
  public function findAll()
  {
    $q = self::$ciInstance->db->get(self::$tableName);
    return ($q ? $q->result() : []);
  }

  /**
   * Get all or filtered rows.
   * @param array $clause Filter clause.
   */
  public function get($clause = [])
  {
    $q = self::$ciInstance->db->where($clause)->get(self::$tableName);
    return ($q ? $q->result() : []);
  }

  /**
   * Get single rows with filter.
   * @param array $clause Filter clause.
   */
  public function getRow($clause = [])
  {
    $q = self::$ciInstance->db->where($clause)->get(self::$tableName);
    return ($q ? $q->row() : NULL);
  }

  /**
   * Group by.
   * @param string $by Column name.
   * @param string|NULL $escape Escape string.
   */
  public function groupBy(string $by, $escape = NULL)
  {
    self::$ciInstance->db->group_by($by, $escape);
    return self::$classInstance;
  }

  /**
   * End group.
   */
  public function groupEnd()
  {
    self::$ciInstance->db->group_end();
    return self::$classInstance;
  }

  /**
   * Start group.
   */
  public function groupStart()
  {
    self::$ciInstance->db->group_start();
    return self::$classInstance;
  }

  /**
   * Insert rows.
   * @param array $data Data to insert.
   */
  public function insert(array $data)
  {
    return self::$ciInstance->db->insert(self::$tableName, $data);
  }

  public function isNotNull($field)
  {
    self::$ciInstance->db->where("{$field} IS NOT NULL");
    return self::$classInstance;
  }

  public function isNull($field)
  {
    self::$ciInstance->db->where("{$field} IS NULL");
    return self::$classInstance;
  }

  /**
   * Return insert ID.
   */
  public static function insertID()
  {
    return get_instance()->db->insert_id();
  }

  public function join($table, $cond, $type = '', $escape = NULL)
  {
    self::$ciInstance->db->join($table, $cond, $type, $escape);
    return self::$classInstance;
  }

  public function like($field, $match = '', $side = 'both', $escape = NULL)
  {
    self::$ciInstance->db->like($field, $match, $side, $escape);
    return self::$classInstance;
  }

  public function limit($value, $limit = 0)
  {
    self::$ciInstance->db->limit($value, $limit);
    return self::$classInstance;
  }

  public function notLike($field, $match = '', $side = 'both', $escape = NULL)
  {
    self::$ciInstance->db->not_like($field, $match, $side, $escape);
    return self::$classInstance;
  }

  /**
   * Order by
   */
  public function orderBy($orderBy, $direction = '', $escape = NULL)
  {
    self::$ciInstance->db->order_by($orderBy, $direction, $escape);
    return self::$classInstance;
  }

  public function orLike($field, $match = '', $side = 'both', $escape = NULL)
  {
    self::$ciInstance->db->or_like($field, $match, $side, $escape);
    return self::$classInstance;
  }

  public function orNotLike($field, $match = '', $side = 'both', $escape = NULL)
  {
    self::$ciInstance->db->or_not_like($field, $match, $side, $escape);
    return self::$classInstance;
  }

  public function orWhere($clauses, $value = NULL, $escape = NULL)
  {
    self::$ciInstance->db->or_where($clauses, $value, $escape);
    return self::$classInstance;
  }

  public function orWhereIn($clauses, $value = NULL, $escape = NULL)
  {
    self::$ciInstance->db->or_where_in($clauses, $value, $escape);
    return self::$classInstance;
  }

  public function orWhereNotIn($clauses, $value = NULL, $escape = NULL)
  {
    self::$ciInstance->db->or_where_not_in($clauses, $value, $escape);
    return self::$classInstance;
  }

  /**
   * Manual rollback transaction.
   */
  public static function rollbackTransaction()
  {
    return get_instance()->db->trans_rollback();
  }

  public function select($columns, $escape = TRUE)
  {
    self::$ciInstance->db->select($columns, $escape);
    return self::$classInstance;
  }

  public function selectAvg($select = '', $alias = '')
  {
    self::$ciInstance->db->select_avg($select, $alias);
    return self::$classInstance;
  }

  public function selectMax($select = '', $alias = '')
  {
    self::$ciInstance->db->select_max($select, $alias);
    return self::$classInstance;
  }

  public function selectMin($select = '', $alias = '')
  {
    self::$ciInstance->db->select_min($select, $alias);
    return self::$classInstance;
  }

  public function selectSum($select = '', $alias = '')
  {
    self::$ciInstance->db->select_sum($select, $alias);
    return self::$classInstance;
  }

  public static function table(string $tableName)
  {
    self::$tableName = $tableName;
    self::$ciInstance = &get_instance();
    self::$classInstance = new self;
    return self::$classInstance;
  }

  public static function transComplete()
  {
    return get_instance()->db->trans_complete();
  }

  public static function transStart()
  {
    return get_instance()->db->trans_start();
  }

  public static function transStatus()
  {
    return get_instance()->db->trans_status();
  }

  public function update(array $data, array $where)
  {
    return self::$ciInstance->db->update(self::$tableName, $data, $where);
  }

  public function where($clauses, $values = NULL, $escape = TRUE)
  {
    self::$ciInstance->db->where($clauses, $values, $escape);
    return self::$classInstance;
  }

  public function whereIn($clauses = NULL, $values = NULL, $escape = NULL)
  {
    self::$ciInstance->db->where_in($clauses, $values, $escape);
    return self::$classInstance;
  }

  public function whereNotIn($clauses = NULL, $values = NULL, $escape = NULL)
  {
    self::$ciInstance->db->where_not_in($clauses, $values, $escape);
    return self::$classInstance;
  }
}
