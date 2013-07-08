define( 'app/registry'
      , ['libs/underscore', 'app/conf', 'app/models/handler', 'app/models/identity']
      , function(_, conf, Handler, Identity){

  function findAll() {
    var defined = conf.modules.findAll();

    var handler_modules = _.filter(defined, function(element){
      return element.map.name.indexOf(conf.handlers.namespace) == 0;
    });

    return handler_modules.map(function(element){
      return element.factory(Handler, Identity);
    });
  }

  return {
      findAll : findAll
  };
});