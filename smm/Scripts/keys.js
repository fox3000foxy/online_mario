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
orangectrl= location.href.indexOf("play=orange")!=-1?true:false
bluectrl  = location.href.indexOf("play=blue")!=-1?true:false
cyanctrl  = location.href.indexOf("play=cyan")!=-1?true:false
indigoctrl= location.href.indexOf("play=indigo")!=-1?true:false
darkctrl  = location.href.indexOf("play=dark")!=-1?true:false
yellowctrl= location.href.indexOf("play=yellow")!=-1?true:false
purplectrl= location.href.indexOf("play=purple")!=-1?true:false

var cam = 0
if (marioctrl==true){cam=0}
if (luigictrl==true){cam=1}
if (peachctrl==true){cam=2}
if (orangectrl==true){cam=3}
if (bluectrl==true){cam=4}
if (cyanctrl==true){cam=5}
if (indigoctrl==true){cam=6}
if (darkctrl==true){cam=7}
if (yellowctrl==true){cam=8}
if (purplectrl==true){cam=9}

var socket = io()    
// setInterval("if(cam==-1){cam=counterplayer-1}if(cam==counterplayer){cam=0}",100)
ok=1
function pause(){start=start==0?1:3}
var keys = {
	bind : function() {
		$(document).on('keydown', function(event) {	
			return keys.handler(event, true,1,0);
			return keysl.handler(event, true,1,0);
			return keysp.handler(event, true,1,0);
		});
		$(document).on('keyup', function(event) {	
			return keys.handler(event, false,1,0);
			return keysl.handler(event, false,1,0);
			return keysp.handler(event, false,1,0);
            
        });
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
		keysl.left = false;
		keysl.right = false;
		keysl.accelerate = false;
		keysl.up = false;
		keysl.down = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
        
	},
	handler : function(event, status, withkeypad,elsebutton) {
//         alert(event.keyCode)
	if(withkeypad){
        if(event.keyCode==27 && document.activeElement!=document.body){loadinputs()}
        if (ok==1 && document.activeElement==document.body){if(event.keyCode==13){document.getElementById('sender').focus();ok=0;setTimeout("ok=1",100);return}}
        if (ok==1 && document.activeElement!=document.body){if(event.keyCode==13){document.getElementById("baton").click();ok=0;setTimeout("ok=1",500)};return;}
            if(event.keyCode=='Y'.charCodeAt())if (cam > 9){setTimeout('cam = 0',200);}else{setTimeout('cam += 0.5',200)}
			if(event.keyCode=='T'.charCodeAt())if (cam < 0 ){setTimeout('cam = 9',200);}else{setTimeout('cam += -0.5',200)}
//          if(event.keyCode=='P'.charCodeAt())if(marioctrl==true){pause();socket.emit("pause",start)}
//          if(event.keyCode==57392)if (marioctrl==true){keys.accelerate = status;socket.emit("mario1",salon+"&"+status)}
            players=["mario","luigi","peach","orange","blue","cyan","indigo","dark","yellow","purple"]
            playersletter=["","l","p","o","b","c","i","d","y","m"]
            instructs=""
            for (i=0;i<players.length;i++){
            instructs += `
            if(event.keyCode==17)if (`+players[i]+`ctrl==true){keys`+playersletter[i]+`.accelerate = status;socket.emit("`+players[i]+`1",salon+"&"+status)}    
            if(event.keyCode==40)if (`+players[i]+`ctrl==true){keys`+playersletter[i]+`.down = status;socket.emit("`+players[i]+`2",salon+"&"+status)}
            if(event.keyCode==39)if (`+players[i]+`ctrl==true){keys`+playersletter[i]+`.right = status;socket.emit("`+players[i]+`3",salon+"&"+status)}
            if(event.keyCode==37)if (`+players[i]+`ctrl==true){keys`+playersletter[i]+`.left = status;socket.emit("`+players[i]+`4",salon+"&"+status)}
            if(event.keyCode==38)if (`+players[i]+`ctrl==true){keys`+playersletter[i]+`.up = status;socket.emit("`+players[i]+`5",salon+"&"+status)}
            `
            }
//             console.clear()
//             console.log(instructs)
            eval(instructs)
			return true
		}
    else{
				switch(elsebutton) {
                    case "fireball":
						if (marioctrl==true){keys.accelerate = status;socket.emit("mario1",salon+"&"+status)}
						if (luigictrl==true){keysl.accelerate = status;socket.emit("luigi1",salon+"&"+status)}
						if (peachctrl==true){keysp.accelerate = status;socket.emit("peach1",salon+"&"+status)};break;
                    case 'down':
					if (marioctrl==true){keys.down = status;socket.emit("mario2",salon+"&"+status)};
					if (luigictrl==true){keysl.down = status;socket.emit("luigi2",salon+"&"+status)};
					if (peachctrl==true){keysp.down = status;socket.emit("peach2",salon+"&"+status)};break;
                    case 'right':
						if (marioctrl==true){keys.right = status;socket.emit("mario3",salon+"&"+status)};
						if (luigictrl==true){keysl.right = status;socket.emit("luigi3",salon+"&"+status)};
						if (peachctrl==true){keysp.right = status;socket.emit("peach3",salon+"&"+status)};break;
                    case 'left':
						if (marioctrl==true){keys.left = status;socket.emit("mario4",salon+"&"+status)};
						if (luigictrl==true){keysl.left = status;socket.emit("luigi4",salon+"&"+status)};
						if (peachctrl==true){keysp.left = status;socket.emit("peach4",salon+"&"+status)};break;
                    case 'up':
						if (marioctrl==true){keys.up = status;socket.emit("mario5",salon+"&"+status)};
						if (luigictrl==true){keysl.up = status;socket.emit("luigi5",salon+"&"+status)};
						if (peachctrl==true){keysp.up = status;socket.emit("peach5",salon+"&"+status)};break;
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

var keysl = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysp = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keyso = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysb = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysc = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysi = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysd = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysy = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};
var keysm = {bind : false,reset : false,unbind : false,handler : false,accelerate : false,left : false,up : false,right : false,down : false,};


socket.on('mario3', function(msg){num = msg.split("&")[0];if(num == salon) keys.right = msg.split("&")[1];});
socket.on('mario4', function(msg){num = msg.split("&")[0];if(num == salon) keys.left = msg.split("&")[1];});

socket.on('luigi3', function(msg){num = msg.split("&")[0];if(num == salon) keysl.right = msg.split("&")[1];});
socket.on('luigi4', function(msg){num = msg.split("&")[0];if(num == salon) keysl.left = msg.split("&")[1];});

socket.on('peach3', function(msg){num = msg.split("&")[0];if(num == salon) keysp.right = msg.split("&")[1];});
socket.on('peach4', function(msg){num = msg.split("&")[0];if(num == salon) keysp.left = msg.split("&")[1];});

socket.on('orange3', function(msg){num = msg.split("&")[0];if(num == salon) keyso.right = msg.split("&")[1];});
socket.on('orange4', function(msg){num = msg.split("&")[0];if(num == salon) keyso.left = msg.split("&")[1];});

socket.on('blue3', function(msg){num = msg.split("&")[0];if(num == salon) keysb.right = msg.split("&")[1];});
socket.on('blue4', function(msg){num = msg.split("&")[0];if(num == salon) keysb.left = msg.split("&")[1];});

socket.on('cyan3', function(msg){num = msg.split("&")[0];if(num == salon) keysc.right = msg.split("&")[1];});
socket.on('cyan4', function(msg){num = msg.split("&")[0];if(num == salon) keysc.left = msg.split("&")[1];});

socket.on('indigo3', function(msg){num = msg.split("&")[0];if(num == salon) keysi.right = msg.split("&")[1];});
socket.on('indigo4', function(msg){num = msg.split("&")[0];if(num == salon) keysi.left = msg.split("&")[1];});

socket.on('dark3', function(msg){num = msg.split("&")[0];if(num == salon) keysd.right = msg.split("&")[1];});
socket.on('dark4', function(msg){num = msg.split("&")[0];if(num == salon) keysd.left = msg.split("&")[1];});

socket.on('yellow3', function(msg){num = msg.split("&")[0];if(num == salon) keysy.right = msg.split("&")[1];});
socket.on('yellow4', function(msg){num = msg.split("&")[0];if(num == salon) keysy.left = msg.split("&")[1];});

socket.on('purple3', function(msg){num = msg.split("&")[0];if(num == salon) keysm.right = msg.split("&")[1];});
socket.on('purple4', function(msg){num = msg.split("&")[0];if(num == salon) keysm.left = msg.split("&")[1];});
