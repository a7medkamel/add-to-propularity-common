define( 'app/handlers/facebook'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'facebook'
      , uri       : /facebook\.com/
      , domain    : 'facebook.com'
    }
  });

  var stream_uri_id_capture = /^.*www\.facebook\.com\/(.*)\?.*$/i;
  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    var id_match = stream_uri_id_capture.exec($el.prop('href'));
    model.set('id', id_match? id_match[1] : undefined);

    model.get('authority').href = $el.closest('a').prop('href');

    switch(model.get('type')) {
      case 'list.item':
        var $el_context = $el.closest('li').first();
        console.log($el_context);
        if ($el_context) {
          model.set('context', {
              $el   	: $el_context
            // , uri   	: 'https://twitter.com/Windows/status/' + $el_context.attr('data-item-id')
            // , id 			: model.get('id')
            , content : $el_context.find('.messageBody').text()
          });
        }
      // case 'item.comment':
      //   var $el_context = $el.closest('li').first();
      //   if ($el_context) {
      //     model.set('context', {
      //         $el     : $el_context
      //       // https://twitter.com/Windows/status/33468872295412121
      //       , uri   : 'https://twitter.com/Windows/status/' + $el_context.find('.tweet').attr('data-item-id')
      //       , content : $el_context.find('.tweet-text').text()
      //     });
      //   }
      //   break;
      // case 'item':
      //   var $el_context = $el.closest('.permalink-tweet').first();
      //   if ($el_context) {
      //     model.set('context', {
      //         $el   : $el_context
      //       // https://twitter.com/Windows/status/33468872295412121
      //       , uri   : 'https://twitter.com/Windows/status/' + $el_context.attr('data-item-id')
      //       , title : $el_context.find('.tweet-text').text()
      //     });
      //   }
      //   break;
    }

    return model;
  };

  handler.getType = function($el) {
    // if ($el.closest('.actorName.actorDescription').length) {
    //   return 'item.comment';
    // } else if ($el.closest('.permalink-tweet').length) {
    //   return 'item';
    // }
    return 'list.item'; //.actorName.actorDescription
  };

  handler.findAll = function(){
    return _.map($.makeArray($('.actorName a, .passiveName a')), create);
  };

  return handler;
});