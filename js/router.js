(function(){
  this.Router = function () {
    this.routes = {};
    window.addEventListener('load', this.resolve.bind(this), false);
    window.addEventListener('hashchange', this.resolve.bind(this), false);
  }

  this.Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () { };
  };

  this.Router.prototype.resolve = function () {
    this.curHash = location.hash.slice(1) || '/';
    match_key = this.match_reg( this.curHash )
    try{
      typeof this.routes[match_key] === 'function' && this.routes[match_key](this.curHash);
    }catch(e){
      window.location.hash = ''
    }
  };

  this.Router.prototype.match_reg = function (cur_hash) {
    // if matching nothing goes '/'
    match_key = '/'
    for( router_key in this.routes){
      reg = new RegExp('^' + router_key + '$')
      if(cur_hash.match(reg)){
        match_key = router_key
      }
    }
    return match_key
  };
}).call(this)