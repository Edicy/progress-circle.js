;(function() {
    
    'use strict';
    
    var template = '<svg xmlns="http://www.w3.org/2000/svg" class="progress-circle">'
      + '<circle class="progress-circle-bg" fill="none"></circle>'
      + '<path class="progress-circle-fg" d="M0,0 A0,0 0 1,0 0,0" fill="none" />'
    + '</svg>';
    
    var build_svg = function(options) {
        var svg = $(template);
        svg.attr({
            'width': options.width, 'height': options.height
        });
        svg.find('.progress-circle-bg').attr({
            'cx': options.cx, 'cy': options.cy, 'r': options.r,
            'stroke': options.bgColor, 'stroke-width': options.bgStroke
        });
        svg.find('.progress-circle-fg').attr({
            'stroke': options.fgColor, 'stroke-width': options.fgStroke
        });
        return svg;
    };
    
    var build_circle = function(el, options) {
        var innerWidth = el.innerWidth(),
            innerHeight = el.innerHeight(),
            size = Math.min(innerWidth, innerHeight),
            radius = (size / 2) - options.bgStroke,
            x = (size / 2),
            y = (size / 2);
    
        el.append(build_svg($.extend({
            width: size, height: size, cx: x, cy: y, r: radius
        }, options))).data({'progressCircleX': x, 'progressCircleY': y, 'progressCircleRadius': radius});
    };
    
    var arc_path = function(percentage, x, y, r) {
        var endx = 0,
            endy = 0,
            large_arc_flag = 0,
            deg = (percentage * 360) / 100;
    
        if (deg > 180) {
            large_arc_flag = 1;
        }
    
        endx = x + r * Math.cos(Math.PI * (deg + 90) / 180);
        endy = y - r * Math.sin(Math.PI * (deg + 90) / 180);
    
        return 'M' + x + ',' + (y - r) + ' A' + r + ',' + r + ' 0 ' + large_arc_flag + ',0 ' + endx + ',' + endy;
    };
    
    var set_progress = function(el, percentage) {
        el.find('.progress-circle-fg').attr('d', arc_path(percentage, el.data('progressCircleX'), el.data('progressCircleY'), el.data('progressCircleRadius')));
    };
    
    $.fn.progressCircle = function(options) {

        var settings = $.extend({
            bgColor: '#ddd',
            fgColor: '#999',
            bgStroke: (options.fgStroke || 10),
            fgStroke: (options.bgStroke || 10),
            progress: 0
        }, options);
 
        return this.each(function() {
            var $this = $(this);
                
            if (typeof($this.data('progressCircle')) === 'undefined') {
                build_circle($this, settings);
            }
            
            set_progress($this, ($.isNumeric(options) ? options : settings.progress));
            
            return this;
        });
    };
    
})();
