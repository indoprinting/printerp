<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="box">
  <div class="box-header">
    <h2 class="blue"><i class="fa-fw fa fa-upload"></i><?= lang('import_products'); ?></h2>
  </div>
  <div class="box-content">
    <div class="row">
      <div class="col-lg-12">
        <ul id="myTab" class="nav nav-tabs no-print">
          <li class=""><a href="#raw_material" class="tab-grey"><?= lang('import_raw') ?></a></li>
          <li class=""><a href="#service" class="tab-grey"><?= lang('import_service') ?></a></li>
          <li class=""><a href="#selling_product" class="tab-grey"><?= lang('import_sell') ?></a></li>
        </ul>

        <div class="tab-content">
          <div id="raw_material" class="tab-pane fade in">
            <!-- content -->
            <div class="box">
              <div class="box-header">
                <h2 class="blue"><i class="fa-fw fa fa-plus nb"></i><?= lang('add_raw_material_csv'); ?></h2>
              </div>
              <div class="box-content">
                <div class="row">
                  <div class="col-lg-12">
                    <?php
                    $attrib = ['class' => 'form-horizontal', 'data-toggle' => 'validator', 'role' => 'form'];
                    echo admin_form_open_multipart('products/import_csv_raw', $attrib)
                    ?>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="well well-small">
                          <a href="https://docs.google.com/spreadsheets/d/12rlWZscpoxNwdd8cZO4LIxRfkH7nyCqCpNgADaWmrns/edit?usp=sharing"
                            class="btn btn-primary pull-right" target="_blank"><i class="fa fa-link"></i> View Master File</a>
                          <p>Change data from master file, then download it as CSV.<p>
                          <p>After CSV downloaded, you can import it to this page.</p>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="csv_file_raw"><?= lang('upload_file'); ?></label>
                            <input type="file" accept=".csv" data-browse-label="<?= lang('browse'); ?>" name="userfile" class="form-control file" data-show-upload="false" data-show-preview="false" id="csv_file_raw" required="required"/>
                          </div>
                          <div class="form-group">
                            <?php echo form_submit('import', $this->lang->line('import'), 'class="btn btn-primary"'); ?>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?= form_close(); ?>
                  </div>
                </div>
              </div>
            </div>
            <!-- /content -->
          </div>
          <div id="service" class="tab-pane fade in">
            <!-- content -->
            <div class="box">
              <div class="box-header">
                <h2 class="blue"><i class="fa-fw fa fa-plus nb"></i><?= lang('add_service_csv'); ?></h2>
              </div>
              <div class="box-content">
                <div class="row">
                  <div class="col-lg-12">
                    <?php
                    $attrib = ['class' => 'form-horizontal', 'data-toggle' => 'validator', 'role' => 'form'];
                    echo admin_form_open_multipart('products/import_csv_svc', $attrib)
                    ?>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="well well-small">
                          <a href="https://docs.google.com/spreadsheets/d/1UoLtAYdaBaUgRg0HmTIhZgf4tFFoir0_B1gqg8b6E7s/edit?usp=sharing"
                            class="btn btn-primary pull-right" target="_blank"><i class="fa fa-link"></i> View Master File</a>
                          <p>Change data from master file, then download it as CSV.<p>
                          <p>After CSV downloaded, you can import it to this page.</p>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="csv_file_svc"><?= lang('upload_file'); ?></label>
                            <input type="file" accept=".csv" data-browse-label="<?= lang('browse'); ?>" name="userfile" class="form-control file" data-show-upload="false" data-show-preview="false" id="csv_file_svc" required="required"/>
                          </div>
                          <div class="form-group">
                            <?php echo form_submit('import', $this->lang->line('import'), 'class="btn btn-primary"'); ?>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?= form_close(); ?>
                  </div>
                </div>
              </div>
            </div>
            <!-- /content -->
          </div>
          <div id="selling_product" class="tab-pane fade in">
            <!-- content -->
            <div class="box">
              <div class="box-header">
                <h2 class="blue"><i class="fa-fw fa fa-plus nb"></i><?= lang('add_selling_product_csv'); ?></h2>
              </div>
              <div class="box-content">
                <div class="row">
                  <div class="col-lg-12">
                    <?php
                    $attrib = ['class' => 'form-horizontal', 'data-toggle' => 'validator', 'role' => 'form', 'id' => 'import_spd'];
                    echo admin_form_open_multipart('products/import_csv_spd', $attrib)
                    ?>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="well well-small">
                          <a href="https://docs.google.com/spreadsheets/d/1_JFgE_59bNjEoN2NpGa0ksRRlVdLas9YJ9DxW35TYaQ/edit?usp=sharing"
                            class="btn btn-primary pull-right selling-item" target="_blank"><i class="fa fa-link"></i> View Master File</a>
                          <p>Change data from master file, then download it as CSV.<p>
                          <p>After CSV downloaded, you can import it to this page.</p>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="checkbox" id="import_w2p" name="web2print" value="1">
                            <label for="import_w2p">Upload Web2Print Name</label>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="csv_file_spd"><?= lang('upload_file'); ?></label>
                            <input type="file" accept=".csv" data-browse-label="<?= lang('browse'); ?>" name="userfile" class="form-control file" data-show-upload="false" data-show-preview="false" id="csv_file_spd" required="required"/>
                          </div>
                          <div class="form-group">
                            <?php echo form_submit('import', $this->lang->line('import'), 'class="btn btn-primary"'); ?>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?= form_close(); ?>
                  </div>
                </div>
              </div>
            </div>
            <!-- /content -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
$(document).ready(function() {
  $('#import_w2p').change(function() {
    if ($(this).is(':checked')) {
      $('#import_spd').prop('action', site.base_url + 'products/import_csv_w2p');
      $('.selling-item').prop('href', 'https://docs.google.com/spreadsheets/d/1AhaOm39uvFifzESL9jj7CBypR2HIvo-LBRvz6iEXDu4/edit?usp=sharing');
    } else {
      $('#import_spd').prop('action', site.base_url + 'products/import_csv_spd');
      $('.selling-item').prop('href', 'https://docs.google.com/spreadsheets/d/1_JFgE_59bNjEoN2NpGa0ksRRlVdLas9YJ9DxW35TYaQ/edit?usp=sharing');
    }
  });
});
</script>