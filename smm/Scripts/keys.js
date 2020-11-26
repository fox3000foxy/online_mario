/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */
marioctrl = location.href.indexOf("play=mario")!=-1?true:false
luigictrl = location.href.indexOf("play=luigi")!=-1?true:false
peachctrl = location.href.indexOf("play=peach")!=-1?true:false

var cam = 0
if (marioctrl==true){cam=0}
if (luigictrl==true){cam=1}
if (peachctrl==true){cam=2}

var socket = io()
    
setInterval("if(cam==-1){cam=counterplayer-1}if(cam==counterplayer){cam=0}",100)
var keys = {
	bind : function() {
		$(document).on('keydown', function(event) {	
			return keys.handler(event, true,1,0);
			return keysluigi.handler(event, true,1,0);
			return keyspeach.handler(event, true,1,0);
		});
		$(document).on('keyup', function(event) {	
    if(event.keyCode == 'P'.charCodeAt()){if(marioctrl==true){start=start==0?1:3;socket.emit("pause",start)}}
			return keys.handler(event, false,1,0);
			return keysluigi.handler(event, false,1,0);
			return keyspeach.handler(event, false,1,0);
            
        });
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
		keysluigi.left = false;
		keysluigi.right = false;
		keysluigi.accelerate = false;
		keysluigi.up = false;
		keysluigi.down = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
        
	},
	handler : function(event, status, withkeypad,elsebutton) {
	if(withkeypad){
        switch(event.keyCode) {
			case 57392://CTRL on MAC
			case 17://CTRL
            if (marioctrl==true){keys.accelerate = status;socket.emit("mario1",salon+"&"+status)}         
				break;
			case 40://DOWN ARROW
			if (marioctrl==true){keys.down = status;socket.emit("mario2",salon+"&"+status)}
                break;
			case 39://RIGHT ARROW
			if (marioctrl==true){keys.right = status;socket.emit("mario3",salon+"&"+status)}
				break;
			case 37://LEFT ARROW
			if (marioctrl==true){keys.left = status;socket.emit("mario4",salon+"&"+status)}
				break;
			case 38://UP ARROW
			if (marioctrl==true){keys.up = status;socket.emit("mario5",salon+"&"+status)}
				break;
			case 'A'.charCodeAt()://F
			if (luigictrl==true){keysluigi.accelerate = status;socket.emit("luigi1",salon+"&"+status)}
 				break;
			case 'S'.charCodeAt()://
			if (luigictrl==true){keysluigi.down = status;socket.emit("luigi2",salon+"&"+status)}
  				break;
			case 'D'.charCodeAt()://
			if (luigictrl==true){keysluigi.right = status;socket.emit("luigi3",salon+"&"+status)}
  				break;
			case 'Q'.charCodeAt()://
			if (luigictrl==true){keysluigi.left = status;socket.emit("luigi4",salon+"&"+status)}
 			break;
			case 'Z'.charCodeAt()://
			if (luigictrl==true){keysluigi.up = status;socket.emit("luigi5",salon+"&"+status)}
				break;
            case 'N'.charCodeAt()://F
			if (peachctrl==true){keyspeach.accelerate = status;socket.emit("peach1",salon+"&"+status)}
				break;
			case 'K'.charCodeAt()://
			if (peachctrl==true){keyspeach.down = status;socket.emit("peach2",salon+"&"+status)}
				break;
			case 'L'.charCodeAt()://
			if (peachctrl==true){keyspeach.right = status;socket.emit("peach3",salon+"&"+status)}
				break;
			case 'J'.charCodeAt()://
			if (peachctrl==true){keyspeach.left = status;socket.emit("peach4",salon+"&"+status)}
 				break;
			case 'I'.charCodeAt()://
			if (peachctrl==true){keyspeach.up = status;socket.emit("peach5",salon+"&"+status)}
 				break;
            case 'Y'.charCodeAt():/*CAMERA SWICTH*/ if (cam > 2){setTimeout('cam = 0',200);break;}else{setTimeout('cam += 0.5',200);break;}
			case 'T'.charCodeAt():/*CAMERA SWICTH*/ if (cam < 0 ){setTimeout('cam = 2',200);break;}else{setTimeout('cam += -0.5',200);break;}
			default:
				return true;
		}
    }
    else{
				switch(elsebutton) {
                    case "fireball":
				keys.accelerate = status;
				break;
                    case 'down':
				keys.down = status;
				break;
                    case 'right':
				keys.right = status;
				break;
                    case 'left':
				keys.left = status;			
				break;
                    case 'up':
				keys.up = status;
				break;
			default:
				return true;
		}
    }
		//event.preventDefault();
		return false;
	},
	accelerate : false,
	left : false,
	up : false,
	right : false,
	down : false,
};

