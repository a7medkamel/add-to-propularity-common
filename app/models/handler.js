define('app/models/handler', ['libs/underscore', 'libs/backbone'], function(_, Backbone){
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
    , isHandlerFor : function(document) {
      var hostname  = document.location.hostname
        , uri       = this.get('authority').uri
        ;

      if (toString.call(uri) == '[object RegExp]') {
        return uri.test(hostname);
      } else {
        return uri === hostname;
      }
    }
  });

  return Handler;
});