<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="box">
  <div class="box-header">
    <h2 class="blue"><i class="fa-fw fad fa-users"></i><?= lang('create_user'); ?></h2>
  </div>
  <div class="box-content">
    <div class="row">
      <div class="col-lg-12">
        <p class="introtext"><?php echo lang('create_user'); ?></p>

        <?php $attrib = ['class' => 'form-horizontal', 'data-toggle' => 'validator', 'role' => 'form'];
        echo admin_form_open('auth/create_user', $attrib);
        ?>
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-5">
              <div class="form-group">
                <?php echo lang('fullname', 'fullname'); ?>
                <div class="controls">
                  <?php echo form_input('fullname', '', 'class="form-control" id="fullname" required="required" pattern=".{3,50}"'); ?>
                </div>
              </div>

              <div class="form-group">
                <?= lang('gender', 'gender'); ?>
                <?php
                $ge[''] = ['male' => lang('male'), 'female' => lang('female')];
                echo form_dropdown('gender', $ge, (isset($_POST['gender']) ? $_POST['gender'] : ''), 'class="tip form-control" id="gender" data-placeholder="' . lang('select') . ' ' . lang('gender') . '" required="required"');
                ?>
              </div>

              <div class="form-group">
                <?php echo lang('company', 'company'); ?>
                <div class="controls">
                  <?php echo form_input('company', '', 'class="form-control" id="company" required="required"'); ?>
                </div>
              </div>

              <div class="form-group">
                <?php echo lang('phone', 'phone'); ?>
                <div class="controls">
                  <?php echo form_input('phone', '', 'class="form-control" id="phone" required="required"'); ?>
                </div>
              </div>

              <div class="form-group">
                <?php echo lang('email', 'email'); ?>
                <div class="controls">
                  <input type="email" id="email" name="email" class="form-control" required="required"/>
                </div>
              </div>
              <div class="form-group">
                <?php echo lang('username', 'username'); ?>
                <div class="controls">
                  <input type="text" id="username" name="username" class="form-control" required="required" pattern=".{2,20}"/>
                </div>
              </div>
              <div class="form-group">
                <?php echo lang('password', 'password'); ?>
                <div class="controls">
                  <?php echo form_password('password', '', 'class="form-control tip" id="password" required="required" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" data-bv-regexp-message="' . lang('pasword_hint') . '"'); ?>
                  <span class="help-block"><?= lang('pasword_hint') ?></span>
                </div>
              </div>

              <div class="form-group">
                <?php echo lang('confirm_password', 'confirm_password'); ?>
                <div class="controls">
                  <?php echo form_password('confirm_password', '', 'class="form-control" id="confirm_password" required="required" data-bv-identical="true" data-bv-identical-field="password" data-bv-identical-message="' . lang('pw_not_same') . '"'); ?>
                </div>
              </div>

            </div>
            <div class="col-md-5 col-md-offset-1">

              <div class="form-group">
                <?= lang('status', 'status'); ?>
                <?php
                $opt = [1 => lang('active'), 0 => lang('inactive')];
                echo form_dropdown('status', $opt, (isset($_POST['status']) ? $_POST['status'] : ''), 'id="status" required="required" class="form-control select" style="width:100%;"');
                ?>
              </div>
              <div class="form-group">
                <?= lang('group', 'group'); ?>
                <?php
                foreach ($groups as $group) {
                  if ($group['name'] != 'customer' && $group['name'] != 'supplier') {
                    $gp[$group['id']] = $group['name'];
                  }
                }
                echo form_dropdown('group', $gp, (isset($_POST['group']) ? $_POST['group'] : ''), 'id="group" required="required" class="form-control select" style="width:100%;"');
                ?>
              </div>

              <div class="clearfix"></div>
              <div class="no">
                <div class="form-group">
                  <?= lang('biller', 'biller'); ?>
                  <?php
                  $bl[''] = lang('select') . ' ' . lang('biller');
                  foreach ($billers as $biller) {
                    $bl[$biller->id] = $biller->name;
                  }
                  echo form_dropdown('biller', $bl, (isset($_POST['biller']) ? $_POST['biller'] : ''), 'id="biller" class="form-control select" style="width:100%;"');
                  ?>
                </div>

                <div class="form-group">
                  <?= lang('warehouse', 'warehouse'); ?>
                  <?php
                  $wh[''] = lang('select') . ' ' . lang('warehouse');
                  foreach ($warehouses as $warehouse) {
                    $wh[$warehouse->id] = $warehouse->name;
                  }
                  echo form_dropdown('warehouse', $wh, (isset($_POST['warehouse']) ? $_POST['warehouse'] : ''), 'id="warehouse" class="form-control select" style="width:100%;" ');
                  ?>
                </div>

                <div class="form-group">
                  <?= lang('view_right', 'view_right'); ?>
                  <?php
                  $vropts = [1 => lang('all_records'), 0 => lang('own_records')];
                  echo form_dropdown('view_right', $vropts, (isset($_POST['view_right']) ? $_POST['view_right'] : 1), 'id="view_right" class="form-control select" style="width:100%;"');
                  ?>
                </div>
                <div class="form-group">
                  <?= lang('edit_right', 'edit_right'); ?>
                  <?php
                  $opts = [1 => lang('yes'), 0 => lang('no')];
                  echo form_dropdown('edit_right', $opts, (isset($_POST['edit_right']) ? $_POST['edit_right'] : 0), 'id="edit_right" class="form-control select" style="width:100%;"');
                  ?>
                </div>
                <div class="form-group">
                  <?= lang('allow_discount', 'allow_discount'); ?>
                  <?= form_dropdown('allow_discount', $opts, (isset($_POST['allow_discount']) ? $_POST['allow_discount'] : 0), 'id="allow_discount" class="form-control select" style="width:100%;"'); ?>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <label class="checkbox" for="notify">
                    <input type="checkbox" name="notify" value="1" id="notify">
                    <?= lang('notify_user_by_email') ?>
                  </label>
                </div>
                <div class="clearfix"></div>
              </div>

            </div>
          </div>
        </div>

        <p><?php echo form_submit('add_user', lang('add_user'), 'class="btn btn-primary"'); ?></p>

        <?php echo form_close(); ?>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript" charset="utf-8">
  $(document).ready(function () {
    $('.no').slideUp();
    $('#group').change(function (event) {
      var group = $(this).val();
      if (group == 1 || group == 2) {
        $('.no').slideUp();
      } else {
        $('.no').slideDown();
      }
    });
  });
</script>
