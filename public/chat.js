window.onload = function() {
 
    var messages = [];    
    var socket = io.connect('http://localhost:8080');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var participants = document.getElementById("participants");
    var name = document.getElementById("name");
    var chooseColor = function() {
        var hex = '0123456789ABCDEF'.split('');
        var combination = '#';
        for(var i = 0; i < 6; i++ ) {
            combination += hex[Math.floor(Math.random() * 16)];
        }
        return combination;
    }
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);           
            var html = '';  
			var user = '';
            
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';   
				html += messages[i].message + '<span style="color:' + chooseColor() + '"><br />';		
				user += '<p>'+(messages[i].username && (messages[i].username != messages[i-1].username) ? messages[i].username : '' ) + '</p>';               
            }
            
            content.innerHTML = html;    
			participants.innerHTML = user;
			content.scrollTop = content.scrollHeight;	
            
			document.onkeydown = function(evt) {
			if (evt.keyCode === 13 && ['name', 'field'].indexOf(document.activeElement.id) > -1 ) { sendMessage(); }
			else { }
			}
			
        } else {
            console.log("There is a problem:", data);
        }
    });
	
    sendButton.onclick = sendMessage=function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
			field.value = "";
        }
    };
	
	
 
}