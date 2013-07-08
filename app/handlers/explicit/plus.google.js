define( 'app/handlers/explicit/plus.google'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'google'
      , uri       : /plus\.google\.com/
      , domain    : 'plus.google.com'
    }
  });

  function create(model) {
    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.attr('oid'));

    model.get('authority').uri = $el.prop('href');

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
    }

    return model;
  };

  handler.getType = function($el) {
    return 'list.item';
  };

  handler.findAll = function(){
    return $.makeArray($('[oid]')).map(function(el){
      return create(Identity.create(handler, el));
    });
  };

  return handler;
});