define('app/models/page', ['libs/backbone', 'app/registry', 'app/decorators/identity'], function(Backbone, registry, identity){
  var Page = Backbone.Model.extend({
      defaults    : {
          handler     : undefined
        , identities   : undefined
      }
  }, {
      process     : function(cb){
        registry.find(function(err, handler){
          if (!err && handler) {
            var decorate = handler.decorate || identity.decorate;
            var page = new Page({
                handler     : handler
              , identities  : handler.findAll().map(function(i){
                  decorate(i);
                  return i;
              })
            });

            cb(undefined, page);
          } else {
            cb(err);
          }
        });
      }
  });

  return Page;
});