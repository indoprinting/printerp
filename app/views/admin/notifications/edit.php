<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
      <i class="fad fa-times"></i>
    </button>
    <h4 class="modal-title" id="myModalLabel"><?php echo lang('edit_notification'); ?></h4>
  </div>
  <?php $attrib = ['data-toggle' => 'validator', 'role' => 'form'];
  echo admin_form_open('notifications/edit', $attrib); ?>
  <div class="modal-body">
    <p><?= lang('update_info'); ?></p>
    <div class="well well-sm">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <?php echo lang('from', 'from_date'); ?>
            <div class="controls">
              <?php echo form_input('from_date', date($dateFormats['php_ldate'], strtotime($notification->from_date)), 'class="form-control datetime" id="from_date" required="required"'); ?>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <?php echo lang('till', 'to_date'); ?>
            <div class="controls">
              <?php echo form_input('to_date', date($dateFormats['php_ldate'], strtotime($notification->till_date)), 'class="form-control datetime" id="to_date" required="required"'); ?>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <?= lang('type', 'type'); ?>
            <?php
              $tp = [
                '' => '',
                'danger'  => 'Critical',
                'info'    => 'Info',
                'success' => 'Success',
                'warning' => 'Warning'
              ];
            ?>
            <?= form_dropdown('type', $tp, $notification->type, 'class="select2" data-placeholder="Select Message Type" style="width:100%;"'); ?>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <?php echo lang('comment', 'comment'); ?>
      <div class="controls">
        <?php echo form_textarea($comment); ?>
      </div>
    </div>
    <div class="form-group">
      <input type="radio" class="checkbox" name="scope" value="1"
           id="customer" <?= $notification->scope == '1' ? 'checked="checked"' : ''; ?>/><label
        for="customer" class="padding05"><?= lang('for_customers_only') ?></label>
      <input type="radio" class="checkbox" name="scope" value="2"
           id="staff" <?= $notification->scope == '2' ? 'checked="checked"' : ''; ?>><label for="staff"
                                                  class="padding05"><?= lang('for_staff_only') ?></label>
      <input type="radio" class="checkbox" name="scope" value="3"
           id="both" <?= $notification->scope == '3' ? 'checked="checked"' : ''; ?>><label for="both"
                                                   class="padding05"><?= lang('for_both') ?></label>
    </div>
    <?php echo form_hidden('id', $id); ?>
  </div>
  <div class="modal-footer">
    <?php echo form_submit('edit_notification', lang('edit_notification'), 'class="btn btn-primary"'); ?>
  </div>
</div>
<?php echo form_close(); ?>
<script async src="<?= $assets ?>js/modal.js?v=<?= $res_hash ?>"></script>
<script type="text/javascript" src="<?= $assets ?>js/custom.js"></script>
<script type="text/javascript" charset="UTF-8">
  $.fn.datetimepicker.dates['sma'] = <?=$dp_lang?>;
</script>
