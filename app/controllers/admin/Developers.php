<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Developers extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();

    if (!$this->loggedIn) {
      admin_redirect('login');
    }
  }

  public function api_keys()
  {
    $params = func_get_args();
    $method = __FUNCTION__ . '_' . (empty($params) ? 'index' : $params[0]);

    if (method_exists($this, $method)) {
      if (!empty($params[0])) array_shift($params); // Remove original method as param if first param not numeric.
      call_user_func_array([$this, $method], $params);
    }
  }

  private function api_keys_add()
  {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $name         = $this->input->post('name');
      $token        = $this->input->post('tokens');
      $scopes       = $this->input->post('scopes');
      $active       = $this->input->post('active');
      $expired_date = $this->input->post('expired_date');

      if ( ! $name) {
        sendJSON(['error' => 1, 'msg' => 'Name must be specified.']);
      }

      if ( ! $token) {
        sendJSON(['error' => 1, 'msg' => 'Invalid token. ' . $token]);
      }

      $this->site->addApiKeys([[
        'name'         => $name,
        'token'        => $token,
        'scopes'       => $scopes,
        'active'       => ($expired_date && strtotime($expired_date) > time() ? 1 : ($expired_date ? 0 : $active)),
        'created_date' => date('Y-m-d H:i:s'),
        'expired_date'  => ( ! empty($expired_date) ? $expired_date : NULL)
      ]]);
      sendJSON(['error' => 0, 'msg' => 'API Key has been added successfully.']);
    }
    $this->load->view($this->theme . 'developers/api_keys/add', $this->data);
  }

  private function api_keys_delete()
  {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $api_id = $this->input->post('id');
      if ($this->site->deleteApiKey($api_id)) {
        sendJSON(['error' => 0, 'msg' => 'API Key has been deleted successfully.']);
      }
      sendJSON(['error' => 1, 'msg' => 'Failed to delete API Key.']);
    }
  }

  private function api_keys_edit()
  {
    
  }

  private function api_keys_generate()
  {
    if ( ! $this->Owner) sendJSON(['error' => 1, 'msg' => lang('access_denied')]);

    $token = $this->site->generateApiKeys(64);

    sendJSON(['error' => 0, 'token' => $token]);
  }

  private function api_keys_index()
  {
    $bc   = [
      ['link' => base_url(), 'page' => lang('home')],
      ['link' => '#', 'page' => lang('developers')],
      ['link' => '#', 'page' => lang('api_keys')]
    ];
    $meta = ['page_title' => lang('api_keys'), 'bc' => $bc];
    
    $this->data = array_merge($this->data, $meta);

    $this->page_construct('developers/api_keys/index', $this->data);
  }

  private function api_keys_getApiKeys()
  {
    $this->load->library('datatable');

    $this->datatable
      ->select('id, name, token, scopes, active, created_date, expired_date')
      ->from('api_keys');

    echo $this->datatable->generate();
  }

  public function index()
  {
  }

  public function tools()
  {
    $bc   = [
      ['link' => base_url(), 'page' => lang('home')],
      ['link' => '#', 'page' => lang('developers')],
      ['link' => '#', 'page' => lang('tools')]
    ];
    $meta = ['page_title' => lang('tools'), 'bc' => $bc];

    $this->data = array_merge($this->data, $meta);

    $this->page_construct('developers/tools', $this->data);
  }
}
