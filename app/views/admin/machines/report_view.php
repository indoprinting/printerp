<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<?php
$q = '';
if ($startDate = $this->input->get('start_date')) {
  $q .= '&start_date=' . $startDate;
}
if ($endDate = $this->input->get('end_date')) {
  $q .= '&end_date=' . $endDate;
}
?>
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
    <h4 class="modal-title text-center" id="myModalLabel">View Product Report [<?= $product->code ?>]</h4>
  </div>
  <div class="modal-body">
    <table id="ReportTable" class="table table-bordered table-condensed table-hover table-striped" style="width:100%;">
      <thead>
        <tr>
          <th>Action</th>
          <th>Date</th>
          <th>Condition</th>
          <th>Note</th>
          <th>Created By</th>
          <th>Attachment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6" class="dataTables_empty"><?= lang('loading_data'); ?></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
<script defer src="<?= $assets ?>js/modal.js?v=<?= $res_hash ?>"></script>
<script>
  $(document).ready(function () {
    'use strict';

    window.Table2 = $('#ReportTable').DataTable({
      ajax: {
        data: function(data) {
          data[security.csrf_token_name] = security.csrf_hash;
        },
        method: 'POST',
        url: site.base_url + 'machines/report/getReports?product_id=<?= $product->id ?><?= $q ?>'
      },
      columnDefs: [{
          targets: 0,
          orderable: false
        },
        {
          targets: 2,
          render: renderStatus
        },
        {
          targets: 5,
          render: attachment2
        }
      ],
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, 'All']
      ],
      order: [
        [1, 'desc']
      ],
      pageLength: 10,
      processing: true,
      scrollX: true,
      serverSide: true,
      // stateSave: true
    });
  })
</script>