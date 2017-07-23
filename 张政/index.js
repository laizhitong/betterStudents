<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script src="/socket.io/socket.io.js"></script>
	<script>
  $(function () {
	  function Page() {
	  	this.socket = io();
	  	this.form = $('form');
	  	this.m = $('#m');
	  	this.messages = $('#messages');
	  }
	  
	  $.extend(Page.prototype, {	  	
	  	init: function() {
	  		this.bindEvents();
	  		
	  	},
	 
	  	bindEvents: function() {
	  		this.form.on("submit", $.proxy(this.handleSubmitClick, this));
	  		this.socket.on('brodecast', $.proxy(this.handleGetMessage, this))
	  	},
	  	
	  	handleSubmitClick: function() {
	  		 this.socket.emit('othermessage', this.m.val());
     		         this.m.val('');
	     	         return false;
	  	},
	  	
	  	handleGetMessage: function(msg) {
	  		this.messages.append($('<li>').text(msg));
	  	}	  	  	
	  });
		  var page = new Page();
		  page.init();
 	})
	</script>
  </body>
</html>
    
