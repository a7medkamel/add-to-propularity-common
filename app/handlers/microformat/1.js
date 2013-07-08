define( 'app/handlers/microformat/1'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity, options){

  options = options || {};

  var defaults = {
    authority : {
        alias     : undefined
      , uri       : undefined
      , domain    : undefined
    }
  };

  jQuery.extend( options, defaults );

  var data_attr_prefix = 'propularity-give-';

  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : options.authority.alias
      , uri       : options.authority.uri
      , domain    : options.authority.domain
    }
  });

  function create(el, type) {
    var model = Identity.create(handler, $(el), type);

    var $el = model.get('$el');

    var data = $el.data('propularity-send');

    model.set(data);

    switch(model.get('type')) {
      case 'standalone':
        model.get('context').$el = $el;
        break;
    }

    return model;
  };

  handler.findAll = function(){
    var selectors = [
        { selector : '*[data-propularity-send]', type : 'standalone' }
    ];

    return Array.prototype.concat.apply([], _.map(selectors, function(item){
      return _.map($.makeArray($(item.selector)), function(el){ return create(el, item.type); });
    }));
  };

  handler.isHandlerFor = function(document){
    return $('*[data-propularity-send]').length > 0;
  };

  handler.decorate = function(model){
    var $el         = model.get('$el')
      , $decorator  = $('<button class="btn btn-success">give &thorn;rop</button>')
      ;

    $decorator.attr('href', Identity.get_message_post_href(model));
    $decorator.data('propularity-model', model);

    $el.append($decorator);
    $el.addClass('propularity');

    model.set('$decorator', $decorator);
  };

  return handler;
});