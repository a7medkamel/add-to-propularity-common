define( 'app/handlers/explicit/twitter'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'twitter'
      , uri       : /twitter\.com/
      , domain    : 'twitter.com'
    }
  });

  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    model.get('authority').uri = $el.closest('a').prop('href');

    switch(model.get('type')) {
      case 'list.item':
        var $el_context = $el.closest('li').first();
        if ($el_context) {
          model.set('context', {
              $el   : $el_context
            , id    : $el_context.attr('data-item-id')
            // https://twitter.com/Windows/status/33468872295412121
            , uri   : 'https://twitter.com/Windows/status/' + $el_context.attr('data-item-id')
            , title : $el_context.find('.tweet-text').text()
          });
        }
      case 'item.comment':
        var $el_context = $el.closest('li').first();
        if ($el_context) {
          model.set('context', {
              $el     : $el_context
            , id      : $el_context.find('.tweet').attr('data-item-id')
            // https://twitter.com/Windows/status/33468872295412121
            , uri     : 'https://twitter.com/Windows/status/' + $el_context.find('.tweet').attr('data-item-id')
            , content : $el_context.find('.tweet-text').text()
          });
        }
        break;
      case 'item':
        var $el_context = $el.closest('.permalink-tweet').first();
        if ($el_context) {
          model.set('context', {
              $el   : $el_context
            , id      : $el_context.attr('data-item-id')
            // https://twitter.com/Windows/status/33468872295412121
            , uri   : 'https://twitter.com/Windows/status/' + $el_context.attr('data-item-id')
            , title : $el_context.find('.tweet-text').text()
          });
        }
        break;
    }

    return model;
  };

  handler.getType = function($el) {
    if ($el.closest('.permalink-replies').length) {
      return 'item.comment';
    } else if ($el.closest('.permalink-tweet').length) {
      return 'item';
    }
    return 'list.item';
  };

  handler.findAll = function(){
    return _.map($.makeArray($('.username b')), create);
  };

  return handler;
});