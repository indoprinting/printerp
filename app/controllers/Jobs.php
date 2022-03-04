<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * This Jobs controller is running as systemd service.
 *
 * To start or stop PrintERP Jobs service use "systemctl [ start | stop ] printerp" command.
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

    $this->rdlog->info('PrintERP Jobs Service has been started.');

    while (1) {
      $this->wa_jobs();
      sleep(10); // Interval 10s.
    }
  }

  private function wa_jobs()
  {
    try {
      $pendingJobs = $this->site->getWAJobs(['status' => 'pending']);

      foreach ($pendingJobs as $job) {
        if ($job->send_date == '0000-00-00 00:00:00') continue; // Prevent invalid datetime.

        if (strtotime(date('Y-m-d H:i:s')) > strtotime($job->send_date)) {

          $res = sendWA($job->phone, $job->message);
          // $res = '{"success": true, "description": "Sent successfully."}';

          $json = json_decode($res);

          if ($json && $json->status == TRUE) {
            if (!empty($job->sale_id)) {
              if ($sale = $this->site->getSaleByID($job->sale_id)) {
                $msg = "WAJOBS [{$job->id}]: Sale {$sale->reference}, " .
                  "customer {$sale->customer} has been notified.";

                $this->rdlog->success($msg);
              }
            }
            $this->site->updateWAJob($job->id, ['status' => 'sent']);
          } else {
            if ($json && $json->description) {
              $this->rdlog->error("WAJOBS [{$job->id}]: {$json->description}");
            }
            $this->site->updateWAJob($job->id, ['status' => 'failed']);
          }
        }
      }
    } catch (Exception $e) {
    }
  }
}
