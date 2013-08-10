define( 'app/handlers/explicit/reddit'
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

  handler.createModel = function(el, type) {
    var model = Handler.prototype.createModel.call(this, el, type);

    var $el = model.get('$el');

    model.set('name', $el.text());
    model.set('id', $el.text());

    model.get('authority').uri = $el.attr('href');

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

  handler.create$el = function(model){
    return $('<a class="prop-ref">give &thorn;rops</a>');
  };

  handler.decorate = function(model){
    var $el         = model.get('$el')
      , $decorator  = this.badge(model)
      , $li         = $('<li />')
      ;

    $el.closest('.entry').find('ul.buttons').append($li.append($decorator));
  };

  handler.getType = function($el) {
    if ($el.closest('.commentarea').length) {
      return 'item.comment';
    }
    return 'list.item';
  };

  handler.selectors = [
      { selector : 'a.author' }
  ];

  return handler;
});