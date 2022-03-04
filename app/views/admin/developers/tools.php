<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>

<div class="box">
  <div class="box-header">
    <h2 class="blue"><i class="fa fa-fw fa-tools"></i><?= lang('tools'); ?></h2>
    <div class="box-icon">
      <ul class="btn-tasks">
        <li class="dropdown">
          <a href="#" class="tip" id="filter" title="Filter"><i class="icon fa fa-filter"></i></a>
        </li>
      </ul>
    </div>
  </div>
  <div class="box-content">
    <div class="row">
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading">Remove Duplicated Stocks</div>
          <div class="panel-body">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="sale_reference">Sale Reference</label>
                <div class="row">
                  <div class="col-sm-12">
                    <input class="form-control" placeholder="Reference" type="text" id="sale_reference" name="reference">
                  </div>
                </div><br>
                <div class="row">
                  <div class="col-sm-12">
                    <button class="btn btn-primary form-control" id="remove_duplicate"><i class="fa fa-sync"></i> Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  $(document).ready(function() {
    $('#real_quantity').focus(function() {
      $(this).select();
    });
    $('#sale_reference').focus(function() {
      $(this).select();
    });
    $('#remove_duplicate').click(function() {
      let ref = $('#sale_reference');

      $(this).prop('disabled', true);
      showLoader(true);

      ref.val(ref.val().trim());

      let data = {};

      data[security.csrf_token_name] = security.csrf_hash;
      data.reference = ref.val();


      $.ajax({
        data: data,
        error: (xhr) => {
          if (xhr.status === 0) {
            addAlert('No internet connection.', 'danger');
          }
          $(this).prop('disabled', false);
          showLoader(false);
        },
        method: 'POST',
        success: (data) => {
          if (typeof data === 'object' && !data.error) {
            addAlert(data.msg, 'success');
            $(this).prop('disabled', false);
          } else {
            addAlert(data.msg, 'danger');
            $(this).prop('disabled', false);
          }

          showLoader(false);
        },
        url: site.base_url + 'debug/remove_duplicate'
      });
    });
  })
</script>