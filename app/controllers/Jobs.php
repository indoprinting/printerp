<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * This Jobs controller is running by CRONJOB.
 */
class Jobs extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->rdlog->setFileName('jobs');
  }

  public function index()
  {
    if (!is_cli()) die('This program must be run under command line.');

    $this->rdlog->info('Jobs started.');

    if ($job = $this->site->getJob(['status' => 'pending'])) {
      if (empty($job->controller)) {
        $this->site->updateJob($job->id, ['result' => 'Controller is missing.', 'status' => 'error']);
        die;
      }

      if (empty($job->method)) {
        $this->site->updateJob($job->id, ['result' => 'Method is missing.', 'status' => 'error']);
        die;
      }

      $this->rdlog->info("Jobs process {$job->controller}::{$job->method}({$job->param})");
      $this->site->updateJob($job->id, ['status' => 'processing']);
      exec('/usr/local/bin/ea-php80 ' . FCPATH . "index.php {$job->controller} {$job->method} {$job->param}", $res);
      $this->site->updateJob($job->id, ['result' => implode(' ', $res), 'status' => 'done']);
    }

    $this->rdlog->info('Jobs finished.');
  }

  public function test()
  {
    $param = func_get_args();
    die(json_encode($param));
  }
}
