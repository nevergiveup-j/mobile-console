
!function(win, doc){

  var Log = {
    init: function() {
      var self = this;

      this.onsocket();
    },
    onsocket: function() {
      var self = this;

      var socket = io.connect('http://127.0.0.1:3003');

      socket.on('connection', function() {
        socket.emit('join', {
          id: 1
        });
      });

      socket.on('message', function(data) {
        console.log(data);
      })
    }
  }

  Log.init();
}(window, document);