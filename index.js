var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');
port = 8080

io.on('connection', (socket) => {
  socket.on('mario1', (msg) => {io.emit('mario1', msg);});
  socket.on('mario2', (msg) => {io.emit('mario2', msg);});
  socket.on('mario3', (msg) => {io.emit('mario3', msg);});
  socket.on('mario4', (msg) => {io.emit('mario4', msg);});
  socket.on('mario5', (msg) => {io.emit('mario5', msg);});
  socket.on('luigi1', (msg) => {io.emit('luigi1', msg);});
  socket.on('luigi2', (msg) => {io.emit('luigi2', msg);});
  socket.on('luigi3', (msg) => {io.emit('luigi3', msg);});
  socket.on('luigi4', (msg) => {io.emit('luigi4', msg);});
  socket.on('luigi5', (msg) => {io.emit('luigi5', msg);});
  socket.on('peach1', (msg) => {io.emit('peach1', msg);});
  socket.on('peach2', (msg) => {io.emit('peach2', msg);});
  socket.on('peach3', (msg) => {io.emit('peach3', msg);});
  socket.on('peach4', (msg) => {io.emit('peach4', msg);});
  socket.on('peach5', (msg) => {io.emit('peach5', msg);});
  socket.on('pause', (msg) => {io.emit('pause', msg);});
  
  socket.on("ready" , (player) => {
      if(player=="1:true") {player1 = "ok",io.emit("player1","ok")}
      if(player=="2:true") {player2 = "ok",io.emit("player2","ok")}
      if(player=="2:true") {player3 = "ok",io.emit("player3","ok")}
      if(player=="1:false") {player1 = "no",io.emit("player1","no")}
      if(player=="2:false") {player2 = "no",io.emit("player2","no")}
      if(player=="2:false") {player3 = "no",io.emit("player3","no")}
      
      if (player1 === "ok" && player2 === "ok" && player3 === "ok")
      {
          io.emit('go',true)    
      }
      console.log(player1)
      console.log(player2)
      console.log(player3)
});
});


attr = ""
console.clear()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/smm/index.html');
});
/*
function heberg(attrib,src){
    cpsrc = __dirname + '/smm/'+attrib+src
    thepath = '/'+attrib+src
    console.log(cpsrc + " => " +thepath)
app.get(thepath, (req, res) => {res.sendFile(cpsrc)})
}

function hebergfolder(attr)
{
var directoryPath = path.join(__dirname, 'smm/'+attr);
//console.log(directoryPath)
fs.readdir(directoryPath, function (err, files) {for (i=0;i<files.length;i++){if (files[i].indexOf(".")!==-1) {heberg(directoryPath.split("smm/")[1],files[i])}}});
}

hebergfolder("")
hebergfolder("Scripts/")
hebergfolder("Scripts/levels/")
hebergfolder("Content/")
hebergfolder("Content/backgrounds/")
hebergfolder("Content/fonts/")
hebergfolder("Content/smb/")
hebergfolder("Content/smb/backgrounds/")
hebergfolder("Content/smw/")
hebergfolder("Content/smw/backgrounds/")
hebergfolder("audio/")
hebergfolder("audio/theme/")
hebergfolder("tiles/")
*/

function heberg(src){
app.get(src, (req, res) => {res.sendFile(__dirname + '/smm'+src)})
}

heberg("jquery.js")

