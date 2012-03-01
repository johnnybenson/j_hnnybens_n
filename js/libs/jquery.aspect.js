/*
 * Simple jQuery plugin to detect and apply a aspect ratio class name to an $element
 *
 * Usage: $(el).aspect();
 *
 * Options:
 *  - debug: false | true                 # Display debug messages in console
 *  - resizeEvent: true | false           # Window resize event updates classnames
 *  - portraitClass: .aspect-portrait
 *  - landscapeClass: .aspect-landscape
 *  - squareClass: .aspect-square
 *
 *
 * Author: Johnny Benson
 * Website: http://j-hnnybens-n.com
 *
 * Revisions:
 *		0.1		- Initial commit
 *
 * References:
 *		http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *		http://docs.jquery.com/Plugins/Authoring
 *    https://github.com/hantu/jquery-plugin-template
 *
 */

(function($) {
  
  var aspect = {
    defaults : {
      debug: false,
      resizeEvent: true,
      portraitClass: 'aspect-portrait',
      landscapeClass: 'aspect-landscape',
      squareClass: 'aspect-square'
    },
    setClassName : function(element, o) {
      var $el = $(element),
          height = $el.height(),
          width = $el.width(),
          ratio = height/width;
      if (element === window) {
        // Window can't have a class name applied to it
        // So lets stick it in on the body
        $el = $('body');
      }
      $el.removeClass(o.portraitClass).removeClass(o.landscapeClass);        
      if (ratio === 1)
      {
       aspect.debug(o.debug, 'jQuery.aspect -- Square');
       $el.addClass(o.squareClass);       
      }
      else
      {
       aspect.debug(o.debug, 'jQuery.aspect -- Aspect: ' + ((ratio > 1) ? o.portaitClass : o.landscapeClass ) + ' -- ' + ratio);
       $el.addClass(((ratio > 1 ) ? o.portraitClass : o.landscapeClass ));       
      }
    },
    debug : function(debug, message) {
      if (window.console && window.console.log && debug)
        window.console.log(message);
    }
  };

  $.fn.aspect = function(options) {

    var opts = $.extend({}, aspect.defaults, options),
        $win = $(window);

    aspect.debug(opts.debug, 'jQuery.aspect -- Object Count: ' + this.size());

    return this.each(function() {
      var o =  $.meta ? $.extend({}, opts, $this.data()) : opts;
      aspect.setClassName(this, o);      
      if (o.resizeEvent){
        $win.unbind('resize.aspect').bind('resize.aspect', function() {
          aspect.setClassName(this, o);
        });
      }
    });
    
  };

})(jQuery);