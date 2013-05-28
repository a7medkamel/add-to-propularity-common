define( 'app/handlers/hackernews'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'hackernews'
      , uri       : /news\.ycombinator\.com/
      , domain    : 'news.ycombinator.com'
    }
  });

  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    model.get('authority').href = $el.attr('href');

    var $el_context = $el.closest('tr').prev('tr').find('td.title a').first();
    if ($el_context) {
      model.set('context', {
          $el   : $el_context
        , uri   : $el_context.attr('href')
        , title : $el_context.text()
      });
    }

    return model;
  };

  handler.findAll = function(){
    return _.map($.makeArray($('.subtext a')), create);
  };

  return handler;
});