<?php defined('BASEPATH') or exit('No direct script access allowed');

use Laminas\Barcode\Barcode;

class Gallery extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * New method to view attachment and download it.
   */
  public function attachment($id = NULL)
  {
    if (strpos($id, '.') !== false) {
      return $this->view($id);
    }

    $attachment = Attachment::select('*')
      ->where('id', $id)
      ->orWhere('hashname', $id)
      ->getRow();

    $modal = (getGET('modal') == 1 ? TRUE : FALSE);

    if ($attachment && !$modal) {
      $download = (getGET('d') == 1 ? TRUE : FALSE);

      header("Content-Type: {$attachment->mime}");
      header("Content-Length: {$attachment->size}");

      if ($download) {
        header("Content-Disposition: attachment; filename=\"{$attachment->filename}\"");
      }

      die($attachment->data);
    }

    $this->data['attachment'] = $attachment;

    $this->load->view($this->theme . 'gallery/attachment', $this->data);
  }

  public function barcode()
  {
    $data = getGET('data');
    $type = getGET('type');

    if (!$type) $type = 'code128';

    if ($data) {
      Barcode::render($type, 'image', ['text' => $data, 'drawText' => FALSE, 'barHeight' => 80]);
    }

    return NULL;
  }

  protected function getFile($name)
  {
    $filename = '';
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

  public function get($name = NULL) // Called by HTML modal.
  {
    $download = (getGET('download') == 'true' ? TRUE : FALSE);
    $name     = ($name ?? getGET('name'));

    $filename = $this->getFile($name);

    if (file_exists($filename) && !is_dir($filename)) {
      if ($download == TRUE) {
        header('Content-Disposition: attachment; filename=' . $name);
      }
      header('Content-Type: ' . mime_content_type($filename));
      echo (file_get_contents($filename));
      die;
    }

    sendJSON(['error' => 1, 'msg' => 'No file exists.']);
  }

  public function index()
  {
    echo ('ok');
  }

  public function view($name = null) // Called by Modal
  {
    $name = $name ?? getGET('name');

    $filename = $this->getFile($name);

    $this->data['mime_type'] = (file_exists($filename) && is_file($filename) ? mime_content_type($filename) : NULL);
    $this->data['name'] = $name;
    $this->data['path'] = NULL;

    $this->load->view($this->theme . 'gallery/view', $this->data);
  }
}
