/*!
 * color-sampler v0.1.3
 * https://github.com/emn178/color-sampler
 *
 * Copyright 2015, emn178@gmail.com
 *
 * @license under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function ($, window, document) {
  'use strict';

  var KEY = 'color-sampler';
  var SELECTOR = ':' + KEY;
  var OFFSET_CSS = ['padding', 'border'];
  var init = false, preview, previewPixels = [], previewing = false, interval = 200,
      timer, observations = $();

  $.expr[':'][KEY] = function (element) {
    return $(element).data(KEY) !== undefined;
  };

  function Sampler(canvas, options) {
    this.canvas = $(canvas);

    this.options = options || {};
    this.enabled = true;
    this.context = canvas.getContext("2d");
    this.resize();

    this.canvas.on('mousemove', this.onMousemove.bind(this));
    this.canvas.on('mouseout', this.onMouseout.bind(this));
    this.canvas.on('click', this.onClick.bind(this));
  }

  Sampler.prototype.resize = function () {
    var canvas = this.canvas;
    var bounds = {
      left: 0,
      top: 0
    };
    OFFSET_CSS.forEach(function (css) {
      bounds.left += parseInt(canvas.css(css + '-left')) || 0;
      bounds.top += parseInt(canvas.css(css + '-top')) || 0;
    });
    bounds.right = canvas.width();
    bounds.bottom = canvas.height();
    this.bounds = bounds;
  };

  Sampler.prototype.onMousemove = function (e) {
    if (!this.enabled) {
      return;
    }
    var canvas = this.canvas;
    var bounds = this.bounds;
    var x = e.offsetX - bounds.left;
    var y = e.offsetY - bounds.top;
    if (x < 0 || y < 0 || x >= bounds.right || y >= bounds.bottom) {
      hidePreview();
      return;
    }
    preview.css({
      left: (e.pageX + 5) + 'px',
      top: (e.pageY + 5) + 'px'
    });
    var pixels = this.setupPreview(x, y);
    showPreview();
    this.color = previewPixels[60].css('background-color');
    if ($.isFunction(this.options.onPreview)) {
      this.options.onPreview.call(canvas, this.color);
    }
  };

  Sampler.prototype.setupPreview = function (centralX, centralY) {
    var startX = centralX - 5;
    var startY = centralY - 5;
    var data = this.context.getImageData(startX, startY, 11, 11).data;
    for (var i = 0, j = 0; i < data.length; i += 4, ++j) {
      var y = parseInt(j / 11) + startY;
      var x = j % 11 + startX;
      if (x < 0 || y < 0) {
        previewPixels[j].css('background-color', 'white');
      } else {
        var color = 'rgba(' + Array.prototype.slice.call(data, i, i + 4).join(',') + ')';
        previewPixels[j].css('background-color', color);
      }
    }
  };

  Sampler.prototype.onMouseout = function () {
    hidePreview();
  };

  Sampler.prototype.onClick = function (e) {
    if (!this.color || !this.enabled) {
      return;
    }
    if ($.isFunction(this.options.onSelect)) {
      this.options.onSelect.call(this.canvas, this.color);
    }
  };

  Sampler.prototype.detect = function () {
    if (this.canvas.width() != this.bounds.right || this.canvas.height() != this.bounds.bottom) {
      this.resize();
    }
  };

  Sampler.prototype.enable = function (enabled) {
    if (enabled === undefined) {
      enabled = true;
    }
    this.enabled = enabled;
  };

  Sampler.prototype.disable = function (disabled) {
    if (disabled === undefined) {
      disabled = true;
    }
    this.enabled = !disabled;
    hidePreview();
  };

  function resize() {
    $(SELECTOR).each(function () {
      $(this).data(KEY).resize();
    });
  }

  function createPreview() {
    preview = $('<div class="color-sampler-preview"/>');
    var table = $('<table/>');
    preview.append(table);
    for (var y = 0; y < 11; ++y) {
      var tr = $('<tr>');
      for (var x = 0; x < 11; ++x) {
        var td = $('<td></td>').attr('x', x).attr('y', y);
        previewPixels.push(td);
        tr.append(td);
      }
      table.append(tr);
    }
    $('body').append(preview);
  }

  function showPreview() {
    if (previewing) {
      return;
    }
    previewing = true;
    preview.addClass('active');
  }

  function hidePreview() {
    if (!previewing) {
      return;
    }
    previewing = false;
    preview.removeClass('active');
  }

  function detect() {
    observations = observations.filter(SELECTOR);
    observations.each(function () {
      $(this).data(KEY).detect();
    });
    if (observations.length === 0) {
      timer = clearInterval(timer);
    }
  }

  var PublicMethods = ['enable', 'disable', 'resize'];
  $.fn.colorSampler = function (method, options) {
    var sampler, isString = typeof (method) == 'string';
    this.filter('canvas').each(function () {
      if (isString) {
        if ($.inArray(method, PublicMethods) != -1) {
          sampler = $(this).data(KEY);
          if (sampler) {
            sampler[method].apply(sampler, options);
          }
        }
      } else {
        options = method;
        sampler = new Sampler(this, options);
        $(this).data(KEY, sampler);

        if (!init) {
          init = true;
          createPreview();
          $(document).ready(function () {
            $(window).bind('resize', resize);
          });
        }

        observations = observations.add(this);
        if (interval && !timer) {
          timer = setInterval(detect, interval);
        }
      }
    });
    return this;
  };

  $.colorSamper = {};

  $.colorSamper.setInterval = function (v) {
    if (v == interval || !$.isNumeric(v) || v < 0) {
      return;
    }
    interval = v;
    timer = clearInterval(timer);
    if (interval > 0) {
      timer = setInterval(detect, interval);
    }
  };
})(jQuery, window, document);
