
!function(win, doc){

  var Log = {
    init: function() {
      var self = this;

      this.$wrap = $('#J_logList');
      this.listTpl = $('#log-list-tpl').html();

      this.onsocket();
    },
    onsocket: function() {
      var self = this,
        socket = io.connect('http://127.0.0.1:3003'),
        template = '';

      socket.on('connect', function() {
        socket.emit('join', {
          id: 1
        });
      });

      socket.on('message', function(data) {
        if(!data.length){
          return;
        }

        console.log(data);
        // if(typeof data.body == 'undefined' ) return;

        template = _.template(self.listTpl)({
          datas: data
        });
        self.$wrap.prepend(template);        
      })
    }
  }

  Log.init();
}(window, document);