var keysluigi = {
	bind : function() {
		$(document).on('keydown', function(event) {	
			return keys.handler(event, true,1,0);
		});
		$(document).on('keyup', function(event) {	
			return keys.handler(event, false,1,0);
		});
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
	},
	handler : function(event, status, withkeypad,elsebutton) {
	if(withkeypad){
        switch(event.keyCode) {
			case 'J'.charCodeAt()://J
				keys.accelerate = status;
				break;
			case 'S'.charCodeAt()://
				keys.down = status;
				break;
			case 'D'.charCodeAt()://
				keys.right = status;
				break;
			case 'Q'.charCodeAt()://
				keys.left = status;			
				break;
			case 'Z'.charCodeAt()://
				keys.up = status;
				break;
			default:
				return true;
		}
    }
		//event.preventDefault();
		return false;
	},
	accelerate : false,
	left : false,
	up : false,
	right : false,
	down : false,
};

var keyspeach = {
	bind : function() {
		$(document).on('keydown', function(event) {	
			return keys.handler(event, true,1,0);
		});
		$(document).on('keyup', function(event) {	
			return keys.handler(event, false,1,0);
		});
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
	},
	handler : function(event, status, withkeypad,elsebutton) {
	if(withkeypad){
        switch(event.keyCode) {
			case 'B'.charCodeAt()://J
				keys.accelerate = status;
				break;
			case 'K'.charCodeAt()://
				keys.down = status;
				break;
			case 'L'.charCodeAt()://
				keys.right = status;
				break;
			case 'J'.charCodeAt()://
				keys.left = status;			
				break;
			case 'I'.charCodeAt()://
				keys.up = status;
				break;
			default:
				return true;
		}
    }
		//event.preventDefault();
		return false;
	},
	accelerate : false,
	left : false,
	up : false,
	right : false,
	down : false,
};
/*
socket.on('mario1', function(msg){
keys.accelerate = msg;
});  
socket.on('mario2', function(msg){
    keys.down = msg;
});  
*/
socket.on('mario3', function(msg){
num = msg.split("&")[0]
if(num == salon) keys.right = msg.split("&")[1];
});

socket.on('mario4', function(msg){
num = msg.split("&")[0]
if(num == salon) keys.left = msg.split("&")[1];
});
/*
socket.on('mario5', function(msg){
keys.down = msg;
});
/*
socket.on('luigi1', function(msg){
keysluigi.accelerate = msg;
});   
socket.on('luigi2', function(msg){
    keysluigi.down = msg;
});   */
socket.on('luigi3', function(msg){
num = msg.split("&")[0]
if(num == salon) keysluigi.right = msg.split("&")[1];
});
socket.on('luigi4', function(msg){
num = msg.split("&")[0]
if(num == salon) keysluigi.left = msg.split("&")[1];
});
/*
socket.on('luigi5', function(msg){
keysluigi.up = msg;
});

socket.on('peach1', function(msg){
keys.accelerate = msg;
});   
socket.on('peach2', function(msg){
    keys.down = msg;
});  */ 
socket.on('peach3', function(msg){
num = msg.split("&")[0]
if(num == salon) keyspeach.right = msg.split("&")[1];
});
socket.on('peach4', function(msg){
num = msg.split("&")[0]
if(num == salon) keyspeach.left = msg.split("&")[1];
});/*
socket.on('peach5', function(msg){
keys.up = msg;
});   */
