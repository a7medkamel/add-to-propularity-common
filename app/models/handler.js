define('app/models/handler', ['libs/underscore', 'libs/backbone', 'app/models/identity'], function(_, Backbone, Identity){
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
    , isHandlerFor  : function(document) {
      var hostname  = document.location.hostname
        , uri       = this.get('authority').uri
        ;

      if (toString.call(uri) == '[object RegExp]') {
        return uri.test(hostname);
      } else {
        return uri === hostname;
      }
    }
    , create$el     : function(model) {
      return $('<a class="prop-ref">+&thorn;rop</a>');
    }
    , badge         : function(model) {

      $decorator = this.create$el(model);
      $decorator.attr('href', Identity.get_message_post_href(model));
      $decorator.data('propularity-model', model);

      // $el.addClass('propularity');

      model.set('$decorator', $decorator);

      return $decorator;
    }
    , decorate : function(model) {
      var $el         = model.get('$el')
        , $decorator  = this.badge(model)
        ;

      $el.after($decorator);
    }
    , selectors : []
    , createModel : function(el, type) {
      // TODO this will create a strange model with microformat as
      // authority and underfined as user if there is no date in object
      return Identity.create(this, $(el), type);
    }
    , findAll : function(){
      var self = this;
      return Array.prototype.concat.apply([], _.map(this.selectors, function(item){
        var els     = $.makeArray($(item.selector))
          , bare    = _.filter(els, function(el){
            return !$(el).data('propularity-model');
          })
          , models  = _.map(bare, function(el){
            return self.createModel(el, item.type);
          })
          ;

        return models;
      }));
    }

  });

  return Handler;
});