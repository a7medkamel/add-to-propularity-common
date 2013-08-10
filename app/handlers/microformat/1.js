define( 'app/handlers/microformat/1'
      , ['app/models/handler', 'app/models/identity']
      , function(Handler, Identity){

  var data_attr_prefix = 'propularity-give-';

  var handler = new Handler({
      version     : 1
    , authority   : {
        alias     : 'microformat 1.0'
      , uri       : document.location.hostname
      , domain    : document.location.hostname
    }
  });

  handler.createModel = function(el, type) {
    var model = Handler.prototype.createModel.call(this, el, type);

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

  handler.selectors = [
      { selector : '*[data-propularity-send]', type : 'standalone' }
  ];

  handler.isHandlerFor = function(document){
    return $('*[data-propularity-send]').length > 0;
  };

  handler.create$el = function(model){
    return $('<button class="btn btn-success">give &thorn;rop</button>');
  };

  handler.decorate = function(model){
    var $el         = model.get('$el')
      , $decorator  = this.badge(model)
      ;

    $el.append($decorator);
    $el.addClass('propularity');
  };

  return handler;
});