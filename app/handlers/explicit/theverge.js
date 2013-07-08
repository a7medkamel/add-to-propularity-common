define( 'app/handlers/explicit/theverge'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){
  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'theverge'
      , uri       : /theverge\.com/
      , domain    : 'theverge.com'
    }
  });

  // TODO implement author on front page...
  function create(el, type) {
    var model = Identity.create(handler, $(el), type);

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    // model.get('authority').name = model.get('type').indexOf('@engadget') != -1 ? 'engadget' : 'livefyre';

    switch(model.get('type')) {
      case 'author':
        var $el_context = $el.closest('header').find('.headline');
        if ($el_context) {
          model.set('context', {
              $el   : $el_context
            , uri   : document.location.href
            , title : $el_context.text()
          });
        }
        break;
      case 'user.comment':
        var $el_context = $el.closest('.citem');
        if ($el_context) {
          model.set('context', {
              $el     : $el_context
            , id      : $el_context.attr('data-comment-id').val()
            , content : $el_context.find('.cbody').text()
            , uri     : document.location.href
          });
        }
        break;
    }

    return model;
  };

  handler.findAll = function(){
    var selectors = [
        { selector : '.byline a.author', type : 'author' }
      , { selector : '.username a', type : 'user.comment' }
    ];

    return Array.prototype.concat.apply([], _.map(selectors, function(item){
      return _.map($.makeArray($(item.selector)), function(el){ return create(el, item.type); });
    }));
  };

  return handler;
});