heberg("/Scripts/astronautconstants.js")
heberg("/Scripts/chaosconstants.js")
heberg("/Scripts/constants.js")
heberg("/Scripts/jquery.js")
heberg("/Scripts/keys.js")
heberg("/Scripts/main.js")
heberg("/Scripts/menukeys.js")
heberg("/Scripts/mobile.js")
heberg("/Scripts/oop.js")
heberg("/Scripts/sounds.js")
heberg("/Scripts/sounds_noop.js")
heberg("/Scripts/trulyconstants.js")
heberg("/base_level.html")
heberg("/convert.html")
heberg("/downloadcode.html")
heberg("/index.html")
heberg("/menu.html")
heberg("/menu2.html")
heberg("/open.html")
heberg("/tilemaker.html")
heberg("/tiles.png")
heberg("/tiles2.png")
heberg("/tiles_old.png")
heberg("/update.html")
heberg("/update_instant.html")
heberg("/Scripts/levels/makerlevel.js")
heberg("/Scripts/levels/menubackground.js")
heberg("/Scripts/levels/testlevels.js")
heberg("/Scripts/levels/testlevels2.js")
heberg("/Content/backgrounds/01-bros.png")
heberg("/Content/backgrounds/01.png")
heberg("/Content/backgrounds/02.png")
heberg("/Content/backgrounds/03.png")
heberg("/Content/backgrounds/04.png")
heberg("/Content/backgrounds/05.png")
heberg("/Content/backgrounds/06.png")
heberg("/Content/backgrounds/07.png")
heberg("/Content/backgrounds/08.png")
heberg("/Content/fonts/Super Mario Bros.ttf")
heberg("/Content/allsprites.png")
heberg("/Content/mario-objects.png")
heberg("/Content/mario-peach.png")
heberg("/Content/mario-sprites.png")
heberg("/Content/mon mario.txt")
heberg("/Content/niveau sous la main.txt")
heberg("/Content/style.css")
heberg("/Content/title.png")
heberg("/Content/smb/luigi-fire.png")
heberg("/Content/smb/luigi-sprites.png")
heberg("/Content/smb/mario-enemies.pfi")
heberg("/Content/smb/mario-enemies.png")
heberg("/Content/smb/mario-finish-2.gif")
heberg("/Content/smb/mario-finish.gif")
heberg("/Content/smb/mario-fire.png")
heberg("/Content/smb/mario-objects.png")
heberg("/Content/smb/mario-sprites.png")
heberg("/Content/smb/peach-fire.png")
heberg("/Content/smb/peach-sprites.png")
heberg("/Content/smb/backgrounds/01.png")
heberg("/Content/smb/backgrounds/02.png")
heberg("/Content/smb/backgrounds/03.png")
heberg("/Content/smb/backgrounds/04.png")
heberg("/Content/smb/backgrounds/05.png")
heberg("/Content/smb/backgrounds/06.png")
heberg("/Content/smb/backgrounds/07.png")
heberg("/Content/smb/backgrounds/08.png")
heberg("/Content/smw/luigi-fire.png")
heberg("/Content/smw/luigi-sprites.png")
heberg("/Content/smw/mario-enemies.png")
heberg("/Content/smw/mario-finish-2.gif")
heberg("/Content/smw/mario-finish.gif")
heberg("/Content/smw/mario-fire.png")
heberg("/Content/smw/mario-objects.png")
heberg("/Content/smw/mario-peach.png")
heberg("/Content/smw/mario-sprites.png")
heberg("/Content/smw/peach-fire.png")
heberg("/Content/smw/peach-sprites.png")
heberg("/Content/smw/toad-fire.png")
heberg("/Content/smw/toad-sprites.png")
heberg("/Content/smw/backgrounds/01.png")
heberg("/Content/smw/backgrounds/02.png")
heberg("/Content/smw/backgrounds/03.png")
heberg("/Content/smw/backgrounds/04.png")
heberg("/Content/smw/backgrounds/05.png")
heberg("/Content/smw/backgrounds/06.png")
heberg("/Content/smw/backgrounds/07.png")
heberg("/Content/smw/backgrounds/08.png")
heberg("/audio/theme/Sky.ogg")
heberg("/audio/Overworld.ogg")
heberg("/audio/coin.ogg")
heberg("/audio/die.ogg")
heberg("/audio/enemy_die.ogg")
heberg("/audio/grow.ogg")
heberg("/audio/hurt.ogg")
heberg("/audio/invincibility.ogg")
heberg("/audio/jump.ogg")
heberg("/audio/lifeupgrade.ogg")
heberg("/audio/mushroom.ogg")
heberg("/audio/music.ogg")
heberg("/audio/shell.ogg")
heberg("/audio/shoot.ogg")
heberg("/audio/success.ogg")
heberg("/tiles/air.png")
heberg("/tiles/ballmonster.png")
heberg("/tiles/box.png")
heberg("/tiles/brown_block.png")
heberg("/tiles/bush_left.png")
heberg("/tiles/bush_middle.png")
heberg("/tiles/bush_middle_left.png")
heberg("/tiles/bush_middle_right.png")
heberg("/tiles/bush_right.png")
heberg("/tiles/coin.png")
heberg("/tiles/coinbox.png")
heberg("/tiles/finish.png")
heberg("/tiles/grass_left.png")
heberg("/tiles/grass_right.png")
heberg("/tiles/grass_top.png")
heberg("/tiles/grass_top_left.png")
heberg("/tiles/grass_top_left_corner.png")
heberg("/tiles/grass_top_left_rounded.png")
heberg("/tiles/grass_top_left_rounded_soil.png")
heberg("/tiles/grass_top_right.png")
heberg("/tiles/grass_top_right_corner.png")
heberg("/tiles/grass_top_right_rounded.png")
heberg("/tiles/grass_top_right_rounded_soil.png")
heberg("/tiles/greenturtle.png")
heberg("/tiles/luigi.png")
heberg("/tiles/mario.png")
heberg("/tiles/multiple_coinbox.png")
heberg("/tiles/mushroombox.png")
heberg("/tiles/peach.png")
heberg("/tiles/pipe_left.png")
heberg("/tiles/pipe_left_grass.png")
heberg("/tiles/pipe_left_soil.png")
heberg("/tiles/pipe_right.png")
heberg("/tiles/pipe_right_grass.png")
heberg("/tiles/pipe_right_soil.png")
heberg("/tiles/pipe_top_left.png")
heberg("/tiles/pipe_top_right.png")
heberg("/tiles/pipeplant.png")
heberg("/tiles/planted_soil_left.png")
heberg("/tiles/planted_soil_middle.png")
heberg("/tiles/planted_soil_right.png")
heberg("/tiles/shell.png")
heberg("/tiles/soil.png")
heberg("/tiles/soil_left.png")
heberg("/tiles/soil_right.png")
heberg("/tiles/spikedturtle.png")
heberg("/tiles/starbox.png")
heberg("/tiles/staticplant.png")
heberg("/tiles/stone.png")
heberg("/tiles/tiles.png")


http.listen(port, () => {
//   console.log('listening on *:3000');
});


io.on('connection', (socket) => {
  console.log('Ready player');
  socket.on('disconnect', () => {
    console.log('Unready player');
  });
});


