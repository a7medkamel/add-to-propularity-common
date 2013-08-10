define('app/app', [ 'app/conf'
                  , 'app/workflow'
                  , 'app/registry'
                  , 'app/models/identity']
                  , function(conf, workflow, registry, Identity){

  function startup() {
    var handlers = registry.findAll();

    var models = [].concat.apply([], handlers.map(function(i){
      return i.isHandlerFor(document)? i.findAll() : [];
    }));

    models.forEach(function(i){
      i.get('$int').handler.decorate(i);
      i.get('$decorator').click(function(event){
        event.preventDefault();

        var model = $(this).data('propularity-model');

        workflow.overlay({
            show  : true
          , id    : conf.overlay.id
          , src   : Identity.get_message_post_href(model)
        });

        // todo correctly prevent navigation
        return false;
      });
    });
  }

  return {
      startup : startup
  };
});