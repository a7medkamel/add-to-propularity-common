define( 'app/handlers/explicit/engadget'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'engadget'
      , uri       : /engadget\.com/
      , domain    : 'engadget.com'
    }
  });

  function create(el) {
    var model = Identity.create(handler, $(el));

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    model.get('authority').name = model.get('type').indexOf('@engadget') != -1 ? 'engadget' : 'livefyre';

    switch(model.get('type')) {
      case 'list.item@engadget':
        var $el_context = $el.closest('.post-header').find('.headline a');
        if ($el_context) {
          model.set('context', {
              $el   : $el_context
            , uri   : $el_context.attr('href')
            , title : $el_context.text()
          });
        }
        break;
      case 'item.comment@livefyre':
        var $el_context = $el.closest('.fyre-comment-article');
        if ($el_context) {
          model.set('context', {
              $el     : $el_context
            , id      : $el_context.find('article').attr('id')
            , content : $el_context.find('.fyre-comment-body .fyre-comment').text()
            , uri     : document.location.href
          });
        }
        break;
    }

    return model;
  };

  handler.getType = function($el) {
    if ($el.closest('a.fyre-comment-username').length) {
      return 'item.comment@livefyre';
    }
    return 'list.item@engadget';
  };

  handler.findAll = function(){
    return _.map($.makeArray($('.byline a, a.fyre-comment-username')), create);
  };

  return handler;
});