<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
    <h4 class="modal-title text-center" id="myModalLabel">Add Report [<?= $product->code ?>]</h4>
  </div>
  <div class="modal-body">
    <form id="form" data-toggle="validator" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="created_by">Created By</label>
            <select class="form-control select2" id="created_by" name="created_by" style="width:100%;">
              <?php $users = $this->site->getUsers(); ?>
              <?php foreach ($users as $user):
                if (!$isAdmin) {
                  if ($user->id != $this->session->userdata('user_id')) continue;
                }
              ?>
                <option value="<?= $user->id ?>"><?= $user->first_name . ' ' . $user->last_name ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="date">Date</label>
            <input type="text" class="form-control datetime" name="date" value="<?= $this->serverDateTime ?>" <?= ($isAdmin ? '' : ' disabled') ?>>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="warehouse_id">Warehouse</label>
            <select class="form-control select2" id="warehouse_id" name="warehouse" style="width:100%;">
              <?php $warehouses = $this->site->getAllWarehouses(); ?>
              <?php foreach ($warehouses as $warehouse) :
                if (!$isAdmin) {
                  if ($this->session->userdata('warehouse_id')) {
                    if ($warehouse->id != $this->session->userdata('warehouse_id')) continue;
                  }
                }

                $selected = (strcasecmp($warehouse->name, $product->warehouses) === 0 ? ' selected' : '');
              ?>
                <option value="<?= $warehouse->id ?>"<?= $selected ?>><?= $warehouse->name ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="condition">Condition</label>
            <select class="form-control select2" id="condition" name="condition" data-placeholder="Select Condition" style="width:100%;">
              <option value=""></option>
              <option value="good">Good (Baik)</option>
              <option value="off">Off (Mati)</option>
              <option value="trouble">Trouble (Bermasalah)</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="attachment">Attachment</label>
            <input type="file" class="form-control file" name="attachment" data-browse-label="Browse" data-show-upload="false" data-show-preview="false">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="note">Note</label>
            <textarea class="form-control" id="note" name="note"><?= ($lastReport ? $lastReport->note : '') ?></textarea>
          </div>
        </div>
      </div>
      <input type="hidden" name="<?= csrf_token_name() ?>" value="<?= csrf_hash() ?>">
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-danger" data-dismiss="modal">Cancel</button>
    <button id="submit" class="btn btn-primary">Add</button>
  </div>
</div>
<script defer src="<?= $assets ?>js/modal.js?v=<?= $res_hash ?>"></script>
<script>
  $(document).ready(function() {
    $('#submit').click(function() {
      let form = new FormData(document.getElementById('form'));
      let condition = $('#condition');
      let note      = $('#note');

      if (condition.val() == 'trouble' || condition.val() == 'off') {
        if (note.val() != '<p>-</p>' && note.val().length < 35) {
          alertify.alert('<h3 class="bold red">PERINGATAN!</h3>',
            '<b>Kerusakan apapun harus mengisi catatan di Note minimal 35 karakter.</b>');
          return false;
        }
      }

      $.ajax({
        contentType: false,
        data: form,
        method: 'POST',
        processData: false,
        success: function(data) {
          if (isObject(data)) {
            if (data.success) {
              if (Table) Table.draw(false);
              addAlert(data.message, 'success');
            } else {
              addAlert(data.message, 'danger');
            }
          } else {
            addAlert('Something wrong here.', 'danger');
          }

          $('#myModal').modal('hide');
        },
        url: site.base_url + 'machines/report/add/<?= $product->id ?>'
      })
    });
  });
</script>