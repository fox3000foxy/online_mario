/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */
 levelnumber = location.href.indexOf("base_level") != -1?parseInt(location.href.split("level=")[1]):0
var counterplayer = 0
for (i=0;i<definedLevels[levelnumber].data.length-1;i++){
if (definedLevels[levelnumber].data[i].indexOf('mario')!=-1){counterplayer += 1}
if (definedLevels[levelnumber].data[i].indexOf('luigi')!=-1){counterplayer += 1}
if (definedLevels[levelnumber].data[i].indexOf('peach')!=-1){counterplayer += 1}
}
var attr = localStorage.getItem('attr')
var AUDIOPATH = 'Content/audio/';
var BASEPATH   = 'Content/'+attr;
var DIV        = '<div />';
var CLS_FIGURE = 'figure';
var CLS_MATTER = 'matter';
 var images = {
	// sprites : BASEPATH + counterplayer!=1?'mario-sprites.png':confirm("OK:Mario\nCancel:Luigi")==true?'mario-sprites.png':"luigi-sprites.png",
	sprites : BASEPATH + 'mario-sprites.png',spritesf : BASEPATH + 'mario-fire.png',
	spritesl: BASEPATH + "luigi-sprites.png",spriteslf: BASEPATH + "luigi-fire.png",
	spritesp: BASEPATH + "pink-sprites.png",spritespf: BASEPATH + "pink-fire.png",
	spriteso: BASEPATH + "orange-sprites.png",spritesof: BASEPATH + "orange-fire.png",
	spritesb: BASEPATH + "blue-sprites.png",spritesbf: BASEPATH + "blue-fire.png",
	spritesc: BASEPATH + "cyan-sprites.png",spritescf: BASEPATH + "cyan-fire.png",
	spritesi: BASEPATH + "indigo-sprites.png",spritesif: BASEPATH + "indigo-fire.png",
	spritesd: BASEPATH + "gray-sprites.png",spritesdf: BASEPATH + "gray-fire.png",
	spritesy: BASEPATH + "yellow-sprites.png",spritesyf: BASEPATH + "yellow-fire.png",
	spritesm: BASEPATH + "purple-sprites.png",spritesmf: BASEPATH + "purple-fire.png",
	enemies : BASEPATH + 'mario-enemies.png',
	objects : BASEPATH + 'mario-objects.png',
	peach   : BASEPATH + 'mario-peach.png',
};

var directions = {
	none  : 0,
	left  : 1,
	up    : 2,
	right : 3,
	down  : 4,
};
var mario_states = {normal : 0,fire  : 1,};
var luigi_states = {normal : 0,fire  : 1,};
var peach_states = {normal : 0,fire  : 1,};
var orange_states = {normal : 0,fire  : 1,};
var blue_states = {normal : 0,fire  : 1,};
var cyan_states = {normal : 0,fire  : 1,};
var indigo_states = {normal : 0,fire  : 1,};
var dark_states = {normal : 0,fire  : 1,};
var yellow_states = {normal : 0,fire  : 1,};
var purple_states = {normal : 0,fire  : 1,};
var size_states = {
	small : 1,
	big   : 2,
};
var ground_blocking = {
	none   : 0,
	left   : 1,
	top    : 2,
	right  : 4,
	bottom : 8,
	all    : 15,
};
var collision_type = {
	none       : 0,
	horizontal : 1,
	vertical   : 2,
};
var death_modes = {
	normal : 0,
	shell  : 1,
};

var constants = {
	interval        : 20,
	bounce          : 15,
	cooldown        : 20,
	gravity         : 2,
	start_lives     : location.href.indexOf("base_level.html")!=-1 || location.href.indexOf("menu.html")!=-1?parseInt(location.href.split("lives=")[1].split("&")[0]):0,
	max_width       : 400,
	max_height      : 15,
	jumping_v       : 27,
	walking_v       : 5,
	mushroom_v      : 3,
	ballmonster_v   : 2,
	spiked_turtle_v : 1.5,
	small_turtle_v  : 3,
	big_turtle_v    : 2,
	shell_v         : 10,
	shell_wait      : 25,
	star_vx         : 4,
	star_vy         : 16,
	bullet_v        : 12,
	max_coins       : 100,
	pipeplant_count : 150,
	pipeplant_v     : 1,
	invincible      : 11000,
	invulnerable    : 1000,
	blinkfactor     : 5,
};
var mushroom_mode = {mushroom : 0,plant: 1,};
var mushroom_luigi_mode = {mushroom : 0,plant: 1,};
var mushroom_peach_mode = {mushroom : 0,plant: 1,};
var mushroom_orange_mode = {mushroom : 0,plant: 1,};
var mushroom_blue_mode = {mushroom : 0,plant: 1,};
var mushroom_cyan_mode = {mushroom : 0,plant: 1,};
var mushroom_indigo_mode = {mushroom : 0,plant: 1,};
var mushroom_dark_mode = {mushroom : 0,plant: 1,};
var mushroom_yellow_mode = {mushroom : 0,plant: 1,};
var mushroom_purple_mode = {mushroom : 0,plant: 1,};
var c2u = function(s) {
	return 'url(' + s + ')';
};
var q2q = function(figure, opponent) {
	if(figure.x > opponent.x + 16)
		return false;		
	else if(figure.x + 16 < opponent.x)
		return false;		
	else if(figure.y + figure.state * 32 - 4 < opponent.y)
		return false;		
	else if(figure.y + 4 > opponent.y + opponent.state * 32)
		return false;
		
	return true;
};
Math.sign = function(x) {
	if(x > 0)
		return 1;
	else if(x < 0)
		return -1;
		
	return 0;
};
