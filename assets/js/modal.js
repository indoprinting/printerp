if(!window.jQuery) {
  var pn = window.location.pathname;
  var modal_exp = pn.split('/');
  window.location.replace(window.location.protocol+'//'+window.location.host+'/'+modal_exp[1]);
}

$(document).ready(function (e) {
  initControls();

  $('form[data-toggle="validator"]').bootstrapValidator({ feedbackIcons: { valid: 'fa fa-check', invalid: 'fa fa-times', validating: 'fa fa-refresh' }, excluded: [':disabled'] });
  fields = $('.modal-content').find('.form-control');
  $.each(fields, function () {
    var id = $(this).attr('id');
    var iname = $(this).attr('name');
    var iid = '#' + id;
    if (!!$(this).attr('data-bv-notempty') || !!$(this).attr('required')) {
      $("label[for='" + id + "']").append(' *');
      $(document).on('change', iid, function () {
        $('form[data-toggle="validator"]').bootstrapValidator('revalidateField', iname);
      });
    }
  });

  $('input.file').fileinput();

  $("textarea").not('.skip').redactor({
    buttons: ["formatting", "|", "alignleft", "aligncenter", "alignright", "justify", "|", "bold", "italic", "underline", "|", "unorderedlist", "orderedlist", "|", "link", "|", "html"],
    formattingTags: ["p", "pre", "h3", "h4"],
    minHeight: 50,
    changeCallback: function (e) {
      var editor = this.$editor.next('textarea');
      if ($(editor).attr('required')) {
        $('form[data-toggle="validator"]').bootstrapValidator('revalidateField', $(editor).attr('name'));
      }
    }
  });

  $(".input-tip").tooltip({
    placement: "top", html: true, trigger: "hover focus", container: "body",
    title: function () {
      return $(this).attr("data-tip");
    }
  });

  $(".input-pop").popover({
    placement: "top", html: true, trigger: "hover focus", container: "body",
    content: function () {
      return $(this).attr("data-tip");
    },
    title: function () {
      return "<b>" + $('label[for="' + $(this).attr("id") + '"]').text() + "</b>";
    }
  });

  // $('select').select2({ theme: 'classic' });

  $('select.select2').select2({ minimumResultsForSearch: 1, tags: false, theme: 'classic' });

  $('select.select-tags').select2({ minimumResultsForSearch: 1, tags: true, theme: 'classic' });

  $('#customer, #rcustomer, .ssr-customer').select2({
    minimumInputLength: 1,
    ajax: {
      url: site.base_url + 'customers/suggestions',
      dataType: 'json',
      delay: 1000,
      data: function (params) {
        return {
          term: params.term,
          limit: 10,
        };
      },
      processResults: function (data) {
        if (data.results) {
          return { results: data.results };
        } else {
          return { results: [{ id: '', text: 'No Match Found' }] };
        }
      },
    },
    theme: 'classic'
  });

  $('#supplier, #rsupplier, .rsupplier').select2({
    minimumInputLength: 1,
    ajax: {
      url: site.base_url + 'suppliers/suggestions',
      dataType: 'json',
      delay: 1000,
      data: function (params) {
        console.log('ok');
        return {
          term: params.term,
          limit: 10,
        };
      },
      results: function (data) {
        if (data.results) {
          return { results: data.results };
        } else {
          return { results: [{ id: '', text: 'No Match Found' }] };
        }
      },
    },
    theme: 'classic'
  });

  $('select.product-standard').select2({
    minimumInputLength: 1,
    ajax: {
      url: site.base_url + 'products/suggestion_select',
      dataType: 'json',
      delay: 1000,
      data: function (params) {
        return {
          term: params.term,
          type: 'standard',
          limit: 10,
        };
      },
      results: function (data) {
        if (data.results) {
          return { results: data.results };
        } else {
          return { results: [{ id: '', text: 'No Match Found' }] };
        }
      },
    },
    theme: 'classic'
  });

  $('#user, select.user').select2({
    minimumInputLength: 1,
    ajax: {
      url: site.base_url + 'users/suggestions',
      dataType: 'json',
      delay: 1000,
      data: function (params) {
        return {
          term: params.term,
          limit: 10,
        };
      },
      processResults: function (data) {
        if (data.results) {
          return { results: data.results };
        } else {
          return { results: [{ id: '', text: 'No Match Found' }] };
        }
      },
    },
    theme: 'classic'
  });

  $('#date_range').daterangepicker({ format: site.dateFormats.js_sdate }, function (start, end, label) {
    $('#from_date').val(start.format('YYYY-MM-DD'));
    $('#to_date').val(end.format('YYYY-MM-DD'));
  });

  $('#myModal').on('shown.bs.modal', function () {
    //$('.modal-body :input:first').focus();
  });

  $('#csv_file').change(function (e) {
    v = $(this).val();
    if (v != '') {
      var validExts = ['.csv'];
      var fileExt = v;
      fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
      if (validExts.indexOf(fileExt) < 0) {
        e.preventDefault();
        bootbox.alert("Invalid file selected. Only .csv file is allowed. X");
        $('form[data-toggle="validator"]').bootstrapValidator('updateStatus', 'csv_file', 'NOT_VALIDATED');
        return false;
      }
      else
        return true;
    }
  });

  $('.datetime').datetimepicker({
    format: site.dateFormats.js_ldate,
    fontAwesome: true,
    language: 'sma',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    minView: 2
  });

  $('.datetimenow').datetimepicker({
    format: site.dateFormats.js_ldate,
    fontAwesome: true,
    language: 'sma',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    minView: 2
  }).datetimepicker('update', new Date());

  $('.date').datetimepicker({
    format: site.dateFormats.js_sdate,
    fontAwesome: true,
    language: 'sma',
    todayBtn: 1,
    autoclose: 1,
    minView: 2
  });
  
  $('.datenow').datetimepicker({
    format: site.dateFormats.js_sdate,
    fontAwesome: true,
    language: 'sma',
    todayBtn: 1,
    autoclose: 1,
    minView: 2
  }).datetimepicker('update', new Date());
});