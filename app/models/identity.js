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
          , uri       : undefined
        }
        , context     : {
            $el       : undefined
          , id        : undefined
          , uri       : undefined
          , title     : undefined
          , content   : undefined
          , timestamp : undefined
        }
        , $int        : {
            handler   : undefined
        }
      }
  }, {
      create : function(handler, $el, type){
        var model = $el.data('propularity-model')

        if (!model) {
          model = new Identity({
              $el         : $el
            , type        : type || (handler.getType? handler.getType($el) : undefined)
            , authority   : {
                name      : handler.get('authority').alias
            }
            , $int        : {
                handler   : handler
            }
          });

          $el.data('propularity-model', model);
        }

        return model;
      }
    , get_message_post_href : function(model) {
        // http://alpha.propularity.com/thirdparty/web/user/reddit/timmyak/message/?context={%22uri%22:%22http://ahmedkamel.not/2013/01/30/tip-13-ubuntu-find-process-listening-to-port-80/%22}
        var href = conf.host + 'api/ui/user/' + model.get('authority').name + '/' + model.get('id') + '/message/';

        var model_context = model.get('context');
        var context = {
            uri     : model_context.uri
          , title   : model_context.title
          , content : model_context.content
        };

        return href + '?context=' + encodeURIComponent(JSON.stringify(context)).replace(/%20/g, '+');
        // var uri = new URI(href).query({ 'context' : JSON.stringify(context) });
        // return uri.toString();
      }
  });

  return Identity;
});