<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<script>
</script>
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
      <i class="fad fa-times"></i>
    </button>
    <h4 class="modal-title" id="myModalLabel"><?= lang('payment_histories') . ": "; ?></h4>
  </div>
  <div class="modal-body">
    <div class="table-responsive table-limit-height">
      <table id="mTable" class="table table-bordered table-condensed table-hover table-striped">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th><?= lang('date'); ?></th>
            <th><?= lang('reference'); ?></th>
            <th><?= lang('bank_name'); ?></th>
            <th><?= lang('holder'); ?></th>
            <th><?= lang('amount_in'); ?></th>
            <th><?= lang('amount_out'); ?></th>
            <th><?= lang('balance'); ?></th>
            <th><?= lang('created_by'); ?></th>
            <th><?= lang('note'); ?></th>
          </tr>
        </thead>
        <tbody>
        <?php
        $balance = 0;
        $totalIn = 0;
        $totalOut = 0;

        if ($module == 'erp' && $payments) {

          foreach ($payments as $payment) {
            $bank = $this->site->getBankByID($payment->bank_id);
            $user = $this->site->getUserByID($payment->created_by);
            $creator = '';

            if ($user) {
              $creator = $user->fullname;
            }

            echo("<tr>");
            echo("<td>{$payment->id}</td>");
            echo("<td>{$payment->date}</td>");
            echo("<td>{$payment->reference}</td>");
            echo("<td>{$bank->name}</td>");
            echo("<td>{$bank->holder}</td>");

            if ($payment->type == 'received') {
              echo("<td class=\"text-right\">" . formatDecimal($payment->amount) . "</td>");
              echo("<td></td>");
              $balance += round($payment->amount);
              $totalIn += round($payment->amount);
            } else if ($payment->type == 'sent') {
              echo("<td></td>");
              echo("<td class=\"text-right\">" . formatDecimal($payment->amount) . "</td>");
              $balance -= round($payment->amount);
              $totalOut += round($payment->amount);
            }

            echo("<td class=\"text-right\">" . formatDecimal($balance) . "</td>");
            echo("<td>{$creator}</td>");
            echo("<td>" . htmlDecode($payment->note) . "</td>");
          }
        } ?>

        <?php
        if ($module == 'mb' && $payments) {

        } ?>
        </tbody>
        <tfoot class="dtFilter">
          <tr class="active">
          <?php
          echo("<td colspan=\"5\" class=\"text-center\"><b>SUMMARY</b></td>");
          echo("<td class=\"text-right\"><b>" . formatDecimal($totalIn) . "</b></td>");
          echo("<td class=\"text-right\"><b>" . formatDecimal($totalOut) . "</b></td>");
          echo("<td class=\"text-right\"><b>" . formatDecimal($balance) . "</b></td>");
          echo("<td colspan=\"2\"></td>");
          ?>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>