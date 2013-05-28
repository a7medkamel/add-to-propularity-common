define( 'app/handlers/reddit'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'reddit'
      , uri       : /reddit\.com/
      , domain    : 'reddit.com'
    }
  });

  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    model.get('authority').href = $el.attr('href');

    switch(model.get('type')) {
      case 'list.item':
        var $el_context = $el.closest('.entry').find('a.title');
        if ($el_context) {
          model.set('context', {
              $el   : $el_context
            , uri   : $el_context.attr('href')
            , title : $el_context.text()
          });
        }
        break;
      case 'item.comment':
        var $el_context = $el.closest('.entry');
        if ($el_context) {
          model.set('context', {
              $el     : $el_context
            , uri     : $el_context.find('.bylink').attr('href')
            , content : $el_context.find('.usertext-body').text()
          });
        }
        break;
    }

    return model;
  };

  handler.getType = function($el) {
    if ($el.closest('.commentarea').length) {
      return 'item.comment';
    }
    return 'list.item';
  };

  handler.findAll = function(){
    return _.map($.makeArray($('a.author')), create);
  };

  return handler;
});