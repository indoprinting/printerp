<?php

defined('BASEPATH') or exit('No direct script access allowed');
/*
 *  ==============================================================================
 *  Author  : Mian Saleem
 *  Email   : saleem@tecdiary.com
 *  For     : PHPExcel
 *  Web     : https://github.com/PHPOffice/PHPExcels
 *  License : LGPL (GNU LESSER GENERAL PUBLIC LICENSE)
 *      : https://github.com/PHPOffice/PHPExcel/blob/master/license.md
 *  ==============================================================================
 */

require_once FCPATH . 'vendor/phpoffice/phpexcel/Classes/PHPExcel.php';

class Excel extends PHPExcel
{
  public function __construct()
  {
    parent::__construct();
  }

  public function export ($filename = 'default') { // New Added Custom.
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . $filename . '.xlsx"');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($this, 'Excel2007');
    $objWriter->save('php://output');
    exit;  
  }

  public function save ($filename = 'default') {
    $objWriter = PHPExcel_IOFactory::createWriter($this, 'Excel2007');
    $objWriter->save(FCPATH . 'files/' . $filename . '.xlsx');
    return TRUE;
  }
}
