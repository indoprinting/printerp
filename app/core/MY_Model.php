<?php

defined('BASEPATH') or exit('No direct script access allowed');

class MY_Model extends CI_Model {
  public function __construct () {
    parent::__construct();

    $this->cache = $this->ridintek->cache();
  }
}