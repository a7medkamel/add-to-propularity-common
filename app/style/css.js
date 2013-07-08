define('app/style/css', [ 'libs/jquery' ]
, function($){
  function load(root) {
		$('<link/>')
			.attr({
					rel		: 'stylesheet'
				, type 	: 'text/css'
        , href 	: root + 'embed.css'
      })
			.appendTo('head');
  }

  return {
      load : load
  };
});