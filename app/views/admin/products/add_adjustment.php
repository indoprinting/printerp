<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<script type="text/javascript">
  var count = 1, an = 1;
  var type_opt = {'addition': '<?= lang('addition'); ?>', 'subtraction': '<?= lang('subtraction'); ?>'};
  $(document).ready(function () {
    if (localStorage.getItem('remove_qals')) {
      if (localStorage.getItem('qaitems')) {
        localStorage.removeItem('qaitems');
      }
      if (localStorage.getItem('qaref')) {
        localStorage.removeItem('qaref');
      }
      if (localStorage.getItem('qawarehouse')) {
        localStorage.removeItem('qawarehouse');
      }
      if (localStorage.getItem('qanote')) {
        localStorage.removeItem('qanote');
      }
      if (localStorage.getItem('qadate')) {
        localStorage.removeItem('qadate');
      }
      localStorage.removeItem('remove_qals');
    }

    <?php if ($adjustment_items) {
  ?>
    localStorage.setItem('qaitems', JSON.stringify(<?= $adjustment_items; ?>));
    <?php
} ?>
    <?php if ($warehouse_id) {
    ?>
    localStorage.setItem('qawarehouse', '<?= $warehouse_id; ?>');
    $('#qawarehouse').select2('readonly', true);
    <?php
  } ?>

    $("#add_item").autocomplete({
      source: function (request, response) {
        $.ajax({
          data: {
            term: request.term,
            warehouse_id: $('#qawarehouse').val()
          },
          success: function (data) {
            console.log(data);
            response(data);
          },
          url: '<?= admin_url('products/qa_suggestions'); ?>'
        });
      },
      minLength: 1,
      autoFocus: false,
      delay: 250,
      response: function (event, ui) {
        if ($(this).val().length >= 16 && ui.content[0].id == 0) {
          bootbox.alert('<?= lang('no_match_found') ?>', function () {
            $('#add_item').focus();
          });
          $(this).removeClass('ui-autocomplete-loading');
          $(this).removeClass('ui-autocomplete-loading');
          $(this).val('');
        }
        else if (ui.content.length == 1 && ui.content[0].id != 0) {
          ui.item = ui.content[0];
          $(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
          $(this).autocomplete('close');
          $(this).removeClass('ui-autocomplete-loading');
        }
        else if (ui.content.length == 1 && ui.content[0].id == 0) {
          bootbox.alert('<?= lang('no_match_found') ?>', function () {
            $('#add_item').focus();
          });
          $(this).removeClass('ui-autocomplete-loading');
          $(this).val('');
        }
      },
      select: function (event, ui) {
        event.preventDefault();
        if (ui.item.id !== 0) {
          var row = add_adjustment_item(ui.item);
          if (row)
            $(this).val('');
        } else {
          bootbox.alert('<?= lang('no_match_found') ?>');
        }
      }
    });
  });
</script>

<div class="box">
  <div class="box-header">
    <h2 class="blue"><i class="fa-fw fad fa-plus"></i><?= lang('add_adjustment'); ?></h2>
  </div>
  <div class="box-content">
    <div class="row">
      <div class="col-lg-12">

        <p class="introtext"><?php echo lang('enter_info'); ?></p>
        <?php
        $attrib = ['data-toggle' => 'validator', 'role' => 'form'];
        echo admin_form_open_multipart('products/add_adjustment' . ($count_id ? '/' . $count_id : ''), $attrib);
        ?>
        <div class="row">
          <div class="col-lg-12">
            <div class="col-md-4">
              <div class="form-group">
                <?= lang('date', 'qadate'); ?>
                <?php echo form_input('date', (isset($_POST['date']) ? $_POST['date'] : ''), 'class="form-control input-tip datetimenow" id="qadate" required="required"'); ?>
              </div>
            </div>

            <?= form_hidden('count_id', $count_id); ?>

            <?php if ($Owner || $Admin || !$this->session->userdata('warehouse_id')) { ?>
              <div class="col-md-4">
                <div class="form-group">
                  <?= lang('warehouse', 'qawarehouse'); ?>
                  <?php
                  $wh[''] = '';
          foreach ($warehouses as $warehouse) {
            $wh[$warehouse->id] = $warehouse->name;
          }
          echo form_dropdown('warehouse', $wh, ($warehouse_id ? $warehouse_id : $Settings->default_warehouse), 'id="qawarehouse" class="select2" data-placeholder="' . lang('select') . ' ' . lang('warehouse') . '" required="required" ' . ($warehouse_id ? 'readonly' : '') . ' style="width:100%;"'); ?>
                </div>
              </div>
            <?php } else {
          $warehouse_input = [
            'type'  => 'hidden',
            'name'  => 'warehouse',
            'id'    => 'qawarehouse',
            'value' => $this->session->userdata('warehouse_id'),
          ];

          echo form_input($warehouse_input);
            } ?>
            <div class="col-md-4">
              <div class="form-group">
                <?= lang('document', 'document') ?>
                <input id="document" type="file" data-browse-label="<?= lang('browse'); ?>" name="document" data-show-upload="false"
                     data-show-preview="false" class="form-control file">
              </div>
            </div>

            <div class="clearfix"></div>


            <div class="col-md-12" id="sticker">
              <div class="well well-sm">
                <div class="form-group" style="margin-bottom:0;">
                  <div class="input-group wide-tip">
                    <div class="input-group-addon" style="padding-left: 10px; padding-right: 10px;">
                      <i class="fad fa-barcode addIcon"></i>
                    </div>
                    <?php echo form_input('add_item', '', 'class="form-control input-lg" id="add_item" placeholder="' . lang('add_product_to_order') . '"'); ?>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="control-group table-group">
                <label class="table-label"><?= lang('products'); ?> *</label>

                <div class="controls table-controls">
                  <table id="qaTable" class="table items table-striped table-bordered table-condensed table-hover">
                    <thead>
                    <tr>
                      <th><?= lang('product_name') . ' (' . lang('product_code') . ')'; ?></th>
                      <th class="col-md-1"><?= lang('quantity'); ?></th>
                      <th class="col-md-1"><?= lang('current_stock'); ?></th>
                      <th style="max-width: 30px !important; text-align: center;">
                        <i class="fad fa-trash" style="opacity:0.5; filter:alpha(opacity=50);"></i>
                      </th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div class="clearfix"></div>
              <div class="col-md-4">
                <div class="form-group">
                  <?= lang('adjustment_mode', 'mode', 'class="tip" title="Formula: 5 to increase or -5 to decrease. Overwrite: Overwrite current stock quantity."'); ?>
                  <?php
                    $modes = [
                      '' => lang('select') . ' ' . lang('adjustment_mode'),
                      'formula'   => 'Formula',
                      'overwrite' => 'Overwrite'
                    ];
                  ?>
                  <?= form_dropdown('mode', $modes, '', 'class="select2" id="mode" required="required"'); ?>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <?= lang('note', 'qanote'); ?>
                  <?php echo form_textarea('note', (isset($_POST['note']) ? $_POST['note'] : ''), 'class="form-control" id="qanote" style="margin-top: 10px; height: 100px;"'); ?>
                </div>
              </div>
              <div class="clearfix"></div>

            <div class="col-md-12">
              <div
                class="fprom-group"><?php echo form_submit('add_adjustment', lang('submit'), 'id="add_adjustment" class="btn btn-primary" style="padding: 6px 15px; margin:15px 0;"'); ?>
                <button type="button" class="btn btn-danger" id="reset"><?= lang('reset') ?></div>
            </div>
          </div>
        </div>
        <?php echo form_close(); ?>

      </div>

    </div>
  </div>
</div>
