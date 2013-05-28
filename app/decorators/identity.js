define('app/decorators/identity', ['app/models/identity'], function(Identity){
  function decorate(model) {
    var $el         = model.get('$el')
      , $decorator  = $('<a class="prop-ref">+&thorn;rop</a>')
      ;

    $decorator.attr('href', Identity.get_message_post_href(model));
    $decorator.data('propularity-model', model);

    $el.after($decorator);

    model.set('$decorator', $decorator);
  }

  return {
      decorate : decorate
  };
});