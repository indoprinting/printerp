<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
    <h4 class="modal-title text-center" id="myModalLabel">Edit Google Review</h4>
  </div>
  <div class="modal-body">
    <form id="form" data-toggle="validator" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="created_by">Created By</label>
            <select class="select2" id="created_by" name="created_by" style="width:100%;">
              <?php $users = $this->site->getUsers(); ?>
              <?php foreach ($users as $user) :
                if (!$isAdmin && ($review->created_by != $user->id)) {
                  if ($user->id != $this->session->userdata('user_id')) continue;
                }
              ?>
                <option value="<?= $user->id ?>" <?= $review->created_by == $user->id ? ' selected' : '' ?>><?= $user->fullname ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="created_at">Created At</label>
            <input type="datetime-local" class="form-control" id="created_at" name="created_at" value="<?= dtJS($review->created_at) ?>" <?= ($isAdmin ? '' : ' disabled') ?>>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="biller">Biller</label>
            <select class="select2" id="biller" name="biller" style="width:100%;">
              <?php $billers = Biller::get(); ?>
              <?php foreach ($billers as $biller) :
                $selected = '';

                if (!$isAdmin) {
                  if ($this->session->userdata('biller_id')) {
                    if ($biller->id != $this->session->userdata('biller_id')) continue;
                  }
                }
              ?>
                <option value="<?= $biller->id ?>" <?= $review->biller_id == $biller->id ? 'selected' : '' ?>><?= $biller->name ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="pic">PIC Name</label>
            <select class="select2" id="pic" name="pic" style="width:100%;">
              <?php $users = $this->site->getUsers(); ?>
              <?php foreach ($users as $user) :
                if (!$isAdmin && ($review->pic_id != $user->id)) {
                  if ($user->id != $this->session->userdata('user_id')) continue;
                }
              ?>
                <option value="<?= $user->id ?>" <?= $review->pic_id == $user->id ? ' selected' : '' ?>><?= $user->fullname ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <fieldset class="scheduler-border well-warning">
            <legend class="scheduler-border well-info">Customer</legend>
            <div class="col-md-12">
              <div class="form-group">
                <label for="customer_name">Name</label>
                <input type="text" id="customer_name" class="form-control" name="customer_name" value="<?= $review->customer_name ?>" required>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="status">Status</label>
            <select class="select2" id="status" name="status" style="width:100%;">
              <?php if ($isAdmin || $review->status == 'pending') : ?>
                <option value="pending" <?= $review->status == 'pending' ? ' selected' : '' ?>>Pending</option>
              <? endif; ?>
              <?php if ($isAdmin || $review->status == 'validated') : ?>
                <option value="validated" <?= $review->status == 'validated' ? ' selected' : '' ?>>Validated</option>
              <? endif; ?>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <label>Pastikan nama pelanggan sesuai dengan nama di akun google agar mudah untuk divalidasi.</label>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="attachment">Attachment</label>
            <input type="file" class="form-control file" name="attachment" data-browse-label="Browse" data-show-upload="false" data-show-preview="false">
          </div>
        </div>
      </div>
      <?= csrf_field() ?>
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-danger" data-dismiss="modal">Cancel</button>
    <button id="submit" class="btn btn-primary">Edit</button>
  </div>
</div>
<script defer src="<?= $assets ?>js/modal.js?v=<?= $res_hash ?>"></script>
<script>
  $(document).ready(function() {
    $('#submit').click(function() {
      let form = new FormData(document.getElementById('form'));

      $.ajax({
        contentType: false,
        data: form,
        error: (xhr) => {
          if (xhr.responseJSON) toastr.error(xhr.responseJSON.message, 'FAILED');
        },
        method: 'POST',
        processData: false,
        success: function(data) {
          if (isObject(data)) {
            if (data.status >= 200 && data.status < 300) {
              if (typeof Table == 'object') Table.draw(false);
              toastr.success(data.message);
            }
          } else {
            toastr.error('Something wrong here.');
          }

          $('#myModal').modal('hide');
        },
        url: site.base_url + 'google/review/edit/<?= $review->id ?>'
      });

      // addConfirm({
      //   title: 'Konfirmasi',
      //   message: `Ubah Google Review?`,
      //   onok: () => {
      //     $.ajax({
      //       contentType: false,
      //       data: form,
      //       error: (xhr) => {
      //         if (xhr.responseJSON) toastr.error(xhr.responseJSON.message, 'FAILED');
      //       },
      //       method: 'POST',
      //       processData: false,
      //       success: function(data) {
      //         if (isObject(data)) {
      //           if (data.status >= 200 && data.status < 300) {
      //             if (typeof Table == 'object') Table.draw(false);
      //             toastr.success(data.message);
      //           }
      //         } else {
      //           toastr.error('Something wrong here.');
      //         }

      //         $('#myModal').modal('hide');
      //       },
      //       url: site.base_url + 'google/review/edit/<?= $review->id ?>'
      //     });
      //   }
      // });
    });
  });
</script>