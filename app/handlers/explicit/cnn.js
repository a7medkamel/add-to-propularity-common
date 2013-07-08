define( 'app/handlers/explicit/cnn'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'cnn'
      , uri       : /www\.cnn\.com/
      , domain    : 'www.cnn.com'
    }
  });

  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.attr('data-user'));

    model.get('authority').uri = $el.attr('href');

    var $el_context = $el.closest('li');
    if ($el_context) {
      model.set('context', {
          $el     : $el_context
        // , uri     : $el_context.attr('href')
        // , title   : $el_context.text()
        , id      : $el_context.attr('id')
        , content : $el_context.find('.post-body').first().find('[data-role="message"] p').html()
      });
    }

    return model;
  };

  handler.findAll = function(){
    return _.map($.makeArray($('[data-action="profile"]')), create);
  };

  return handler;
});