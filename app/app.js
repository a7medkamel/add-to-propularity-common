define('app/app', ['app/conf', 'app/workflow', 'app/registry', 'app/models/page', 'app/models/identity'], function(conf, workflow, registry, Page, Identity){
  function startup() {

    registry.registerAll();

    Page.process(function(err, page){
      if (!err && page) {

        page.get('identities').forEach(function(model){
          model.get('$decorator').click(function(event){
            event.preventDefault();

            var model = $(this).data('propularity-model');

            console.log(model);
            workflow.overlay({
                show  : true
              , id    : conf.overlay.id
              , src   : Identity.get_message_post_href(model)
              // , src   : 'http://alpha.propularity.com/thirdparty/web/login/'
            });

            // todo correctly prevent navigation
            return false;
          });
        });

      }
    });
  }

  return {
      startup : startup
  };
});