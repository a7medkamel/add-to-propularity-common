define( 'app/registry'
      , ['libs/underscore', 'app/conf', 'app/models/handler', 'app/models/identity']
      , function(_, conf, Handler, Identity){

  var registry = [];

  function registerAll() {
    var modules = _.filter(require.s.contexts['_'].registry, function(element){
      return element.map.name.indexOf(conf.handlers_namespace) == 0;
    });

    registry = _.map(modules, function(element){
      return element.factory(Handler, Identity);
    });
  }

  function find(cb) {
    var hostname = document.location.hostname;

    var handler = _.find(registry, function(element){
      var uri   = element.get('authority').uri;

      if (_.isRegExp(uri)) {
        return uri.test(hostname);
      } else {
        return uri === hostname;
      }
    });

    cb(undefined, handler);
  };

  return {
      find        : find
    , registerAll : registerAll
  };
});