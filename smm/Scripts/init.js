players=["mario","luigi","peach","orange","blue","cyan","indigo","dark","yellow","purple"]
instructions = ""
for (i=0;i<players.length;i++){
instructions += `
`+players[i]+`1=0\n
`+players[i]+`2=0\n
`+players[i]+`5=0\n
d`+(i+1)+`=0\n
c`+(i+1)+`=0\n
c`+(i+1)+`2=0\n
s`+(i+1)+`=0\n
`
}

	victory=0
	
	salon = "main"
	if(location.href.indexOf("salon")!=-1) salon = location.href.split("&salon=")[1].split("&")[0]
	socket = io()
            for (i=0;i<players.length;i++){
            instructions += `
			socket.on('`+players[i]+`1', function(msg){num = msg.split("&")[0];if(salon==num && you!="`+players[i]+`"){`+players[i]+`1 = parseInt(msg.split("&")[1])}})\n
			socket.on('`+players[i]+`2', function(msg){num = msg.split("&")[0];if(salon==num && you!="`+players[i]+`"){`+players[i]+`2 = parseInt(msg.split("&")[1])}})\n
			socket.on('`+players[i]+`5', function(msg){num = msg.split("&")[0];if(salon==num && you!="`+players[i]+`"){eval("`+players[i]+`5 = "+msg.split("&")[1])}})\n
			`}
            socket.on('victory', function(msg){num = msg.split("&")[0];if(salon==num) victory = 1})
            for (i=1;i<players.length+1;i++){
            instructions += `
            socket.on('d`+i+`', function(msg){num = msg.split("&")[0];if(salon==num) d`+i+` = 1;setTimeout("d`+i+` = 0",100)})\n
	        socket.on('c`+i+`', function(msg){num = msg.split("&")[0];if(salon==num) c`+i+` = "grow";setTimeout("c`+i+` = 0",100)})\n
	        socket.on('c`+i+`2', function(msg){num = msg.split("&")[0];if(salon==num) c`+i+`2 = "hurt";setTimeout("c`+i+`2 = 0",100)})\n
	        socket.on('s`+i+`1', function(msg){num = msg.split("&")[0];if(salon==num) s`+i+` = "true";setTimeout("s`+i+` = 0",100)})\n			
            `}
//              console.log(instructions)
            eval(instructions)
	ley=0
