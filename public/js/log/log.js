
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
          id: 1,
          username: 'username'
        });
      });

      let msg = {
        id: '111',
        body: '24',
        bowser: 'Chrome',
        date: '15:22:15',
        screen: '1920x1080'
      }

      socket.on('message', function(data) {
        if(typeof data.body == 'undefined' ) return;

        template = _.template(self.listTpl)(data);
        self.$wrap.prepend(template);        
      })
    }
  }

  Log.init();
}(window, document);