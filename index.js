var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
hebergs = require('./hebergs')
chatfile = "/chat.js"
levelfile = "/Scripts/levels.js"
function heberg(src){
app.get(src, (req, res) => {res.sendFile(__dirname + '/smm'+src)})
}    
hebergs.hebergement()
port = 8080

function readchat(){
fs.readFile("./smm"+chatfile, 'utf8', function (err,data) {
salut = data;
});
}
function chat(msg){
readchat()
if(msg.indexOf("!reset")!=-1) {setTimeout(function(){fs.writeFile("./smm"+chatfile, "", function (err) {});},20)}
else setTimeout(function(){fs.writeFile("./smm"+chatfile, salut+"\n"+" decrypt(\""+ msg+"\")", function (err) {});},20)
}

function readlevel(){
fs.readFile("./smm"+levelfile, 'utf8', function (err,data) {
salut2 = data;/*
console.log(salut2)*/
});
}
function upload(msg){
readlevel()
msgg = msg.split("#")
// console.log(msg)
// console.log(msg)
setTimeout(function(){fs.writeFile("./smm"+levelfile, salut2+"\n"+"levels[levels.length]={title:\""+msgg[0]+"\",data:\""+ msgg[1]+"\"}", function (err) {});},20)
}
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
  socket.on('victory', (msg) => {io.emit('victory', msg);});
  socket.on('d1', (msg) => {io.emit('d1', msg);});
  socket.on('d2', (msg) => {io.emit('d2', msg);});
  socket.on('d3', (msg) => {io.emit('d3', msg);});
  socket.on('c1', (msg) => {io.emit('c1', msg);});
  socket.on('c2', (msg) => {io.emit('c2', msg);});
  socket.on('c3', (msg) => {io.emit('c3', msg);});
  socket.on('c12', (msg) => {io.emit('c12', msg);});
  socket.on('c22', (msg) => {io.emit('c22', msg);});
  socket.on('c32', (msg) => {io.emit('c32', msg);});
  socket.on('s1', (msg) => {io.emit('s1', msg);});
  socket.on('s2', (msg) => {io.emit('s2', msg);});
  socket.on('s3', (msg) => {io.emit('s3', msg);});
  socket.on('chat', (msg) => {io.emit('chat', msg);chat(msg)});
  socket.on('level', (msg) => {upload(msg)});
});


attr = ""
console.clear()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/smm/index.html');
});

http.listen(port, () => {
//   console.log('listening on *:3000');
});


io.on('connection', (socket) => {
//   console.log('Ready player');
  socket.on('disconnect', () => {
//     console.log('Unready player');
  });
});

heberg("jquery.js")
heberg(chatfile)
heberg(levelfile)
heberg("/auth.js")
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
heberg("/Scripts/addchat.js")
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
heberg("/levels.html") 
heberg("/Scripts/levels.js") 
