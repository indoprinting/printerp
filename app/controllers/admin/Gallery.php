<?php defined('BASEPATH') or exit('No direct script access allowed');

use Laminas\Barcode\Barcode;

class Gallery extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function barcode()
  {
    $data = $this->input->get('data');
    $type = $this->input->get('type');

    if ( ! $type) $type = 'code128';

    if ($data) {
      Barcode::render($type, 'image', ['text' => $data, 'drawText' => FALSE, 'barHeight' => 80]);
    }

    return NULL;
  }

  protected function getFile($name)
  {
    $filename = NULL;
    $paths = getAttachmentPaths();

    if ($paths) {
      foreach ($paths as $path) {
        if (file_exists($path . $name) && is_file($path . $name)) {
          $filename = $path . $name;
          break;
        }
      }
    }

    return $filename;
  }

  public function get() // Called by HTML modal.
  {
    $download = ($this->input->get('download') == 'true' ? TRUE : FALSE);
    $name     = $this->input->get('name');

    $filename = $this->getFile($name);

    if (file_exists($filename) && !is_dir($filename)) {
      if ($download == TRUE) {
        header('Content-Disposition: attachment; filename=' . $name);
      }
      header('Content-Type: ' . mime_content_type($filename));
      echo (file_get_contents($filename));
      die();
    }

    sendJSON(['error' => 1, 'msg' => 'No file exists.']);
  }

  public function index()
  {
    echo ('ok');
  }

  public function view() // Called by Modal
  {
    $name = $this->input->get('name');

    $filename = $this->getFile($name);

    $this->data['mime_type'] = (file_exists($filename) && is_file($filename) ? mime_content_type($filename) : NULL);
    $this->data['name'] = $name;
    $this->data['path'] = NULL;

    $this->load->view($this->theme . 'gallery/view', $this->data);
  }
}
