// needs URI preloaded - global scopre
define('app/models/identity', ['app/conf', 'libs/backbone'], function(conf, Backbone){
  var Identity = Backbone.Model.extend({
      defaults    : {
          $el         : undefined
        , name        : undefined
        , id          : undefined
        , type        : undefined
        , authority   : {
            name      : undefined
          , href      : undefined
        }
        , context     : {
            $el       : undefined
          , id        : undefined
          , uri       : undefined
          , title     : undefined
          , content   : undefined
        }
      }
  }, {
      create : function(handler, $el){
        return new Identity({
            $el         : $el
          , type        : handler.getType? handler.getType($el) : undefined
          , authority   : {
              name      : handler.get('authority').alias
          }
        });
      }
    , get_message_post_href : function(model) {
        // http://alpha.propularity.com/thirdparty/web/user/reddit/timmyak/message/?context={%22uri%22:%22http://ahmedkamel.not/2013/01/30/tip-13-ubuntu-find-process-listening-to-port-80/%22}
        var href = conf.host + 'thirdparty/web/user/' + model.get('authority').name + '/' + model.get('id') + '/message/';

        var model_context = model.get('context');
        var context = {
            uri     : model_context.uri
          , title   : model_context.title
          , content : model_context.content
        };
        var uri = new URI(href).query({ 'context' : JSON.stringify(context) });

        return uri.toString();
      }
  });

  return Identity;
});