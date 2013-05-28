define('app/workflow', [], function(workflow){
	function overlay(options){
    var id     = options.id
      , elm   = $('#' + id)
      ;

    if (options.hide) {
      elm.hide();
    } else {
      if (elm.length === 0) {
        // Create styles for overlay
        // var transitionSpeed = options && options.transitionSpeed || 500;
        // var opacity = options && options.opacity || 0;

        // var css = 'opacity:' + opacity + ';-webkit-transition:opacity ' + transitionSpeed + 'ms linear;';

        elm = $('<iframe />');
        elm  .attr('allowtransparency', 'true')
            .attr('scrolling', 'no')
            .attr('id', id)
            .attr('name', id)
            .attr('src', options.src)
            // .attr('style', css)
            ;

        elm.load(function(e){
          $('body').css({ 'overflow': 'hidden' });

          $(this).css('opacity', 1);
           //setTimeout(function () {

          //   frame.style.cssText = WL.buildCss({

          //     'opacity': 1,
          //     'transitionSpeed': 50
          //   });
          // }, 0);
        });

        $('body').append(elm);

        function xdm_handler(e) {
          switch(e.data) {
            case 'close_propularity':
              close();
              window.removeEventListener('message', xdm_handler, false);
              break;
          }
        }

        window.addEventListener('message', xdm_handler, false);

        function close() {
          elm.css('opacity', 0);

          setTimeout(function () {
            elm.attr('src', 'about:blank');
            elm.load(function () {
              $('body').css({ 'overflow': '' });

              elm.remove();
              elm = null;
            });
          }, 500);
        }

      }
    }
  }

  return {
  	overlay : overlay
  };
});