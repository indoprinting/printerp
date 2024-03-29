(function (c) {
  var a = 0;
  ("use strict");
  var d = function (e) {
    this[0] = e.startOffset;
    this[1] = e.endOffset;
    this.range = e;
    return this;
  };
  d.prototype.equals = function () {
    return this[0] === this[1];
  };
  c.fn.redactor = function (f) {
    var g = [];
    var e = Array.prototype.slice.call(arguments, 1);
    if (typeof f === "string") {
      this.each(function () {
        var j = c.data(this, "redactor");
        if (typeof j !== "undefined" && c.isFunction(j[f])) {
          var h = j[f].apply(j, e);
          if (h !== undefined && h !== j) {
            g.push(h);
          }
        } else {
          return c.error('No such method "' + f + '" for Redactor');
        }
      });
    } else {
      this.each(function () {
        if (!c.data(this, "redactor")) {
          c.data(this, "redactor", b(this, f));
        }
      });
    }
    if (g.length === 0) {
      return this;
    } else {
      if (g.length === 1) {
        return g[0];
      } else {
        return g;
      }
    }
  };
  function b(f, e) {
    return new b.prototype.init(f, e);
  }
  c.Redactor = b;
  c.Redactor.VERSION = "9.1.9";
  c.Redactor.opts = {
    rangy: false,
    iframe: false,
    fullpage: false,
    css: false,
    lang: "en",
    direction: "ltr",
    placeholder: false,
    wym: false,
    mobile: true,
    cleanup: true,
    tidyHtml: true,
    pastePlainText: false,
    removeEmptyTags: true,
    templateVars: false,
    xhtml: false,
    visual: true,
    focus: false,
    tabindex: false,
    autoresize: true,
    minHeight: false,
    maxHeight: false,
    shortcuts: true,
    autosave: false,
    autosaveInterval: 60,
    plugins: false,
    linkAnchor: true,
    linkEmail: true,
    linkProtocol: "http://",
    linkNofollow: false,
    linkSize: 50,
    imageFloatMargin: "10px",
    imageGetJson: false,
    imageUpload: false,
    imageUploadParam: "file",
    fileUpload: false,
    fileUploadParam: "file",
    clipboardUpload: true,
    clipboardUploadUrl: false,
    dragUpload: true,
    dnbImageTypes: ["image/png", "image/jpeg", "image/gif"],
    s3: false,
    uploadFields: false,
    observeImages: true,
    observeLinks: true,
    modalOverlay: true,
    tabSpaces: false,
    tabFocus: true,
    air: false,
    airButtons: ["formatting", "|", "bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent"],
    toolbar: true,
    toolbarFixed: false,
    toolbarFixedTarget: document,
    toolbarFixedTopOffset: 0,
    toolbarFixedBox: false,
    toolbarExternal: false,
    buttonSource: true,
    buttonSeparator: '<li class="redactor_separator"></li>',
    buttonsCustom: {},
    buttonsAdd: [],
    buttons: ["html", "|", "formatting", "|", "bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent", "|", "image", "video", "file", "table", "link", "|", "alignment", "|", "horizontalrule"],
    activeButtons: ["deleted", "italic", "bold", "underline", "unorderedlist", "orderedlist", "alignleft", "aligncenter", "alignright", "justify", "table"],
    activeButtonsStates: { b: "bold", strong: "bold", i: "italic", em: "italic", del: "deleted", strike: "deleted", ul: "unorderedlist", ol: "orderedlist", u: "underline", tr: "table", td: "table", table: "table" },
    activeButtonsAdd: false,
    formattingTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"],
    linebreaks: false,
    paragraphy: true,
    convertDivs: true,
    convertLinks: true,
    convertImageLinks: false,
    convertVideoLinks: false,
    formattingPre: false,
    phpTags: false,
    allowedTags: false,
    deniedTags: ["html", "head", "link", "body", "meta", "script", "style", "applet"],
    boldTag: "strong",
    italicTag: "em",
    indentValue: 20,
    buffer: [],
    rebuffer: [],
    textareamode: false,
    emptyHtml: "<p>&#x200b;</p>",
    invisibleSpace: "&#x200b;",
    rBlockTest: /^(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)$/i,
    alignmentTags: ["P", "H1", "H2", "H3", "H4", "H5", "H6", "DD", "DL", "DT", "DIV", "TD", "BLOCKQUOTE", "OUTPUT", "FIGCAPTION", "ADDRESS", "SECTION", "HEADER", "FOOTER", "ASIDE", "ARTICLE"],
    ownLine: ["area", "body", "head", "hr", "i?frame", "link", "meta", "noscript", "style", "script", "table", "tbody", "thead", "tfoot"],
    contOwnLine: ["li", "dt", "dt", "h[1-6]", "option", "script"],
    newLevel: ["blockquote", "div", "dl", "fieldset", "form", "frameset", "map", "ol", "p", "pre", "select", "td", "th", "tr", "ul"],
    blockLevelElements: ["P", "H1", "H2", "H3", "H4", "H5", "H6", "DD", "DL", "DT", "DIV", "LI", "BLOCKQUOTE", "OUTPUT", "FIGCAPTION", "PRE", "ADDRESS", "SECTION", "HEADER", "FOOTER", "ASIDE", "ARTICLE", "TD"],
    langs: {
      en: {
        html: "HTML",
        video: "Insert Video",
        image: "Insert Image",
        table: "Table",
        link: "Link",
        link_insert: "Insert link",
        link_edit: "Edit link",
        unlink: "Unlink",
        formatting: "Formatting",
        paragraph: "Normal text",
        quote: "Quote",
        code: "Code",
        header1: "Header 1",
        header2: "Header 2",
        header3: "Header 3",
        header4: "Header 4",
        header5: "Header 5",
        bold: "Bold",
        italic: "Italic",
        fontcolor: "Font Color",
        backcolor: "Back Color",
        unorderedlist: "Unordered List",
        orderedlist: "Ordered List",
        outdent: "Outdent",
        indent: "Indent",
        cancel: "Cancel",
        insert: "Insert",
        save: "Save",
        _delete: "Delete",
        insert_table: "Insert Table",
        insert_row_above: "Add Row Above",
        insert_row_below: "Add Row Below",
        insert_column_left: "Add Column Left",
        insert_column_right: "Add Column Right",
        delete_column: "Delete Column",
        delete_row: "Delete Row",
        delete_table: "Delete Table",
        rows: "Rows",
        columns: "Columns",
        add_head: "Add Head",
        delete_head: "Delete Head",
        title: "Title",
        image_position: "Position",
        none: "None",
        left: "Left",
        right: "Right",
        image_web_link: "Image Web Link",
        text: "Text",
        mailto: "Email",
        web: "URL",
        video_html_code: "Video Embed Code",
        file: "Insert File",
        upload: "Upload",
        download: "Download",
        choose: "Choose",
        or_choose: "Or choose",
        drop_file_here: "Drop file here",
        align_left: "Align text to the left",
        align_center: "Center text",
        align_right: "Align text to the right",
        align_justify: "Justify text",
        horizontalrule: "Insert Horizontal Rule",
        deleted: "Deleted",
        anchor: "Anchor",
        link_new_tab: "Open link in new tab",
        underline: "Underline",
        alignment: "Alignment",
        filename: "Name (optional)",
        edit: "Edit",
      },
    },
  };
  b.fn = c.Redactor.prototype = {
    keyCode: { BACKSPACE: 8, DELETE: 46, DOWN: 40, ENTER: 13, ESC: 27, TAB: 9, CTRL: 17, META: 91, LEFT: 37, LEFT_WIN: 91 },
    init: function (f, e) {
      this.rtePaste = false;
      this.$element = this.$source = c(f);
      this.uuid = a++;
      var g = c.extend(true, {}, c.Redactor.opts);
      this.opts = c.extend({}, g, this.$element.data(), e);
      this.start = true;
      this.dropdowns = [];
      this.sourceHeight = this.$source.css("height");
      this.sourceWidth = this.$source.css("width");
      if (this.opts.fullpage) {
        this.opts.iframe = true;
      }
      if (this.opts.linebreaks) {
        this.opts.paragraphy = false;
      }
      if (this.opts.paragraphy) {
        this.opts.linebreaks = false;
      }
      if (this.opts.toolbarFixedBox) {
        this.opts.toolbarFixed = true;
      }
      this.document = document;
      this.window = window;
      this.savedSel = false;
      this.cleanlineBefore = new RegExp("^<(/?" + this.opts.ownLine.join("|/?") + "|" + this.opts.contOwnLine.join("|") + ")[ >]");
      this.cleanlineAfter = new RegExp("^<(br|/?" + this.opts.ownLine.join("|/?") + "|/" + this.opts.contOwnLine.join("|/") + ")[ >]");
      this.cleannewLevel = new RegExp("^</?(" + this.opts.newLevel.join("|") + ")[ >]");
      this.rTestBlock = new RegExp("^(" + this.opts.blockLevelElements.join("|") + ")$", "i");
      if (this.opts.linebreaks === false) {
        if (this.opts.allowedTags !== false) {
          var h = ["strong", "em", "del"];
          var j = ["b", "i", "strike"];
          if (c.inArray("p", this.opts.allowedTags) === "-1") {
            this.opts.allowedTags.push("p");
          }
          for (i in h) {
            if (c.inArray(h[i], this.opts.allowedTags) != "-1") {
              this.opts.allowedTags.push(j[i]);
            }
          }
        }
        if (this.opts.deniedTags !== false) {
          var l = c.inArray("p", this.opts.deniedTags);
          if (l !== "-1") {
            this.opts.deniedTags.splice(l, l);
          }
        }
      }
      if (this.browser("msie") || this.browser("opera")) {
        this.opts.buttons = this.removeFromArrayByValue(this.opts.buttons, "horizontalrule");
      }
      this.opts.curLang = this.opts.langs[this.opts.lang];
      this.buildStart();
    },
    toolbarInit: function (e) {
      return {
        html: { title: e.html, func: "toggle" },
        formatting: {
          title: e.formatting,
          func: "show",
          dropdown: {
            p: { title: e.paragraph, func: "formatBlocks" },
            blockquote: { title: e.quote, func: "formatQuote", className: "redactor_format_blockquote" },
            pre: { title: e.code, func: "formatBlocks", className: "redactor_format_pre" },
            h1: { title: e.header1, func: "formatBlocks", className: "redactor_format_h1" },
            h2: { title: e.header2, func: "formatBlocks", className: "redactor_format_h2" },
            h3: { title: e.header3, func: "formatBlocks", className: "redactor_format_h3" },
            h4: { title: e.header4, func: "formatBlocks", className: "redactor_format_h4" },
            h5: { title: e.header5, func: "formatBlocks", className: "redactor_format_h5" },
          },
        },
        bold: { title: e.bold, exec: "bold" },
        italic: { title: e.italic, exec: "italic" },
        deleted: { title: e.deleted, exec: "strikethrough" },
        underline: { title: e.underline, exec: "underline" },
        unorderedlist: { title: "&bull; " + e.unorderedlist, exec: "insertunorderedlist" },
        orderedlist: { title: "1. " + e.orderedlist, exec: "insertorderedlist" },
        outdent: { title: "< " + e.outdent, func: "indentingOutdent" },
        indent: { title: "> " + e.indent, func: "indentingIndent" },
        image: { title: e.image, func: "imageShow" },
        video: { title: e.video, func: "videoShow" },
        file: { title: e.file, func: "fileShow" },
        table: {
          title: e.table,
          func: "show",
          dropdown: {
            insert_table: { title: e.insert_table, func: "tableShow" },
            separator_drop1: { name: "separator" },
            insert_row_above: { title: e.insert_row_above, func: "tableAddRowAbove" },
            insert_row_below: { title: e.insert_row_below, func: "tableAddRowBelow" },
            insert_column_left: { title: e.insert_column_left, func: "tableAddColumnLeft" },
            insert_column_right: { title: e.insert_column_right, func: "tableAddColumnRight" },
            separator_drop2: { name: "separator" },
            add_head: { title: e.add_head, func: "tableAddHead" },
            delete_head: { title: e.delete_head, func: "tableDeleteHead" },
            separator_drop3: { name: "separator" },
            delete_column: { title: e.delete_column, func: "tableDeleteColumn" },
            delete_row: { title: e.delete_row, func: "tableDeleteRow" },
            delete_table: { title: e.delete_table, func: "tableDeleteTable" },
          },
        },
        link: { title: e.link, func: "show", dropdown: { link: { title: e.link_insert, func: "linkShow" }, unlink: { title: e.unlink, exec: "unlink" } } },
        fontcolor: { title: e.fontcolor, func: "show" },
        backcolor: { title: e.backcolor, func: "show" },
        alignment: {
          title: e.alignment,
          func: "show",
          dropdown: {
            alignleft: { title: e.align_left, func: "alignmentLeft" },
            aligncenter: { title: e.align_center, func: "alignmentCenter" },
            alignright: { title: e.align_right, func: "alignmentRight" },
            justify: { title: e.align_justify, func: "alignmentJustify" },
          },
        },
        alignleft: { title: e.align_left, func: "alignmentLeft" },
        aligncenter: { title: e.align_center, func: "alignmentCenter" },
        alignright: { title: e.align_right, func: "alignmentRight" },
        justify: { title: e.align_justify, func: "alignmentJustify" },
        horizontalrule: { exec: "inserthorizontalrule", title: e.horizontalrule },
      };
    },
    callback: function (e, f, g) {
      var h = this.opts[e + "Callback"];
      if (c.isFunction(h)) {
        if (f === false) {
          return h.call(this, g);
        } else {
          return h.call(this, f, g);
        }
      } else {
        return g;
      }
    },
    destroy: function () {
      clearInterval(this.autosaveInterval);
      c(window).off(".redactor");
      this.$source.off("redactor-textarea");
      this.$element.off(".redactor").removeData("redactor");
      var f = this.get();
      if (this.opts.textareamode) {
        this.$box.after(this.$source);
        this.$box.remove();
        this.$source.val(f).show();
      } else {
        var e = this.$editor;
        if (this.opts.iframe) {
          e = this.$element;
        }
        this.$box.after(e);
        this.$box.remove();
        e.removeClass("redactor_editor").removeClass("redactor_editor_wym").removeAttr("contenteditable").html(f).show();
      }
      if (this.opts.air) {
        c("#redactor_air_" + this.uuid).remove();
      }
    },
    getObject: function () {
      return c.extend({}, this);
    },
    getEditor: function () {
      return this.$editor;
    },
    getBox: function () {
      return this.$box;
    },
    getIframe: function () {
      return this.opts.iframe ? this.$frame : false;
    },
    getToolbar: function () {
      return this.$toolbar ? this.$toolbar : false;
    },
    get: function () {
      return this.$source.val();
    },
    getCodeIframe: function () {
      this.$editor.removeAttr("contenteditable").removeAttr("dir");
      var e = this.outerHtml(this.$frame.contents().children());
      this.$editor.attr({ contenteditable: true, dir: this.opts.direction });
      return e;
    },
    set: function (e, f, g) {
      e = e.toString();
      e = e.replace(/\$/g, "&#36;");
      if (this.opts.fullpage) {
        this.setCodeIframe(e);
      } else {
        this.setEditor(e, f);
      }
      if (e == "") {
        g = false;
      }
      if (g !== false) {
        this.placeholderRemove();
      }
    },
    setEditor: function (e, f) {
      if (f !== false) {
        e = this.cleanSavePreCode(e);
        e = this.cleanStripTags(e);
        e = this.cleanConvertProtected(e);
        e = this.cleanConvertInlineTags(e, true);
        if (this.opts.linebreaks === false) {
          e = this.cleanConverters(e);
        } else {
          e = e.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, "$2<br>");
        }
      }
      e = e.replace(/&amp;#36;/g, "$");
      e = this.cleanEmpty(e);
      this.$editor.html(e);
      this.setNonEditable();
      this.setSpansVerified();
      this.sync();
    },
    setCodeIframe: function (e) {
      var f = this.iframePage();
      this.$frame[0].src = "about:blank";
      e = this.cleanConvertProtected(e);
      e = this.cleanConvertInlineTags(e);
      e = this.cleanRemoveSpaces(e);
      f.open();
      f.write(e);
      f.close();
      if (this.opts.fullpage) {
        this.$editor = this.$frame.contents().find("body").attr({ contenteditable: true, dir: this.opts.direction });
      }
      this.setNonEditable();
      this.setSpansVerified();
      this.sync();
    },
    setFullpageOnInit: function (e) {
      e = this.cleanSavePreCode(e, true);
      e = this.cleanConverters(e);
      e = this.cleanEmpty(e);
      this.$editor.html(e);
      this.setNonEditable();
      this.setSpansVerified();
      this.sync();
    },
    setSpansVerified: function () {
      var f = this.$editor.find("span");
      var e = "inline";
      c.each(f, function () {
        var g = this.outerHTML;
        var j = new RegExp("<" + this.tagName, "gi");
        var h = g.replace(j, "<" + e);
        j = new RegExp("</" + this.tagName, "gi");
        h = h.replace(j, "</" + e);
        c(this).replaceWith(h);
      });
    },
    setSpansVerifiedHtml: function (e) {
      e = e.replace(/<span(.*?)>/, "<inline$1>");
      return e.replace(/<\/span>/, "</inline>");
    },
    setNonEditable: function () {
      this.$editor.find(".noneditable").attr("contenteditable", false);
    },
    sync: function () {
      var e = "";
      this.cleanUnverified();
      if (this.opts.fullpage) {
        e = this.getCodeIframe();
      } else {
        e = this.$editor.html();
      }
      e = this.syncClean(e);
      e = this.cleanRemoveEmptyTags(e);
      e = e.replace(/<\/li><(ul|ol)>([\w\W]*?)<\/(ul|ol)>/gi, "<$1>$2</$1></li>");
      if (c.trim(e) === "<br>") {
        e = "";
      }
      if (this.opts.xhtml) {
        var f = ["br", "hr", "img", "link", "input", "meta"];
        c.each(f, function (g, h) {
          e = e.replace(new RegExp("<" + h + "(.*?[^/$]?)>", "gi"), "<" + h + "$1 />");
        });
      }
      e = this.callback("syncBefore", false, e);
      this.$source.val(e);
      this.callback("syncAfter", false, e);
      if (this.start === false) {
        this.callback("change", false, e);
      }
    },
    syncClean: function (e) {
      if (!this.opts.fullpage) {
        e = this.cleanStripTags(e);
      }
      e = c.trim(e);
      e = this.placeholderRemoveFromCode(e);
      e = e.replace(/&#x200b;/gi, "");
      e = e.replace(/&#8203;/gi, "");
      e = e.replace(/<\/a>&nbsp;/gi, "</a> ");
      if (this.opts.linkNofollow) {
        e = e.replace(/<a(.*?)rel="nofollow"(.*?)>/gi, "<a$1$2>");
        e = e.replace(/<a(.*?)>/gi, '<a$1 rel="nofollow">');
      }
      e = e.replace("<!--?php", "<?php");
      e = e.replace("?-->", "?>");
      e = e.replace(/<(.*?)class="noeditable"(.*?) contenteditable="false"(.*?)>/gi, '<$1class="noeditable"$2$3>');
      e = e.replace(/ data-tagblock=""/gi, "");
      e = e.replace(/<br\s?\/?>\n?<\/(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)>/gi, "</$1>");
      e = e.replace(/<span(.*?)id="redactor-image-box"(.*?)>([\w\W]*?)<img(.*?)><\/span>/i, "$3<img$4>");
      e = e.replace(/<span(.*?)id="redactor-image-resizer"(.*?)>(.*?)<\/span>/i, "");
      e = e.replace(/<span(.*?)id="redactor-image-editter"(.*?)>(.*?)<\/span>/i, "");
      e = e.replace(/<font(.*?)>([\w\W]*?)<\/font>/gi, "$2");
      e = e.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, "$2");
      e = e.replace(/<inline>/gi, "<span>");
      e = e.replace(/<inline /gi, "<span ");
      e = e.replace(/<\/inline>/gi, "</span>");
      e = e.replace(/<span(.*?)class="redactor_placeholder"(.*?)>([\w\W]*?)<\/span>/gi, "");
      e = e.replace(/<span>([\w\W]*?)<\/span>/gi, "$1");
      e = e.replace(/&amp;/gi, "&");
      e = e.replace(/™/gi, "&trade;");
      e = e.replace(/©/gi, "&copy;");
      e = this.cleanReConvertProtected(e);
      return e;
    },
    buildStart: function () {
      this.content = "";
      this.$box = c('<div class="redactor_box" />');
      if (this.$source[0].tagName === "TEXTAREA") {
        this.opts.textareamode = true;
      }
      if (this.opts.mobile === false && this.isMobile()) {
        this.buildMobile();
      } else {
        this.buildContent();
        if (this.opts.iframe) {
          this.opts.autoresize = false;
          this.iframeStart();
        } else {
          if (this.opts.textareamode) {
            this.buildFromTextarea();
          } else {
            this.buildFromElement();
          }
        }
        if (!this.opts.iframe) {
          this.buildOptions();
          this.buildAfter();
        }
      }
    },
    buildMobile: function () {
      if (!this.opts.textareamode) {
        this.$editor = this.$source;
        this.$editor.hide();
        this.$source = this.buildCodearea(this.$editor);
        this.$source.val(this.content);
      }
      this.$box.insertAfter(this.$source).append(this.$source);
    },
    buildContent: function () {
      if (this.opts.textareamode) {
        this.content = c.trim(this.$source.val());
      } else {
        this.content = c.trim(this.$source.html());
      }
    },
    buildFromTextarea: function () {
      this.$editor = c("<div />");
      this.$box.insertAfter(this.$source).append(this.$editor).append(this.$source);
      this.buildAddClasses(this.$editor);
      this.buildEnable();
    },
    buildFromElement: function () {
      this.$editor = this.$source;
      this.$source = this.buildCodearea(this.$editor);
      this.$box.insertAfter(this.$editor).append(this.$editor).append(this.$source);
      this.buildEnable();
    },
    buildCodearea: function (e) {
      return c("<textarea />").attr("name", e.attr("id")).css("height", this.sourceHeight);
    },
    buildAddClasses: function (e) {
      c.each(this.$source.get(0).className.split(/\s+/), function (f, g) {
        e.addClass("redactor_" + g);
      });
    },
    buildEnable: function () {
      this.$editor.addClass("redactor_editor").attr({ contenteditable: true, dir: this.opts.direction });
      this.$source.attr("dir", this.opts.direction).hide();
      this.set(this.content, true, false);
    },
    buildOptions: function () {
      var e = this.$editor;
      if (this.opts.iframe) {
        e = this.$frame;
      }
      if (this.opts.tabindex) {
        e.attr("tabindex", this.opts.tabindex);
      }
      if (this.opts.minHeight) {
        e.css("min-height", this.opts.minHeight + "px");
      }
      if (this.opts.maxHeight) {
        this.opts.autoresize = false;
        this.sourceHeight = this.opts.maxHeight;
      }
      if (this.opts.wym) {
        this.$editor.addClass("redactor_editor_wym");
      }
      if (!this.opts.autoresize) {
        e.css("height", this.sourceHeight);
      }
    },
    buildAfter: function () {
      this.start = false;
      if (this.opts.toolbar) {
        this.opts.toolbar = this.toolbarInit(this.opts.curLang);
        this.toolbarBuild();
      }
      this.modalTemplatesInit();
      this.buildPlugins();
      this.buildBindKeyboard();
      if (this.opts.autosave) {
        this.autosave();
      }
      setTimeout(c.proxy(this.observeStart, this), 4);
      if (this.browser("mozilla")) {
        try {
          this.document.execCommand("enableObjectResizing", false, false);
          this.document.execCommand("enableInlineTableEditing", false, false);
        } catch (f) {}
      }
      if (this.opts.focus) {
        setTimeout(c.proxy(this.focus, this), 100);
      }
      if (!this.opts.visual) {
        setTimeout(
          c.proxy(function () {
            this.opts.visual = true;
            this.toggle(false);
          }, this),
          200
        );
      }
      this.callback("init");
    },
    buildBindKeyboard: function () {
      this.dblEnter = 0;
      if (this.opts.dragUpload && this.opts.imageUpload !== false) {
        this.$editor.on("drop.redactor", c.proxy(this.buildEventDrop, this));
      }
      this.$editor.on("paste.redactor", c.proxy(this.buildEventPaste, this));
      this.$editor.on("keydown.redactor", c.proxy(this.buildEventKeydown, this));
      this.$editor.on("keyup.redactor", c.proxy(this.buildEventKeyup, this));
      if (c.isFunction(this.opts.textareaKeydownCallback)) {
        this.$source.on("keydown.redactor-textarea", c.proxy(this.opts.textareaKeydownCallback, this));
      }
      if (c.isFunction(this.opts.focusCallback)) {
        this.$editor.on("focus.redactor", c.proxy(this.opts.focusCallback, this));
      }
      var e;
      c(document).mousedown(function (f) {
        e = c(f.target);
      });
      this.$editor.on(
        "blur.redactor",
        c.proxy(function (f) {
          if (!c(e).hasClass("redactor_toolbar") && c(e).parents(".redactor_toolbar").length == 0) {
            this.selectall = false;
            if (c.isFunction(this.opts.blurCallback)) {
              this.callback("blur", f);
            }
          }
        }, this)
      );
    },
    buildEventDrop: function (j) {
      j = j.originalEvent || j;
      if (window.FormData === undefined || !j.dataTransfer) {
        return true;
      }
      var h = j.dataTransfer.files.length;
      if (h == 0) {
        return true;
      }
      j.preventDefault();
      var g = j.dataTransfer.files[0];
      if (this.opts.dnbImageTypes !== false && this.opts.dnbImageTypes.indexOf(g.type) == -1) {
        return true;
      }
      this.bufferSet();
      var f = c('<div id="redactor-progress-drag" class="redactor-progress redactor-progress-striped"><div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div></div>');
      c(document.body).append(f);
      if (this.opts.s3 === false) {
        this.dragUploadAjax(this.opts.imageUpload, g, true, f, j, this.opts.imageUploadParam);
      } else {
        this.s3uploadFile(g);
      }
    },
    buildEventPaste: function (g) {
      var h = false;
      if (this.browser("webkit") && navigator.userAgent.indexOf("Chrome") === -1) {
        var f = this.browser("version").split(".");
        if (f[0] < 536) {
          h = true;
        }
      }
      if (h) {
        return true;
      }
      if (this.browser("opera")) {
        return true;
      }
      if (this.opts.clipboardUpload && this.buildEventClipboardUpload(g)) {
        return true;
      }
      if (this.opts.cleanup) {
        this.rtePaste = true;
        this.selectionSave();
        if (!this.selectall) {
          if (this.opts.autoresize === true && this.fullscreen !== true) {
            this.$editor.height(this.$editor.height());
            this.saveScroll = this.document.body.scrollTop;
          } else {
            this.saveScroll = this.$editor.scrollTop();
          }
        }
        var j = this.extractContent();
        setTimeout(
          c.proxy(function () {
            var e = this.extractContent();
            this.$editor.append(j);
            this.selectionRestore();
            var l = this.getFragmentHtml(e);
            this.pasteClean(l);
            if (this.opts.autoresize === true && this.fullscreen !== true) {
              this.$editor.css("height", "auto");
            }
          }, this),
          1
        );
      }
    },
    buildEventClipboardUpload: function (j) {
      var h = j.originalEvent || j;
      this.clipboardFilePaste = false;
      if (typeof h.clipboardData === "undefined") {
        return false;
      }
      if (h.clipboardData.items) {
        var g = h.clipboardData.items[0].getAsFile();
        if (g !== null) {
          this.bufferSet();
          this.clipboardFilePaste = true;
          var f = new FileReader();
          f.onload = c.proxy(this.pasteClipboardUpload, this);
          f.readAsDataURL(g);
          return true;
        }
      }
      return false;
    },
    buildEventKeydown: function (n) {
      if (this.rtePaste) {
        return false;
      }
      var r = n.which;
      var f = n.ctrlKey || n.metaKey;
      var p = this.getParent();
      var o = this.getCurrent();
      var j = this.getBlock();
      var h = false;
      this.callback("keydown", n);
      this.imageResizeHide(false);
      if ((p && c(p).get(0).tagName === "PRE") || (o && c(o).get(0).tagName === "PRE")) {
        h = true;
        if (r === this.keyCode.DOWN) {
          this.insertAfterLastElement(j);
        }
      }
      if (r === this.keyCode.DOWN) {
        if (p && c(p)[0].tagName === "BLOCKQUOTE") {
          this.insertAfterLastElement(p);
        }
        if (o && c(o)[0].tagName === "BLOCKQUOTE") {
          this.insertAfterLastElement(o);
        }
        if (p && c(p)[0].tagName === "P" && c(p).parent()[0].tagName == "BLOCKQUOTE") {
          this.insertAfterLastElement(p, c(p).parent()[0]);
        }
        if (o && c(o)[0].tagName === "P" && p && c(p)[0].tagName == "BLOCKQUOTE") {
          this.insertAfterLastElement(o, p);
        }
      }
      if (f && !n.shiftKey) {
        this.shortcuts(n, r);
      }
      if (f && r === 90 && !n.shiftKey && !n.altKey) {
        n.preventDefault();
        if (this.opts.buffer.length) {
          this.bufferUndo();
        } else {
          this.document.execCommand("undo", false, false);
        }
        return;
      } else {
        if (f && r === 90 && n.shiftKey && !n.altKey) {
          n.preventDefault();
          if (this.opts.rebuffer.length != 0) {
            this.bufferRedo();
          } else {
            this.document.execCommand("redo", false, false);
          }
          return;
        }
      }
      if (f && r === 65) {
        this.selectall = true;
      } else {
        if (r != this.keyCode.LEFT_WIN && !f) {
          this.selectall = false;
        }
      }
      if (r == this.keyCode.ENTER && !n.shiftKey && !n.ctrlKey && !n.metaKey) {
        if (this.browser("msie") && p.nodeType == 1 && (p.tagName == "TD" || p.tagName == "TH")) {
          n.preventDefault();
          this.bufferSet();
          this.insertNode(document.createElement("br"));
          this.callback("enter", n);
          return false;
        }
        if (j && (j.tagName == "BLOCKQUOTE" || c(j).parent()[0].tagName == "BLOCKQUOTE")) {
          if (this.isEndOfElement()) {
            if (this.dblEnter == 1) {
              var m;
              var q;
              if (j.tagName == "BLOCKQUOTE") {
                q = "br";
                m = j;
              } else {
                q = "p";
                m = c(j).parent()[0];
              }
              n.preventDefault();
              this.insertingAfterLastElement(m);
              this.dblEnter = 0;
              if (q == "p") {
                c(j).parent().find("p").last().remove();
              } else {
                var l = c.trim(c(j).html());
                c(j).html(l.replace(/<br\s?\/?>$/i, ""));
              }
              return;
            } else {
              this.dblEnter++;
            }
          } else {
            this.dblEnter++;
          }
        }
        if (h === true) {
          return this.buildEventKeydownPre(n, o);
        } else {
          if (!this.opts.linebreaks) {
            if (j && this.opts.rBlockTest.test(j.tagName)) {
              this.bufferSet();
              setTimeout(
                c.proxy(function () {
                  var s = this.getBlock();
                  if (s.tagName === "DIV" && !c(s).hasClass("redactor_editor")) {
                    var e = c("<p>" + this.opts.invisibleSpace + "</p>");
                    c(s).replaceWith(e);
                    this.selectionStart(e);
                  }
                }, this),
                1
              );
            } else {
              if (j === false) {
                this.bufferSet();
                var g = c("<p>" + this.opts.invisibleSpace + "</p>");
                this.insertNode(g[0]);
                this.selectionStart(g);
                this.callback("enter", n);
                return false;
              }
            }
          }
          if (this.opts.linebreaks) {
            if (j && this.opts.rBlockTest.test(j.tagName)) {
              this.bufferSet();
              setTimeout(
                c.proxy(function () {
                  var e = this.getBlock();
                  if ((e.tagName === "DIV" || e.tagName === "P") && !c(e).hasClass("redactor_editor")) {
                    this.replaceLineBreak(e);
                  }
                }, this),
                1
              );
            } else {
              return this.buildEventKeydownInsertLineBreak(n);
            }
          }
          if (j.tagName == "BLOCKQUOTE" || j.tagName == "FIGCAPTION") {
            return this.buildEventKeydownInsertLineBreak(n);
          }
        }
        this.callback("enter", n);
      } else {
        if (r === this.keyCode.ENTER && (n.ctrlKey || n.shiftKey)) {
          this.bufferSet();
          n.preventDefault();
          this.insertLineBreak();
        }
      }
      if (r === this.keyCode.TAB && this.opts.shortcuts) {
        return this.buildEventKeydownTab(n, h);
      }
      if (r === this.keyCode.BACKSPACE) {
        this.buildEventKeydownBackspace(o);
      }
    },
    buildEventKeydownPre: function (h, g) {
      h.preventDefault();
      this.bufferSet();
      var f = c(g).parent().text();
      this.insertNode(document.createTextNode("\n"));
      if (f.search(/\s$/) == -1) {
        this.insertNode(document.createTextNode("\n"));
      }
      this.sync();
      this.callback("enter", h);
      return false;
    },
    buildEventKeydownTab: function (g, f) {
      if (!this.opts.tabFocus) {
        return true;
      }
      if (this.isEmpty(this.get()) && this.opts.tabSpaces === false) {
        return true;
      }
      g.preventDefault();
      if (f === true && !g.shiftKey) {
        this.bufferSet();
        this.insertNode(document.createTextNode("\t"));
        this.sync();
        return false;
      } else {
        if (this.opts.tabSpaces !== false) {
          this.bufferSet();
          this.insertNode(document.createTextNode(Array(this.opts.tabSpaces + 1).join("\u00a0")));
          this.sync();
          return false;
        } else {
          if (!g.shiftKey) {
            this.indentingIndent();
          } else {
            this.indentingOutdent();
          }
        }
      }
      return false;
    },
    buildEventKeydownBackspace: function (f) {
      if (typeof f.tagName !== "undefined" && /^(H[1-6])$/i.test(f.tagName)) {
        var e;
        if (this.opts.linebreaks === false) {
          e = c("<p>" + this.opts.invisibleSpace + "</p>");
        } else {
          e = c("<br>" + this.opts.invisibleSpace);
        }
        c(f).replaceWith(e);
        this.selectionStart(e);
      }
      if (typeof f.nodeValue !== "undefined" && f.nodeValue !== null) {
        if (f.remove && f.nodeType === 3 && f.nodeValue.match(/[^/\u200B]/g) == null) {
          f.remove();
        }
      }
    },
    buildEventKeydownInsertLineBreak: function (f) {
      this.bufferSet();
      f.preventDefault();
      this.insertLineBreak();
      this.callback("enter", f);
      return;
    },
    buildEventKeyup: function (m) {
      if (this.rtePaste) {
        return false;
      }
      var f = m.which;
      var h = this.getParent();
      var l = this.getCurrent();
      if (!this.opts.linebreaks && l.nodeType == 3 && (h == false || h.tagName == "BODY")) {
        var j = c("<p>").append(c(l).clone());
        c(l).replaceWith(j);
        var g = c(j).next();
        if (typeof g[0] !== "undefined" && g[0].tagName == "BR") {
          g.remove();
        }
        this.selectionEnd(j);
      }
      if ((this.opts.convertLinks || this.opts.convertImageLinks || this.opts.convertVideoLinks) && f === this.keyCode.ENTER) {
        this.buildEventKeyupConverters();
      }
      if (f === this.keyCode.DELETE || f === this.keyCode.BACKSPACE) {
        return this.formatEmpty(m);
      }
      this.callback("keyup", m);
      this.sync();
    },
    buildEventKeyupConverters: function () {
      this.formatLinkify(this.opts.linkProtocol, this.opts.convertLinks, this.opts.convertImageLinks, this.opts.convertVideoLinks, this.opts.linkSize);
      setTimeout(
        c.proxy(function () {
          if (this.opts.convertImageLinks) {
            this.observeImages();
          }
          if (this.opts.observeLinks) {
            this.observeLinks();
          }
        }, this),
        5
      );
    },
    buildPlugins: function () {
      if (!this.opts.plugins) {
        return;
      }
      c.each(
        this.opts.plugins,
        c.proxy(function (e, f) {
          if (RedactorPlugins[f]) {
            c.extend(this, RedactorPlugins[f]);
            if (c.isFunction(RedactorPlugins[f].init)) {
              this.init();
            }
          }
        }, this)
      );
    },
    iframeStart: function () {
      this.iframeCreate();
      if (this.opts.textareamode) {
        this.iframeAppend(this.$source);
      } else {
        this.$sourceOld = this.$source.hide();
        this.$source = this.buildCodearea(this.$sourceOld);
        this.iframeAppend(this.$sourceOld);
      }
    },
    iframeAppend: function (e) {
      this.$source.attr("dir", this.opts.direction).hide();
      this.$box.insertAfter(e).append(this.$frame).append(this.$source);
    },
    iframeCreate: function () {
      this.$frame = c('<iframe style="width: 100%;" frameborder="0" />').one(
        "load",
        c.proxy(function () {
          if (this.opts.fullpage) {
            this.iframePage();
            if (this.content === "") {
              this.content = this.opts.invisibleSpace;
            }
            this.$frame.contents()[0].write(this.content);
            this.$frame.contents()[0].close();
            var e = setInterval(
              c.proxy(function () {
                if (this.$frame.contents().find("body").html()) {
                  clearInterval(e);
                  this.iframeLoad();
                }
              }, this),
              0
            );
          } else {
            this.iframeLoad();
          }
        }, this)
      );
    },
    iframeDoc: function () {
      return this.$frame[0].contentWindow.document;
    },
    iframePage: function () {
      var e = this.iframeDoc();
      if (e.documentElement) {
        e.removeChild(e.documentElement);
      }
      return e;
    },
    iframeAddCss: function (e) {
      e = e || this.opts.css;
      if (this.isString(e)) {
        this.$frame
          .contents()
          .find("head")
          .append('<link rel="stylesheet" href="' + e + '" />');
      }
      if (c.isArray(e)) {
        c.each(
          e,
          c.proxy(function (g, f) {
            this.iframeAddCss(f);
          }, this)
        );
      }
    },
    iframeLoad: function () {
      this.$editor = this.$frame.contents().find("body").attr({ contenteditable: true, dir: this.opts.direction });
      if (this.$editor[0]) {
        this.document = this.$editor[0].ownerDocument;
        this.window = this.document.defaultView || window;
      }
      this.iframeAddCss();
      if (this.opts.fullpage) {
        this.setFullpageOnInit(this.$editor.html());
      } else {
        this.set(this.content, true, false);
      }
      this.buildOptions();
      this.buildAfter();
    },
    placeholderStart: function (e) {
      if (this.isEmpty(e)) {
        if (this.$element.attr("placeholder")) {
          this.opts.placeholder = this.$element.attr("placeholder");
        }
        if (this.opts.placeholder === "") {
          this.opts.placeholder = false;
        }
        if (this.opts.placeholder !== false) {
          this.opts.focus = false;
          this.$editor.one("focus.redactor_placeholder", c.proxy(this.placeholderFocus, this));
          return c('<span class="redactor_placeholder" data-redactor="verified">').attr("contenteditable", false).text(this.opts.placeholder);
        }
      }
      return false;
    },
    placeholderFocus: function () {
      this.$editor.find("span.redactor_placeholder").remove();
      var e = "";
      if (this.opts.linebreaks === false) {
        e = this.opts.emptyHtml;
      }
      this.$editor.off("focus.redactor_placeholder");
      this.$editor.html(e);
      if (this.opts.linebreaks === false) {
        this.selectionStart(this.$editor.children()[0]);
      } else {
        this.focus();
      }
      this.sync();
    },
    placeholderRemove: function () {
      this.opts.placeholder = false;
      this.$editor.find("span.redactor_placeholder").remove();
      this.$editor.off("focus.redactor_placeholder");
    },
    placeholderRemoveFromCode: function (e) {
      return e.replace(/<span class="redactor_placeholder"(.*?)>(.*?)<\/span>/i, "");
    },
    shortcuts: function (g, f) {
      if (!this.opts.shortcuts) {
        return;
      }
      if (!g.altKey) {
        if (f === 77) {
          this.shortcutsLoad(g, "removeFormat");
        } else {
          if (f === 66) {
            this.shortcutsLoad(g, "bold");
          } else {
            if (f === 73) {
              this.shortcutsLoad(g, "italic");
            } else {
              if (f === 74) {
                this.shortcutsLoad(g, "insertunorderedlist");
              } else {
                if (f === 75) {
                  this.shortcutsLoad(g, "insertorderedlist");
                } else {
                  if (f === 72) {
                    this.shortcutsLoad(g, "superscript");
                  } else {
                    if (f === 76) {
                      this.shortcutsLoad(g, "subscript");
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (f === 48) {
          this.shortcutsLoadFormat(g, "p");
        } else {
          if (f === 49) {
            this.shortcutsLoadFormat(g, "h1");
          } else {
            if (f === 50) {
              this.shortcutsLoadFormat(g, "h2");
            } else {
              if (f === 51) {
                this.shortcutsLoadFormat(g, "h3");
              } else {
                if (f === 52) {
                  this.shortcutsLoadFormat(g, "h4");
                } else {
                  if (f === 53) {
                    this.shortcutsLoadFormat(g, "h5");
                  } else {
                    if (f === 54) {
                      this.shortcutsLoadFormat(g, "h6");
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    shortcutsLoad: function (g, f) {
      g.preventDefault();
      this.execCommand(f, false);
    },
    shortcutsLoadFormat: function (g, f) {
      g.preventDefault();
      this.formatBlocks(f);
    },
    focus: function () {
      if (!this.browser("opera")) {
        this.window.setTimeout(c.proxy(this.focusSet, this, true), 1);
      } else {
        this.$editor.focus();
      }
    },
    focusEnd: function () {
      this.focusSet();
    },
    focusSet: function (g) {
      this.$editor.focus();
      var e = this.getRange();
      e.selectNodeContents(this.$editor[0]);
      e.collapse(g || false);
      var f = this.getSelection();
      f.removeAllRanges();
      f.addRange(e);
    },
    toggle: function (e) {
      if (this.opts.visual) {
        this.toggleCode(e);
      } else {
        this.toggleVisual();
      }
    },
    toggleVisual: function () {
      var e = this.$source.hide().val();
      if (typeof this.modified !== "undefined") {
        this.modified = this.cleanRemoveSpaces(this.modified, false) !== this.cleanRemoveSpaces(e, false);
      }
      if (this.modified) {
        if (this.opts.fullpage && e === "") {
          this.setFullpageOnInit(e);
        } else {
          this.set(e);
          if (this.opts.fullpage) {
            this.buildBindKeyboard();
          }
        }
      }
      if (this.opts.iframe) {
        this.$frame.show();
      } else {
        this.$editor.show();
      }
      if (this.opts.fullpage) {
        this.$editor.attr("contenteditable", true);
      }
      this.$source.off("keydown.redactor-textarea-indenting");
      this.$editor.focus();
      this.selectionRestore();
      this.observeStart();
      this.buttonActiveVisual();
      this.buttonInactive("html");
      this.opts.visual = true;
    },
    toggleCode: function (g) {
      if (g !== false) {
        this.selectionSave();
      }
      var e = null;
      if (this.opts.iframe) {
        e = this.$frame.height();
        if (this.opts.fullpage) {
          this.$editor.removeAttr("contenteditable");
        }
        this.$frame.hide();
      } else {
        e = this.$editor.innerHeight();
        this.$editor.hide();
      }
      var f = this.$source.val();
      if (f !== "" && this.opts.tidyHtml) {
        this.$source.val(this.cleanHtml(f));
      }
      this.modified = f;
      this.$source.height(e).show().focus();
      this.$source.on("keydown.redactor-textarea-indenting", this.textareaIndenting);
      this.buttonInactiveVisual();
      this.buttonActive("html");
      this.opts.visual = false;
    },
    textareaIndenting: function (g) {
      if (g.keyCode === 9) {
        var f = c(this);
        var h = f.get(0).selectionStart;
        f.val(f.val().substring(0, h) + "\t" + f.val().substring(f.get(0).selectionEnd));
        f.get(0).selectionStart = f.get(0).selectionEnd = h + 1;
        return false;
      }
    },
    autosave: function () {
      var e = false;
      this.autosaveInterval = setInterval(
        c.proxy(function () {
          var f = this.get();
          if (e !== f) {
            c.ajax({
              url: this.opts.autosave,
              type: "post",
              data: this.$source.attr("name") + "=" + escape(encodeURIComponent(f)),
              success: c.proxy(function (g) {
                this.callback("autosave", false, g);
                e = f;
              }, this),
            });
          }
        }, this),
        this.opts.autosaveInterval * 1000
      );
    },
    toolbarBuild: function () {
      if (this.opts.air) {
        this.opts.buttons = this.opts.airButtons;
      } else {
        if (!this.opts.buttonSource) {
          var f = this.opts.buttons.indexOf("html"),
            g = this.opts.buttons[f + 1];
          this.opts.buttons.splice(f, 1);
          if (g === "|") {
            this.opts.buttons.splice(f, 1);
          }
        }
      }
      c.extend(this.opts.toolbar, this.opts.buttonsCustom);
      c.each(
        this.opts.buttonsAdd,
        c.proxy(function (h, j) {
          this.opts.buttons.push(j);
        }, this)
      );
      if (this.opts.toolbar) {
        c.each(
          this.opts.toolbar.formatting.dropdown,
          c.proxy(function (h, j) {
            if (c.inArray(h, this.opts.formattingTags) == "-1") {
              delete this.opts.toolbar.formatting.dropdown[h];
            }
          }, this)
        );
      }
      if (this.opts.buttons.length === 0) {
        return false;
      }
      this.airEnable();
      this.$toolbar = c("<ul>")
        .addClass("redactor_toolbar")
        .attr("id", "redactor_toolbar_" + this.uuid);
      if (this.opts.air) {
        this.$air = c('<div class="redactor_air">')
          .attr("id", "redactor_air_" + this.uuid)
          .hide();
        this.$air.append(this.$toolbar);
        c("body").append(this.$air);
      } else {
        if (this.opts.toolbarExternal) {
          c(this.opts.toolbarExternal).html(this.$toolbar);
        } else {
          this.$box.prepend(this.$toolbar);
        }
      }
      c.each(
        this.opts.buttons,
        c.proxy(function (j, l) {
          if (l === "|") {
            this.$toolbar.append(c(this.opts.buttonSeparator));
          } else {
            if (this.opts.toolbar[l]) {
              var h = this.opts.toolbar[l];
              if (this.opts.fileUpload === false && l === "file") {
                return true;
              }
              this.$toolbar.append(c("<li>").append(this.buttonBuild(l, h)));
            }
          }
        }, this)
      );
      this.$toolbar.find("a").attr("tabindex", "-1");
      if (this.opts.toolbarFixed) {
        this.toolbarObserveScroll();
        c(this.opts.toolbarFixedTarget).on("scroll.redactor", c.proxy(this.toolbarObserveScroll, this));
      }
      if (this.opts.activeButtons) {
        var e = c.proxy(this.buttonActiveObserver, this);
        this.$editor.on("mouseup.redactor keyup.redactor", e);
      }
    },
    toolbarObserveScroll: function () {
      var j = c(this.opts.toolbarFixedTarget).scrollTop();
      var g = this.$box.offset().top;
      var h = 0;
      var e = g + this.$box.height() + 40;
      if (j > g) {
        var f = "100%";
        if (this.opts.toolbarFixedBox) {
          h = this.$box.offset().left;
          f = this.$box.innerWidth();
          this.$toolbar.addClass("toolbar_fixed_box");
        }
        this.toolbarFixed = true;
        this.$toolbar.css({ position: "fixed", width: f, zIndex: 1005, top: this.opts.toolbarFixedTopOffset + "px", left: h });
        if (j < e) {
          this.$toolbar.css("visibility", "visible");
        } else {
          this.$toolbar.css("visibility", "hidden");
        }
      } else {
        this.toolbarFixed = false;
        this.$toolbar.css({ position: "relative", width: "auto", top: 0, left: h });
        if (this.opts.toolbarFixedBox) {
          this.$toolbar.removeClass("toolbar_fixed_box");
        }
      }
    },
    airEnable: function () {
      if (!this.opts.air) {
        return;
      }
      this.$editor.on(
        "mouseup.redactor keyup.redactor",
        this,
        c.proxy(function (g) {
          var j = this.getSelectionText();
          if (g.type === "mouseup" && j != "") {
            this.airShow(g);
          }
          if (g.type === "keyup" && g.shiftKey && j != "") {
            var f = c(this.getElement(this.getSelection().focusNode)),
              h = f.offset();
            h.height = f.height();
            this.airShow(h, true);
          }
        }, this)
      );
    },
    airShow: function (l, f) {
      if (!this.opts.air) {
        return;
      }
      var j, h;
      c(".redactor_air").hide();
      if (f) {
        j = l.left;
        h = l.top + l.height + 14;
        if (this.opts.iframe) {
          h += this.$box.position().top - c(this.document).scrollTop();
          j += this.$box.position().left;
        }
      } else {
        var g = this.$air.innerWidth();
        j = l.clientX;
        if (c(this.document).width() < j + g) {
          j -= g;
        }
        h = l.clientY + 14;
        if (this.opts.iframe) {
          h += this.$box.position().top;
          j += this.$box.position().left;
        } else {
          h += c(this.document).scrollTop();
        }
      }
      this.$air.css({ left: j + "px", top: h + "px" }).show();
      this.airBindHide();
    },
    airBindHide: function () {
      if (!this.opts.air) {
        return;
      }
      var e = c.proxy(function (f) {
        c(f)
          .on(
            "mousedown.redactor",
            c.proxy(function (g) {
              if (c(g.target).closest(this.$toolbar).length === 0) {
                this.$air.fadeOut(100);
                this.selectionRemove();
                c(f).off(g);
              }
            }, this)
          )
          .on(
            "keydown.redactor",
            c.proxy(function (g) {
              if (g.which === this.keyCode.ESC) {
                this.getSelection().collapseToStart();
              }
              this.$air.fadeOut(100);
              c(f).off(g);
            }, this)
          );
      }, this);
      e(document);
      if (this.opts.iframe) {
        e(this.document);
      }
    },
    airBindMousemoveHide: function () {
      if (!this.opts.air) {
        return;
      }
      var e = c.proxy(function (f) {
        c(f).on(
          "mousemove.redactor",
          c.proxy(function (g) {
            if (c(g.target).closest(this.$toolbar).length === 0) {
              this.$air.fadeOut(100);
              c(f).off(g);
            }
          }, this)
        );
      }, this);
      e(document);
      if (this.opts.iframe) {
        e(this.document);
      }
    },
    dropdownBuild: function (f, e) {
      c.each(
        e,
        c.proxy(function (j, h) {
          if (!h.className) {
            h.className = "";
          }
          var g;
          if (h.name === "separator") {
            g = c('<a class="redactor_separator_drop">');
          } else {
            g = c('<a href="#" class="' + h.className + " redactor_dropdown_" + j + '">' + h.title + "</a>");
            g.on(
              "click",
              c.proxy(function (l) {
                if (l.preventDefault) {
                  l.preventDefault();
                }
                if (this.browser("msie")) {
                  l.returnValue = false;
                }
                if (h.callback) {
                  h.callback.call(this, j, g, h, l);
                }
                if (h.exec) {
                  this.execCommand(h.exec, j);
                }
                if (h.func) {
                  this[h.func](j);
                }
                this.buttonActiveObserver();
                if (this.opts.air) {
                  this.$air.fadeOut(100);
                }
              }, this)
            );
          }
          f.append(g);
        }, this)
      );
    },
    dropdownShow: function (m, q) {
      if (!this.opts.visual) {
        m.preventDefault();
        return false;
      }
      var n = this.$toolbar.find(".redactor_dropdown_box_" + q);
      var f = this.buttonGet(q);
      if (f.hasClass("dropact")) {
        this.dropdownHideAll();
      } else {
        this.dropdownHideAll();
        this.buttonActive(q);
        f.addClass("dropact");
        var r = f.position();
        if (this.toolbarFixed) {
          r = f.offset();
        }
        var o = n.width();
        if (r.left + o > c(document).width()) {
          r.left -= o;
        }
        var h = r.left + "px";
        var j = 29;
        var l = "absolute";
        var p = j + "px";
        if (this.opts.toolbarFixed && this.toolbarFixed) {
          l = "fixed";
        } else {
          if (!this.opts.air) {
            p = r.top + j + "px";
          }
        }
        n.css({ position: l, left: h, top: p }).show();
      }
      var g = c.proxy(function (s) {
        this.dropdownHide(s, n);
      }, this);
      c(document).one("click", g);
      this.$editor.one("click", g);
      m.stopPropagation();
      this.$editor.focus();
    },
    dropdownHideAll: function () {
      this.$toolbar.find("a.dropact").removeClass("redactor_act").removeClass("dropact");
      c(".redactor_dropdown").hide();
    },
    dropdownHide: function (g, f) {
      if (!c(g.target).hasClass("dropact")) {
        f.removeClass("dropact");
        this.dropdownHideAll();
      }
    },
    buttonBuild: function (h, e) {
      var f = c('<a href="javascript:;" title="' + e.title + '" tabindex="-1" class="redactor_btn redactor_btn_' + h + '"></a>');
      f.on(
        "click",
        c.proxy(function (j) {
          if (j.preventDefault) {
            j.preventDefault();
          }
          if (this.browser("msie")) {
            j.returnValue = false;
          }
          if (f.hasClass("redactor_button_disabled")) {
            return false;
          }
          if (this.isFocused() === false && !e.exec) {
            this.$editor.focus();
          }
          if (e.exec) {
            this.$editor.focus();
            this.execCommand(e.exec, h);
            this.airBindMousemoveHide();
          } else {
            if (e.func && e.func !== "show") {
              this[e.func](h);
              this.airBindMousemoveHide();
            } else {
              if (e.callback) {
                e.callback.call(this, h, f, e, j);
                this.airBindMousemoveHide();
              } else {
                if (e.dropdown) {
                  this.dropdownShow(j, h);
                }
              }
            }
          }
          this.buttonActiveObserver(false, h);
        }, this)
      );
      if (e.dropdown) {
        var g = c('<div class="redactor_dropdown redactor_dropdown_box_' + h + '" style="display: none;">');
        g.appendTo(this.$toolbar);
        this.dropdownBuild(g, e.dropdown);
      }
      return f;
    },
    buttonGet: function (e) {
      if (!this.opts.toolbar) {
        return false;
      }
      return c(this.$toolbar.find("a.redactor_btn_" + e));
    },
    buttonActiveToggle: function (f) {
      var e = this.buttonGet(f);
      if (e.hasClass("redactor_act")) {
        e.removeClass("redactor_act");
      } else {
        e.addClass("redactor_act");
      }
    },
    buttonActive: function (e) {
      this.buttonGet(e).addClass("redactor_act");
    },
    buttonInactive: function (e) {
      this.buttonGet(e).removeClass("redactor_act");
    },
    buttonInactiveAll: function (e) {
      c.each(
        this.opts.toolbar,
        c.proxy(function (f) {
          if (f != e) {
            this.buttonInactive(f);
          }
        }, this)
      );
    },
    buttonActiveVisual: function () {
      this.$toolbar.find("a.redactor_btn").not("a.redactor_btn_html").removeClass("redactor_button_disabled");
    },
    buttonInactiveVisual: function () {
      this.$toolbar.find("a.redactor_btn").not("a.redactor_btn_html").addClass("redactor_button_disabled");
    },
    buttonChangeIcon: function (e, f) {
      this.buttonGet(e).addClass("redactor_btn_" + f);
    },
    buttonRemoveIcon: function (e, f) {
      this.buttonGet(e).removeClass("redactor_btn_" + f);
    },
    buttonAddSeparator: function () {
      this.$toolbar.append(c(this.opts.buttonSeparator));
    },
    buttonAddSeparatorAfter: function (e) {
      this.buttonGet(e).parent().after(c(this.opts.buttonSeparator));
    },
    buttonAddSeparatorBefore: function (e) {
      this.buttonGet(e).parent().before(c(this.opts.buttonSeparator));
    },
    buttonRemoveSeparatorAfter: function (e) {
      this.buttonGet(e).parent().next().remove();
    },
    buttonRemoveSeparatorBefore: function (e) {
      this.buttonGet(e).parent().prev().remove();
    },
    buttonSetRight: function (e) {
      if (!this.opts.toolbar) {
        return;
      }
      this.buttonGet(e).parent().addClass("redactor_btn_right");
    },
    buttonSetLeft: function (e) {
      if (!this.opts.toolbar) {
        return;
      }
      this.buttonGet(e).parent().removeClass("redactor_btn_right");
    },
    buttonAdd: function (f, g, j, h) {
      if (!this.opts.toolbar) {
        return;
      }
      var e = this.buttonBuild(f, { title: g, callback: j, dropdown: h });
      this.$toolbar.append(c("<li>").append(e));
    },
    buttonAddFirst: function (f, g, j, h) {
      if (!this.opts.toolbar) {
        return;
      }
      var e = this.buttonBuild(f, { title: g, callback: j, dropdown: h });
      this.$toolbar.prepend(c("<li>").append(e));
    },
    buttonAddAfter: function (m, f, h, l, j) {
      if (!this.opts.toolbar) {
        return;
      }
      var e = this.buttonBuild(f, { title: h, callback: l, dropdown: j });
      var g = this.buttonGet(m);
      if (g.length !== 0) {
        g.parent().after(c("<li>").append(e));
      } else {
        this.$toolbar.append(c("<li>").append(e));
      }
    },
    buttonAddBefore: function (j, f, h, m, l) {
      if (!this.opts.toolbar) {
        return;
      }
      var e = this.buttonBuild(f, { title: h, callback: m, dropdown: l });
      var g = this.buttonGet(j);
      if (g.length !== 0) {
        g.parent().before(c("<li>").append(e));
      } else {
        this.$toolbar.append(c("<li>").append(e));
      }
    },
    buttonRemove: function (e, g) {
      var f = this.buttonGet(e);
      if (g) {
        f.parent().next().remove();
      }
      f.parent().removeClass("redactor_btn_right");
      f.remove();
    },
    buttonActiveObserver: function (h, l) {
      var f = this.getParent();
      this.buttonInactiveAll(l);
      if (h === false && l !== "html") {
        if (c.inArray(l, this.opts.activeButtons) != -1) {
          this.buttonActiveToggle(l);
        }
        return;
      }
      if (f && f.tagName === "A") {
        this.$toolbar.find("a.redactor_dropdown_link").text(this.opts.curLang.link_edit);
      } else {
        this.$toolbar.find("a.redactor_dropdown_link").text(this.opts.curLang.link_insert);
      }
      if (this.opts.activeButtonsAdd) {
        c.each(
          this.opts.activeButtonsAdd,
          c.proxy(function (e, m) {
            this.opts.activeButtons.push(m);
          }, this)
        );
        c.extend(this.opts.activeButtonsStates, this.opts.activeButtonsAdd);
      }
      c.each(
        this.opts.activeButtonsStates,
        c.proxy(function (e, m) {
          if (c(f).closest(e, this.$editor.get()[0]).length != 0) {
            this.buttonActive(m);
          }
        }, this)
      );
      var g = c(f).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
      if (g.length) {
        var j = g.css("text-align");
        switch (j) {
          case "right":
            this.buttonActive("alignright");
            break;
          case "center":
            this.buttonActive("aligncenter");
            break;
          case "justify":
            this.buttonActive("justify");
            break;
          default:
            this.buttonActive("alignleft");
            break;
        }
      }
    },
    execPasteFrag: function (e) {
      var j = this.getSelection();
      if (j.getRangeAt && j.rangeCount) {
        range = j.getRangeAt(0);
        range.deleteContents();
        var f = document.createElement("div");
        f.innerHTML = e;
        var m = document.createDocumentFragment(),
          h,
          g;
        while ((h = f.firstChild)) {
          g = m.appendChild(h);
        }
        var l = m.firstChild;
        range.insertNode(m);
        if (g) {
          range = range.cloneRange();
          range.setStartAfter(g);
          range.collapse(true);
          j.removeAllRanges();
          j.addRange(range);
        }
      }
    },
    exec: function (f, g, e) {
      if (f === "formatblock" && this.browser("msie")) {
        g = "<" + g + ">";
      }
      if (f === "inserthtml" && this.browser("msie")) {
        if (!this.isIe11()) {
          this.$editor.focus();
          this.document.selection.createRange().pasteHTML(g);
        } else {
          this.execPasteFrag(g);
        }
      } else {
        this.document.execCommand(f, false, g);
      }
      if (e !== false) {
        this.sync();
      }
      this.callback("execCommand", f, g);
    },
    execCommand: function (f, g, e) {
      if (!this.opts.visual) {
        this.$source.focus();
        return false;
      }
      if (f === "inserthtml") {
        this.insertHtml(g, e);
        this.callback("execCommand", f, g);
        return;
      }
      if (this.currentOrParentIs("PRE") && !this.opts.formattingPre) {
        return false;
      }
      if (f === "insertunorderedlist" || f === "insertorderedlist") {
        return this.execLists(f, g);
      }
      if (f === "unlink") {
        return this.execUnlink(f, g);
      }
      this.exec(f, g, e);
      if (f === "inserthorizontalrule") {
        this.$editor.find("hr").removeAttr("id");
      }
    },
    execUnlink: function (f, g) {
      this.bufferSet();
      var e = this.currentOrParentIs("A");
      if (e) {
        c(e).replaceWith(c(e).text());
        this.sync();
        this.callback("execCommand", f, g);
        return;
      }
    },
    execLists: function (j, h) {
      this.bufferSet();
      var r = this.getParent();
      var o = c(r).closest("ol, ul");
      var n = false;
      if (o.length) {
        n = true;
        var q = o[0].tagName;
        if ((j === "insertunorderedlist" && q === "OL") || (j === "insertorderedlist" && q === "UL")) {
          n = false;
        }
      }
      this.selectionSave();
      if (n) {
        var f = this.getNodes();
        var g = this.getBlocks(f);
        if (typeof f[0] != "undefined" && f.length > 1 && f[0].nodeType == 3) {
          g.unshift(this.getBlock());
        }
        var m = "",
          t = "";
        c.each(
          g,
          c.proxy(function (w, x) {
            if (x.tagName == "LI") {
              var v = c(x);
              var u = v.clone();
              u.find("ul", "ol").remove();
              if (this.opts.linebreaks === false) {
                m += this.outerHtml(c("<p>").append(u.contents()));
              } else {
                m += u.html() + "<br>";
              }
              if (w == 0) {
                v.addClass("redactor-replaced").empty();
                t = this.outerHtml(v);
              } else {
                v.remove();
              }
            }
          }, this)
        );
        html = this.$editor.html().replace(t, "</" + q + ">" + m + "<" + q + ">");
        this.$editor.html(html);
        this.$editor.find(q + ":empty").remove();
      } else {
        var e = this.getParent();
        this.document.execCommand(j);
        var r = this.getParent();
        var o = c(r).closest("ol, ul");
        if (e && e.tagName == "TD") {
          o.wrapAll("<td>");
        }
        if (o.length) {
          var s = o.children().first();
          if (c.trim(c(s).text()) == "") {
            var l = c('<span id="selection-marker-1"></span>');
            c(s).prepend(l);
          }
          if ((this.browser("msie") || this.browser("mozilla")) && r.tagName !== "LI") {
            c(r).replaceWith(c(r).html());
          }
          var p = o.parent();
          if (this.isParentRedactor(p) && this.nodeTestBlocks(p[0])) {
            p.replaceWith(p.contents());
          }
        }
        if (this.browser("mozilla")) {
          this.$editor.focus();
        }
      }
      this.selectionRestore();
      c(l).remove();
      this.sync();
      this.callback("execCommand", j, h);
      return;
    },
    indentingIndent: function () {
      this.indentingStart("indent");
    },
    indentingOutdent: function () {
      this.indentingStart("outdent");
    },
    indentingStart: function (h) {
      this.bufferSet();
      if (h === "indent") {
        var j = this.getBlock();
        this.selectionSave();
        if (j && j.tagName == "LI") {
          var o = this.getParent();
          var l = c(o).closest("ol, ul");
          var n = l[0].tagName;
          var f = this.getBlocks();
          c.each(f, function (t, u) {
            if (u.tagName == "LI") {
              var r = c(u).prev();
              if (r.length != 0 && r[0].tagName == "LI") {
                var q = r.children("ul, ol");
                if (q.length == 0) {
                  r.append(c("<" + n + ">").append(u));
                } else {
                  q.append(u);
                }
              }
            }
          });
        } else {
          if (j === false && this.opts.linebreaks === true) {
            this.exec("formatBlock", "blockquote");
            var p = this.getBlock();
            var j = c('<div data-tagblock="">').html(c(p).html());
            c(p).replaceWith(j);
            var g = this.normalize(c(j).css("margin-left")) + this.opts.indentValue;
            c(j).css("margin-left", g + "px");
          } else {
            var e = this.getBlocks();
            c.each(
              e,
              c.proxy(function (r, s) {
                var q = false;
                if (s.tagName === "TD") {
                  return;
                }
                if (c.inArray(s.tagName, this.opts.alignmentTags) !== -1) {
                  q = c(s);
                } else {
                  q = c(s).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
                }
                var t = this.normalize(q.css("margin-left")) + this.opts.indentValue;
                q.css("margin-left", t + "px");
              }, this)
            );
          }
        }
        this.selectionRestore();
      } else {
        this.selectionSave();
        var j = this.getBlock();
        if (j && j.tagName == "LI") {
          var f = this.getBlocks();
          var m = 0;
          this.insideOutdent(j, m, f);
        } else {
          var e = this.getBlocks();
          c.each(
            e,
            c.proxy(function (r, s) {
              var q = false;
              if (c.inArray(s.tagName, this.opts.alignmentTags) !== -1) {
                q = c(s);
              } else {
                q = c(s).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
              }
              var t = this.normalize(q.css("margin-left")) - this.opts.indentValue;
              if (t <= 0) {
                if (this.opts.linebreaks === true && typeof q.data("tagblock") !== "undefined") {
                  q.replaceWith(q.html());
                } else {
                  q.css("margin-left", "");
                  this.removeEmptyAttr(q, "style");
                }
              } else {
                q.css("margin-left", t + "px");
              }
            }, this)
          );
        }
        this.selectionRestore();
      }
      this.sync();
    },
    insideOutdent: function (e, g, f) {
      if (e && e.tagName == "LI") {
        var h = c(e).parent().parent();
        if (h.length != 0 && h[0].tagName == "LI") {
          h.after(e);
        } else {
          if (typeof f[g] != "undefined") {
            e = f[g];
            g++;
            this.insideOutdent(e, g, f);
          } else {
            this.execCommand("insertunorderedlist");
          }
        }
      }
    },
    alignmentLeft: function () {
      this.alignmentSet("", "JustifyLeft");
    },
    alignmentRight: function () {
      this.alignmentSet("right", "JustifyRight");
    },
    alignmentCenter: function () {
      this.alignmentSet("center", "JustifyCenter");
    },
    alignmentJustify: function () {
      this.alignmentSet("justify", "JustifyFull");
    },
    alignmentSet: function (f, h) {
      this.bufferSet();
      if (this.oldIE()) {
        this.document.execCommand(h, false, false);
        return true;
      }
      this.selectionSave();
      var j = this.getBlock();
      if (!j && this.opts.linebreaks) {
        this.exec("formatBlock", "blockquote");
        var e = this.getBlock();
        var j = c('<div data-tagblock="">').html(c(e).html());
        c(e).replaceWith(j);
        c(j).css("text-align", f);
        this.removeEmptyAttr(j, "style");
        if (f == "" && typeof c(j).data("tagblock") !== "undefined") {
          c(j).replaceWith(c(j).html());
        }
      } else {
        var g = this.getBlocks();
        c.each(
          g,
          c.proxy(function (m, n) {
            var l = false;
            if (c.inArray(n.tagName, this.opts.alignmentTags) !== -1) {
              l = c(n);
            } else {
              l = c(n).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
            }
            if (l) {
              l.css("text-align", f);
              this.removeEmptyAttr(l, "style");
            }
          }, this)
        );
      }
      this.selectionRestore();
      this.sync();
    },
    cleanEmpty: function (e) {
      var f = this.placeholderStart(e);
      if (f !== false) {
        return f;
      }
      if (this.opts.linebreaks === false) {
        if (e === "") {
          e = this.opts.emptyHtml;
        } else {
          if (e.search(/^<hr\s?\/?>$/gi) !== -1) {
            e = "<hr>" + this.opts.emptyHtml;
          }
        }
      }
      return e;
    },
    cleanConverters: function (e) {
      if (this.opts.convertDivs) {
        e = e.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "<p$1>$2</p>");
      }
      if (this.opts.paragraphy) {
        e = this.cleanParagraphy(e);
      }
      return e;
    },
    cleanConvertProtected: function (e) {
      if (this.opts.templateVars) {
        e = e.replace(/\{\{(.*?)\}\}/gi, "<!-- template double $1 -->");
        e = e.replace(/\{(.*?)\}/gi, "<!-- template $1 -->");
      }
      e = e.replace(/<script(.*?)>([\w\W]*?)<\/script>/gi, '<title type="text/javascript" style="display: none;" class="redactor-script-tag"$1>$2</title>');
      e = e.replace(/<style(.*?)>([\w\W]*?)<\/style>/gi, '<section$1 style="display: none;" rel="redactor-style-tag">$2</section>');
      e = e.replace(/<form(.*?)>([\w\W]*?)<\/form>/gi, '<section$1 rel="redactor-form-tag">$2</section>');
      if (this.opts.phpTags) {
        e = e.replace(/<\?php([\w\W]*?)\?>/gi, '<section style="display: none;" rel="redactor-php-tag">$1</section>');
      } else {
        e = e.replace(/<\?php([\w\W]*?)\?>/gi, "");
      }
      return e;
    },
    cleanReConvertProtected: function (e) {
      if (this.opts.templateVars) {
        e = e.replace(/<!-- template double (.*?) -->/gi, "{{$1}}");
        e = e.replace(/<!-- template (.*?) -->/gi, "{$1}");
      }
      e = e.replace(/<title type="text\/javascript" style="display: none;" class="redactor-script-tag"(.*?)>([\w\W]*?)<\/title>/gi, '<script$1 type="text/javascript">$2</script>');
      e = e.replace(/<section(.*?) style="display: none;" rel="redactor-style-tag">([\w\W]*?)<\/section>/gi, "<style$1>$2</style>");
      e = e.replace(/<section(.*?)rel="redactor-form-tag"(.*?)>([\w\W]*?)<\/section>/gi, "<form$1$2>$3</form>");
      if (this.opts.phpTags) {
        e = e.replace(/<section style="display: none;" rel="redactor-php-tag">([\w\W]*?)<\/section>/gi, "<?php\r\n$1\r\n?>");
      }
      return e;
    },
    cleanRemoveSpaces: function (f, e) {
      if (e !== false) {
        var e = [];
        var h = f.match(/<(pre|style|script|title)(.*?)>([\w\W]*?)<\/(pre|style|script|title)>/gi);
        if (h === null) {
          h = [];
        }
        if (this.opts.phpTags) {
          var g = f.match(/<\?php([\w\W]*?)\?>/gi);
          if (g) {
            h = c.merge(h, g);
          }
        }
        if (h) {
          c.each(h, function (j, l) {
            f = f.replace(l, "buffer_" + j);
            e.push(l);
          });
        }
      }
      f = f.replace(/\n/g, " ");
      f = f.replace(/[\t]*/g, "");
      f = f.replace(/\n\s*\n/g, "\n");
      f = f.replace(/^[\s\n]*/g, " ");
      f = f.replace(/[\s\n]*$/g, " ");
      f = f.replace(/>\s{2,}</g, "> <");
      f = this.cleanReplacer(f, e);
      f = f.replace(/\n\n/g, "\n");
      return f;
    },
    cleanReplacer: function (f, e) {
      if (e === false) {
        return f;
      }
      c.each(e, function (g, h) {
        f = f.replace("buffer_" + g, h);
      });
      return f;
    },
    cleanRemoveEmptyTags: function (h) {
      h = h.replace(/<span>([\w\W]*?)<\/span>/gi, "$1");
      h = h.replace(/[\u200B-\u200D\uFEFF]/g, "");
      var j = ["<b>\\s*</b>", "<b>&nbsp;</b>", "<em>\\s*</em>"];
      var g = [
        "<pre></pre>",
        "<blockquote>\\s*</blockquote>",
        "<dd></dd>",
        "<dt></dt>",
        "<ul></ul>",
        "<ol></ol>",
        "<li></li>",
        "<table></table>",
        "<tr></tr>",
        "<span>\\s*<span>",
        "<span>&nbsp;<span>",
        "<p>\\s*</p>",
        "<p></p>",
        "<p>&nbsp;</p>",
        "<p>\\s*<br>\\s*</p>",
        "<div>\\s*</div>",
        "<div>\\s*<br>\\s*</div>",
      ];
      if (this.opts.removeEmptyTags) {
        g = g.concat(j);
      } else {
        g = j;
      }
      var e = g.length;
      for (var f = 0; f < e; ++f) {
        h = h.replace(new RegExp(g[f], "gi"), "");
      }
      return h;
    },
    cleanParagraphy: function (l) {
      l = c.trim(l);
      if (this.opts.linebreaks === true) {
        return l;
      }
      if (l === "" || l === "<p></p>") {
        return this.opts.emptyHtml;
      }
      l = l + "\n";
      var n = [];
      var j = l.match(/<(table|div|pre|object)(.*?)>([\w\W]*?)<\/(table|div|pre|object)>/gi);
      if (!j) {
        j = [];
      }
      var m = l.match(/<!--([\w\W]*?)-->/gi);
      if (m) {
        j = c.merge(j, m);
      }
      if (this.opts.phpTags) {
        var f = l.match(/<section(.*?)rel="redactor-php-tag">([\w\W]*?)<\/section>/gi);
        if (f) {
          j = c.merge(j, f);
        }
      }
      if (j) {
        c.each(j, function (p, q) {
          n[p] = q;
          l = l.replace(q, "{replace" + p + "}\n");
        });
      }
      l = l.replace(/<br \/>\s*<br \/>/gi, "\n\n");
      function h(s, p, q) {
        return l.replace(new RegExp(s, p), q);
      }
      var e =
        "(comment|html|body|head|title|meta|style|script|link|iframe|table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|option|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)";
      l = h("(<" + e + "[^>]*>)", "gi", "\n$1");
      l = h("(</" + e + ">)", "gi", "$1\n\n");
      l = h("\r\n", "g", "\n");
      l = h("\r", "g", "\n");
      l = h("/\n\n+/", "g", "\n\n");
      var o = l.split(new RegExp("\ns*\n", "g"), -1);
      l = "";
      for (var g in o) {
        if (o.hasOwnProperty(g)) {
          if (o[g].search("{replace") == -1) {
            o[g] = o[g].replace(/<p>\n\t<\/p>/gi, "");
            o[g] = o[g].replace(/<p><\/p>/gi, "");
            if (o[g] != "") {
              l += "<p>" + o[g].replace(/^\n+|\n+$/g, "") + "</p>";
            }
          } else {
            l += o[g];
          }
        }
      }
      l = h("<p>s*</p>", "gi", "");
      l = h("<p>([^<]+)</(div|address|form)>", "gi", "<p>$1</p></$2>");
      l = h("<p>s*(</?" + e + "[^>]*>)s*</p>", "gi", "$1");
      l = h("<p>(<li.+?)</p>", "gi", "$1");
      l = h("<p>s*(</?" + e + "[^>]*>)", "gi", "$1");
      l = h("(</?" + e + "[^>]*>)s*</p>", "gi", "$1");
      l = h("(</?" + e + "[^>]*>)s*<br />", "gi", "$1");
      l = h("<br />(s*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)", "gi", "$1");
      l = h("\n</p>", "gi", "</p>");
      l = h("<li><p>", "gi", "<li>");
      l = h("</p></li>", "gi", "</li>");
      l = h("</li><p>", "gi", "</li>");
      l = h("<p>\t?\n?<p>", "gi", "<p>");
      l = h("</dt><p>", "gi", "</dt>");
      l = h("</dd><p>", "gi", "</dd>");
      l = h("<br></p></blockquote>", "gi", "</blockquote>");
      l = h("<p>\t*</p>", "gi", "");
      c.each(n, function (p, q) {
        l = l.replace("{replace" + p + "}", q);
      });
      return c.trim(l);
    },
    cleanConvertInlineTags: function (e, h) {
      var f = "strong";
      if (this.opts.boldTag === "b") {
        f = "b";
      }
      var g = "em";
      if (this.opts.italicTag === "i") {
        g = "i";
      }
      e = e.replace(/<span style="font-style: italic;">([\w\W]*?)<\/span>/gi, "<" + g + ">$1</" + g + ">");
      e = e.replace(/<span style="font-weight: bold;">([\w\W]*?)<\/span>/gi, "<" + f + ">$1</" + f + ">");
      if (this.opts.boldTag === "strong") {
        e = e.replace(/<b>([\w\W]*?)<\/b>/gi, "<strong>$1</strong>");
      } else {
        e = e.replace(/<strong>([\w\W]*?)<\/strong>/gi, "<b>$1</b>");
      }
      if (this.opts.italicTag === "em") {
        e = e.replace(/<i>([\w\W]*?)<\/i>/gi, "<em>$1</em>");
      } else {
        e = e.replace(/<em>([\w\W]*?)<\/em>/gi, "<i>$1</i>");
      }
      if (h !== true) {
        e = e.replace(/<strike>([\w\W]*?)<\/strike>/gi, "<del>$1</del>");
      } else {
        e = e.replace(/<del>([\w\W]*?)<\/del>/gi, "<strike>$1</strike>");
      }
      return e;
    },
    cleanStripTags: function (g) {
      if (g == "" || typeof g == "undefined") {
        return g;
      }
      var h = false;
      if (this.opts.allowedTags !== false) {
        h = true;
      }
      var e = h === true ? this.opts.allowedTags : this.opts.deniedTags;
      var f = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
      g = g.replace(f, function (l, j) {
        if (h === true) {
          return c.inArray(j.toLowerCase(), e) > "-1" ? l : "";
        } else {
          return c.inArray(j.toLowerCase(), e) > "-1" ? "" : l;
        }
      });
      g = this.cleanConvertInlineTags(g);
      return g;
    },
    cleanSavePreCode: function (e, f) {
      var g = e.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/gi);
      if (g !== null) {
        c.each(
          g,
          c.proxy(function (j, l) {
            var h = l.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/i);
            h[3] = h[3].replace(/&nbsp;/g, " ");
            if (f !== false) {
              h[3] = this.cleanEncodeEntities(h[3]);
            }
            h[3] = h[3].replace(/\$/g, "&#36;");
            e = e.replace(l, "<" + h[1] + h[2] + ">" + h[3] + "</" + h[1] + ">");
          }, this)
        );
      }
      return e;
    },
    cleanEncodeEntities: function (e) {
      e = String(e)
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"');
      return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    },
    cleanUnverified: function () {
      var e = this.$editor.find("li, img, a, b, strong, sub, sup, i, em, u, small, strike, del, span, cite");
      e.filter('[style*="background-color: transparent;"][style*="line-height"]').css("background-color", "").css("line-height", "");
      e.filter('[style*="background-color: transparent;"]').css("background-color", "");
      e.css("line-height", "");
      c.each(
        e,
        c.proxy(function (f, g) {
          this.removeEmptyAttr(g, "style");
        }, this)
      );
      this.$editor.find('div[style="text-align: -webkit-auto;"]').contents().unwrap();
    },
    cleanHtml: function (f) {
      var j = 0,
        m = f.length,
        l = 0,
        e = null,
        g = null,
        p = "",
        h = "",
        o = "";
      this.cleanlevel = 0;
      for (; j < m; j++) {
        l = j;
        if (-1 == f.substr(j).indexOf("<")) {
          h += f.substr(j);
          return this.cleanFinish(h);
        }
        while (l < m && f.charAt(l) != "<") {
          l++;
        }
        if (j != l) {
          o = f.substr(j, l - j);
          if (!o.match(/^\s{2,}$/g)) {
            if ("\n" == h.charAt(h.length - 1)) {
              h += this.cleanGetTabs();
            } else {
              if ("\n" == o.charAt(0)) {
                h += "\n" + this.cleanGetTabs();
                o = o.replace(/^\s+/, "");
              }
            }
            h += o;
          }
          if (o.match(/\n/)) {
            h += "\n" + this.cleanGetTabs();
          }
        }
        e = l;
        while (l < m && ">" != f.charAt(l)) {
          l++;
        }
        p = f.substr(e, l - e);
        j = l;
        var n;
        if ("!--" == p.substr(1, 3)) {
          if (!p.match(/--$/)) {
            while ("-->" != f.substr(l, 3)) {
              l++;
            }
            l += 2;
            p = f.substr(e, l - e);
            j = l;
          }
          if ("\n" != h.charAt(h.length - 1)) {
            h += "\n";
          }
          h += this.cleanGetTabs();
          h += p + ">\n";
        } else {
          if ("!" == p[1]) {
            h = this.placeTag(p + ">", h);
          } else {
            if ("?" == p[1]) {
              h += p + ">\n";
            } else {
              if ((n = p.match(/^<(script|style|pre)/i))) {
                n[1] = n[1].toLowerCase();
                p = this.cleanTag(p);
                h = this.placeTag(p, h);
                g = String(f.substr(j + 1))
                  .toLowerCase()
                  .indexOf("</" + n[1]);
                if (g) {
                  o = f.substr(j + 1, g);
                  j += g;
                  h += o;
                }
              } else {
                p = this.cleanTag(p);
                h = this.placeTag(p, h);
              }
            }
          }
        }
      }
      return this.cleanFinish(h);
    },
    cleanGetTabs: function () {
      var f = "";
      for (var e = 0; e < this.cleanlevel; e++) {
        f += "\t";
      }
      return f;
    },
    cleanFinish: function (e) {
      e = e.replace(/\n\s*\n/g, "\n");
      e = e.replace(/^[\s\n]*/, "");
      e = e.replace(/[\s\n]*$/, "");
      e = e.replace(/<script(.*?)>\n<\/script>/gi, "<script$1></script>");
      this.cleanlevel = 0;
      return e;
    },
    cleanTag: function (f) {
      var h = "";
      f = f.replace(/\n/g, " ");
      f = f.replace(/\s{2,}/g, " ");
      f = f.replace(/^\s+|\s+$/g, " ");
      var g = "";
      if (f.match(/\/$/)) {
        g = "/";
        f = f.replace(/\/+$/, "");
      }
      var e;
      while ((e = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/.exec(f))) {
        if (e[2]) {
          h += e[1].toLowerCase() + "=" + e[2];
        } else {
          if (e[1]) {
            h += e[1].toLowerCase();
          }
        }
        h += " ";
        f = f.substr(e[0].length);
      }
      return h.replace(/\s*$/, "") + g + ">";
    },
    placeTag: function (e, g) {
      var f = e.match(this.cleannewLevel);
      if (e.match(this.cleanlineBefore) || f) {
        g = g.replace(/\s*$/, "");
        g += "\n";
      }
      if (f && "/" == e.charAt(1)) {
        this.cleanlevel--;
      }
      if ("\n" == g.charAt(g.length - 1)) {
        g += this.cleanGetTabs();
      }
      if (f && "/" != e.charAt(1)) {
        this.cleanlevel++;
      }
      g += e;
      if (e.match(this.cleanlineAfter) || e.match(this.cleannewLevel)) {
        g = g.replace(/ *$/, "");
        g += "\n";
      }
      return g;
    },
    formatEmpty: function (j) {
      var f = c.trim(this.$editor.html());
      if (this.opts.linebreaks) {
        if (f == "") {
          j.preventDefault();
          this.$editor.html("");
          this.focus();
        }
      } else {
        f = f.replace(/<br\s?\/?>/i, "");
        var h = f.replace(/<p>\s?<\/p>/gi, "");
        if (f === "" || h === "") {
          j.preventDefault();
          var g = c(this.opts.emptyHtml).get(0);
          this.$editor.html(g);
          this.focus();
        }
      }
      this.sync();
    },
    formatBlocks: function (e) {
      this.bufferSet();
      var f = this.getBlocks();
      this.selectionSave();
      c.each(
        f,
        c.proxy(function (g, j) {
          if (j.tagName !== "LI") {
            var h = c(j).parent();
            if (e === "p") {
              if ((j.tagName === "P" && h.length != 0 && h[0].tagName === "BLOCKQUOTE") || j.tagName === "BLOCKQUOTE") {
                this.formatQuote();
                return;
              } else {
                if (this.opts.linebreaks) {
                  return;
                } else {
                  this.formatBlock(e, j);
                }
              }
            } else {
              this.formatBlock(e, j);
            }
          }
        }, this)
      );
      this.selectionRestore();
      this.sync();
    },
    formatBlock: function (e, j) {
      if (j === false) {
        j = this.getBlock();
      }
      if (j === false) {
        if (this.opts.linebreaks === true) {
          this.execCommand("formatblock", e);
        }
        return true;
      }
      var h = "";
      if (e !== "pre") {
        h = c(j).contents();
      } else {
        h = c(j).html();
        if (c.trim(h) === "") {
          h = '<span id="selection-marker-1"></span>';
        }
      }
      if (j.tagName === "PRE") {
        e = "p";
      }
      if (this.opts.linebreaks === true && e === "p") {
        c(j).replaceWith(c("<div>").append(h).html() + "<br>");
      } else {
        var f = this.getParent();
        var g = c("<" + e + ">").append(h);
        c(j).replaceWith(g);
        if (f && f.tagName == "TD") {
          c(g).wrapAll("<td>");
        }
      }
    },
    formatChangeTag: function (g, e, f) {
      if (f !== false) {
        this.selectionSave();
      }
      var h = c("<" + e + "/>");
      c(g).replaceWith(function () {
        return h.append(c(this).contents());
      });
      if (f !== false) {
        this.selectionRestore();
      }
      return h;
    },
    formatQuote: function () {
      this.bufferSet();
      if (this.opts.linebreaks === false) {
        this.selectionSave();
        var e = this.getBlocks();
        var p = false;
        var u = e.length;
        if (e) {
          var m = "";
          var v = "";
          var h = false;
          var r = true;
          c.each(e, function (w, x) {
            if (x.tagName !== "P") {
              r = false;
            }
          });
          c.each(
            e,
            c.proxy(function (w, x) {
              if (x.tagName === "BLOCKQUOTE") {
                this.formatBlock("p", x, false);
              } else {
                if (x.tagName === "P") {
                  p = c(x).parent();
                  if (p[0].tagName == "BLOCKQUOTE") {
                    var y = c(p).children("p").length;
                    if (y == 1) {
                      c(p).replaceWith(x);
                    } else {
                      if (y == u) {
                        h = "blockquote";
                        m += this.outerHtml(x);
                      } else {
                        h = "html";
                        m += this.outerHtml(x);
                        if (w == 0) {
                          c(x).addClass("redactor-replaced").empty();
                          v = this.outerHtml(x);
                        } else {
                          c(x).remove();
                        }
                      }
                    }
                  } else {
                    if (r === false || e.length == 1) {
                      this.formatBlock("blockquote", x, false);
                    } else {
                      h = "paragraphs";
                      m += this.outerHtml(x);
                    }
                  }
                } else {
                  if (x.tagName !== "LI") {
                    this.formatBlock("blockquote", x, false);
                  }
                }
              }
            }, this)
          );
          if (h) {
            if (h == "paragraphs") {
              c(e[0]).replaceWith("<blockquote>" + m + "</blockquote>");
              c(e).remove();
            } else {
              if (h == "blockquote") {
                c(p).replaceWith(m);
              } else {
                if (h == "html") {
                  var o = this.$editor.html().replace(v, "</blockquote>" + m + "<blockquote>");
                  this.$editor.html(o);
                  this.$editor.find("blockquote").each(function () {
                    if (c.trim(c(this).html()) == "") {
                      c(this).remove();
                    }
                  });
                }
              }
            }
          }
        }
        this.selectionRestore();
      } else {
        var j = this.getBlock();
        if (j.tagName === "BLOCKQUOTE") {
          this.selectionSave();
          var o = c.trim(c(j).html());
          var s = c.trim(this.getSelectionHtml());
          o = o.replace(/<span(.*?)id="selection-marker(.*?)<\/span>/gi, "");
          if (o == s) {
            c(j).replaceWith(c(j).html() + "<br>");
          } else {
            this.inlineFormat("tmp");
            var l = this.$editor.find("tmp");
            l.empty();
            var q = this.$editor.html().replace("<tmp></tmp>", '</blockquote><span id="selection-marker-1">' + this.opts.invisibleSpace + "</span>" + s + "<blockquote>");
            this.$editor.html(q);
            l.remove();
            this.$editor.find("blockquote").each(function () {
              if (c.trim(c(this).html()) == "") {
                c(this).remove();
              }
            });
          }
          this.selectionRestore();
          this.$editor.find("span#selection-marker-1").attr("id", false);
        } else {
          var g = this.selectionWrap("blockquote");
          var o = c(g).html();
          var t = ["ul", "ol", "table", "tr", "tbody", "thead", "tfoot", "dl"];
          c.each(t, function (w, x) {
            o = o.replace(new RegExp("<" + x + "(.*?)>", "gi"), "");
            o = o.replace(new RegExp("</" + x + ">", "gi"), "");
          });
          var f = this.opts.blockLevelElements;
          f.push("td");
          c.each(f, function (w, x) {
            o = o.replace(new RegExp("<" + x + "(.*?)>", "gi"), "");
            o = o.replace(new RegExp("</" + x + ">", "gi"), "<br>");
          });
          c(g).html(o);
          this.selectionElement(g);
          var n = c(g).next();
          if (n.length != 0 && n[0].tagName === "BR") {
            n.remove();
          }
        }
      }
      this.sync();
    },
    blockRemoveAttr: function (e, g) {
      var f = this.getBlocks();
      c(f).removeAttr(e);
      this.sync();
    },
    blockSetAttr: function (e, g) {
      var f = this.getBlocks();
      c(f).attr(e, g);
      this.sync();
    },
    blockRemoveStyle: function (f) {
      var e = this.getBlocks();
      c(e).css(f, "");
      this.removeEmptyAttr(e, "style");
      this.sync();
    },
    blockSetStyle: function (g, f) {
      var e = this.getBlocks();
      c(e).css(g, f);
      this.sync();
    },
    blockRemoveClass: function (f) {
      var e = this.getBlocks();
      c(e).removeClass(f);
      this.removeEmptyAttr(e, "class");
      this.sync();
    },
    blockSetClass: function (f) {
      var e = this.getBlocks();
      c(e).addClass(f);
      this.sync();
    },
    inlineRemoveClass: function (e) {
      this.selectionSave();
      this.inlineEachNodes(function (f) {
        c(f).removeClass(e);
        this.removeEmptyAttr(f, "class");
      });
      this.selectionRestore();
      this.sync();
    },
    inlineSetClass: function (e) {
      var f = this.getCurrent();
      if (!c(f).hasClass(e)) {
        this.inlineMethods("addClass", e);
      }
    },
    inlineRemoveStyle: function (e) {
      this.selectionSave();
      this.inlineEachNodes(function (f) {
        c(f).css(e, "");
        this.removeEmptyAttr(f, "style");
      });
      this.selectionRestore();
      this.sync();
    },
    inlineSetStyle: function (f, e) {
      this.inlineMethods("css", f, e);
    },
    inlineRemoveAttr: function (e) {
      this.selectionSave();
      var g = this.getRange(),
        h = this.getElement(),
        f = this.getNodes();
      if (g.collapsed || (g.startContainer === g.endContainer && h)) {
        f = c(h);
      }
      c(f).removeAttr(e);
      this.inlineUnwrapSpan();
      this.selectionRestore();
      this.sync();
    },
    inlineSetAttr: function (e, f) {
      this.inlineMethods("attr", e, f);
    },
    inlineMethods: function (h, e, j) {
      this.bufferSet();
      this.selectionSave();
      var f = this.getRange();
      var g = this.getElement();
      if ((f.collapsed || f.startContainer === f.endContainer) && g && !this.nodeTestBlocks(g)) {
        c(g)[h](e, j);
      } else {
        this.document.execCommand("fontSize", false, 4);
        var l = this.$editor.find("font");
        c.each(
          l,
          c.proxy(function (m, n) {
            this.inlineSetMethods(h, n, e, j);
          }, this)
        );
      }
      this.selectionRestore();
      this.sync();
    },
    inlineSetMethods: function (j, o, g, l) {
      var m = c(o).parent(),
        e;
      var n = this.getSelectionText();
      var h = c(m).text();
      var f = n == h;
      if (f && m && m[0].tagName === "INLINE" && m[0].attributes.length != 0) {
        e = m;
        c(o).replaceWith(c(o).html());
      } else {
        e = c("<inline>").append(c(o).contents());
        c(o).replaceWith(e);
      }
      c(e)[j](g, l);
      return e;
    },
    inlineEachNodes: function (j) {
      var f = this.getRange(),
        g = this.getElement(),
        e = this.getNodes(),
        h;
      if (f.collapsed || (f.startContainer === f.endContainer && g)) {
        e = c(g);
        h = true;
      }
      c.each(
        e,
        c.proxy(function (m, o) {
          if (!h && o.tagName !== "INLINE") {
            var l = this.getSelectionText();
            var p = c(o).parent().text();
            var n = l == p;
            if (n && o.parentNode.tagName === "INLINE" && !c(o.parentNode).hasClass("redactor_editor")) {
              o = o.parentNode;
            } else {
              return;
            }
          }
          j.call(this, o);
        }, this)
      );
    },
    inlineUnwrapSpan: function () {
      var e = this.$editor.find("inline");
      c.each(
        e,
        c.proxy(function (g, h) {
          var f = c(h);
          if (f.attr("class") === undefined && f.attr("style") === undefined) {
            f.contents().unwrap();
          }
        }, this)
      );
    },
    inlineFormat: function (e) {
      this.selectionSave();
      this.document.execCommand("fontSize", false, 4);
      var g = this.$editor.find("font");
      var f;
      c.each(g, function (h, l) {
        var j = c("<" + e + "/>").append(c(l).contents());
        c(l).replaceWith(j);
        f = j;
      });
      this.selectionRestore();
      this.sync();
    },
    inlineRemoveFormat: function (e) {
      this.selectionSave();
      var f = e.toUpperCase();
      var g = this.getNodes();
      var h = c(this.getParent()).parent();
      c.each(g, function (j, l) {
        if (l.tagName === f) {
          this.inlineRemoveFormatReplace(l);
        }
      });
      if (h && h[0].tagName === f) {
        this.inlineRemoveFormatReplace(h);
      }
      this.selectionRestore();
      this.sync();
    },
    inlineRemoveFormatReplace: function (e) {
      c(e).replaceWith(c(e).contents());
    },
    insertHtml: function (g, j) {
      var m = this.getCurrent();
      var h = m.parentNode;
      this.$editor.focus();
      this.bufferSet();
      var e = c("<div>").append(c.parseHTML(g));
      g = e.html();
      g = this.cleanRemoveEmptyTags(g);
      e = c("<div>").append(c.parseHTML(g));
      var f = this.getBlock();
      if (e.contents().length == 1) {
        var l = e.contents()[0].tagName;
        if ((l != "P" && l == f.tagName) || l == "PRE") {
          g = e.text();
          e = c("<div>").append(g);
        }
      }
      if (!this.opts.linebreaks && e.contents().length == 1 && e.contents()[0].nodeType == 3 && (this.getRangeSelectedNodes().length > 2 || !m || (m.tagName == "BODY" && !h) || h.tagName == "HTML")) {
        g = "<p>" + g + "</p>";
      }
      g = this.setSpansVerifiedHtml(g);
      if ((e.contents().length > 1 && f) || e.contents().is("p, :header, ul, ol, li, div, table, td, blockquote, pre, address, section, header, footer, aside, article")) {
        if (this.browser("msie")) {
          if (!this.isIe11()) {
            this.document.selection.createRange().pasteHTML(g);
          } else {
            this.execPasteFrag(g);
          }
        } else {
          this.document.execCommand("inserthtml", false, g);
        }
      } else {
        this.insertHtmlAdvanced(g, false);
      }
      if (this.selectall) {
        this.window.setTimeout(
          c.proxy(function () {
            if (!this.opts.linebreaks) {
              this.selectionEnd(this.$editor.contents().last());
            } else {
              this.focusEnd();
            }
          }, this),
          1
        );
      }
      this.observeStart();
      this.setNonEditable();
      if (j !== false) {
        this.sync();
      }
    },
    insertHtmlAdvanced: function (f, l) {
      f = this.setSpansVerifiedHtml(f);
      var m = this.getSelection();
      if (m.getRangeAt && m.rangeCount) {
        var e = m.getRangeAt(0);
        e.deleteContents();
        var g = this.document.createElement("div");
        g.innerHTML = f;
        var n = this.document.createDocumentFragment(),
          j,
          h;
        while ((j = g.firstChild)) {
          h = n.appendChild(j);
        }
        e.insertNode(n);
        if (h) {
          e = e.cloneRange();
          e.setStartAfter(h);
          e.collapse(true);
          m.removeAllRanges();
          m.addRange(e);
        }
      }
      if (l !== false) {
        this.sync();
      }
    },
    insertBeforeCursor: function (f) {
      f = this.setSpansVerifiedHtml(f);
      var g = c(f);
      var j = document.createElement("span");
      j.innerHTML = "\u200B";
      var e = this.getRange();
      e.insertNode(j);
      e.insertNode(g[0]);
      e.collapse(false);
      var h = this.getSelection();
      h.removeAllRanges();
      h.addRange(e);
      this.sync();
    },
    insertText: function (f) {
      var e = c(c.parseHTML(f));
      if (e.length) {
        f = e.text();
      }
      this.$editor.focus();
      if (this.browser("msie") && !this.isIe11()) {
        this.document.selection.createRange().pasteHTML(f);
      } else {
        this.document.execCommand("inserthtml", false, f);
      }
      this.sync();
    },
    insertNode: function (j) {
      j = j[0] || j;
      if (j.tagName == "SPAN") {
        var e = "inline";
        var f = j.outerHTML;
        var h = new RegExp("<" + j.tagName, "i");
        var g = f.replace(h, "<" + e);
        h = new RegExp("</" + j.tagName, "i");
        g = g.replace(h, "</" + e);
        j = c(g)[0];
      }
      var l = this.getSelection();
      if (l.getRangeAt && l.rangeCount) {
        range = l.getRangeAt(0);
        range.deleteContents();
        range.insertNode(j);
        range.setEndAfter(j);
        range.setStartAfter(j);
        l.removeAllRanges();
        l.addRange(range);
      }
    },
    insertNodeToCaretPositionFromPoint: function (l, j) {
      var g;
      var f = l.clientX,
        n = l.clientY;
      if (this.document.caretPositionFromPoint) {
        var m = this.document.caretPositionFromPoint(f, n);
        g = this.getRange();
        g.setStart(m.offsetNode, m.offset);
        g.collapse(true);
        g.insertNode(j);
      } else {
        if (this.document.caretRangeFromPoint) {
          g = this.document.caretRangeFromPoint(f, n);
          g.insertNode(j);
        } else {
          if (typeof document.body.createTextRange != "undefined") {
            g = this.document.body.createTextRange();
            g.moveToPoint(f, n);
            var h = g.duplicate();
            h.moveToPoint(f, n);
            g.setEndPoint("EndToEnd", h);
            g.select();
          }
        }
      }
    },
    insertAfterLastElement: function (e, f) {
      if (typeof f != "undefined") {
        e = f;
      }
      if (this.isEndOfElement()) {
        if (this.opts.linebreaks) {
          var g = c("<div>").append(c.trim(this.$editor.html())).contents();
          if (this.outerHtml(g.last()[0]) != this.outerHtml(e)) {
            return false;
          }
        } else {
          if (this.$editor.contents().last()[0] !== e) {
            return false;
          }
        }
        this.insertingAfterLastElement(e);
      }
    },
    insertingAfterLastElement: function (e) {
      this.bufferSet();
      if (this.opts.linebreaks === false) {
        var f = c(this.opts.emptyHtml);
        c(e).after(f);
        this.selectionStart(f);
      } else {
        var f = c('<span id="selection-marker-1">' + this.opts.invisibleSpace + "</span>", this.document)[0];
        c(e).after(f);
        c(f).after(this.opts.invisibleSpace);
        this.selectionRestore();
        this.$editor.find("span#selection-marker-1").removeAttr("id");
      }
    },
    insertLineBreak: function () {
      this.selectionSave();
      this.$editor.find("#selection-marker-1").before("<br>" + (this.browser("webkit") ? this.opts.invisibleSpace : ""));
      this.selectionRestore();
    },
    insertDoubleLineBreak: function () {
      this.selectionSave();
      this.$editor.find("#selection-marker-1").before("<br><br>" + (this.browser("webkit") ? this.opts.invisibleSpace : ""));
      this.selectionRestore();
    },
    replaceLineBreak: function (e) {
      var f = c("<br>" + this.opts.invisibleSpace);
      c(e).replaceWith(f);
      this.selectionStart(f);
    },
    pasteClean: function (g) {
      g = this.callback("pasteBefore", false, g);
      if (this.browser("msie")) {
        var f = c.trim(g);
        if (f.search(/^<a(.*?)>(.*?)<\/a>$/i) == 0) {
          g = g.replace(/^<a(.*?)>(.*?)<\/a>$/i, "$2");
        }
      }
      if (this.opts.pastePlainText) {
        var f = this.document.createElement("div");
        g = g.replace(/<br>|<\/H[1-6]>|<\/p>|<\/div>/gi, "\n");
        f.innerHTML = g;
        g = f.textContent || f.innerText;
        g = c.trim(g);
        g = g.replace("\n", "<br>");
        g = this.cleanParagraphy(g);
        this.pasteInsert(g);
        return false;
      }
      if (this.currentOrParentIs("PRE")) {
        g = this.pastePre(g);
        this.pasteInsert(g);
        return true;
      }
      g = g.replace(/<p(.*?)class="MsoListParagraphCxSpFirst"([\w\W]*?)<\/p>/gi, "<ul><li$2</li>");
      g = g.replace(/<p(.*?)class="MsoListParagraphCxSpMiddle"([\w\W]*?)<\/p>/gi, "<li$2</li>");
      g = g.replace(/<p(.*?)class="MsoListParagraphCxSpLast"([\w\W]*?)<\/p>/gi, "<li$2</li></ul>");
      g = g.replace(/<p(.*?)class="MsoListParagraph"([\w\W]*?)<\/p>/gi, "<ul><li$2</li></ul>");
      g = g.replace(/·/g, "");
      g = g.replace(/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, "");
      g = g.replace(/(&nbsp;){2,}/gi, "&nbsp;");
      g = g.replace(/&nbsp;/gi, " ");
      g = g.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, "$2");
      g = g.replace(/<b(.*?)id="docs-internal-guid(.*?)">([\w\W]*?)<\/b>/gi, "$3");
      g = this.cleanStripTags(g);
      g = g.replace(/<td><\/td>/gi, "[td]");
      g = g.replace(/<td>&nbsp;<\/td>/gi, "[td]");
      g = g.replace(/<td><br><\/td>/gi, "[td]");
      g = g.replace(/<td(.*?)colspan="(.*?)"(.*?)>([\w\W]*?)<\/td>/gi, '[td colspan="$2"]$4[/td]');
      g = g.replace(/<td(.*?)rowspan="(.*?)"(.*?)>([\w\W]*?)<\/td>/gi, '[td rowspan="$2"]$4[/td]');
      g = g.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]');
      g = g.replace(/<iframe(.*?)>([\w\W]*?)<\/iframe>/gi, "[iframe$1]$2[/iframe]");
      g = g.replace(/<video(.*?)>([\w\W]*?)<\/video>/gi, "[video$1]$2[/video]");
      g = g.replace(/<audio(.*?)>([\w\W]*?)<\/audio>/gi, "[audio$1]$2[/audio]");
      g = g.replace(/<embed(.*?)>([\w\W]*?)<\/embed>/gi, "[embed$1]$2[/embed]");
      g = g.replace(/<object(.*?)>([\w\W]*?)<\/object>/gi, "[object$1]$2[/object]");
      g = g.replace(/<param(.*?)>/gi, "[param$1]");
      g = g.replace(/<img(.*?)>/gi, "[img$1]");
      g = g.replace(/ class="(.*?)"/gi, "");
      g = g.replace(/<(\w+)([\w\W]*?)>/gi, "<$1>");
      g = g.replace(/<[^\/>][^>]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, "");
      g = g.replace(/<div>\s*?\t*?\n*?(<ul>|<ol>|<p>)/gi, "$1");
      g = g.replace(/\[td colspan="(.*?)"\]([\w\W]*?)\[\/td\]/gi, '<td colspan="$1">$2</td>');
      g = g.replace(/\[td rowspan="(.*?)"\]([\w\W]*?)\[\/td\]/gi, '<td rowspan="$1">$2</td>');
      g = g.replace(/\[td\]/gi, "<td>&nbsp;</td>");
      g = g.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>');
      g = g.replace(/\[iframe(.*?)\]([\w\W]*?)\[\/iframe\]/gi, "<iframe$1>$2</iframe>");
      g = g.replace(/\[video(.*?)\]([\w\W]*?)\[\/video\]/gi, "<video$1>$2</video>");
      g = g.replace(/\[audio(.*?)\]([\w\W]*?)\[\/audio\]/gi, "<audio$1>$2</audio>");
      g = g.replace(/\[embed(.*?)\]([\w\W]*?)\[\/embed\]/gi, "<embed$1>$2</embed>");
      g = g.replace(/\[object(.*?)\]([\w\W]*?)\[\/object\]/gi, "<object$1>$2</object>");
      g = g.replace(/\[param(.*?)\]/gi, "<param$1>");
      g = g.replace(/\[img(.*?)\]/gi, "<img$1>");
      if (this.opts.convertDivs) {
        g = g.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "<p>$2</p>");
        g = g.replace(/<\/div><p>/gi, "<p>");
        g = g.replace(/<\/p><\/div>/gi, "</p>");
      }
      if (this.currentOrParentIs("LI")) {
        g = g.replace(/<p>([\w\W]*?)<\/p>/gi, "$1<br>");
      } else {
        g = this.cleanParagraphy(g);
      }
      g = g.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, "$2");
      g = g.replace(/<img>/gi, "");
      g = g.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, "");
      g = g.replace(/\n{3,}/gi, "\n");
      g = g.replace(/<p><p>/gi, "<p>");
      g = g.replace(/<\/p><\/p>/gi, "</p>");
      g = g.replace(/<li>(\s*|\t*|\n*)<p>/gi, "<li>");
      g = g.replace(/<\/p>(\s*|\t*|\n*)<\/li>/gi, "</li>");
      if (this.opts.linebreaks === true) {
        g = g.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, "$2<br>");
      }
      g = g.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, "");
      g = g.replace(/<img src="webkit-fake-url\:\/\/(.*?)"(.*?)>/gi, "");
      g = g.replace(/<td(.*?)>(\s*|\t*|\n*)<p>([\w\W]*?)<\/p>(\s*|\t*|\n*)<\/td>/gi, "<td$1>$3</td>");
      g = g.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "$2");
      g = g.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "$2");
      this.pasteClipboardMozilla = false;
      if (this.browser("mozilla")) {
        if (this.opts.clipboardUpload) {
          var h = g.match(/<img src="data:image(.*?)"(.*?)>/gi);
          if (h !== null) {
            this.pasteClipboardMozilla = h;
            for (k in h) {
              var e = h[k].replace("<img", '<img data-mozilla-paste-image="' + k + '" ');
              g = g.replace(h[k], e);
            }
          }
        }
        while (/<br>$/gi.test(g)) {
          g = g.replace(/<br>$/gi, "");
        }
      }
      g = g.replace(/<p>•([\w\W]*?)<\/p>/gi, "<li>$1</li>");
      while (/<font>([\w\W]*?)<\/font>/gi.test(g)) {
        g = g.replace(/<font>([\w\W]*?)<\/font>/gi, "$1");
      }
      g = g.replace(/<p>\n?<li>/gi, "<li>");
      if (this.browser("msie") && !this.isIe11()) {
        g = g.replace(/\n/g, "");
      }
      this.pasteInsert(g);
    },
    pastePre: function (f) {
      f = f.replace(/<br>|<\/H[1-6]>|<\/p>|<\/div>/gi, "\n");
      var e = this.document.createElement("div");
      e.innerHTML = f;
      return this.cleanEncodeEntities(e.textContent || e.innerText);
    },
    pasteInsert: function (e) {
      if (this.selectall) {
        if (!this.opts.linebreaks) {
          this.$editor.html(this.opts.emptyHtml);
        } else {
          this.$editor.html("");
        }
        this.$editor.focus();
      }
      e = this.callback("pasteAfter", false, e);
      this.insertHtml(e);
      this.selectall = false;
      setTimeout(
        c.proxy(function () {
          this.rtePaste = false;
          if (this.browser("mozilla")) {
            this.$editor.find("p:empty").remove();
          }
          if (this.pasteClipboardMozilla !== false) {
            this.pasteClipboardUploadMozilla();
          }
        }, this),
        100
      );
      if (this.opts.autoresize && this.fullscreen !== true) {
        c(this.document.body).scrollTop(this.saveScroll);
      } else {
        this.$editor.scrollTop(this.saveScroll);
      }
    },
    pasteClipboardUploadMozilla: function () {
      var e = this.$editor.find("img[data-mozilla-paste-image]");
      c.each(
        e,
        c.proxy(function (h, j) {
          var g = c(j);
          var f = j.src.split(",");
          var l = f[1];
          var m = f[0].split(";")[0].split(":")[1];
          c.post(
            this.opts.clipboardUploadUrl,
            { contentType: m, data: l },
            c.proxy(function (o) {
              var n = typeof o === "string" ? c.parseJSON(o) : o;
              g.attr("src", n.filelink);
              g.removeAttr("data-mozilla-paste-image");
              this.sync();
              this.callback("imageUpload", g, n);
            }, this)
          );
        }, this)
      );
    },
    pasteClipboardUpload: function (j) {
      var g = j.target.result;
      var f = g.split(",");
      var h = f[1];
      var l = f[0].split(";")[0].split(":")[1];
      if (this.opts.clipboardUpload) {
        c.post(
          this.opts.clipboardUploadUrl,
          { contentType: l, data: h },
          c.proxy(function (n) {
            var m = typeof n === "string" ? c.parseJSON(n) : n;
            var e = '<img src="' + m.filelink + '" id="clipboard-image-marker" />';
            this.execCommand("inserthtml", e, false);
            var o = c(this.$editor.find("img#clipboard-image-marker"));
            if (o.length) {
              o.removeAttr("id");
            } else {
              o = false;
            }
            this.sync();
            if (o) {
              this.callback("imageUpload", o, m);
            }
          }, this)
        );
      } else {
        this.insertHtml('<img src="' + g + '" />');
      }
    },
    bufferSet: function (e) {
      if (e !== undefined) {
        this.opts.buffer.push(e);
      } else {
        this.selectionSave();
        this.opts.buffer.push(this.$editor.html());
        this.selectionRemoveMarkers("buffer");
      }
    },
    bufferUndo: function () {
      if (this.opts.buffer.length === 0) {
        this.$editor.focus();
        return;
      }
      this.selectionSave();
      this.opts.rebuffer.push(this.$editor.html());
      this.selectionRestore(false, true);
      this.$editor.html(this.opts.buffer.pop());
      this.selectionRestore();
      setTimeout(c.proxy(this.observeStart, this), 100);
    },
    bufferRedo: function () {
      if (this.opts.rebuffer.length === 0) {
        this.$editor.focus();
        return false;
      }
      this.selectionSave();
      this.opts.buffer.push(this.$editor.html());
      this.selectionRestore(false, true);
      this.$editor.html(this.opts.rebuffer.pop());
      this.selectionRestore(true);
      setTimeout(c.proxy(this.observeStart, this), 4);
    },
    observeStart: function () {
      this.observeImages();
      if (this.opts.observeLinks) {
        this.observeLinks();
      }
    },
    observeLinks: function () {
      this.$editor.find("a").on("click", c.proxy(this.linkObserver, this));
      this.$editor.on(
        "click.redactor",
        c.proxy(function (f) {
          this.linkObserverTooltipClose(f);
        }, this)
      );
      c(document).on(
        "click.redactor",
        c.proxy(function (f) {
          this.linkObserverTooltipClose(f);
        }, this)
      );
    },
    observeImages: function () {
      if (this.opts.observeImages === false) {
        return false;
      }
      this.$editor.find("img").each(
        c.proxy(function (e, f) {
          if (this.browser("msie")) {
            c(f).attr("unselectable", "on");
          }
          this.imageResize(f);
        }, this)
      );
    },
    linkObserver: function (h) {
      var j = c(h.target);
      var m = j.offset();
      if (this.opts.iframe) {
        var g = this.$frame.offset();
        m.top = g.top + (m.top - c(this.document).scrollTop());
        m.left += g.left;
      }
      var p = c('<span class="redactor-link-tooltip"></span>');
      var f = j.attr("href");
      if (f.length > 24) {
        f = f.substring(0, 24) + "...";
      }
      var l = c('<a href="' + j.attr("href") + '" target="_blank">' + f + "</a>").on(
        "click",
        c.proxy(function (q) {
          this.linkObserverTooltipClose(false);
        }, this)
      );
      var n = c('<a href="#">' + this.opts.curLang.edit + "</a>").on(
        "click",
        c.proxy(function (q) {
          q.preventDefault();
          this.linkShow();
          this.linkObserverTooltipClose(false);
        }, this)
      );
      var o = c('<a href="#">' + this.opts.curLang.unlink + "</a>").on(
        "click",
        c.proxy(function (q) {
          q.preventDefault();
          this.execCommand("unlink");
          this.linkObserverTooltipClose(false);
        }, this)
      );
      p.append(l);
      p.append(" | ");
      p.append(n);
      p.append(" | ");
      p.append(o);
      p.css({ top: m.top + 20 + "px", left: m.left + "px" });
      c(".redactor-link-tooltip").remove();
      c("body").append(p);
    },
    linkObserverTooltipClose: function (f) {
      if (f !== false && f.target.tagName == "A") {
        return false;
      }
      c(".redactor-link-tooltip").remove();
    },
    getSelection: function () {
      if (!this.opts.rangy) {
        return this.document.getSelection();
      } else {
        if (!this.opts.iframe) {
          return rangy.getSelection();
        } else {
          return rangy.getSelection(this.$frame[0]);
        }
      }
    },
    getRange: function () {
      if (!this.opts.rangy) {
        if (this.document.getSelection) {
          var e = this.getSelection();
          if (e.getRangeAt && e.rangeCount) {
            return e.getRangeAt(0);
          }
        }
        return this.document.createRange();
      } else {
        if (!this.opts.iframe) {
          return rangy.createRange();
        } else {
          return rangy.createRange(this.iframeDoc());
        }
      }
    },
    selectionElement: function (e) {
      this.setCaret(e);
    },
    selectionStart: function (e) {
      this.selectionSet(e[0] || e, 0, null, 0);
    },
    selectionEnd: function (e) {
      this.selectionSet(e[0] || e, 1, null, 1);
    },
    selectionSet: function (n, m, l, h) {
      if (l == null) {
        l = n;
      }
      if (h == null) {
        h = m;
      }
      var g = this.getSelection();
      if (!g) {
        return;
      }
      var f = this.getRange();
      f.setStart(n, m);
      f.setEnd(l, h);
      try {
        g.removeAllRanges();
      } catch (j) {}
      g.addRange(f);
    },
    selectionWrap: function (e) {
      e = e.toLowerCase();
      var h = this.getBlock();
      if (h) {
        var j = this.formatChangeTag(h, e);
        this.sync();
        return j;
      }
      var g = this.getSelection();
      var f = g.getRangeAt(0);
      var j = document.createElement(e);
      j.appendChild(f.extractContents());
      f.insertNode(j);
      this.selectionElement(j);
      return j;
    },
    selectionAll: function () {
      var e = this.getRange();
      e.selectNodeContents(this.$editor[0]);
      var f = this.getSelection();
      f.removeAllRanges();
      f.addRange(e);
    },
    selectionRemove: function () {
      this.getSelection().removeAllRanges();
    },
    getCaretOffset: function (h) {
      var e = 0;
      var g = this.getRange();
      var f = g.cloneRange();
      f.selectNodeContents(h);
      f.setEnd(g.endContainer, g.endOffset);
      e = c.trim(f.toString()).length;
      return e;
    },
    getCaretOffsetRange: function () {
      return new d(this.getSelection().getRangeAt(0));
    },
    setCaret: function (h, f, m) {
      if (typeof m === "undefined") {
        m = f;
      }
      h = h[0] || h;
      var o = this.getRange();
      o.selectNodeContents(h);
      var p = this.getTextNodesIn(h);
      var l = false;
      var e = 0,
        q;
      if (p.length == 1 && f) {
        o.setStart(p[0], f);
        o.setEnd(p[0], m);
      } else {
        for (var n = 0, j; (j = p[n++]); ) {
          q = e + j.length;
          if (!l && f >= e && (f < q || (f == q && n < p.length))) {
            o.setStart(j, f - e);
            l = true;
          }
          if (l && m <= q) {
            o.setEnd(j, m - e);
            break;
          }
          e = q;
        }
      }
      var g = this.getSelection();
      g.removeAllRanges();
      g.addRange(o);
    },
    getTextNodesIn: function (j) {
      var h = [];
      if (j.nodeType == 3) {
        h.push(j);
      } else {
        var g = j.childNodes;
        for (var f = 0, e = g.length; f < e; ++f) {
          h.push.apply(h, this.getTextNodesIn(g[f]));
        }
      }
      return h;
    },
    getCurrent: function () {
      var e = false;
      var f = this.getSelection();
      if (f && f.rangeCount > 0) {
        e = f.getRangeAt(0).startContainer;
      }
      return this.isParentRedactor(e);
    },
    getParent: function (e) {
      e = e || this.getCurrent();
      if (e) {
        return this.isParentRedactor(c(e).parent()[0]);
      } else {
        return false;
      }
    },
    getBlock: function (e) {
      if (typeof e === "undefined") {
        e = this.getCurrent();
      }
      while (e) {
        if (this.nodeTestBlocks(e)) {
          if (c(e).hasClass("redactor_editor")) {
            return false;
          }
          return e;
        }
        e = e.parentNode;
      }
      return false;
    },
    getBlocks: function (f) {
      var g = [];
      if (typeof f == "undefined") {
        var e = this.getRange();
        if (e && e.collapsed === true) {
          return [this.getBlock()];
        }
        var f = this.getNodes(e);
      }
      c.each(
        f,
        c.proxy(function (h, j) {
          if (this.opts.iframe === false && c(j).parents("div.redactor_editor").length == 0) {
            return false;
          }
          if (this.nodeTestBlocks(j)) {
            g.push(j);
          }
        }, this)
      );
      if (g.length === 0) {
        g = [this.getBlock()];
      }
      return g;
    },
    nodeTestBlocks: function (e) {
      return e.nodeType == 1 && this.rTestBlock.test(e.nodeName);
    },
    tagTestBlock: function (e) {
      return this.rTestBlock.test(e);
    },
    getNodes: function (g, e) {
      if (typeof g == "undefined" || g == false) {
        var g = this.getRange();
      }
      if (g && g.collapsed === true) {
        if (typeof e === "undefined" && this.tagTestBlock(e)) {
          var m = this.getBlock();
          if (m.tagName == e) {
            return [m];
          } else {
            return [];
          }
        } else {
          return [this.getCurrent()];
        }
      }
      var f = [],
        l = [];
      var j = this.document.getSelection();
      if (!j.isCollapsed) {
        f = this.getRangeSelectedNodes(j.getRangeAt(0));
      }
      c.each(
        f,
        c.proxy(function (n, o) {
          if (this.opts.iframe === false && c(o).parents("div.redactor_editor").length == 0) {
            return false;
          }
          if (typeof e === "undefined") {
            if (c.trim(o.textContent) != "") {
              l.push(o);
            }
          } else {
            if (o.tagName == e) {
              l.push(o);
            }
          }
        }, this)
      );
      if (l.length == 0) {
        if (typeof e === "undefined" && this.tagTestBlock(e)) {
          var m = this.getBlock();
          if (m.tagName == e) {
            return l.push(m);
          } else {
            return [];
          }
        } else {
          l.push(this.getCurrent());
        }
      }
      var h = l[l.length - 1];
      if (this.nodeTestBlocks(h)) {
        l = l.slice(0, -1);
      }
      return l;
    },
    getElement: function (e) {
      if (!e) {
        e = this.getCurrent();
      }
      while (e) {
        if (e.nodeType == 1) {
          if (c(e).hasClass("redactor_editor")) {
            return false;
          }
          return e;
        }
        e = e.parentNode;
      }
      return false;
    },
    getRangeSelectedNodes: function (f) {
      f = f || this.getRange();
      var g = f.startContainer;
      var e = f.endContainer;
      if (g == e) {
        return [g];
      }
      var h = [];
      while (g && g != e) {
        h.push((g = this.nextNode(g)));
      }
      g = f.startContainer;
      while (g && g != f.commonAncestorContainer) {
        h.unshift(g);
        g = g.parentNode;
      }
      return h;
    },
    nextNode: function (e) {
      if (e.hasChildNodes()) {
        return e.firstChild;
      } else {
        while (e && !e.nextSibling) {
          e = e.parentNode;
        }
        if (!e) {
          return null;
        }
        return e.nextSibling;
      }
    },
    getSelectionText: function () {
      return this.getSelection().toString();
    },
    getSelectionHtml: function () {
      var h = "";
      var j = this.getSelection();
      if (j.rangeCount) {
        var f = this.document.createElement("div");
        var e = j.rangeCount;
        for (var g = 0; g < e; ++g) {
          f.appendChild(j.getRangeAt(g).cloneContents());
        }
        h = f.innerHTML;
      }
      return this.syncClean(h);
    },
    selectionSave: function () {
      if (!this.isFocused()) {
        this.$editor.focus();
      }
      if (!this.opts.rangy) {
        this.selectionCreateMarker(this.getRange());
      } else {
        this.savedSel = rangy.saveSelection();
      }
    },
    selectionCreateMarker: function (h, e) {
      if (!h) {
        return;
      }
      var g = c('<span id="selection-marker-1" class="redactor-selection-marker">' + this.opts.invisibleSpace + "</span>", this.document)[0];
      var f = c('<span id="selection-marker-2" class="redactor-selection-marker">' + this.opts.invisibleSpace + "</span>", this.document)[0];
      if (h.collapsed === true) {
        this.selectionSetMarker(h, g, true);
      } else {
        this.selectionSetMarker(h, g, true);
        this.selectionSetMarker(h, f, false);
      }
      this.savedSel = this.$editor.html();
      this.selectionRestore(false, false);
    },
    selectionSetMarker: function (e, g, f) {
      var h = e.cloneRange();
      h.collapse(f);
      h.insertNode(g);
      h.detach();
    },
    selectionRestore: function (h, e) {
      if (!this.opts.rangy) {
        if (h === true && this.savedSel) {
          this.$editor.html(this.savedSel);
        }
        var g = this.$editor.find("span#selection-marker-1");
        var f = this.$editor.find("span#selection-marker-2");
        if (this.browser("mozilla")) {
          this.$editor.focus();
        } else {
          if (!this.isFocused()) {
            this.$editor.focus();
          }
        }
        if (g.length != 0 && f.length != 0) {
          this.selectionSet(g[0], 0, f[0], 0);
        } else {
          if (g.length != 0) {
            this.selectionSet(g[0], 0, null, 0);
          }
        }
        if (e !== false) {
          this.selectionRemoveMarkers();
          this.savedSel = false;
        }
      } else {
        rangy.restoreSelection(this.savedSel);
      }
    },
    selectionRemoveMarkers: function (e) {
      if (!this.opts.rangy) {
        c.each(this.$editor.find("span.redactor-selection-marker"), function () {
          var f = c.trim(
            c(this)
              .html()
              .replace(/[^\u0000-\u1C7F]/g, "")
          );
          if (f == "") {
            c(this).remove();
          } else {
            c(this).removeAttr("class").removeAttr("id");
          }
        });
      } else {
        rangy.removeMarkers(this.savedSel);
      }
    },
    tableShow: function () {
      this.selectionSave();
      this.modalInit(
        this.opts.curLang.table,
        this.opts.modal_table,
        300,
        c.proxy(function () {
          c("#redactor_insert_table_btn").click(c.proxy(this.tableInsert, this));
          setTimeout(function () {
            c("#redactor_table_rows").focus();
          }, 200);
        }, this)
      );
    },
    tableInsert: function () {
      var r = c("#redactor_table_rows").val(),
        f = c("#redactor_table_columns").val(),
        n = c("<div></div>"),
        e = Math.floor(Math.random() * 99999),
        p = c('<table id="table' + e + '"><tbody></tbody></table>'),
        g,
        l,
        m,
        o;
      for (g = 0; g < r; g++) {
        l = c("<tr></tr>");
        for (m = 0; m < f; m++) {
          o = c("<td>" + this.opts.invisibleSpace + "</td>");
          if (g === 0 && m === 0) {
            o.append('<span id="selection-marker-1">' + this.opts.invisibleSpace + "</span>");
          }
          c(l).append(o);
        }
        p.append(l);
      }
      n.append(p);
      var h = n.html();
      this.modalClose();
      this.selectionRestore();
      var j = this.getBlock() || this.getCurrent();
      if (j && j.tagName != "BODY") {
        c(j).after(h);
      } else {
        this.insertHtmlAdvanced(h, false);
      }
      this.selectionRestore();
      var q = this.$editor.find("#table" + e);
      this.buttonActiveObserver();
      q.find("span#selection-marker-1").remove();
      q.removeAttr("id");
      this.sync();
    },
    tableDeleteTable: function () {
      var e = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(e)) {
        return false;
      }
      if (e.length == 0) {
        return false;
      }
      this.bufferSet();
      e.remove();
      this.sync();
    },
    tableDeleteRow: function () {
      var e = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(e)) {
        return false;
      }
      if (e.length == 0) {
        return false;
      }
      this.bufferSet();
      var h = c(this.getParent()).closest("tr");
      var f = h.prev().length ? h.prev() : h.next();
      if (f.length) {
        var g = f.children("td").first();
        if (g.length) {
          g.prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + "</span>");
        }
      }
      h.remove();
      this.selectionRestore();
      this.sync();
    },
    tableDeleteColumn: function () {
      var g = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(g)) {
        return false;
      }
      if (g.length == 0) {
        return false;
      }
      this.bufferSet();
      var e = c(this.getParent()).closest("td");
      var f = e.get(0).cellIndex;
      g.find("tr").each(
        c.proxy(function (h, j) {
          var l = f - 1 < 0 ? f + 1 : f - 1;
          if (h === 0) {
            c(j)
              .find("td")
              .eq(l)
              .prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + "</span>");
          }
          c(j).find("td").eq(f).remove();
        }, this)
      );
      this.selectionRestore();
      this.sync();
    },
    tableAddHead: function () {
      var e = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(e)) {
        return false;
      }
      if (e.length == 0) {
        return false;
      }
      this.bufferSet();
      if (e.find("thead").length !== 0) {
        this.tableDeleteHead();
      } else {
        var f = e.find("tr").first().clone();
        f.find("td").html(this.opts.invisibleSpace);
        $thead = c("<thead></thead>");
        $thead.append(f);
        e.prepend($thead);
        this.sync();
      }
    },
    tableDeleteHead: function () {
      var e = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(e)) {
        return false;
      }
      var f = e.find("thead");
      if (f.length == 0) {
        return false;
      }
      this.bufferSet();
      f.remove();
      this.sync();
    },
    tableAddRowAbove: function () {
      this.tableAddRow("before");
    },
    tableAddRowBelow: function () {
      this.tableAddRow("after");
    },
    tableAddColumnLeft: function () {
      this.tableAddColumn("before");
    },
    tableAddColumnRight: function () {
      this.tableAddColumn("after");
    },
    tableAddRow: function (f) {
      var e = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(e)) {
        return false;
      }
      if (e.length == 0) {
        return false;
      }
      this.bufferSet();
      var g = c(this.getParent()).closest("tr");
      var h = g.clone();
      h.find("td").html(this.opts.invisibleSpace);
      if (f === "after") {
        g.after(h);
      } else {
        g.before(h);
      }
      this.sync();
    },
    tableAddColumn: function (h) {
      var g = c(this.getParent()).closest("table");
      if (!this.isParentRedactor(g)) {
        return false;
      }
      if (g.length == 0) {
        return false;
      }
      this.bufferSet();
      var f = 0;
      var j = c(this.getParent()).closest("tr");
      var e = c(this.getParent()).closest("td");
      j.find("td").each(
        c.proxy(function (l, m) {
          if (c(m)[0] === e[0]) {
            f = l;
          }
        }, this)
      );
      g.find("tr").each(
        c.proxy(function (l, n) {
          var m = c(n).find("td").eq(f);
          var o = m.clone();
          o.html(this.opts.invisibleSpace);
          h === "after" ? m.after(o) : m.before(o);
        }, this)
      );
      this.sync();
    },
    videoShow: function () {
      this.selectionSave();
      this.modalInit(
        this.opts.curLang.video,
        this.opts.modal_video,
        600,
        c.proxy(function () {
          c("#redactor_insert_video_btn").click(c.proxy(this.videoInsert, this));
          setTimeout(function () {
            c("#redactor_insert_video_area").focus();
          }, 200);
        }, this)
      );
    },
    videoInsert: function () {
      var e = c("#redactor_insert_video_area").val();
      e = this.cleanStripTags(e);
      this.selectionRestore();
      var f = this.getBlock() || this.getCurrent();
      if (f) {
        c(f).after(e);
      } else {
        this.insertHtmlAdvanced(e, false);
      }
      this.sync();
      this.modalClose();
    },
    linkShow: function () {
      this.selectionSave();
      var e = c.proxy(function () {
        this.insert_link_node = false;
        var g = this.getSelection();
        var f = "",
          o = "",
          j = "";
        var h = this.getParent();
        var l = c(h).parent().get(0);
        if (l && l.tagName === "A") {
          h = l;
        }
        if (h && h.tagName === "A") {
          f = h.href;
          o = c(h).text();
          j = h.target;
          this.insert_link_node = h;
        } else {
          o = g.toString();
        }
        c(".redactor_link_text").val(o);
        var q = self.location.href.replace(/\/$/i, "");
        var n = f.replace(q, "");
        if (this.opts.linkProtocol === false) {
          var p = new RegExp("^(http|ftp|https)://" + self.location.host, "i");
          n = n.replace(p, "");
        }
        var m = c("#redactor_tabs").find("a");
        if (this.opts.linkEmail === false) {
          m.eq(1).remove();
        }
        if (this.opts.linkAnchor === false) {
          m.eq(2).remove();
        }
        if (this.opts.linkEmail === false && this.opts.linkAnchor === false) {
          c("#redactor_tabs").remove();
          c("#redactor_link_url").val(n);
        } else {
          if (f.search("mailto:") === 0) {
            this.modalSetTab.call(this, 2);
            c("#redactor_tab_selected").val(2);
            c("#redactor_link_mailto").val(f.replace("mailto:", ""));
          } else {
            if (n.search(/^#/gi) === 0) {
              this.modalSetTab.call(this, 3);
              c("#redactor_tab_selected").val(3);
              c("#redactor_link_anchor").val(n.replace(/^#/gi, ""));
            } else {
              c("#redactor_link_url").val(n);
            }
          }
        }
        if (j === "_blank") {
          c("#redactor_link_blank").prop("checked", true);
        }
        c("#redactor_insert_link_btn").click(c.proxy(this.linkProcess, this));
        setTimeout(function () {
          c("#redactor_link_url").focus();
        }, 200);
      }, this);
      this.modalInit(this.opts.curLang.link, this.opts.modal_link, 460, e);
    },
    linkProcess: function () {
      var j = c("#redactor_tab_selected").val();
      var g = "",
        n = "",
        l = "",
        m = "";
      if (j === "1") {
        g = c("#redactor_link_url").val();
        n = c("#redactor_link_url_text").val();
        if (c("#redactor_link_blank").prop("checked")) {
          l = ' target="_blank"';
          m = "_blank";
        }
        var h = "((xn--)?[a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}";
        var f = new RegExp("^(http|ftp|https)://" + h, "i");
        var e = new RegExp("^" + h, "i");
        if (g.search(f) == -1 && g.search(e) == 0 && this.opts.linkProtocol) {
          g = this.opts.linkProtocol + g;
        }
      } else {
        if (j === "2") {
          g = "mailto:" + c("#redactor_link_mailto").val();
          n = c("#redactor_link_mailto_text").val();
        } else {
          if (j === "3") {
            g = "#" + c("#redactor_link_anchor").val();
            n = c("#redactor_link_anchor_text").val();
          }
        }
      }
      n = n.replace(/<|>/g, "");
      this.linkInsert('<a href="' + g + '"' + l + ">" + n + "</a>", c.trim(n), g, m);
    },
    linkInsert: function (e, j, f, h) {
      this.selectionRestore();
      if (j !== "") {
        if (this.insert_link_node) {
          this.bufferSet();
          c(this.insert_link_node).text(j).attr("href", f);
          if (h !== "") {
            c(this.insert_link_node).attr("target", h);
          } else {
            c(this.insert_link_node).removeAttr("target");
          }
          this.sync();
        } else {
          var g = c(e).addClass("redactor-added-link");
          this.exec("inserthtml", this.outerHtml(g), false);
          this.$editor
            .find("a.redactor-added-link")
            .removeAttr("style")
            .removeClass("redactor-added-link")
            .each(function () {
              if (this.className == "") {
                c(this).removeAttr("class");
              }
            });
          this.sync();
        }
      }
      setTimeout(
        c.proxy(function () {
          if (this.opts.observeLinks) {
            this.observeLinks();
          }
        }, this),
        5
      );
      this.modalClose();
    },
    fileShow: function () {
      this.selectionSave();
      var e = c.proxy(function () {
        var f = this.getSelection();
        var g = "";
        if (this.oldIE()) {
          g = f.text;
        } else {
          g = f.toString();
        }
        c("#redactor_filename").val(g);
        if (!this.isMobile()) {
          this.draguploadInit("#redactor_file", {
            url: this.opts.fileUpload,
            uploadFields: this.opts.uploadFields,
            success: c.proxy(this.fileCallback, this),
            error: c.proxy(function (j, h) {
              this.callback("fileUploadError", h);
            }, this),
            uploadParam: this.opts.fileUploadParam,
          });
        }
        this.uploadInit("redactor_file", {
          auto: true,
          url: this.opts.fileUpload,
          success: c.proxy(this.fileCallback, this),
          error: c.proxy(function (j, h) {
            this.callback("fileUploadError", h);
          }, this),
        });
      }, this);
      this.modalInit(this.opts.curLang.file, this.opts.modal_file, 500, e);
    },
    fileCallback: function (f) {
      this.selectionRestore();
      if (f !== false) {
        var h = c("#redactor_filename").val();
        if (h === "") {
          h = f.filename;
        }
        var g = '<a href="' + f.filelink + '" id="filelink-marker">' + h + "</a>";
        if (this.browser("webkit") && !!this.window.chrome) {
          g = g + "&nbsp;";
        }
        this.execCommand("inserthtml", g, false);
        var e = c(this.$editor.find("a#filelink-marker"));
        if (e.length != 0) {
          e.removeAttr("id");
        } else {
          e = false;
        }
        this.sync();
        this.callback("fileUpload", e, f);
      }
      this.modalClose();
    },
    imageShow: function () {
      this.selectionSave();
      var e = c.proxy(function () {
        if (this.opts.imageGetJson) {
          c.getJSON(
            this.opts.imageGetJson,
            c.proxy(function (m) {
              var h = {},
                l = 0;
              c.each(
                m,
                c.proxy(function (o, p) {
                  if (typeof p.folder !== "undefined") {
                    l++;
                    h[p.folder] = l;
                  }
                }, this)
              );
              var j = false;
              c.each(
                m,
                c.proxy(function (r, s) {
                  var q = "";
                  if (typeof s.title !== "undefined") {
                    q = s.title;
                  }
                  var o = 0;
                  if (!c.isEmptyObject(h) && typeof s.folder !== "undefined") {
                    o = h[s.folder];
                    if (j === false) {
                      j = ".redactorfolder" + o;
                    }
                  }
                  var p = c('<img src="' + s.thumb + '" class="redactorfolder redactorfolder' + o + '" rel="' + s.image + '" title="' + q + '" />');
                  c("#redactor_image_box").append(p);
                  c(p).click(c.proxy(this.imageThumbClick, this));
                }, this)
              );
              if (!c.isEmptyObject(h)) {
                c(".redactorfolder").hide();
                c(j).show();
                var n = function (o) {
                  c(".redactorfolder").hide();
                  c(".redactorfolder" + c(o.target).val()).show();
                };
                var g = c('<select id="redactor_image_box_select">');
                c.each(h, function (p, o) {
                  g.append(c('<option value="' + o + '">' + p + "</option>"));
                });
                c("#redactor_image_box").before(g);
                g.change(n);
              }
            }, this)
          );
        } else {
          c("#redactor_tabs").find("a").eq(1).remove();
        }
        if (this.opts.imageUpload || this.opts.s3) {
          if (!this.isMobile() && this.opts.s3 === false) {
            if (c("#redactor_file").length) {
              this.draguploadInit("#redactor_file", {
                url: this.opts.imageUpload,
                uploadFields: this.opts.uploadFields,
                success: c.proxy(this.imageCallback, this),
                error: c.proxy(function (h, g) {
                  this.callback("imageUploadError", g);
                }, this),
                uploadParam: this.opts.imageUploadParam,
              });
            }
          }
          if (this.opts.s3 === false) {
            this.uploadInit("redactor_file", {
              auto: true,
              url: this.opts.imageUpload,
              success: c.proxy(this.imageCallback, this),
              error: c.proxy(function (h, g) {
                this.callback("imageUploadError", g);
              }, this),
            });
          } else {
            c("#redactor_file").on("change.redactor", c.proxy(this.s3handleFileSelect, this));
          }
        } else {
          c(".redactor_tab").hide();
          if (!this.opts.imageGetJson) {
            c("#redactor_tabs").remove();
            c("#redactor_tab3").show();
          } else {
            var f = c("#redactor_tabs").find("a");
            f.eq(0).remove();
            f.eq(1).addClass("redactor_tabs_act");
            c("#redactor_tab2").show();
          }
        }
        c("#redactor_upload_btn").click(c.proxy(this.imageCallbackLink, this));
        if (!this.opts.imageUpload && !this.opts.imageGetJson) {
          setTimeout(function () {
            c("#redactor_file_link").focus();
          }, 200);
        }
      }, this);
      this.modalInit(this.opts.curLang.image, this.opts.modal_image, 610, e);
    },
    imageEdit: function (g) {
      var e = g;
      var f = e.parent().parent();
      var h = c.proxy(function () {
        c("#redactor_file_alt").val(e.attr("alt"));
        c("#redactor_image_edit_src").attr("href", e.attr("src"));
        c("#redactor_form_image_align").val(e.css("float"));
        if (c(f).get(0).tagName === "A") {
          c("#redactor_file_link").val(c(f).attr("href"));
          if (c(f).attr("target") == "_blank") {
            c("#redactor_link_blank").prop("checked", true);
          }
        }
        c("#redactor_image_delete_btn").click(
          c.proxy(function () {
            this.imageRemove(e);
          }, this)
        );
        c("#redactorSaveBtn").click(
          c.proxy(function () {
            this.imageSave(e);
          }, this)
        );
      }, this);
      this.modalInit(this.opts.curLang.edit, this.opts.modal_image_edit, 380, h);
    },
    imageRemove: function (f) {
      var e = c(f).parent();
      c(f).remove();
      if (e.length && e[0].tagName === "P") {
        this.$editor.focus();
        this.selectionStart(e);
      }
      this.callback("imageDelete", f);
      this.modalClose();
      this.sync();
    },
    imageSave: function (h) {
      var f = c(h);
      var g = f.parent();
      f.attr("alt", c("#redactor_file_alt").val());
      var n = c("#redactor_form_image_align").val();
      if (n === "left") {
        this.imageMargin = "0 " + this.opts.imageFloatMargin + " " + this.opts.imageFloatMargin + " 0";
        f.css({ float: "left", margin: this.imageMargin });
      } else {
        if (n === "right") {
          this.imageMargin = "0 0 " + this.opts.imageFloatMargin + " " + this.opts.imageFloatMargin + "";
          f.css({ float: "right", margin: this.imageMargin });
        } else {
          this.imageMargin = "0px";
          var l = f.closest("#redactor-image-box");
          if (l.length != 0) {
            l.css({ float: "", margin: "" });
          }
          f.css({ float: "", margin: "" });
        }
      }
      var j = c.trim(c("#redactor_file_link").val());
      if (j !== "") {
        var m = false;
        if (c("#redactor_link_blank").prop("checked")) {
          m = true;
        }
        if (g.get(0).tagName !== "A") {
          var e = c('<a href="' + j + '">' + this.outerHtml(h) + "</a>");
          if (m) {
            e.attr("target", "_blank");
          }
          f.replaceWith(e);
        } else {
          g.attr("href", j);
          if (m) {
            g.attr("target", "_blank");
          } else {
            g.removeAttr("target");
          }
        }
      } else {
        if (g.get(0).tagName === "A") {
          g.replaceWith(this.outerHtml(h));
        }
      }
      this.modalClose();
      this.observeImages();
      this.sync();
    },
    imageResizeHide: function (g) {
      if (g !== false && c(g.target).parent().length != 0 && c(g.target).parent()[0].id === "redactor-image-box") {
        return false;
      }
      var f = this.$editor.find("#redactor-image-box");
      if (f.length == 0) {
        return false;
      }
      this.$editor.find("#redactor-image-editter, #redactor-image-resizer").remove();
      if (this.imageMargin != "0px") {
        f.find("img").css("margin", this.imageMargin);
        f.css("margin", "");
        this.imageMargin = "0px";
      }
      f.find("img").css("opacity", "");
      f.replaceWith(function () {
        return c(this).contents();
      });
      c(document).off("click.redactor-image-resize-hide");
      this.$editor.off("click.redactor-image-resize-hide");
      this.$editor.off("keydown.redactor-image-delete");
      this.sync();
    },
    imageResize: function (f) {
      var e = c(f);
      e.on(
        "mousedown",
        c.proxy(function () {
          this.imageResizeHide(false);
        }, this)
      );
      e.on(
        "dragstart",
        c.proxy(function () {
          this.$editor.on(
            "drop.redactor-image-inside-drop",
            c.proxy(function () {
              setTimeout(
                c.proxy(function () {
                  this.observeImages();
                  this.$editor.off("drop.redactor-image-inside-drop");
                  this.sync();
                }, this),
                1
              );
            }, this)
          );
        }, this)
      );
      e.on(
        "click",
        c.proxy(function (l) {
          if (this.$editor.find("#redactor-image-box").length != 0) {
            return false;
          }
          var n = false,
            q,
            p,
            m = e.width() / e.height(),
            o = 20,
            j = 10;
          var g = this.imageResizeControls(e);
          var h = false;
          g.on("mousedown", function (r) {
            h = true;
            r.preventDefault();
            m = e.width() / e.height();
            q = Math.round(r.pageX - e.eq(0).offset().left);
            p = Math.round(r.pageY - e.eq(0).offset().top);
          });
          c(this.document.body)
            .on(
              "mousemove",
              c.proxy(function (v) {
                if (h) {
                  var s = Math.round(v.pageX - e.eq(0).offset().left) - q;
                  var r = Math.round(v.pageY - e.eq(0).offset().top) - p;
                  var u = e.height();
                  var w = parseInt(u, 10) + r;
                  var t = Math.round(w * m);
                  if (t > o) {
                    e.width(t);
                    if (t < 100) {
                      this.imageEditter.css({ marginTop: "-7px", marginLeft: "-13px", fontSize: "9px", padding: "3px 5px" });
                    } else {
                      this.imageEditter.css({ marginTop: "-11px", marginLeft: "-18px", fontSize: "11px", padding: "7px 10px" });
                    }
                  }
                  q = Math.round(v.pageX - e.eq(0).offset().left);
                  p = Math.round(v.pageY - e.eq(0).offset().top);
                  this.sync();
                }
              }, this)
            )
            .on("mouseup", function () {
              h = false;
            });
          this.$editor.on(
            "keydown.redactor-image-delete",
            c.proxy(function (s) {
              var r = s.which;
              if (this.keyCode.BACKSPACE == r || this.keyCode.DELETE == r) {
                this.bufferSet();
                this.imageResizeHide(false);
                this.imageRemove(e);
              }
            }, this)
          );
          c(document).on("click.redactor-image-resize-hide", c.proxy(this.imageResizeHide, this));
          this.$editor.on("click.redactor-image-resize-hide", c.proxy(this.imageResizeHide, this));
        }, this)
      );
    },
    imageResizeControls: function (f) {
      var g = c('<span id="redactor-image-box" data-redactor="verified">');
      g.css({ position: "relative", display: "inline-block", lineHeight: 0, outline: "1px dashed rgba(0, 0, 0, .6)", float: f.css("float") });
      g.attr("contenteditable", false);
      this.imageMargin = f[0].style.margin;
      if (this.imageMargin != "0px") {
        g.css("margin", this.imageMargin);
        f.css("margin", "");
      }
      f.css("opacity", 0.5).after(g);
      this.imageEditter = c('<span id="redactor-image-editter" data-redactor="verified">' + this.opts.curLang.edit + "</span>");
      this.imageEditter.css({
        position: "absolute",
        zIndex: 2,
        top: "50%",
        left: "50%",
        marginTop: "-11px",
        marginLeft: "-18px",
        lineHeight: 1,
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "11px",
        padding: "7px 10px",
        cursor: "pointer",
      });
      this.imageEditter.attr("contenteditable", false);
      this.imageEditter.on(
        "click",
        c.proxy(function () {
          this.imageEdit(f);
        }, this)
      );
      g.append(this.imageEditter);
      var e = c('<span id="redactor-image-resizer" data-redactor="verified"></span>');
      e.css({ position: "absolute", zIndex: 2, lineHeight: 1, cursor: "nw-resize", bottom: "-4px", right: "-5px", border: "1px solid #fff", backgroundColor: "#000", width: "8px", height: "8px" });
      e.attr("contenteditable", false);
      g.append(e);
      g.append(f);
      return e;
    },
    imageThumbClick: function (h) {
      var f = '<img id="image-marker" src="' + c(h.target).attr("rel") + '" alt="' + c(h.target).attr("title") + '" />';
      var g = this.getParent();
      if (this.opts.paragraphy && c(g).closest("li").length == 0) {
        f = "<p>" + f + "</p>";
      }
      this.imageInsert(f, true);
    },
    imageCallbackLink: function () {
      var f = c("#redactor_file_link").val();
      if (f !== "") {
        var e = '<img id="image-marker" src="' + f + '" />';
        if (this.opts.linebreaks === false) {
          e = "<p>" + e + "</p>";
        }
        this.imageInsert(e, true);
      } else {
        this.modalClose();
      }
    },
    imageCallback: function (e) {
      this.imageInsert(e);
    },
    imageInsert: function (f, h) {
      this.selectionRestore();
      if (f !== false) {
        var e = "";
        if (h !== true) {
          e = '<img id="image-marker" src="' + f.filelink + '" />';
          var g = this.getParent();
          if (this.opts.paragraphy && c(g).closest("li").length == 0) {
            e = "<p>" + e + "</p>";
          }
        } else {
          e = f;
        }
        this.execCommand("inserthtml", e, false);
        var j = c(this.$editor.find("img#image-marker"));
        if (j.length) {
          j.removeAttr("id");
        } else {
          j = false;
        }
        this.sync();
        h !== true && this.callback("imageUpload", j, f);
      }
      this.modalClose();
      this.observeImages();
    },
    modalTemplatesInit: function () {
      c.extend(this.opts, {
        modal_file:
          String() +
          '<section><div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;"><div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div></div><form id="redactorUploadFileForm" method="post" action="" enctype="multipart/form-data"><label>' +
          this.opts.curLang.filename +
          '</label><input type="text" id="redactor_filename" class="redactor_input" /><div style="margin-top: 7px;"><input type="file" id="redactor_file" name="' +
          this.opts.fileUploadParam +
          '" /></div></form></section>',
        modal_image_edit:
          String() +
          "<section><label>" +
          this.opts.curLang.title +
          '</label><input id="redactor_file_alt" class="redactor_input" /><label>' +
          this.opts.curLang.link +
          '</label><input id="redactor_file_link" class="redactor_input" /><label><input type="checkbox" id="redactor_link_blank"> ' +
          this.opts.curLang.link_new_tab +
          "</label><label>" +
          this.opts.curLang.image_position +
          '</label><select id="redactor_form_image_align"><option value="none">' +
          this.opts.curLang.none +
          '</option><option value="left">' +
          this.opts.curLang.left +
          '</option><option value="right">' +
          this.opts.curLang.right +
          '</option></select></section><footer><button id="redactor_image_delete_btn" class="redactor_modal_btn redactor_modal_delete_btn">' +
          this.opts.curLang._delete +
          '</button>&nbsp;&nbsp;&nbsp;<button class="redactor_modal_btn redactor_btn_modal_close">' +
          this.opts.curLang.cancel +
          '</button><input type="button" name="save" class="redactor_modal_btn redactor_modal_action_btn" id="redactorSaveBtn" value="' +
          this.opts.curLang.save +
          '" /></footer>',
        modal_image:
          String() +
          '<section><div id="redactor_tabs"><a href="#" class="redactor_tabs_act">' +
          this.opts.curLang.upload +
          '</a><a href="#">' +
          this.opts.curLang.choose +
          '</a><a href="#">' +
          this.opts.curLang.link +
          '</a></div><div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;"><div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div></div><form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data"><div id="redactor_tab1" class="redactor_tab"><input type="file" id="redactor_file" name="' +
          this.opts.imageUploadParam +
          '" /></div><div id="redactor_tab2" class="redactor_tab" style="display: none;"><div id="redactor_image_box"></div></div></form><div id="redactor_tab3" class="redactor_tab" style="display: none;"><label>' +
          this.opts.curLang.image_web_link +
          '</label><input type="text" name="redactor_file_link" id="redactor_file_link" class="redactor_input"  /></div></section><footer><button class="redactor_modal_btn redactor_btn_modal_close">' +
          this.opts.curLang.cancel +
          '</button><input type="button" name="upload" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_upload_btn" value="' +
          this.opts.curLang.insert +
          '" /></footer>',
        modal_link:
          String() +
          '<section><form id="redactorInsertLinkForm" method="post" action=""><div id="redactor_tabs"><a href="#" class="redactor_tabs_act">URL</a><a href="#">Email</a><a href="#">' +
          this.opts.curLang.anchor +
          '</a></div><input type="hidden" id="redactor_tab_selected" value="1" /><div class="redactor_tab" id="redactor_tab1"><label>URL</label><input type="text" id="redactor_link_url" class="redactor_input"  /><label>' +
          this.opts.curLang.text +
          '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" /><label><input type="checkbox" id="redactor_link_blank"> ' +
          this.opts.curLang.link_new_tab +
          '</label></div><div class="redactor_tab" id="redactor_tab2" style="display: none;"><label>Email</label><input type="text" id="redactor_link_mailto" class="redactor_input" /><label>' +
          this.opts.curLang.text +
          '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" /></div><div class="redactor_tab" id="redactor_tab3" style="display: none;"><label>' +
          this.opts.curLang.anchor +
          '</label><input type="text" class="redactor_input" id="redactor_link_anchor"  /><label>' +
          this.opts.curLang.text +
          '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" /></div></form></section><footer><button class="redactor_modal_btn redactor_btn_modal_close">' +
          this.opts.curLang.cancel +
          '</button><input type="button" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_link_btn" value="' +
          this.opts.curLang.insert +
          '" /></footer>',
        modal_table:
          String() +
          "<section><label>" +
          this.opts.curLang.rows +
          '</label><input type="text" size="5" value="2" id="redactor_table_rows" /><label>' +
          this.opts.curLang.columns +
          '</label><input type="text" size="5" value="3" id="redactor_table_columns" /></section><footer><button class="redactor_modal_btn redactor_btn_modal_close">' +
          this.opts.curLang.cancel +
          '</button><input type="button" name="upload" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_table_btn" value="' +
          this.opts.curLang.insert +
          '" /></footer>',
        modal_video:
          String() +
          '<section><form id="redactorInsertVideoForm"><label>' +
          this.opts.curLang.video_html_code +
          '</label><textarea id="redactor_insert_video_area" style="width: 99%; height: 160px;"></textarea></form></section><footer><button class="redactor_modal_btn redactor_btn_modal_close">' +
          this.opts.curLang.cancel +
          '</button><input type="button" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_video_btn" value="' +
          this.opts.curLang.insert +
          '" /></footer>',
      });
    },
    modalInit: function (m, h, f, n) {
      var e = c("#redactor_modal_overlay");
      if (!e.length) {
        this.$overlay = e = c('<div id="redactor_modal_overlay" style="display: none;"></div>');
        c("body").prepend(this.$overlay);
      }
      if (this.opts.modalOverlay) {
        e.show().on("click", c.proxy(this.modalClose, this));
      }
      var j = c("#redactor_modal");
      if (!j.length) {
        this.$modal = j = c('<div id="redactor_modal" style="display: none;"><div id="redactor_modal_close">&times;</div><header id="redactor_modal_header"></header><div id="redactor_modal_inner"></div></div>');
        c("body").append(this.$modal);
      }
      c("#redactor_modal_close").on("click", c.proxy(this.modalClose, this));
      this.hdlModalClose = c.proxy(function (o) {
        if (o.keyCode === this.keyCode.ESC) {
          this.modalClose();
          return false;
        }
      }, this);
      c(document).keyup(this.hdlModalClose);
      this.$editor.keyup(this.hdlModalClose);
      this.modalcontent = false;
      if (h.indexOf("#") == 0) {
        this.modalcontent = c(h);
        c("#redactor_modal_inner").empty().append(this.modalcontent.html());
        this.modalcontent.html("");
      } else {
        c("#redactor_modal_inner").empty().append(h);
      }
      j.find("#redactor_modal_header").html(m);
      if (typeof c.fn.draggable !== "undefined") {
        j.draggable({ handle: "#redactor_modal_header" });
        j.find("#redactor_modal_header").css("cursor", "move");
      }
      var l = c("#redactor_tabs");
      if (l.length) {
        var g = this;
        l.find("a").each(function (o, p) {
          o++;
          c(p).on("click", function (r) {
            r.preventDefault();
            l.find("a").removeClass("redactor_tabs_act");
            c(this).addClass("redactor_tabs_act");
            c(".redactor_tab").hide();
            c("#redactor_tab" + o).show();
            c("#redactor_tab_selected").val(o);
            if (g.isMobile() === false) {
              var q = j.outerHeight();
              j.css("margin-top", "-" + (q + 10) / 2 + "px");
            }
          });
        });
      }
      j.find(".redactor_btn_modal_close").on("click", c.proxy(this.modalClose, this));
      if (this.opts.autoresize === true) {
        this.saveModalScroll = this.document.body.scrollTop;
      } else {
        this.saveModalScroll = this.$editor.scrollTop();
      }
      if (this.isMobile() === false) {
        j.css({ position: "fixed", top: "-2000px", left: "50%", width: f + "px", marginLeft: "-" + (f + 60) / 2 + "px" }).show();
        this.modalSaveBodyOveflow = c(document.body).css("overflow");
        c(document.body).css("overflow", "hidden");
      } else {
        j.css({ position: "fixed", width: "100%", height: "100%", top: "0", left: "0", margin: "0", minHeight: "300px" }).show();
      }
      if (typeof n === "function") {
        n();
      }
      if (this.isMobile() === false) {
        setTimeout(function () {
          var o = j.outerHeight();
          j.css({ top: "50%", height: "auto", minHeight: "auto", marginTop: "-" + (o + 10) / 2 + "px" });
        }, 10);
      }
    },
    modalClose: function () {
      c("#redactor_modal_close").off("click", this.modalClose);
      c("#redactor_modal").fadeOut(
        "fast",
        c.proxy(function () {
          var e = c("#redactor_modal_inner");
          if (this.modalcontent !== false) {
            this.modalcontent.html(e.html());
            this.modalcontent = false;
          }
          e.html("");
          if (this.opts.modalOverlay) {
            c("#redactor_modal_overlay").hide().off("click", this.modalClose);
          }
          c(document).unbind("keyup", this.hdlModalClose);
          this.$editor.unbind("keyup", this.hdlModalClose);
          this.selectionRestore();
          if (this.opts.autoresize && this.saveModalScroll) {
            c(this.document.body).scrollTop(this.saveModalScroll);
          } else {
            if (this.opts.autoresize === false && this.saveModalScroll) {
              this.$editor.scrollTop(this.saveModalScroll);
            }
          }
        }, this)
      );
      if (this.isMobile() === false) {
        c(document.body).css("overflow", this.modalSaveBodyOveflow ? this.modalSaveBodyOveflow : "visible");
      }
      return false;
    },
    modalSetTab: function (e) {
      c(".redactor_tab").hide();
      c("#redactor_tabs")
        .find("a")
        .removeClass("redactor_tabs_act")
        .eq(e - 1)
        .addClass("redactor_tabs_act");
      c("#redactor_tab" + e).show();
    },
    s3handleFileSelect: function (l) {
      var h = l.target.files;
      for (var g = 0, j; (j = h[g]); g++) {
        this.s3uploadFile(j);
      }
    },
    s3uploadFile: function (e) {
      this.s3executeOnSignedUrl(
        e,
        c.proxy(function (f) {
          this.s3uploadToS3(e, f);
        }, this)
      );
    },
    s3executeOnSignedUrl: function (e, h) {
      var f = new XMLHttpRequest();
      var g = "?";
      if (this.opts.s3.search(/\?/) != "-1") {
        g = "&";
      }
      f.open("GET", this.opts.s3 + g + "name=" + e.name + "&type=" + e.type, true);
      if (f.overrideMimeType) {
        f.overrideMimeType("text/plain; charset=x-user-defined");
      }
      f.onreadystatechange = function (j) {
        if (this.readyState == 4 && this.status == 200) {
          c("#redactor-progress").fadeIn();
          h(decodeURIComponent(this.responseText));
        } else {
          if (this.readyState == 4 && this.status != 200) {
          }
        }
      };
      f.send();
    },
    s3createCORSRequest: function (g, e) {
      var f = new XMLHttpRequest();
      if ("withCredentials" in f) {
        f.open(g, e, true);
      } else {
        if (typeof XDomainRequest != "undefined") {
          f = new XDomainRequest();
          f.open(g, e);
        } else {
          f = null;
        }
      }
      return f;
    },
    s3uploadToS3: function (f, e) {
      var g = this.s3createCORSRequest("PUT", e);
      if (!g) {
      } else {
        g.onload = c.proxy(function () {
          if (g.status == 200) {
            c("#redactor-progress, #redactor-progress-drag").hide();
            var l = e.split("?");
            if (!l[0]) {
              return false;
            }
            this.selectionRestore();
            var h = "";
            h = '<img id="image-marker" src="' + l[0] + '" />';
            if (this.opts.paragraphy) {
              h = "<p>" + h + "</p>";
            }
            this.execCommand("inserthtml", h, false);
            var j = c(this.$editor.find("img#image-marker"));
            if (j.length) {
              j.removeAttr("id");
            } else {
              j = false;
            }
            this.sync();
            this.callback("imageUpload", j, false);
            this.modalClose();
            this.observeImages();
          } else {
          }
        }, this);
        g.onerror = function () {};
        g.upload.onprogress = function (h) {};
        g.setRequestHeader("Content-Type", f.type);
        g.setRequestHeader("x-amz-acl", "public-read");
        g.send(f);
      }
    },
    uploadInit: function (g, e) {
      this.uploadOptions = { url: false, success: false, error: false, start: false, trigger: false, auto: false, input: false };
      c.extend(this.uploadOptions, e);
      var f = c("#" + g);
      if (f.length && f[0].tagName === "INPUT") {
        this.uploadOptions.input = f;
        this.el = c(f[0].form);
      } else {
        this.el = f;
      }
      this.element_action = this.el.attr("action");
      if (this.uploadOptions.auto) {
        c(this.uploadOptions.input).change(
          c.proxy(function (h) {
            this.el.submit(function (j) {
              return false;
            });
            this.uploadSubmit(h);
          }, this)
        );
      } else {
        if (this.uploadOptions.trigger) {
          c("#" + this.uploadOptions.trigger).click(c.proxy(this.uploadSubmit, this));
        }
      }
    },
    uploadSubmit: function (f) {
      c("#redactor-progress").fadeIn();
      this.uploadForm(this.element, this.uploadFrame());
    },
    uploadFrame: function () {
      this.id = "f" + Math.floor(Math.random() * 99999);
      var f = this.document.createElement("div");
      var e = '<iframe style="display:none" id="' + this.id + '" name="' + this.id + '"></iframe>';
      f.innerHTML = e;
      c(f).appendTo("body");
      if (this.uploadOptions.start) {
        this.uploadOptions.start();
      }
      c("#" + this.id).load(c.proxy(this.uploadLoaded, this));
      return this.id;
    },
    uploadForm: function (j, h) {
      if (this.uploadOptions.input) {
        var l = "redactorUploadForm" + this.id,
          e = "redactorUploadFile" + this.id;
        this.form = c('<form  action="' + this.uploadOptions.url + '" method="POST" target="' + h + '" name="' + l + '" id="' + l + '" enctype="multipart/form-data" />');
        if (this.opts.uploadFields !== false && typeof this.opts.uploadFields === "object") {
          c.each(
            this.opts.uploadFields,
            c.proxy(function (n, f) {
              if (f != null && f.toString().indexOf("#") === 0) {
                f = c(f).val();
              }
              var o = c("<input/>", { type: "hidden", name: n, value: f });
              c(this.form).append(o);
            }, this)
          );
        }
        var g = this.uploadOptions.input;
        var m = c(g).clone();
        c(g).attr("id", e).before(m).appendTo(this.form);
        c(this.form).css("position", "absolute").css("top", "-2000px").css("left", "-2000px").appendTo("body");
        this.form.submit();
      } else {
        j.attr("target", h).attr("method", "POST").attr("enctype", "multipart/form-data").attr("action", this.uploadOptions.url);
        this.element.submit();
      }
    },
    uploadLoaded: function () {
      var h = c("#" + this.id)[0],
        j;
      if (h.contentDocument) {
        j = h.contentDocument;
      } else {
        if (h.contentWindow) {
          j = h.contentWindow.document;
        } else {
          j = window.frames[this.id].document;
        }
      }
      if (this.uploadOptions.success) {
        c("#redactor-progress").hide();
        if (typeof j !== "undefined") {
          var g = j.body.innerHTML;
          var f = g.match(/\{(.|\n)*\}/)[0];
          f = f.replace(/^\[/, "");
          f = f.replace(/\]$/, "");
          var e = c.parseJSON(f);
          if (typeof e.error == "undefined") {
            this.uploadOptions.success(e);
          } else {
            this.uploadOptions.error(this, e);
            this.modalClose();
          }
        } else {
          this.modalClose();
          alert("Upload failed!");
        }
      }
      this.el.attr("action", this.element_action);
      this.el.attr("target", "");
    },
    draguploadInit: function (f, e) {
      this.draguploadOptions = c.extend({ url: false, success: false, error: false, preview: false, uploadFields: false, text: this.opts.curLang.drop_file_here, atext: this.opts.curLang.or_choose, uploadParam: false }, e);
      if (window.FormData === undefined) {
        return false;
      }
      this.droparea = c('<div class="redactor_droparea"></div>');
      this.dropareabox = c('<div class="redactor_dropareabox">' + this.draguploadOptions.text + "</div>");
      this.dropalternative = c('<div class="redactor_dropalternative">' + this.draguploadOptions.atext + "</div>");
      this.droparea.append(this.dropareabox);
      c(f).before(this.droparea);
      c(f).before(this.dropalternative);
      this.dropareabox.on(
        "dragover",
        c.proxy(function () {
          return this.draguploadOndrag();
        }, this)
      );
      this.dropareabox.on(
        "dragleave",
        c.proxy(function () {
          return this.draguploadOndragleave();
        }, this)
      );
      this.dropareabox.get(0).ondrop = c.proxy(function (g) {
        g.preventDefault();
        this.dropareabox.removeClass("hover").addClass("drop");
        this.dragUploadAjax(this.draguploadOptions.url, g.dataTransfer.files[0], false, false, false, this.draguploadOptions.uploadParam);
      }, this);
    },
    dragUploadAjax: function (h, l, f, g, n, m) {
      if (!f) {
        var o = c.ajaxSettings.xhr();
        if (o.upload) {
          o.upload.addEventListener("progress", c.proxy(this.uploadProgress, this), false);
        }
        c.ajaxSetup({
          xhr: function () {
            return o;
          },
        });
      }
      var j = new FormData();
      if (m !== false) {
        j.append(m, l);
      } else {
        j.append("file", l);
      }
      if (this.opts.uploadFields !== false && typeof this.opts.uploadFields === "object") {
        c.each(
          this.opts.uploadFields,
          c.proxy(function (p, e) {
            if (e != null && e.toString().indexOf("#") === 0) {
              e = c(e).val();
            }
            j.append(p, e);
          }, this)
        );
      }
      c.ajax({
        url: h,
        dataType: "html",
        data: j,
        cache: false,
        contentType: false,
        processData: false,
        type: "POST",
        success: c.proxy(function (q) {
          q = q.replace(/^\[/, "");
          q = q.replace(/\]$/, "");
          var p = typeof q === "string" ? c.parseJSON(q) : q;
          if (f) {
            g.fadeOut("slow", function () {
              c(this).remove();
            });
            var e = c("<img>");
            e.attr("src", p.filelink).attr("id", "drag-image-marker");
            this.insertNodeToCaretPositionFromPoint(n, e[0]);
            var r = c(this.$editor.find("img#drag-image-marker"));
            if (r.length) {
              r.removeAttr("id");
            } else {
              r = false;
            }
            this.sync();
            this.observeImages();
            if (r) {
              this.callback("imageUpload", r, p);
            }
            if (typeof p.error !== "undefined") {
              this.callback("imageUploadError", p);
            }
          } else {
            if (typeof p.error == "undefined") {
              this.draguploadOptions.success(p);
            } else {
              this.draguploadOptions.error(this, p);
              this.draguploadOptions.success(false);
            }
          }
        }, this),
      });
    },
    draguploadOndrag: function () {
      this.dropareabox.addClass("hover");
      return false;
    },
    draguploadOndragleave: function () {
      this.dropareabox.removeClass("hover");
      return false;
    },
    uploadProgress: function (g, h) {
      var f = g.loaded ? parseInt((g.loaded / g.total) * 100, 10) : g;
      this.dropareabox.text("Loading " + f + "% " + (h || ""));
    },
    isMobile: function () {
      return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
    },
    normalize: function (e) {
      if (typeof e === "undefined") {
        return 0;
      }
      return parseInt(e.replace("px", ""), 10);
    },
    outerHtml: function (e) {
      return c("<div>").append(c(e).eq(0).clone()).html();
    },
    isString: function (e) {
      return Object.prototype.toString.call(e) == "[object String]";
    },
    isEmpty: function (e) {
      e = e.replace(/&#x200b;|<br>|<br\/>|&nbsp;/gi, "");
      e = e.replace(/\s/g, "");
      e = e.replace(/^<p>[^\W\w\D\d]*?<\/p>$/i, "");
      return e == "";
    },
    isIe11: function () {
      return !!navigator.userAgent.match(/Trident\/7\./);
    },
    browser: function (f) {
      var g = navigator.userAgent.toLowerCase();
      var e =
        /(opr)[\/]([\w.]+)/.exec(g) ||
        /(chrome)[ \/]([\w.]+)/.exec(g) ||
        /(webkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(g) ||
        /(webkit)[ \/]([\w.]+)/.exec(g) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(g) ||
        /(msie) ([\w.]+)/.exec(g) ||
        (g.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(g)) ||
        (g.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(g)) ||
        [];
      if (f == "version") {
        return e[2];
      }
      if (f == "webkit") {
        return e[1] == "chrome" || e[1] == "webkit";
      }
      if (e[1] == "rv") {
        return f == "msie";
      }
      if (e[1] == "opr") {
        return f == "webkit";
      }
      return f == e[1];
    },
    oldIE: function () {
      if (this.browser("msie") && parseInt(this.browser("version"), 10) < 9) {
        return true;
      }
      return false;
    },
    getFragmentHtml: function (f) {
      var e = f.cloneNode(true);
      var g = this.document.createElement("div");
      g.appendChild(e);
      return g.innerHTML;
    },
    extractContent: function () {
      var e = this.$editor[0];
      var g = this.document.createDocumentFragment();
      var f;
      while ((f = e.firstChild)) {
        g.appendChild(f);
      }
      return g;
    },
    isParentRedactor: function (e) {
      if (!e) {
        return false;
      }
      if (this.opts.iframe) {
        return e;
      }
      if (c(e).parents("div.redactor_editor").length == 0 || c(e).hasClass("redactor_editor")) {
        return false;
      } else {
        return e;
      }
    },
    currentOrParentIs: function (e) {
      var f = this.getParent(),
        g = this.getCurrent();
      return f && f.tagName === e ? f : g && g.tagName === e ? g : false;
    },
    isEndOfElement: function () {
      var f = this.getBlock();
      var h = this.getCaretOffset(f);
      var g = c.trim(c(f).text()).replace(/\n\r\n/g, "");
      var e = g.length;
      if (h == e) {
        return true;
      } else {
        return false;
      }
    },
    isFocused: function () {
      var e,
        f = this.getSelection();
      if (f && f.rangeCount && f.rangeCount > 0) {
        e = f.getRangeAt(0).startContainer;
      }
      if (!e) {
        return false;
      }
      if (this.opts.iframe) {
        if (this.getCaretOffsetRange().equals()) {
          return !this.$editor.is(e);
        } else {
          return true;
        }
      }
      return c(e).closest("div.redactor_editor").length != 0;
    },
    removeEmptyAttr: function (f, e) {
      if (c(f).attr(e) == "") {
        c(f).removeAttr(e);
      }
    },
    removeFromArrayByValue: function (g, f) {
      var e = null;
      while ((e = g.indexOf(f)) !== -1) {
        g.splice(e, 1);
      }
      return g;
    },
  };
  b.prototype.init.prototype = b.prototype;
  c.Redactor.fn.formatLinkify = function (x, u, m, r, j) {
    var s = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
      q = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,
      e = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi,
      w = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,
      t = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    var v = (this.$editor ? this.$editor.get(0) : this).childNodes,
      l = v.length;
    while (l--) {
      var h = v[l];
      if (h.nodeType === 3) {
        var p = h.nodeValue;
        if (r && p) {
          var o = '<iframe width="500" height="281" src="',
            g = '" frameborder="0" allowfullscreen></iframe>';
          if (p.match(w)) {
            p = p.replace(w, o + "//www.youtube.com/embed/$1" + g);
            c(h).after(p).remove();
          } else {
            if (p.match(t)) {
              p = p.replace(t, o + "//player.vimeo.com/video/$2" + g);
              c(h).after(p).remove();
            }
          }
        }
        if (m && p && p.match(e)) {
          p = p.replace(e, '<img src="$1">');
          c(h).after(p).remove();
        }
        if (u && p && (p.match(s) || p.match(q))) {
          var f = p.match(s) || p.match(q);
          f = f[0];
          if (f.length > j) {
            f = f.substring(0, j) + "...";
          }
          p = p
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(s, '$1<a href="' + x + '$2">' + c.trim(f) + "</a>$3")
            .replace(q, '$1<a href="$2">' + c.trim(f) + "</a>$5");
          c(h).after(p).remove();
        }
      } else {
        if (h.nodeType === 1 && !/^(a|button|textarea)$/i.test(h.tagName)) {
          c.Redactor.fn.formatLinkify.call(h, x, u, m, r, j);
        }
      }
    }
  };
})(jQuery);

