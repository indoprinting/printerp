<?php
defined('BASEPATH') or exit('No direct script access allowed');

use PhpOffice\PhpSpreadsheet\Cell\DataType;

class Machines extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();

    if (!$this->loggedIn) {
      loginPage();
    }
  }

  public function getMachines()
  {
    $xls = ($this->input->get('xls') == 1 ? TRUE : FALSE);
    $startDate = ($this->input->get('start_date') ?? date('Y-m-') . '01');
    $endDate   = ($this->input->get('end_date') ?? date('Y-m-d'));
    $condition = $this->input->get('condition');
    $warehouses = $this->session->userdata('warehouse_id') ?? $this->input->get('warehouse');
    $whNames = [];

    if ($warehouses) {
      if (is_array($warehouses)) {
        foreach ($warehouses as $warehouse) {
          $wh = $this->site->getWarehouseByID($warehouse);

          $whNames[] = $wh->name;
        }
      } else {
        $whNames[] = $this->site->getWarehouseByID($warehouses)->name;
      }
    }

    if (!$xls) { // Datatable.
      $this->load->library('datatable');

      $this->datatable
        ->select("products.id AS product_id, products.id AS pid, products.code AS product_code,
          products.name AS product_name, categories.name AS category_name,
          subcategories.name AS subcategory_name, products.warehouses AS warehouses,
          products.json_data->>'$.condition' AS last_condition,
          products.json_data->>'$.updated_at' AS last_update,
          pic.fullname AS pic_name,
          products.json_data->>'$.updated_at' AS last_check", FALSE)
        ->from('products')
        ->join('categories', 'categories.id = products.category_id', 'left')
        ->join('categories AS subcategories', 'subcategories.id = products.subcategory_id', 'left')
        ->join("users AS pic", "pic.id = JSON_UNQUOTE(JSON_EXTRACT(products.json_data, '$.pic_id'))", 'left')
        ->where('products.active', 1)
        ->group_start()
          ->like('categories.code', 'AST', 'none')
          ->or_like('categories.code', 'EQUIP', 'none')
        ->group_end()
        ->editColumn('pid', function ($data) use ($startDate, $endDate) {
          return "
            <div class=\"text-center\">
              <a href=\"{$this->theme}machines/report/add/{$data['product_id']}\"
                class=\"tip \"
                data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal\"
                style=\"color:green;\" title=\"Add Report\">
                  <i class=\"fad fa-fw fa-plus-square\"></i>
              </a>
              <a href=\"{$this->theme}machines/report/assign/{$data['product_id']}\"
                class=\"tip \"
                data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal\"
                style=\"color:red;\" title=\"Assign TS\">
                  <i class=\"fad fa-fw fa-plus-square\"></i>
              </a>
              <a href=\"{$this->theme}machines/report/view/{$data['product_id']}?start_date={$startDate}&end_date={$endDate}\"
                class=\"tip\"
                data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal\"
                data-modal-class=\"modal-lg\" title=\"View Report\">
                  <i class=\"fad fa-fw fa-chart-bar\"></i>
              </a>
            </div>
          ";
        })
        ->editColumn('last_check', function ($data) {
          $todayCheck = date('Y-m-d', strtotime($data['last_check']));
          $todayDate  = date('Y-m-d');
          $hasUpdated = ($todayCheck == $todayDate ? TRUE : FALSE);

          return ($hasUpdated ? '<div class="text-center"><i class="fad fa-2x fa-thumbs-up"></i></div>' : '');
        });

      if ($condition) {
        $this->datatable->like("JSON_UNQUOTE(JSON_EXTRACT(products.json_data, '$.condition'))", $condition, 'none');
      }

      if ($whNames) {
        $this->datatable->group_start();
        foreach ($whNames as $name) {
          $this->datatable->or_like('products.warehouses', $name, 'none');
        }
        $this->datatable->group_end();
      }

      $this->datatable->generate();
    }
    // else { // Export Excel. WILL BE OBSOLETE. Use REPORT instead.
    //   $this->db
    //     ->select("products.id AS product_id, products.code AS product_code, products.name AS product_name,
    //       products.json_data->>'$.sn' AS sn,
    //       categories.name AS category_name,
    //       subcategories.name AS subcategory_name,
    //       products.json_data->>$.assigned_at' AS assigned_at,
    //       products.json_data->>$.priority' AS priority,
    //       products.json_data->>$.order_date' AS order_date,
    //       products.json_data->>$.order_price' AS order_price,
    //       products.json_data->>$.maintenance_qty' AS maintenance_qty,
    //       products.json_data->>$.maintenance_cost' AS maintenance_cost,
    //       products.json_data->>$.disposal_date' AS disposal_date,
    //       products.json_data->>$.disposal_price' AS disposal_price,
    //       products.active AS active, products.warehouses AS warehouses,
    //       products.json_data->>'$.condition' AS last_condition,
    //       products.json_data->>'$.note' AS note,
    //       products.json_data->>'$.updated_at' AS last_update,
    //       CONCAT(pic.first_name, ' ', pic.last_name) AS pic_name,
    //       CONCAT(creator.first_name, ' ', creator.last_name) AS creator_name
    //     ", FALSE)
    //     ->from('products')
    //     ->join('categories', 'categories.id = products.category_id', 'left')
    //     ->join('categories AS subcategories', 'subcategories.id = products.subcategory_id', 'left')
    //     ->join('users AS creator', "creator.id = JSON_UNQUOTE(JSON_EXTRACT(products.json_data, '$.updated_by'))", 'left')
    //     ->join('users AS pic', "pic.id = JSON_UNQUOTE(JSON_EXTRACT(products.json_data, '$.pic_id'))", 'left')
    //     // ->where('products.active', 1)
    //     ->group_start()
    //       ->like('categories.code', 'AST', 'none')
    //       ->or_like('categories.code', 'EQUIP', 'none')
    //     ->group_end();

    //   if ($whNames) {
    //     $this->db->group_start();
    //     foreach ($whNames as $name) {
    //       $this->db->or_like('products.warehouses', $name, 'none');
    //     }
    //     $this->db->group_end();
    //   }

    //   $rows = $this->db->get()->result();

    //   $sheet = $this->ridintek->spreadsheet();
    //   $sheet->loadFile(FCPATH . 'files/templates/Machine_Report.xlsx');
    //   $sheet->getSheetByName('Sheet2');
    //   $sheet->setTitle('Machine Report');

    //   $r = 2;

    //   foreach ($rows as $row) {
    //     // if ($row->product_code != 'PCA2') continue; // TEMP

    //     $reportBegin = '';
    //     $reportEnd = '';

    //     if ($row->last_condition != 'good') {
    //       $duration = 0;

    //       $reports = $this->site->getProductReports([
    //         'product_id' => $row->product_id, 'order_by' => ['created_at', 'DESC']
    //       ]);

    //       // Count *FUCKED* duration by reports..
    //       foreach ($reports as $report) {
    //         if (empty($reportEnd)) $reportEnd = $report->created_at;

    //         if ($report->condition == 'good') {
    //           break;
    //         }

    //         $reportBegin = $row->created_at;
    //       }
    //     }

    //     if (!empty($row->assigned_at)) { // If TS assigned, use assigned at as begin report date.
    //       $reportBegin = $row->assigned_at;
    //     }

    //     $duration = ($reportBegin && $reportEnd ? getDaysInPeriod($reportBegin, $reportEnd) : 0);
    //     if ($duration < 0) $duration = 0;

    //     $sheet->setCellValue('A' . $r, $row->product_code);
    //     $sheet->setCellValue('B' . $r, $row->product_name);
    //     $sheet->setCellValue('C' . $r, $row->sn);
    //     $sheet->setCellValue('D' . $r, $row->category_name);
    //     $sheet->setCellValue('E' . $r, $row->subcategory_name);
    //     $sheet->setCellValue('F' . $r, $row->priority);
    //     $sheet->setCellValue('G' . $r, $row->order_date);
    //     $sheet->setCellValue('H' . $r, $row->order_price);
    //     $sheet->setCellValue('I' . $r, $row->disposal_date);
    //     $sheet->setCellValue('J' . $r, $row->disposal_price);
    //     $sheet->setCellValue('K' . $r, ($row->active ? 'Active' : 'Non Active'));
    //     $sheet->setCellValue('L' . $r, $row->warehouses);
    //     $sheet->setCellValue('M' . $r, $row->maintenance_qty);
    //     $sheet->setCellValue('N' . $r, $row->maintenance_cost);
    //     $sheet->setCellValue('O' . $r, lang($row->last_condition));
    //     $sheet->setCellValue('P' . $r, htmlRemove($row->note));
    //     $sheet->setCellValue('Q' . $r, $row->last_update);
    //     $sheet->setCellValue('R' . $r, $row->pic_name);
    //     $sheet->setCellValue('S' . $r, $duration); // Duration
    //     $sheet->setCellValue('T' . $r, $row->creator_name);

    //     $colorStatus = NULL;

    //     switch ($row->last_condition) {
    //       case 'good':
    //         $colorStatus = '00FF00';
    //         break;
    //       case 'off':
    //         $colorStatus = 'FF0000';
    //         break;
    //       case 'trouble':
    //         $colorStatus = 'FF8000';
    //     }

    //     if ($colorStatus) {
    //       $sheet->setFillColor('O' . $r, $colorStatus);
    //     }

    //     $r++;
    //   }

    //   $sheet->setColumnAutoWidth('A');
    //   $sheet->setColumnAutoWidth('B');
    //   $sheet->setColumnAutoWidth('C');
    //   $sheet->setColumnAutoWidth('D');
    //   $sheet->setColumnAutoWidth('E');
    //   $sheet->setColumnAutoWidth('F');
    //   $sheet->setColumnAutoWidth('G');
    //   $sheet->setColumnAutoWidth('H');
    //   $sheet->setColumnAutoWidth('I');
    //   $sheet->setColumnAutoWidth('J');
    //   $sheet->setColumnAutoWidth('K');
    //   $sheet->setColumnAutoWidth('L');
    //   $sheet->setColumnAutoWidth('M');
    //   $sheet->setColumnAutoWidth('N');
    //   $sheet->setColumnAutoWidth('O');
    //   $sheet->setColumnAutoWidth('P');
    //   $sheet->setColumnAutoWidth('Q');
    //   $sheet->setColumnAutoWidth('R');
    //   $sheet->setColumnAutoWidth('S');
    //   $sheet->setColumnAutoWidth('T');

    //   $sheet->export('PrintERP-MachinePerformance-' . date('Ymd_His'));
    // }
  }

  public function index()
  {
    $meta['bc'] = [
      ['link' => base_url(), 'page' => lang('home')],
      ['link' => '#', 'page' => lang('machines')]
    ];
    $meta['page_title'] = lang('machine_and_equipment');
    $this->data = array_merge($this->data, $meta);

    $this->page_construct('machines/index', $this->data);
  }

  public function maintenance()
  {
    $params = func_get_args();
    $method = __FUNCTION__ . '_' . (empty($params) ? 'index' : $params[0]);

    if (method_exists($this, $method)) {
      if (!empty($params[0])) array_shift($params); // Remove original method as param if first param warehouse.
      call_user_func_array([$this, $method], $params);
    }
  }

  protected function maintenance_edit($warehouseId)
  {
    checkPermission('machine-edit_schedule');

    $warehouse = $this->site->getWarehouseByID($warehouseId);
    $jsonData = getJSON($warehouse->json_data);

    $this->data['warehouse'] = $warehouse;

    if ($this->requestMethod == 'POST') {
      $groups = $this->input->post('group'); // Each group or Each warehouse.
      $g = [];

      // $group => [category: "ELEC", pic: 21, auto_assign: 1]

      foreach ($groups as $group) {
        $g[] = $group;
      }

      $jsonData->maintenances = $g;
      unset($g);

      $warehouseData = [
        'json_data' => json_encode($jsonData)
      ];

      if ($this->site->updateWarehouse(['id' => $warehouseId], $warehouseData)) {
        sendJSON(['success' => 1, 'message' => 'Jadwal berhasil diubah.']);
      }

      sendJSON(['success' => 0, 'message' => getLastError()]);
    }

    $this->load->view($this->theme . 'machines/maintenance/edit', $this->data);
  }

  protected function maintenance_getLogs()
  {
    $this->load->library('datatable');

    $this->datatable
      ->select("maintenance_logs.id AS id, maintenance_logs.id AS pid,
        maintenance_logs.product_code, maintenance_logs.assigned_at,
        assigner.fullname AS assigner_name,
        maintenance_logs.fixed_at,
        pic.fullname AS pic_name,
        warehouses.name AS location,
        maintenance_logs.note,
        maintenance_logs.created_at,
        creator.fullname AS creator_name,
        maintenance_logs.updated_at,
        updater.fullname AS updater_name,
        ")
      ->from('maintenance_logs')
      ->join('users assigner', 'assigner.id = maintenance_logs.assigned_by', 'left')
      ->join('users pic', 'pic.id = maintenance_logs.pic_id', 'left')
      ->join('users creator', 'creator.id = maintenance_logs.created_by', 'left')
      ->join('users updater', 'updater.id = maintenance_logs.updated_by', 'left')
      ->join('warehouses', 'warehouses.id = maintenance_logs.warehouse_id', 'left')
      ->editColumn('pid', function ($data) {
        return "";
        // return "
        //   <div class=\"text-center\">
        //     <a href=\"{$this->theme}machines/maintenance/edit/{$data['id']}\"
        //       class=\"tip \"
        //       data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal\"
        //       style=\"color:green;\" title=\"Edit Log\">
        //         <i class=\"fad fa-fw fa-edit\"></i>
        //     </a>
        //     <a href=\"{$this->theme}machines/maintenance/delete/{$data['id']}\"
        //       class=\"tip \"
        //       data-action=\"confirm\" style=\"color:red;\" title=\"Delete Log\">
        //         <i class=\"fad fa-fw fa-trash\"></i>
        //     </a>
        //   </div>";
        });

    $this->datatable->generate();
  }

  protected function maintenance_getSchedules()
  {
    $this->load->library('datatable');

    $this->datatable
      ->select("warehouses.id AS id, warehouses.id AS pid, warehouses.name,
        warehouses.json_data AS tsname,
        warehouses.json_data AS auto_assign", FALSE)
      ->from('warehouses')
      ->where('warehouses.active', 1)
      ->editColumn('pid', function ($data) {
        return "
          <div class=\"text-center\">
            <a href=\"{$this->theme}machines/maintenance/edit/{$data['id']}\"
              class=\"tip \"
              data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal\"
              style=\"color:blue;\" title=\"Edit Schedule\">
                <i class=\"fad fa-fw fa-edit\"></i>
            </a>
          </div>
        ";
      })
      ->editColumn('tsname', function ($data) {
        $js = getJSON($data['tsname']);
        $maintenances = ($js->maintenances ?? []);
        $res = '<ul style="list-style:inside;">';

        foreach ($maintenances as $mt) {
          $category = $this->site->getProductCategoryByCode($mt->category);
          $tsname = '-';

          if (!empty($mt->pic)) {
            $user = $this->site->getUserByID($mt->pic);
            $tsname = $user->fullname;
          }

          $res .= "<li>{$category->name}: {$tsname}</li>";
        }

        $res .= '</ul>';

        return trim($res);
      })
      ->editColumn('auto_assign', function ($data) {
        $js = getJSON($data['auto_assign']);
        $maintenances = ($js->maintenances ?? []);
        $res = '<ul style="list-style:inside;">';

        foreach ($maintenances as $mt) {
          $category = $this->site->getProductCategoryByCode($mt->category);

          $auto_assign = (!empty($mt->auto_assign) && $mt->auto_assign == 1 ? 'Yes' : 'No');

          $res .= "<li>{$category->name}: {$auto_assign}</li>";
        }

        $res .= '</ul>';

        return trim($res);
      });

    $this->datatable->generate();
  }

  protected function maintenance_index()
  {

  }

  protected function maintenance_logs()
  {
    $meta['bc'] = [
      ['link' => base_url(), 'page' => lang('home')],
      ['link' => admin_url('machines'), 'page' => lang('machines')],
      ['link' => '#', 'page' => lang('maintenance_logs')]
    ];
    $meta['page_title'] = lang('maintenance_logs');
    $this->data = array_merge($this->data, $meta);

    $this->page_construct('machines/maintenance/logs', $this->data);
  }

  protected function maintenance_schedules()
  {
    $meta['bc'] = [
      ['link' => base_url(), 'page' => lang('home')],
      ['link' => admin_url('machines'), 'page' => lang('machines')],
      ['link' => '#', 'page' => lang('maintenance_schedules')]
    ];
    $meta['page_title'] = lang('maintenance_schedules');
    $this->data = array_merge($this->data, $meta);

    $this->page_construct('machines/maintenance/schedules', $this->data);
  }

  public function report()
  {
    if ($argv = func_get_args()) {
      $method = __FUNCTION__ . '_' . $argv[0];

      if (method_exists($this, $method)) {
        array_shift($argv);
        return call_user_func_array([$this, $method], $argv);
      }
    }
  }

  protected function report_add($productId)
  {
    $product = $this->site->getProductByID($productId);
    $productJS = getJSON($product->json_data);

    $this->data['product'] = $product;
    $this->data['creator'] = $this->site->getUserByID($this->session->userdata('user_id'));

    if ($this->requestMethod == 'POST') {
      $createdBy    = $this->input->post('created_by');
      $createdAt    = ($this->isAdmin ? dtPHP($this->input->post('created_at')) : $this->serverDateTime);
      $condition    = $this->input->post('condition');
      $note         = $this->input->post('note');
      $picId        = $this->input->post('pic');
      $warehouseId  = $this->input->post('warehouse');

      if (empty($picId)) $picId = NULL;

      if (empty($condition)) sendJSON(['success' => 0, 'message' => 'Condition must be set.']);

      if (($condition == 'off' || $condition == 'trouble') && empty($note)) {
        $this->response(400, ['message' => 'Note tidak boleh kosong.']);
      }

      $lastReports = $this->site->getProductReports([
        'product_id' => $productId,
        'order_by' => ['created_at', 'DESC'],
        'limit' => 1
      ]);

      $reportData = [
        'product_id'   => $product->id,
        'warehouse_id' => $warehouseId,
        'created_by'   => $createdBy,
        'created_at'   => $createdAt,
        'condition'    => $condition,
        'note'         => $note
      ];

      if ($_FILES['attachment']['size'] > 0) {
        checkPath($this->upload_products_reports_path);

        $this->load->library('upload');

        $config = [
          'allowed_types' => $this->upload_digital_type,
          'encrypt_name'  => TRUE,
          'max_size'      => $this->upload_allowed_size,
          'overwrite'     => FALSE,
          'upload_path'   => $this->upload_products_reports_path
        ];

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('attachment')) {
          $error = $this->upload->display_errors();
          $this->session->set_flashdata('error', $error);
          redirect($_SERVER['HTTP_REFERER']);
          exit();
        }

        $attachment = $this->upload->file_name;
        $reportData['attachment'] = $attachment;
      } else {
        // sendJSON(['success' => 0, 'message' => 'Attachment required.']);
      }

      if ($this->site->addProductReport($reportData)) {
        $this->site->updateProducts([[ // Update note ONLY.
          'product_id' => $product->id,
          'note' => $note,
        ]]);

        if ($condition == 'good') { // Reset if machine is good.
          if (!empty($lastReports) && $lastReports[0]->condition != 'good') {
            $warehouse = $this->site->getWarehouseByID($warehouseId);

            $this->site->addMaintenanceLog([
              'product_id'      => $product->id,
              'product_code'    => $product->code,
              'assigned_at'     => (!empty($productJS->assigned_at) ? $productJS->assigned_at : $this->serverDateTime),
              'assigned_by'     => (!empty($productJS->assigned_by) ? $productJS->assigned_by : 1),
              'fixed_at'        => $createdAt,
              'pic_id'          => $productJS->pic_id,
              'warehouse_id'    => $warehouse->id,
              'warehouse_code'  => $warehouse->code,
              'note'            => $note,
              'created_by'      => $createdBy
            ]);
          }

          $this->site->updateProducts([[
            'product_id' => $product->id,
            'pic_id' => '', // TS
            'assigned_at' => '', // Assigned date
            'assigned_by' => '',
          ]]);
        }

        // Auto Assign TS.
        if ($condition == 'off' || $condition == 'trouble') {
          $warehouse = $this->site->getWarehouseByID($warehouseId);
          $whJS = getJSON($warehouse->json_data);
          $maintenances = ($whJS->maintenances ?? []);

          // If has maintenance schedule and pic is empty. Do not overwrite PIC if present!
          if ($maintenances && empty($productJS->pic_id)) {
            if ($subcat = $this->site->getProductCategoryByID($product->subcategory_id)) {
              foreach ($maintenances as $schedule) {
                if (empty($schedule->pic)) continue;

                if ($schedule->category == $subcat->code) {
                  if (isset($schedule->auto_assign) && $schedule->auto_assign == 1) {
                    $this->site->updateProducts([[
                      'product_id'  => $product->id,
                      'pic_id'      => ($picId ?? $schedule->pic),
                      'assigned_at' => $createdAt,
                      'assigned_by' => $createdBy
                    ]]);
                  }
                }
              }
            }
          }
        }

        sendJSON(['success' => 1, 'message' => 'Product Report has been added successfully.']);
      }

      sendJSON(['success' => 0, 'message' => getLastError()]);
    }

    $reports = $this->site->getProductReports([
      'product_id' => $productId,
      'order_by' => ['created_at', 'DESC'],
      'limit' => 1
    ]);

    $this->data['lastReport'] = ($reports ? $reports[0] : NULL);

    $this->load->view($this->theme . 'machines/report_add', $this->data);
  }

  protected function report_assign($productId)
  {
    checkPermission('machine-assign');

    $product = $this->site->getProductByID($productId);
    $productJS = getJSON($product->json_data);

    $this->data['product'] = $product;

    if ($this->requestMethod == 'POST') {
      $picId = $this->input->post('pic');

      $productData = [
        'product_id'  => $product->id,
        'pic_id'      => intval($picId)
      ];

      if (empty($productJS->pic_id)) {
        $productData['assigned_at'] = $this->serverDateTime;
        $productData['assigned_by'] = $this->session->userdata('user_id');
      }

      if ($this->site->updateProducts([$productData])) {
        sendJSON(['success' => 1, 'message' => 'Berhasil ditambahkan.']);
      }

      sendJSON(['success' => 0, 'message' => getLastError()]);
    }

    $this->load->view($this->theme . 'machines/report_assign', $this->data);
  }

  /**
   * Multi check for good to good condition.
   */
  protected function report_batch()
  {
    if ($this->requestMethod == 'POST') {
      $itemIds = $this->input->post('val');

      if (empty($itemIds)) {
        $this->response(400, ['message' => "Harap pilih salah satu item."]);
      }

      $problem = FALSE;
      $failed = 0;
      $success = 0;

      foreach ($itemIds as $itemId) {
        $product = $this->site->getProductByID($itemId);
        $warehouse = $this->site->getWarehouseByName($product->warehouses);

        $lastReport = $this->site->getProductReport([
          'product_id' => $itemId,
          'order_by' => ['created_at', 'DESC']
        ]);

        if ($lastReport->condition != 'good') {
          $problem = TRUE;
        }

        $reportData = [
          'product_id'   => $product->id,
          'warehouse_id' => $warehouse->id,
          'created_by'   => $this->session->userdata('user_id'),
          'created_at'   => $this->serverDateTime,
          'condition'    => 'good',
          'note'         => 'OK'
        ];
    
        if (!$problem && $this->site->addProductReport($reportData)) {
          $success++;
        } else {
          $failed++;
          $problem = FALSE;
        }
      }

      if ($success) {
        $this->response(200, ['message' => "{$success} item berhasil dibuatkan report. {$failed} item gagal."]);
      }
      $this->response(400, ['message' => 'Gagal menambah report item yang dipilih. Pastikan item berstatus <b>Good</b>.']);
    }
  }

  protected function report_delete($reportId)
  {
    if (!getPermission('machine-report_delete')) {
      sendJSON(['success' => 0, 'message' => lang('access_denied')]);
    }

    $reports = $this->site->getProductReports(['id' => $reportId]);

    if ($this->site->deleteProductReport($reportId)) {
      if ($reports) {
        $this->site->syncProductReports($reports[0]->product_id);
      }

      sendJSON(['success' => 1, 'message' => 'Report telah dihapus']);
    }

    sendJSON(['success' => 0, 'message' => getLastError()]);
  }

  protected function report_edit($reportId)
  {
    if (!getPermission('machine-report_edit')) {
      if ($this->requestMethod == 'POST') {
        sendJSON(['success' => 0, 'message' => lang('access_denied')]);
      }

      $this->session->set_flashdata('error', lang('access_denied'));
      die('<script>
        $("#myModal").modal("hide");
        $("#myModal2").modal("hide");
        addAlert("' . lang('access_denied') . '", "danger");
        toastr.error("' . lang('access_denied') . '");
        </script>');
    }

    $report = $this->site->getProductReport(['id' => $reportId]);

    if ($report) {
      $product = $this->site->getProductByID($report->product_id);
    } else {
      sendJSON(['success' => 0, 'message' => 'Report not found']);
    }

    if ($this->requestMethod == 'POST') {
      $created_by   = $this->input->post('created_by');
      $date         = $this->input->post('date');
      $condition    = $this->input->post('condition');
      $note         = $this->input->post('note');
      $warehouse_id = $this->input->post('warehouse');
      $picId        = $this->input->post('pic');

      if (empty($condition)) sendJSON(['success' => 0, 'message' => 'Condition must be set.']);

      $reportData = [
        'product_id'   => $product->id,
        'warehouse_id' => $warehouse_id,
        'created_by'   => $created_by,
        'created_at'   => $date,
        'condition'    => $condition,
        'note'         => $note
      ];

      if ($_FILES['attachment']['size'] > 0) {
        checkPath($this->upload_products_reports_path);

        $this->load->library('upload');

        $config = [
          'allowed_types' => $this->upload_digital_type,
          'encrypt_name'  => TRUE,
          'max_size'      => $this->upload_allowed_size,
          'overwrite'     => FALSE,
          'upload_path'   => $this->upload_products_reports_path
        ];

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('attachment')) {
          $error = $this->upload->display_errors();
          $this->session->set_flashdata('error', $error);
          redirect($_SERVER['HTTP_REFERER']);
          exit();
        }

        $attachment = $this->upload->file_name;
        $reportData['attachment'] = $attachment;
      }

      if ($this->site->updateProductReport($reportId, $reportData)) {
        $this->site->updateProducts([[
          'product_id' => $product->id,
          'note'   => $note,
          'pic_id' => intval($picId)
        ]]);



        $this->site->syncProductReports($product->id);

        sendJSON(['success' => 1, 'message' => 'Product Report has been updated successfully.']);
      }

      sendJSON(['success' => 0, 'message' => getLastError()]);
    }

    $this->data['product'] = $product;
    $this->data['productJS'] = json_decode($product->json_data);
    $this->data['report']  = $report;
    $this->data['creator'] = $this->site->getUserByID($this->session->userdata('user_id'));

    $this->load->view($this->theme . 'machines/report_edit', $this->data);
  }

  protected function report_getReports()
  {
    $productId  = $this->input->get('product_id');
    $startDate = $this->input->get('start_date');
    $endDate   = $this->input->get('end_date');
    $xls = ($this->input->get('xls') == 1 ? TRUE : FALSE);

    $period = getLastMonthPeriod(['start_date' => $startDate, 'end_date' => $endDate]);

    if (!$xls) {
      $this->load->library('datatable');

      $this->datatable
        ->select("product_report.id AS id, product_report.created_at AS created_at,
          condition, note, creator.fullname AS creator_name, attachment")
        ->from('product_report')
        ->join('users creator', 'creator.id = product_report.created_by', 'left')
        ->where('product_id', $productId)
        ->where("created_at BETWEEN '{$period['start_date']} 00:00:00' AND '{$period['end_date']} 23:59:59'");

      $this->datatable
        ->addColumn('id', 'id', function ($data) {
          return "
            <div class=\"text-center\">
              <a href=\"{$this->theme}machines/report/delete/{$data['id']}\"
                class=\"tip\"
                data-action=\"confirm\" data-title=\"Delete Report\"
                data-message=\"Are you sure to delete this report?\"
                style=\"color:red;\" title=\"Delete Report\">
                  <i class=\"fad fa-fw fa-trash\"></i>
              </a>
              <a href=\"{$this->theme}machines/report/edit/{$data['id']}\"
                class=\"tip\"
                data-toggle=\"modal\" data-backdrop=\"false\" data-target=\"#myModal2\"
                title=\"Edit Report\">
                  <i class=\"fad fa-fw fa-edit\"></i>
              </a>
            </div>";
        }, 1);

      $this->datatable->generate();
    } else {

    }
  }

  protected function report_view($productId)
  {
    $product = $this->site->getProductByID($productId);

    $this->data['product'] = $product;
    $this->data['reports'] = $this->site->getProductReports(['product_id' => $productId]);

    $this->load->view($this->theme . 'machines/report_view', $this->data);
  }
}
