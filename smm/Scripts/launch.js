
start=1
$(document).ready(function() {

    // 	setInterval(function() {
//         socket.emit("ready",you+":true")
//         if (started==0 && allplayersconnected==true){
//             alert("lol")
            level = new Level('world');
            level.load(definedLevels[levelnumber]);
            level.setSounds(new SoundManager());
            setInterval(function() {
    if (start==1){
            level.start();
            start=2
    }
    if (start==3)
    {
        level.pause()
        start=0
    }
    
            })
     socket.on('pause', function(value){
     start = value ;
     });
//         else {compter()}
//     })
	keys.bind();
});
