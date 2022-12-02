<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Calendar extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        if (!$this->loggedIn) {
            $this->session->set_userdata('requested_page', $this->uri->uri_string());
            $this->sma->md('login');
        }
        if ($this->Customer || $this->Supplier) {
            $this->session->set_flashdata('warning', lang('access_denied'));
            redirect($_SERVER['HTTP_REFERER']);
        }

        $this->load->library('form_validation');
        $this->load->admin_model('calendar_model');
    }

    public function add_event()
    {
        $this->form_validation->set_rules('title', lang('title'), 'trim|required');
        $this->form_validation->set_rules('start', lang('start'), 'required');

        if ($this->form_validation->run() == true) {
            $data = [
                'title'       => $this->input->post('title'),
                'start'       => $this->sma->fld($this->input->post('start')),
                'end'         => $this->input->post('end') ? $this->sma->fld($this->input->post('end')) : null,
                'description' => $this->input->post('description'),
                'color'       => $this->input->post('color') ? $this->input->post('color') : '#000000',
                'user_id'     => $this->session->userdata('user_id'),
            ];

            if ($this->calendar_model->addEvent($data)) {
                $res = ['error' => 0, 'msg' => lang('event_added')];
                sendJSON($res);
            } else {
                $res = ['error' => 1, 'msg' => lang('action_failed')];
                sendJSON($res);
            }
        }
    }

    public function delete_event($id)
    {
        if ($this->input->is_ajax_request()) {
            if ($event = $this->calendar_model->getEventByID($id)) {
                if (!$this->Owner && $event->user_id != $this->session->userdata('user_id')) {
                    $res = ['error' => 1, 'msg' => lang('access_denied')];
                    sendJSON($res);
                }
                $this->db->delete('calendar', ['id' => $id]);
                $res = ['error' => 0, 'msg' => lang('event_deleted')];
                sendJSON($res);
            }
        }
    }

    public function get_cal_lang()
    {
        switch ($this->Settings->user_language) {
            case 'arabic':
            $cal_lang = 'ar-ma';
            break;
            case 'french':
            $cal_lang = 'fr';
            break;
            case 'german':
            $cal_lang = 'de';
            break;
            case 'italian':
            $cal_lang = 'it';
            break;
            case 'portuguese-brazilian':
            $cal_lang = 'pt-br';
            break;
            case 'simplified-chinese':
            $cal_lang = 'zh-tw';
            break;
            case 'spanish':
            $cal_lang = 'es';
            break;
            case 'thai':
            $cal_lang = 'th';
            break;
            case 'traditional-chinese':
            $cal_lang = 'zh-cn';
            break;
            case 'turkish':
            $cal_lang = 'tr';
            break;
            case 'vietnamese':
            $cal_lang = 'vi';
            break;
            default:
            $cal_lang = 'en';
            break;
        }
        return $cal_lang;
    }

    public function get_events()
    {
        $cal_lang = $this->get_cal_lang();
        $this->load->library('fc', ['lang' => $cal_lang]);

        if (!isset($_GET['start']) || !isset($_GET['end'])) {
            die('Please provide a date range.');
        }

        if ($cal_lang == 'ar') {
            $start = $this->fc->convert2(getGET('start', true));
            $end   = $this->fc->convert2(getGET('end', true));
        } else {
            $start = getGET('start', true);
            $end   = getGET('end', true);
        }

        $input_arrays  = $this->calendar_model->getEvents($start, $end);
        $start         = $this->fc->parseDateTime($start);
        $end           = $this->fc->parseDateTime($end);
        $output_arrays = [];
        foreach ($input_arrays as $array) {
            $this->fc->load_event($array);
            if ($this->fc->isWithinDayRange($start, $end)) {
                $output_arrays[] = $this->fc->toArray();
            }
        }

        // sendJSON($output_arrays);
        sendJSON($output_arrays);
    }

    public function index()
    {
        $this->data['cal_lang'] = $this->get_cal_lang();
        $bc                     = [['link' => base_url(), 'page' => lang('home')], ['link' => '#', 'page' => lang('calendar')]];
        $meta                   = ['page_title' => lang('calendar'), 'bc' => $bc];
        $this->data = array_merge($this->data, $meta);

        $this->page_construct('calendar', $this->data);
    }

    public function update_event()
    {
        $this->form_validation->set_rules('title', lang('title'), 'trim|required');
        $this->form_validation->set_rules('start', lang('start'), 'required');

        if ($this->form_validation->run() == true) {
            $id = $this->input->post('id');
            if ($event = $this->calendar_model->getEventByID($id)) {
                if (!$this->Owner && $event->user_id != $this->session->userdata('user_id')) {
                    $res = ['error' => 1, 'msg' => lang('access_denied')];
                    sendJSON($res);
                }
            }
            $data = [
                'title'       => $this->input->post('title'),
                'start'       => $this->sma->fld($this->input->post('start')),
                'end'         => $this->input->post('end') ? $this->sma->fld($this->input->post('end')) : null,
                'description' => $this->input->post('description'),
                'color'       => $this->input->post('color') ? $this->input->post('color') : '#000000',
                'user_id'     => $this->session->userdata('user_id'),
            ];

            if ($this->calendar_model->updateEvent($id, $data)) {
                $res = ['error' => 0, 'msg' => lang('event_updated')];
                sendJSON($res);
            } else {
                $res = ['error' => 1, 'msg' => lang('action_failed')];
                sendJSON($res);
            }
        }
    }
}
