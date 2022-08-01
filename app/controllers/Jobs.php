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

    if ($job = $this->site->getJob(['status' => 'queue'])) {
      if (empty($job->request)) {
        $this->site->updateJob($job->id, ['response' => 'Request is missing.', 'status' => 'failed']);
        die;
      }

      $this->rdlog->info("Jobs process $job->request)");
      $this->site->updateJob($job->id, ['status' => 'processing']);
      exec('/www/server/php/80/bin/php ' . FCPATH . "index.php {$job->request}", $res);
      $this->site->updateJob($job->id, ['response' => implode(' ', $res), 'status' => 'done']);
    }

    $this->rdlog->info('Jobs finished.');
  }

  public function add($request)
  {
    $jobData = [
      'request' => $request,
      'status'  => 'queue'
    ];

    if ($this->site->addJob($jobData)) {
      $this->response(201, ['message' => 'Job has been created.']);
    }
    $this->response(400, ['message' => 'Failed to create job.']);
  }

  public function test()
  {
    $param = func_get_args();
    die(json_encode($param));
  }
}
