define('app/models/handler', ['libs/backbone'], function(Backbone){
	var Handler = Backbone.Model.extend({
      defaults    : {
          version     : undefined
        , authority   : {
            name      : undefined
          , alias     : undefined
          , uri       : undefined
          , domain    : undefined
        }
      }
  });

  return Handler;
});