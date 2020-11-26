/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 * -------------------------------------------
 * PRE CODE
 * -------------------------------------------
 */
you = "none"
if (location.href.indexOf("&play")!=-1)
{
 you = location.href.split("&play=")[1].split("&")[0]
 if (you.indexOf("#")!=-1)
 {
 you = you.split("#")[0]
 }
}
 camheight=1
  if(location.href.indexOf("base_level") != -1 && isNaN(parseInt(location.href.split("level=")[1]))){location.href = "index.html"}
 levelnumber = location.href.indexOf("base_level") != -1?parseInt(location.href.split("level=")[1]):0
 if (levelnumber == 15){alert("Good job ! You have finish all basics levels ! Congratulations !\n And now try to play Discord's levels !\n The link is on main page of our site !");location.href = 'index.html'}
	for (i=0;i<definedLevels[levelnumber].data.length;i++){
	for (j=0;j<definedLevels[levelnumber].data[0].length;j++){
	if (definedLevels[levelnumber].data[i][j]=='mario'){	
	if (location.href.indexOf('luigi') != -1)
	definedLevels[levelnumber].data[i-1][j]='luigi'
	if (location.href.indexOf('peach') != -1)
	definedLevels[levelnumber].data[i+1][j]='peach'
	}
	}
	}
 
//  alert(location.origin)
 
counterplayer = 0
for (i=0;i<definedLevels[levelnumber].data.length-1;i++){

if (definedLevels[levelnumber].data[i].indexOf('mario')!=-1)
{
	counterplayer += 1
}

if (definedLevels[levelnumber].data[i].indexOf('luigi')!=-1)
{
	counterplayer += 1
}
if (definedLevels[levelnumber].data[i].indexOf('peach')!=-1)
{
	counterplayer += 1
}
}
la100aine = 0
function newlive(){
ghref = parseInt(location.href.split("&lives=")[1].split("&")[0])
ghref -= 1
hashtag = 0
if (location.href.indexOf("#")!=-1)
	hashtag = parseInt(location.href.split("#")[1].split("&")[0])
nhref = location.href.split("&lives=")[0]
newlifes = ghref-(-hashtag)
nhref += "&lives="+newlifes
after = parseInt((ghref+1))
nhref += location.href.split("&lives="+after)[1].split("&")[0]
    	player = "&player="+location.href.split("&player=")[1].split("&")[0]
        salon= "&salon="+location.href.split("&salon=")[1].split("&")[0]
        play = "&play="+location.href.split("&play=")[1].split("&")[0]
        username = "&username="+location.href.split("&username=")[1].split("&")[0]
jref = nhref + "&coins="+numberCoin%100+username+player+salon+play
if (location.href.indexOf("&luigi")!=-1){jref += "&luigi"}
if (location.href.indexOf("&peach")!=-1){jref += "&peach"}
newhref = jref

if (document.getElementById('liveNumber').innerHTML < 1){
	newhref = location.href.split(".html")[0]
	newhref += ".html?"
	newhref += location.href.indexOf("menu.html")!=-1?"editor=0":"level=0"
if (location.href.indexOf("&luigi")!=-1){newhref += "&luigi"}
if (location.href.indexOf("&peach")!=-1){newhref += "&peach"}

        newhref += "&lives=4&coins=0"+username+player+salon+play
	}
	if(location.href.indexOf("editor=0")!=-1)
		newhref = newhref.replace("editor=0","editor=3")
}

adddeathplayer = 0
setInterval("if(adddeathplayer == counterplayer){newlive();setTimeout('location.href=newhref',4500);}",100)
		document.getElementById("finish").innerHTML ='<img id="finish_level" src="Content\/'+localStorage.getItem("attr")+'mario-finish.gif">'
/*
 * -------------------------------------------
 * BASE CLASS
 * -------------------------------------------
 */

var Base = Class.extend({
	init: function(x, y) {
		this.setPosition(x || 0, y || 0);
		this.clearFrames();
		this.frameCount = 0;
	},
	setPosition: function(x, y) {
		this.x = x;
		this.y = y;
	},
	getPosition: function() {
		return { x : this.x, y : this.y };
	},
	setImage: function(img, x, y) {
		this.image = {
			path : img,
			x : x,
			y : y
		};
	},
	setSize: function(width, height) {
		this.width = width;
		this.height = height;
	},
	getSize: function() {
		return { width: this.width, height: this.height };
	},
	setupFrames: function(fps, frames, rewind, id) {
		if(id) {
			if(this.frameID === id)
				return true;
			
			this.frameID = id;
		}
		
		this.currentFrame = 0;
		this.frameTick = frames ? (1000 / fps / constants.interval) : 0;
		this.frames = frames;
		this.rewindFrames = rewind;
		return false;
	},
	clearFrames: function() {
		this.frameID = undefined;
		this.frames = 0;
		this.currentFrame = 0;
		this.frameTick = 0;
	},
	playFrame: function() {
		if(this.frameTick && this.view) {
			this.frameCount++;
			
			if(this.frameCount >= this.frameTick) {			
				this.frameCount = 0;
				
				if(this.currentFrame === this.frames)
					this.currentFrame = 0;
					
				var $el = this.view;
				$el.css('background-position', '-' + (this.image.x + this.width * ((this.rewindFrames ? this.frames - 1 : 0) - this.currentFrame)) + 'px -' + this.image.y + 'px');
				this.currentFrame++;
			}
		}
	},
});

/*
 * -------------------------------------------
 * GAUGE CLASS
 * -------------------------------------------
 */
var Gauge = Base.extend({
	init: function(id, startImgX, startImgY, fps, frames, rewind) {
		this._super(0, 0);
		this.view = $('#' + id);
		this.setSize(this.view.width(), this.view.height());
		this.setImage(this.view.css('background-image'), startImgX, startImgY);
		this.setupFrames(fps, frames, rewind);
	},
});

/*
 * -------------------------------------------
 * LEVEL CLASS
 * -------------------------------------------
 */
var Level = Base.extend({
	init: function(id) {
		this.world = $('#' + id);
		this.nextCycles = 0;
		this._super(0, 0);
		this.active = false;
		this.figures = [];
		this.obstacles = [];
		this.decorations = [];
		this.items = [];
		this.coinGauge = new Gauge('coin', 0, 0, 10, 4, true);
		this.liveGauge = new Gauge('live', 0, 430, 6, 6, true);
	},
	reload: function() {
		if(adddeathplayer == counterplayer){
		var settings = {};
		this.pause();
		
		for(var i = this.figures.length; i--; ) {
			if(this.figures[i] instanceof Mario) {
				settings.lifes = this.figures[i].lifes - 1;
				settings.coins = this.figures[i].coins;
				break;
			}
		}
		
		this.reset();
		
		if(settings.lifes < 0) {
			this.load(definedLevels[levelnumber]);
		} else {		
			this.load(this.raw);
			
			for(var i = this.figures.length; i--; ) {
				if(this.figures[i] instanceof Mario) {
					this.figures[i].setLifes(settings.lifes || 0);
					this.figures[i].setCoins(settings.coins || 0);
					break;
				}
			}
		}
		
		this.start();
	}
	},
	load: function(level) {
		if(this.active) {
			if(this.loop)
				this.pause();

			this.reset();
		}
			
		this.setPosition(0, 0);
		this.setSize(level.width * 32, level.height * 32);
		this.setImage(level.background);
		this.raw = level;
		this.id = level.id;
		this.active = true;
		var data = level.data;
		
		for(var i = 0; i < level.width; i++) {
			var t = [];
			
			for(var j = 0; j < level.height; j++) {
				t.push('');
			}
			
			this.obstacles.push(t);
		}
		
		for(var i = 0, width = data.length; i < width; i++) {
			var col = data[i];
			
			for(var j = 0, height = col.length; j < height; j++) {
                if (col[j]=='mario')
                {
                    levelheight = j*32
                }
				if(reflection[col[j]])
					new (reflection[col[j]])(i * 32, (height - j - 1) * 32, this);
			}
		}
	},
	next: function() {
		this.nextCycles = Math.floor(7000 / constants.interval);
	},
	nextLoad: function() {
		if(this.nextCycles)
			return;
		
		var settings = {};
		this.pause();
		
		
		for(var i = this.figures.length; i--; ) {
			if(this.figures[i] instanceof Mario) {
				settings.lifes = this.figures[i].lifes;
				settings.coins = this.figures[i].coins;
				settings.state = this.figures[i].state;
				settings.marioState = this.figures[i].marioState;
				break;
			}
		}
		
		this.reset();
		// alert(this.id)
		numberlevel = parseInt(location.href.split("level=")[1])+1
		luigi_oui = location.href.indexOf("&luigi") != -1?"&luigi":""
		peach_oui = location.href.indexOf("&peach") != -1?"&peach":""
		coinNumber_oui = "&coins="+document.getElementById("coinNumber").innerHTML
		liveNumber_oui = "&lives="+document.getElementById("liveNumber").innerHTML
		player = "&player="+location.href.split("&player=")[1].split("&")[0]
        //number = "&number="+location.href.split("&number=")[1].split("&")[0]
        play = "&play="+location.href.split("&play=")[1].split("&")[0]
        username = "&username="+location.href.split("&username=")[1].split("&")[0]
		location.href = 'base_level.html?level='+numberlevel+luigi_oui+peach_oui+liveNumber_oui+coinNumber_oui+username+player+"&salon="+salon+play
		localStorage.setItem("editorfinish",true)
		this.load(definedLevels[this.id + 1]);
		
		for(var i = this.figures.length; i--; ) {
			if(this.figures[i] instanceof Mario) {
				this.figures[i].setLifes(settings.lifes || 0);
				this.figures[i].setCoins(settings.coins || 0);
				this.figures[i].setState(settings.state || size_states.small);
				this.figures[i].setMarioState(settings.marioState || mario_states.normal);
				break;
			}
		}
		
		this.start();
	},
	getGridWidth: function() {
		return this.raw.width;
	},
	getGridHeight: function() {
		return this.raw.height;
	},
	setSounds: function(manager) {
		this.sounds = manager;
	},
	playSound: function(label) {
		if(this.sounds)
			this.sounds.play(label);
	},
	playMusic: function(label) {
		if(this.sounds)
			this.sounds.sideMusic(label);
	},
	reset: function() {
		this.active = false;
		this.world.empty();
		this.figures = [];
		this.obstacles = [];
		this.items = [];
		this.decorations = [];
		this.playMusic('music');
	},
	tick: function() {
		if(this.nextCycles) {
			this.nextCycles--;
			this.nextLoad();			
			return;
		}
		
		var i = 0, j = 0, figure, opponent;
		
		for(i = this.figures.length; i--; ) {
			figure = this.figures[i];
			
			if(figure.dead) {
				if(!figure.death()) {
					if(figure instanceof Mario)
						return this.reload();
						
					figure.view.remove();
					this.figures.splice(i, 1);
				} else
					figure.playFrame();
			} else {
				if(i) {
					for(j = i; j--; ) {
						if(figure.dead)
							break;
							
						opponent = this.figures[j];
						
						if(!opponent.dead && q2q(figure, opponent)) {
							figure.hit(opponent);
							opponent.hit(figure);
						}
					}
				}
			}
			
			if(!figure.dead) {
				figure.move();
				figure.playFrame();
			}
		}
		
		for(i = this.items.length; i--; )
			this.items[i].playFrame();
		
		this.coinGauge.playFrame();
		this.liveGauge.playFrame();
	},
	start: function() {
		var me = this;
		me.loop = setInterval(function() {
			me.tick.apply(me);
		}, constants.interval);
	},
	pause: function() {
		clearInterval(this.loop);
		this.loop = undefined;
	},
	setPosition: function(x, y) {
		this._super(x, y);
		this.world.css('left', -x);
		this.world.css('top', -y);
	},
	setImage: function(index) {
		var img = BASEPATH + 'backgrounds/' + ((index < 10 ? '0' : '') + index) + '.png';
		this.world.parent().css({
			backgroundImage : c2u(img),
			backgroundPosition : '0 -380px'
		});
		this._super(img, 0, 0);
	},
	setSize: function(width, height) {
		this._super(width, height);
	},
	setParallax: function(x,y) {
		this.setPosition(x, y);
		this.world.parent().css('background-position', '-' + Math.floor(x / 3) + 'px -'+380+'px');
	},
});

/*
 * -------------------------------------------
 * FIGURE CLASS
 * -------------------------------------------
 */
var Figure = Base.extend({
	init: function(x, y, level) {
		this.view = $(DIV).addClass(CLS_FIGURE).appendTo(level.world);
		this.dx = 0;
		this.dy = 0;
		this.dead = false;
		this.onground = true;
		this.setState(size_states.small);
		this.setVelocity(0, 0);
		this.direction = directions.none;
		this.level = level;
		this._super(x, y);
		level.figures.push(this);
	},
	setState: function(state) {
		this.state = state;
	},
	setImage: function(img, x, y) {
		// alert(img)
		this.view.css({
			backgroundImage : img ? c2u(img) : 'url("Content\/peach-sprites.png")',
			backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
		});
		this._super(img, x, y);
	},
	setOffset: function(dx, dy) {
		this.dx = dx;
		this.dy = dy;
		this.setPosition(this.x, this.y);
	},
	setPosition: function(x, y) {
		this.view.css({
			left: x,
			bottom: y,
			marginLeft: this.dx,
			marginBottom: this.dy,
		});
		this._super(x, y);
		this.setGridPosition(x, y);
	},
	setSize: function(width, height) {
		this.view.css({
			width: width,
			height: height
		});
		this._super(width, height);
	},
	setGridPosition: function(x, y) {
		this.i = Math.floor((x + 16) / 32);
		this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32);
		
		if(this.j > this.level.getGridHeight())
			this.die();
	},
	getGridPosition: function(x, y) {
		return { i : this.i, j : this.j };
	},
	setVelocity: function(vx, vy) {
		this.vx = vx;
		this.vy = vy;
		
		if(vx > 0)
			this.direction = directions.right;
		else if(vx < 0)
			this.direction = directions.left;
	},
	getVelocity: function() {
		return { vx : this.vx, vy : this.vy };
	},
	hit: function(opponent) {
		
	},
	collides: function(is, ie, js, je, blocking) {
		var isHero = this instanceof Hero;
		
		if(is < 0 || ie >= this.level.obstacles.length)
			return true;
			
		if(js < 0 || je >= this.level.getGridHeight())
			return false;
			
		for(var i = is; i <= ie; i++) {
			for(var j = je; j >= js; j--) {
				var obj = this.level.obstacles[i][j];
				
				if(obj) {
					if(obj instanceof Item && isHero && (blocking === ground_blocking.bottom || obj.blocking === ground_blocking.none))
						obj.activate(this);
					
					if((obj.blocking & blocking) === blocking)
						return true;
				}
			}
		}
		
		return false;
	},
	move: function() {
		var vx = this.vx;
		var vy = this.vy - constants.gravity;
		
		var s = this.state;
		
		var x = this.x;
		var y = this.y;
		
		var dx = Math.sign(vx);
		var dy = Math.sign(vy);
		
		var is = this.i;
		var ie = is;
		
		var js = Math.ceil(this.level.getGridHeight() - s - (y + 31) / 32);
		var je = this.j;
		
		var d = 0, b = ground_blocking.none;
		var onground = false;
		var t = Math.floor((x + 16 + vx) / 32);
		
		if(dx > 0) {
			d = t - ie;
			t = ie;
			b = ground_blocking.left;
		} else if(dx < 0) {
			d = is - t;
			t = is;
			b = ground_blocking.right;
		}
		
		x += vx;
		
		for(var i = 0; i < d; i++) {
			if(this.collides(t + dx, t + dx, js, je, b)) {
				vx = 0;
				x = t * 32 + 15 * dx;
				break;
			}
			
			t += dx;
			is += dx;
			ie += dx;
		}
		
		if(dy > 0) {
			t = Math.ceil(this.level.getGridHeight() - s - (y + 31 + vy) / 32);
			d = js - t;
			t = js;
			b = ground_blocking.bottom;
		} else if(dy < 0) {
			t = Math.ceil(this.level.getGridHeight() - 1 - (y + vy) / 32);
			d = t - je;
			t = je;
			b = ground_blocking.top;
		} else
			d = 0;
		
		y += vy;
		
		for(var i = 0; i < d; i++) {
			if(this.collides(is, ie, t - dy, t - dy, b)) {
				onground = dy < 0;
				vy = 0;
				y = this.level.height - (t + 1) * 32 - (dy > 0 ? (s - 1) * 32 : 0);
				break;
			}
			
			t -= dy;
		}
		
		this.onground = onground;
		this.setVelocity(vx, vy);
		this.setPosition(x, y);
	},
	death: function() {
		return false;
	},
	die: function() {
		this.dead = true;
	},
});

/*
 * -------------------------------------------
 * MATTER CLASS
 * -------------------------------------------
 */
var Matter = Base.extend({
	init: function(x, y, blocking, level) {
		this.blocking = blocking;
		this.view = $(DIV).addClass(CLS_MATTER).appendTo(level.world);
		this.level = level;
		this._super(x, y);
//         alert(y)
		this.setSize(32, 32);
		this.addToGrid(level);
   
	},
	addToGrid: function(level) {
		level.obstacles[this.x / 32][this.level.getGridHeight() - 1 - this.y / 32] = this;
	},
    removeToGrid: function(level) {
		level.obstacles[this.x / 32][this.level.getGridHeight() - 1 - this.y / 32] = '';
	},
	setImage: function(img, x, y) {
		this.view.css({
			backgroundImage : img ? c2u(img) : 'none',
			backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
		});
		this._super(img, x, y);
	},
	setPosition: function(x, y) {
		this.view.css({
			left: x,
			bottom: y,
		});
		this._super(x, y);
	},
});

/*
 * -------------------------------------------
 * GROUND CLASS
 * -------------------------------------------
 */
var Ground = Matter.extend({
	init: function(x, y, blocking, level) {
		this._super(x, y, blocking, level);
	},
});

/*
 * -------------------------------------------
 * GRASS CLASSES
 * -------------------------------------------
 */
var TopGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.top;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 888, 404);
	},
}, 'grass_top');
var TopRightGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.top + ground_blocking.right;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 922, 404);
	},
}, 'grass_top_right');
var TopLeftGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.left + ground_blocking.top;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 854, 404);
	},
}, 'grass_top_left');
var RightGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.right;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 922, 438);
	},
}, 'grass_right');
var LeftGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.left;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 854, 438);
	},
}, 'grass_left');
var TopRightRoundedGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.top;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 922, 506);
	},
}, 'grass_top_right_rounded');
var TopLeftRoundedGrass = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.top;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 854, 506);
	},
}, 'grass_top_left_rounded');

/*
 * -------------------------------------------
 * STONE CLASSES
 * -------------------------------------------
 */
var Stone = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.all;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 550, 160);
	},
}, 'stone');
var BrownBlock = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.all;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 514, 194);
	},
}, 'brown_block');

/*
 * -------------------------------------------
 * PIPE CLASSES
 * -------------------------------------------
 */
var RightTopPipe = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.all;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 36, 358);
	},
}, 'pipe_top_right');
var LeftTopPipe = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.all;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 2, 358);
	},
}, 'pipe_top_left');
var RightPipe = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.right + ground_blocking.bottom;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 36, 390);
	},
}, 'pipe_right');
var LeftPipe = Ground.extend({
	init: function(x, y, level) {
		var blocking = ground_blocking.left + ground_blocking.bottom;
		this._super(x, y, blocking, level);
		this.setImage(images.objects, 2, 390);
	},
}, 'pipe_left');

/*
 * -------------------------------------------
 * DECORATION CLASS
 * -------------------------------------------
 */
var Decoration = Matter.extend({
	init: function(x, y, level) {
		this._super(x, y, ground_blocking.none, level);
		level.decorations.push(this);
	},
	setImage: function(img, x, y) {
		this.view.css({
			backgroundImage : img ? c2u(img) : 'none',
			backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
		});
		this._super(img, x, y);
	},
	setPosition: function(x, y) {
		this.view.css({
			left: x,
			bottom: y
		});
		this._super(x, y);
	},
});

/*
 * -------------------------------------------
 * DECORATION GRASS CLASSES
 * -------------------------------------------
 */
var TopRightCornerGrass = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 612, 868);
	},
}, 'grass_top_right_corner');
var TopLeftCornerGrass = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 648, 868);
	},
}, 'grass_top_left_corner');

/*
 * -------------------------------------------
 * SOIL CLASSES
 * -------------------------------------------
 */
var Soil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 888, 438);
	},
}, 'soil');
var RightSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 922, 540);
	},
}, 'soil_right');
var LeftSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 854,540);
	},
}, 'soil_left');

/*
 * -------------------------------------------
 * BUSH CLASSES
 * -------------------------------------------
 */
var RightBush = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 382, 928);
	},
}, 'bush_right');
var RightMiddleBush = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 314, 928);
	},
}, 'bush_middle_right');
var MiddleBush = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 348, 928);
	},
}, 'bush_middle');
var LeftMiddleBush = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 212, 928);
	},
}, 'bush_middle_left');
var LeftBush = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 178, 928);
	},
}, 'bush_left');

/*
 * -------------------------------------------
 * GRASS-SOIL CLASSES
 * -------------------------------------------
 */
var TopRightGrassSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 990, 506);
	},
}, 'grass_top_right_rounded_soil');
var TopLeftGrassSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 956, 506);
	},
}, 'grass_top_left_rounded_soil');

/*
 * -------------------------------------------
 * PLANTED SOIL CLASSES
 * -------------------------------------------
 */
var RightPlantedSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 782, 832);
	},
}, 'planted_soil_right');
var MiddlePlantedSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 748, 832);
	},
}, 'planted_soil_middle');
var LeftPlantedSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 714, 832);
	},
}, 'planted_soil_left');

/*
 * -------------------------------------------
 * PIPE DECORATION
 * -------------------------------------------
 */
var RightPipeGrass = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 36, 424);
	},
}, 'pipe_right_grass');
var LeftPipeGrass = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 2, 424);
	},
}, 'pipe_left_grass');
var RightPipeSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 36, 458);
	},
}, 'pipe_right_soil');
var LeftPipeSoil = Decoration.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 2, 458);
	},
}, 'pipe_left_soil');

/*
 * -------------------------------------------
 * ITEM CLASS
 * -------------------------------------------
 */
var Item = Matter.extend({
	init: function(x, y, isBlocking, level) {
		this.isBouncing = false;
		this.bounceCount = 0;
		this.bounceFrames = Math.floor(50 / constants.interval);
		this.bounceStep = Math.ceil(10 / this.bounceFrames);
		this.bounceDir = 1;
		this.isBlocking = isBlocking;
		this._super(x, y, isBlocking ? ground_blocking.all : ground_blocking.none, level);
		this.activated = false;
		this.addToLevel(level);
	},
	addToLevel: function(level) {
		level.items.push(this);
	},
	activate: function(from) {
		this.activated = true;
	},
	bounce: function() {
		this.isBouncing = true;
		
		for(var i = this.level.figures.length; i--; ) {
			var fig = this.level.figures[i];
			
			if(fig.y === this.y + 32 && fig.x >= this.x - 16 && fig.x <= this.x + 16) {
				if(fig instanceof ItemFigure)
					fig.setVelocity(fig.vx, constants.bounce);
				else
					fig.die();
			}
		}
	},
	playFrame: function() {
		if(this.isBouncing) {
			this.view.css({ 'bottom' : (this.bounceDir > 0 ? '+' : '-') + '=' + this.bounceStep + 'px' });
			this.bounceCount += this.bounceDir;
			
			if(this.bounceCount === this.bounceFrames)
				this.bounceDir = -1;
			else if(this.bounceCount === 0) {
				this.bounceDir = 1;
				this.isBouncing = false;
			}
		}
		
		this._super();
	},
});

/*
 * -------------------------------------------
 * COIN CLASSES
 * -------------------------------------------
 */
var Coin = Item.extend({
	init: function(x, y, level) {
		this._super(x, y, false, level);
		this.setImage(images.objects, 0, 0);
		this.setupFrames(10, 4, true);
	},
	activate: function(from) {
		if(!this.activated) {
			this.level.playSound('coin');
			from.addCoin();
			this.remove();
		}
		this._super(from);
	},
	remove: function() {
		this.view.remove();
	},
}, 'coin');

var CoinBoxCoin = Coin.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setImage(images.objects, 96, 0);
		this.clearFrames();
		this.view.hide();
		this.count = 0;
		this.frames = Math.floor(150 / constants.interval);
		this.step = Math.ceil(30 / this.frames);
	},
	remove: function() { },
	addToGrid: function() { },
	addToLevel: function() { },
	activate: function(from) {
		this._super(from);
		this.view.show().css({ 'bottom' : '+=8px' });
	},
	act: function() {
		this.view.css({ 'bottom' : '+=' + this.step + 'px' });
		this.count++;
		return (this.count === this.frames);
	},
});
var CoinBox = Item.extend({
	init: function(x, y, level, amount) {
		this._super(x, y, true, level);
		this.setImage(images.objects, 346, 328);
		this.setAmount(amount || 1);
	},
	setAmount: function(amount) {
		this.items = [];
		this.actors = [];
		
		for(var i = 0; i < amount; i++)
			this.items.push(new CoinBoxCoin(this.x, this.y, this.level));
	},
	activate: function(from) {
		if(!this.isBouncing) {
			if(this.items.length) {
				this.bounce();
				var coin = this.items.pop();
				coin.activate(from);
				this.actors.push(coin);
				
				if(!this.items.length)
					this.setImage(images.objects, 514, 194);
			}
		}
			
		this._super(from);
	},
	playFrame: function() {
		for(var i = this.actors.length; i--; ) {
			if(this.actors[i].act()) {
				this.actors[i].view.remove();
				this.actors.splice(i, 1);
			}
		}
		
		this._super();
	},
}, 'coinbox');
var MultipleCoinBox = CoinBox.extend({
	init: function(x, y, level) {
		this._super(x, y, level, 8);
	},
}, 'multiple_coinbox');

/*
 * -------------------------------------------
 * BREAKABLEBOX CLASSE
 * -------------------------------------------
 */
var BreakableBox = Item.extend({
	init: function(x, y, level, amount) {
		this._super(x, y, true, level);
		this.setImage(images.objects, 346, 328);
	},
	activate: function(from) {
        if (from.state === size_states.big)
        {
        this.removeToGrid(level)
        this._super();
        this.clearFrames();
		this.setImage(images.objects, 307, 330);
        }
    },
}, 'breakbox');


/*
 * -------------------------------------------
 * ITEMFIGURE CLASS
 * -------------------------------------------
 */
var ItemFigure = Figure.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
	},
});

/*
 * -------------------------------------------
 * STARBOX CLASS
 * -------------------------------------------
 */
var StarBox = Item.extend({
	init: function(x, y, level) {
		this._super(x, y, true, level);
		this.setImage(images.objects, 96, 33);
		this.star = new Star(x, y, level);
		this.setupFrames(8, 4, false);
	},
	activate: function(from) {
		if(!this.activated) {
			this.star.release();
			this.clearFrames();
			this.bounce();
			this.setImage(images.objects, 514, 194);
		}
		
		this._super(from);
	},
}, 'starbox');
var Star = ItemFigure.extend({
	init: function(x, y, level) {
		this._super(x, y + 32, level);
		this.active = false;
		this.setSize(32, 32);
		this.setImage(images.objects, 32, 69);
		this.view.hide();
	},
	release: function() {
		this.taken = 4;
		this.active = true;
		this.level.playSound('mushroom');
		this.view.show();
		this.setVelocity(constants.star_vx, constants.star_vy);
		this.setupFrames(10, 2, false);
	},
	collides: function(is, ie, js, je, blocking) {
		return false;
	},
	move: function() {
		if(this.active) {
			this.vy += this.vy <= -constants.star_vy ? constants.gravity : constants.gravity / 2;
			this._super();
		}
		
		if(this.taken)
			this.taken--;
	},
	hit: function(opponent) {
		if(!this.taken && this.active && opponent instanceof Mario) {
			if (you=="mario"){
			opponent.invincible();
			this.die();
			}
		}
		if(!this.taken && this.active && opponent instanceof Luigi) {
			if (you=="luigi"){
			opponent.invincible();
			this.die();
		}
		}
		if(!this.taken && this.active && opponent instanceof Peach) {
			if (you=="peach"){
			opponent.invincible();
			this.die();
			}
		}
	},
});

/*
 * -------------------------------------------
 * BOX CLASS
 * -------------------------------------------
 */
var MushroomBox = Item.extend({
	init: function(x, y, level) {
		this._super(x, y, true, level);
		this.setImage(images.objects, 96, 33);
		this.max_mode = mushroom_mode.plant;
		this.mushroom = new Mushroom(x, y, level);
		this.setupFrames(8, 4, false);
	},
	activate: function(from) {
		if(!this.activated) {
			this.clearFrames();
			this.bounce();
			this.setImage(images.objects, 514, 194);
		}
			
		this._super(from);
	},
}, 'box');

/*
 * -------------------------------------------
 * MUSHROOMBOX CLASS
 * -------------------------------------------
 */
var MushroomBox = Item.extend({
	init: function(x, y, level) {
		this._super(x, y, true, level);
		this.setImage(images.objects, 96, 33);
		this.max_mode = mushroom_mode.plant;
		this.mushroom = new Mushroom(x, y, level);
		this.setupFrames(8, 4, false);
	},
	activate: function(from) {
		if(!this.activated) {
			if(from.state === size_states.small || this.max_mode === mushroom_mode.mushroom)
				this.mushroom.release(mushroom_mode.mushroom);
			else
				this.mushroom.release(mushroom_mode.plant);
			
			this.clearFrames();
			this.bounce();
			this.setImage(images.objects, 514, 194);
		}
			
		this._super(from);
	},
}, 'mushroombox');
var Mushroom = ItemFigure.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.active = false;
		this.setSize(32, 32);
		this.setImage(images.objects, 582, 60);
		this.released = 0;
		this.view.css('z-index', 94).hide();
	},
	release: function(mode) {
		this.released = 4;
		this.level.playSound('mushroom');
		
		if(mode === mushroom_mode.plant)
			this.setImage(images.objects, 548, 60);
			
		this.mode = mode;
		this.view.show();
	},
	move: function() {
		if(this.active) {
			this._super();
		
			if(this.mode === mushroom_mode.mushroom && this.vx === 0)
				this.setVelocity(this.direction === directions.right ? -constants.mushroom_v : constants.mushroom_v, this.vy);
		} else if(this.released) {
			this.released--;
			this.setPosition(this.x, this.y + 8);
			
			if(!this.released) {
				this.active = true;
				this.view.css('z-index', 99);
				
				if(this.mode === mushroom_mode.mushroom)
					this.setVelocity(constants.mushroom_v, constants.gravity);
			}
		}
	},
	hit: function(opponent) {
		if(this.active && opponent instanceof Mario && you=="mario") {
			if(this.mode === mushroom_mode.mushroom)
				opponent.grow();
			else if(this.mode === mushroom_mode.plant)
				opponent.shooter();
				
			this.die();
		}
		if(this.active && opponent instanceof Luigi && you=="luigi") {
			if(this.mode === mushroom_luigi_mode.mushroom)
				opponent.grow();
			else if(this.mode === mushroom_luigi_mode.plant)
				opponent.shooter();
				
			this.die();
		}
		if(this.active && opponent instanceof Peach && you=="peach") {
			if(this.mode === mushroom_peach_mode.mushroom)
				opponent.grow();
			else if(this.mode === mushroom_peach_mode.plant)
				opponent.shooter();
				
			this.die();
		}
	},
});

/*
 * -------------------------------------------
 * BULLET CLASS
 * -------------------------------------------
 */
var Bullet = Figure.extend({
	init: function(parent) {
		this._super(parent.x + 31, parent.y + 14, parent.level);
		this.parent = parent;
		this.setImage(images.sprites, 191, 366);
		this.setSize(16, 16);
		this.direction = parent.direction;
		this.vy = 0;
		this.life = Math.ceil(2000 / constants.interval);
		this.speed = constants.bullet_v;
		this.vx = this.direction === directions.right ? this.speed : -this.speed;
	},
	setVelocity: function(vx, vy) {
		this._super(vx, vy);
	
		if(this.vx === 0) {
			var s = this.speed * Math.sign(this.speed);
			this.vx = this.direction === directions.right ? -s : s;
		}
		
		if(this.onground)
			this.vy = constants.bounce;
	},
	move: function() {
		if(--this.life)
			this._super();
		else
			this.die();
	},
	hit: function(opponent) {
		if(!(opponent instanceof Mario) && !(opponent instanceof Luigi)&& !(opponent instanceof Peach)) {
			opponent.die();
			this.die();
		}
	},
});

/*
 * -------------------------------------------
 * HERO CLASS
 * -------------------------------------------
 */
var Hero = Figure.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
	},
});

/*
 * -------------------------------------------
 * MARIO CLASS
 * -------------------------------------------
 */
var w = 0
	//record = confirm("Record a ghost ?")
	//if (record==true)
	//{
	//ghost123 = new Array()
	//i=-1
	//}
	mario1=0
	mario2=0
	mario5=0
	luigi1=0
	luigi2=0
	luigi5=0
	peach1=0
	peach2=0
	peach5=0
	victory=0
	d1=0
	d2=0
	d3=0
	c1=0
	c2=0
	c3=0
	c12=0
	c22=0
	c32=0
	s1=0
	s2=0
	s3=0
	salon = "main"
	if(location.href.indexOf("salon")!=-1) salon = location.href.split("&salon=")[1].split("&")[0]
	socket = io()
			socket.on('mario1', function(msg){
                num = msg.split("&")[0]
			if(salon==num && you!="mario"){
			mario1 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
			socket.on('mario2', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="mario"){
			//alert(msg)
			mario2 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
            socket.on('mario5', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="mario"){
			//alert(msg)
			final = msg.split("&")[1]=="true" ? true : false 
			mario5 = final
			// alert("lol")
			}
			})
            socket.on('luigi1', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="luigi"){
			luigi1 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
			socket.on('luigi2', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="luigi"){
			//alert(msg)
			luigi2 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
            socket.on('luigi5', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="luigi"){
			//alert(msg)
            final = msg.split("&")[1]=="true" ? true : false 
			luigi5 = final
			// alert("lol")
			}
			})
            socket.on('peach1', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="peach"){
			peach1 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
			socket.on('peach2', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="peach"){
			//alert(msg)
			peach2 = parseInt(msg.split("&")[1])
			// alert("lol")
			}
			})
            socket.on('peach5', function(msg){
			    num = msg.split("&")[0]
			if(salon==num && you!="peach"){
			//alert(msg)
			final = msg.split("&")[1]=="true" ? true : false 
			peach5 = final
			// alert("lol")
			}
			})
            socket.on('victory', function(msg){
                num = msg.split("&")[0]
			if(salon==num) victory = 1
            })
	            socket.on('d1', function(msg){
                num = msg.split("&")[0]
			if(salon==num) d1 = 1
                setTimeout("d1 = 0",100)
            })
	            socket.on('d2', function(msg){
                num = msg.split("&")[0]
			if(salon==num) d2 = 1
                setTimeout("d2 = 0",100)
            })
	            socket.on('d3', function(msg){
                num = msg.split("&")[0]
			if(salon==num) d3 = 1
                setTimeout("d3 = 0",100)
            })
            socket.on('c1', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c1 = msg.split("&")[1]
                setTimeout("c1 = 0",30)
            })
            socket.on('c2', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c2 = msg.split("&")[1]
                setTimeout("c2 = 0",30)
            })
            socket.on('c3', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c3 = msg.split("&")[1]
                setTimeout("c3 = 0",30)
            })
            
            socket.on('c12', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c12 = msg.split("&")[1]
                setTimeout("c12 = 0",30)
            })
            socket.on('c22', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c22 = msg.split("&")[1]
                setTimeout("c22 = 0",30)
            })
            socket.on('c32', function(msg){
                num = msg.split("&")[0]
			if(salon==num) c32 = msg.split("&")[1]
                setTimeout("c32 = 0",30)
            })            
            socket.on('s1', function(msg){
                num = msg.split("&")[0]
			if(salon==num) s1 = msg.split("&")[1]
                setTimeout("s1 = 0",30)
            })
            socket.on('s2', function(msg){
                num = msg.split("&")[0]
			if(salon==num) s2 = msg.split("&")[1]
                setTimeout("s2 = 0",30)
            })
            socket.on('s3', function(msg){
                num = msg.split("&")[0]
			if(salon==num) s3 = msg.split("&")[1]
                setTimeout("s3 = 0",30)
            })
	ley=0
var Mario = Hero.extend({
	init: function(x, y, level) {
        mario1 = x
        mario2 = y
        mario5 = 0
		this.standSprites = [
			[[{ x : 0, y : 81},{ x: 481, y : 83}],[{ x : 81, y : 0},{ x: 561, y : 83}]],
			[[{ x : 0, y : 162},{ x: 481, y : 247}],[{ x : 81, y : 243},{ x: 561, y : 247}]]
		];
		this.crouchSprites = [
			[{ x : 241, y : 0},{ x: 161, y : 0}],
			[{ x : 241, y : 162},{ x: 241, y : 243}]
		];
		this.deadly = 0;
		this.invulnerable = 0;
		this.width = 80;
		this._super(x, y, level);
		this.blinking = 0;
		this.setOffset(-24, 0);
		this.setSize(80, 80);
		this.cooldown = 0;
		this.setMarioState(mario_states.normal);
		this.setLifes(constants.start_lives);
		this.setCoins(0);
		this.deathBeginWait = Math.floor(700 / constants.interval);
		this.deathEndWait = 0;
		this.deathFrames = Math.floor(600 / constants.interval);
		this.deathStepUp = Math.ceil(200 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.direction = directions.right;
		if (this.marioState === mario_states.normal)
		this.setImage(images.sprites, 81, 0);
		else
		this.setImage(images.spritesf, 81, 0);
		this.crouching = true;
		this.fast = false;
	},
	setMarioState: function(state) {
		this.marioState = state;
	},
	setState: function(state) {
		if(state !== this.state) {
			this.setMarioState(mario_states.normal);
			this._super(state);
		}

	},
	setPosition: function(x, y) {
//         alert(salon+"&"+this.x)
		if(you=="mario"){socket.emit("mario1",salon+"&"+this.x)}
		if(you=="mario"){socket.emit("mario2",salon+"&"+this.y)}
		if(you=="mario"){socket.emit("mario5",salon+"&"+this.crouching)}
		if(you!="mario"){this._super(mario1, mario2);}
		if(you=="mario"){this._super(x, y);}
		// REPRENDRE ICI
		// if (mario1<this.x){this.walkRight()}
		// if (mario1>this.x){this.walkLeft()}
		// if (mario1==this.x){this.stand()}
		
		var r = this.level.width - 640;
		// var r2 = this.level.height - 640;
		if (cam==0 ||counterplayer==1){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
        levelheight = 32* 6
		if (cam==0) {ley = this.y >= levelheight?-this.y+levelheight:0}
		var marge = 30
		var demimarge = marge/10*7
		this.level.setParallax(w,ley);
                document.getElementById("finish").style.position = 'absolute'
		document.getElementById("finish").style.left = definedLevels[levelnumber].x+'px'
		document.getElementById("finish").style.bottom = definedLevels[levelnumber].y-5+'px'
		if (this.x <= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '98'
		if (this.x >= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '100'
		if (this.x >= definedLevels[levelnumber].x && this.x <= definedLevels[levelnumber].x + marge && this.y >= definedLevels[levelnumber].y && this.y <= definedLevels[levelnumber].y + 128 && this.onground)
			this.victory()
		//setInterval("i++;ghost123[i]={x:"+this.x+",y:"+this.y+"}",1000)
            if(victory==1){this.victory()}
        if(d1==1) this.die()
        if(c12=="hurt"&& you!="mario") this.hurt()
        if(c1=="grow"  && you!="mario") this.grow()
        if(s1=="true"  && you!="mario") this.shooter()

			 // alert(x+","+y)
	},
	input: function(keys) {
		this.fast = keys.accelerate;
        if(you=="mario"){this.crouching = keys.down;}
        if(you!="mario"){this.crouching = mario5;}
		
		if(!this.crouching) {
			if(this.onground && keys.up)
				this.jump();
				
			if(keys.accelerate && this.marioState === mario_states.fire)
				this.shoot();
				
			if(keys.right=="true" || keys.left=="true")
				this.walk(keys.left, keys.accelerate);
			else
				this.vx = 0;
		}
	},

	victory: function() {
        
        socket.emit("victory",salon+"&"+true)
		document.getElementById("finish").innerHTML ='<img id="finish_level" src="Content\/'+localStorage.getItem("attr")+'mario-finish-2.gif">'
		this.level.playMusic('success');
		this.clearFrames();
		this.view.show();
		if (this.marioState === mario_states.normal)
		this.setImage(images.sprites, this.state === size_states.small ? 241 : 161, 81);
		else
		this.setImage(images.spritesf, this.state === size_states.small ? 241 : 161, 81);
		
		this.level.next();
		setTimeout("document.getElementById(\"finish\").style.display = 'none'",7000)
		setTimeout("document.write(JSON.stringify(ghost123))",1)

	},
	shoot: function() {
		if(!this.cooldown) {
			this.cooldown = constants.cooldown;
			this.level.playSound('shoot');
			new Bullet(this);
		}
	},
	setVelocity: function(vx, vy) {
		if(this.crouching) {
			vx = 0;
			this.crouch();
		} else {
			if(this.onground && vx > 0)
				this.walkRight();
			else if(this.onground && vx < 0)
				this.walkLeft();
			else
				this.stand();
		}
	
		this._super(vx, vy);
	},
	blink: function(times) {
		this.blinking = Math.max(2 * times * constants.blinkfactor, this.blinking || 0);
	},
	invincible: function() {
		this.level.playMusic('invincibility');
		this.deadly = Math.floor(constants.invincible / constants.interval);
		this.invulnerable = this.deadly;
		this.blink(Math.ceil(this.deadly / (2 * constants.blinkfactor)));
	},
	grow: function() {
		if(this.state === size_states.small) {
			this.level.playSound('grow');
			this.setState(size_states.big);
			this.blink(3);
			this.grow()
		socket.emit("c1",salon+"&"+"grow")
		}
	},
	shooter: function() {
		if(this.state === size_states.small)
			this.grow();
		else
			this.level.playSound('grow');
            
        //MARQUE PAGE : AJOUTER LE STATE SHOOTER COMMUN
		this.setMarioState(mario_states.fire);
        socket.emit("s1",salon+"&"+true)
	},
	walk: function(reverse, fast) {
		this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse=="true" ? - 1 : 1);
	},
	walkRight: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, true, 'WalkRightSmall'))
				this.setImage(images.sprites, 0, 0);
		} else {
			if(!this.setupFrames(9, 2, true, 'WalkRightBig'))
			if (this.marioState === mario_states.normal)
			this.setImage(images.sprites, 0, 243);
			else
			this.setImage(images.spritesf, 0, 243);
		}
	},
	walkLeft: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, false, 'WalkLeftSmall'))
				this.setImage(images.sprites, 80, 81);
		} else {
			if(!this.setupFrames(9, 2, false, 'WalkLeftBig'))
				if (this.marioState === mario_states.normal)
				this.setImage(images.sprites, 81, 162);
			else
				this.setImage(images.spritesf, 81, 162);
		}
	},
	stand: function() {
		var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
		if (this.marioState === mario_states.normal)
		this.setImage(images.sprites, coords.x, coords.y);
		else
		this.setImage(images.spritesf, coords.x, coords.y);
		this.clearFrames();
	},
	crouch: function() {
		var coords = this.crouchSprites[this.state - 1][this.direction === directions.left ? 0 : 1];
		if (this.marioState === mario_states.normal)
		this.setImage(images.sprites, coords.x, coords.y);
		else
		this.setImage(images.spritesf, coords.x, coords.y);
		this.clearFrames();
	},
	jump: function() {
		this.level.playSound('jump');
		this.vy = constants.jumping_v;
	},
	move: function() {
		this.input(keys);		
		this._super();
	},
	addCoin: function() {
		this.setCoins(this.coins + 1);
		numberCoin -= -1
		if (document.getElementById("coinNumber").innerHTML==99)
		this.level.playSound("lifeupgrade")
		document.getElementById("coinNumber").innerHTML = numberCoin%100
		la100aine = (numberCoin - numberCoin%100) /100
		document.getElementById("liveNumber").innerHTML = constants.start_lives + la100aine
		window.location = "#"+la100aine
	},
	playFrame: function() {		
		if(this.blinking) {
			if(this.blinking % constants.blinkfactor === 0)
				this.view.toggle();
				
			this.blinking--;
		}
		
		if(this.cooldown)
			this.cooldown--;
		
		if(this.deadly)
			this.deadly--;
		
		if(this.invulnerable)
			this.invulnerable--;
		
		this._super();
	},
	setCoins: function(coins) {
		this.coins = coins;
		
		if(this.coins >= constants.max_coins) {
			this.addLife()
			this.coins -= constants.max_coins;
		}
				
		this.level.world.parent().children('#coinNumber').text(this.coins);
	},
	addLife: function() {
		this.level.playSound('liveupgrade');
		this.setLifes(this.lifes + 1);
	},
	setLifes : function(lifes) {
		this.lifes = lifes;
		this.level.world.parent().children('#liveNumber').text(this.lifes);
	},
	death: function() {
		if(this.deathBeginWait) {
			this.deathBeginWait--;
			return true;
		}
		
		if(this.deathEndWait)
			return --this.deathEndWait;
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			this.deathEndWait = Math.floor(1800 / constants.interval);
			
		return true;
	},
	die: function() {
        socket.emit("d1",salon+"&"+1)
		adddeathplayer += 1
		this.setMarioState(mario_states.normal);
		this.deathStepDown = Math.ceil(240 / this.deathFrames);
		this.setupFrames(9, 2, false);
		this.setImage(images.sprites, 81, 324);
		this.level.playMusic('die');
		this._super();
	},
	afterfirstdie: function() {
		this.level.playMusic('overworld');
	},	
	hurt: function(from) {
		if(this.deadly)
			from.die();
		else if(this.invulnerable)
			return;
		else if(this.state === size_states.small) {
			this.die();
			function firstdie()
			{
			this.afterfirstdie()
			}
			setTimeout(firstdie(),2000)
		} else {
			this.invulnerable = Math.floor(constants.invulnerable / constants.interval);
			this.blink(Math.ceil(this.invulnerable / (2 * constants.blinkfactor)));
			this.setState(size_states.small);
			this.level.playSound('hurt');			
            socket.emit("c12",salon+"&"+"hurt")
		}
	},
}, 'mario');


/*
 * -------------------------------------------
 * LUIGI CLASS
 * -------------------------------------------
 */
var w = 0
var Luigi = Hero.extend({
	init: function(x, y, level) {
        luigi1 = x
        luigi2 = y
        luigi5 = 0
		this.standSprites = [
			[[{ x : 0, y : 81},{ x: 481, y : 83}],[{ x : 81, y : 0},{ x: 561, y : 83}]],
			[[{ x : 0, y : 162},{ x: 481, y : 247}],[{ x : 81, y : 243},{ x: 561, y : 247}]]
		];
		this.crouchSprites = [
			[{ x : 241, y : 0},{ x: 161, y : 0}],
			[{ x : 241, y : 162},{ x: 241, y : 243}]
		];
		this.deadly = 0;
		this.invulnerable = 0;
		this.width = 80;
		this._super(x, y, level);
		this.blinking = 0;
		this.setOffset(-24, 0);
		this.setSize(80, 80);
		this.cooldown = 0;
		this.setLuigiState(luigi_states.normal);
		this.deathBeginWait = Math.floor(700 / constants.interval);
		this.deathEndWait = 0;
		this.deathFrames = Math.floor(600 / constants.interval);
		this.deathStepUp = Math.ceil(200 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.direction = directions.right;
		if (this.luigiState === luigi_states.normal)
		this.setImage(images.spritesl, 81, 0);
		else
		this.setImage(images.spriteslf, 81, 0);
		this.crouching = false;
		this.fast = false;
	},
	setLuigiState: function(state) {
		this.luigiState = state;
	},
	setState: function(state) {
		if(state !== this.state) {
			this.setLuigiState(luigi_states.normal);
			this._super(state);
		}
	},

	setPosition: function(x, y) {
        if(you=="luigi"){socket.emit("luigi1",salon+"&"+this.x)}
		if(you=="luigi"){socket.emit("luigi2",salon+"&"+this.y)}
		if(you=="luigi"){socket.emit("luigi5",salon+"&"+this.crouching)}
		if(you!="luigi"){this._super(luigi1, luigi2);}
		if(you=="luigi"){this._super(x, y);}
		var r = this.level.width - 640;
		// var r2 = this.level.height - 640;
		if (cam==1 ||counterplayer==1){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
        levelheight = 32* 6
		if (cam==1) {ley = this.y >= levelheight?-this.y+levelheight:0}
		var marge = 30
		var demimarge = marge/10*7
		this.level.setParallax(w);
                document.getElementById("finish").style.position = 'absolute'
		document.getElementById("finish").style.left = definedLevels[levelnumber].x+'px'
		document.getElementById("finish").style.bottom = definedLevels[levelnumber].y-5+'px'
		if (this.x <= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '98'
		if (this.x >= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '100'
		if (this.x >= definedLevels[levelnumber].x && this.x <= definedLevels[levelnumber].x + marge && this.y >= definedLevels[levelnumber].y && this.y <= definedLevels[levelnumber].y + 128 && this.onground)
			 {this.victory()}
		//setInterval("i++;ghost123[i]={x:"+this.x+",y:"+this.y+"}",1000)

			 // alert(x+","+y)
			 if(victory == 1){this.victory()}
			 if(d2==1) this.die()
        if(c22=="hurt"&& you!="luigi") this.hurt()
        if(c2=="grow"  && you!="luigi") this.grow()
        if(s2=="true"  && you!="peach") this.shooter()

	},
	input: function(keys) {
		this.fast = keys.accelerate;
        if(you=="luigi"){this.crouching = keysluigi.down;}
        if(you!="luigi"){this.crouching = luigi5;}
		
		if(!this.crouching) {
			if(this.onground && keys.up)
				this.jump();
				
			if(keys.accelerate && this.luigiState === luigi_states.fire)
				this.shoot();
				
			if(keys.right=="true" || keys.left=="true")
				this.walk(keys.left, keys.accelerate);
			else
				this.vx = 0;
		}
	},
	victory: function() {
        socket.emit("victory",salon+"&"+true)
		document.getElementById("finish").innerHTML ='<img id="finish_level" src="Content\/'+localStorage.getItem("attr")+'mario-finish-2.gif">'
		this.level.playMusic('success');
		this.clearFrames();
		this.view.show();
		if (this.luigiState === luigi_states.normal)
		this.setImage(images.spritesl, this.state === size_states.small ? 241 : 161, 81);
		else
		this.setImage(images.spriteslf, this.state === size_states.small ? 241 : 161, 81);
		this.level.next();
		setTimeout("document.getElementById(\"finish\").style.display = 'none'",7000)
		setTimeout("document.write(JSON.stringify(ghost123))",1)

	},
	shoot: function() {
		if(!this.cooldown) {
			this.cooldown = constants.cooldown;
			this.level.playSound('shoot');
			new Bullet(this);
		}
	},
	setVelocity: function(vx, vy) {
		if(this.crouching) {
			vx = 0;
			this.crouch();
		} else {
			if(this.onground && vx > 0)
				this.walkRight();
			else if(this.onground && vx < 0)
				this.walkLeft();
			else
				this.stand();
		}
	
		this._super(vx, vy);
	},
	blink: function(times) {
		this.blinking = Math.max(2 * times * constants.blinkfactor, this.blinking || 0);
	},
	invincible: function() {
		this.level.playMusic('invincibility');
		this.deadly = Math.floor(constants.invincible / constants.interval);
		this.invulnerable = this.deadly;
		this.blink(Math.ceil(this.deadly / (2 * constants.blinkfactor)));
	},
	grow: function() {
		if(this.state === size_states.small) {
        socket.emit("c2",salon+"&"+"grow")
			this.level.playSound('grow');
			this.setState(size_states.big);
			this.blink(3);
		}
	},
	shooter: function() {
		if(this.state === size_states.small)
			this.grow();
		else
			this.level.playSound('grow');
			
		this.setLuigiState(luigi_states.fire);
        socket.emit("s2",salon+"&"+true)
	},
	walk: function(reverse, fast) {
		this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse=="true" ? - 1 : 1);
	},
	walkRight: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, true, 'WalkRightSmall'))
				this.setImage(images.spritesl, 0, 0);
		} else {
			if(!this.setupFrames(9, 2, true, 'WalkRightBig'))
				if (this.luigiState === luigi_states.normal)
				this.setImage(images.spritesl, 0, 243);
				else
				this.setImage(images.spriteslf, 0, 243);
		}
	},
	walkLeft: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, false, 'WalkLeftSmall'))
				this.setImage(images.spritesl, 80, 81);
		} else {
			if(!this.setupFrames(9, 2, false, 'WalkLeftBig'))
				if (this.luigiState === luigi_states.normal)
				this.setImage(images.spritesl, 81, 162);
				else
				this.setImage(images.spriteslf, 81, 162);
		}
	},
	stand: function() {
		var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
		if (this.luigiState === luigi_states.normal)
		this.setImage(images.spritesl, coords.x, coords.y);
		else
		this.setImage(images.spriteslf, coords.x, coords.y);
		this.clearFrames();
	},
	crouch: function() {
		var coords = this.crouchSprites[this.state - 1][this.direction === directions.left ? 0 : 1];
		if (this.luigiState === luigi_states.normal)
		this.setImage(images.spritesl, coords.x, coords.y);
		else
		this.setImage(images.spriteslf, coords.x, coords.y);
		this.clearFrames();
	},
	jump: function() {
		this.level.playSound('jump');
		this.vy = constants.jumping_v;
	},
	move: function() {
		this.input(keysluigi);		
		this._super();
	},
		addCoin: function() {
		this.setCoins(this.coins + 1);
		numberCoin -= -1
		if (document.getElementById("coinNumber").innerHTML==99)
		this.level.playSound("lifeupgrade")
		document.getElementById("coinNumber").innerHTML = numberCoin%100
		la100aine = (numberCoin - numberCoin%100) /100
		document.getElementById("liveNumber").innerHTML = constants.start_lives + la100aine
		window.location = "#"+la100aine


	},
	playFrame: function() {		
		if(this.blinking) {
			if(this.blinking % constants.blinkfactor === 0)
				this.view.toggle();
				
			this.blinking--;
		}
		
		if(this.cooldown)
			this.cooldown--;
		
		if(this.deadly)
			this.deadly--;
		
		if(this.invulnerable)
			this.invulnerable--;
		
		this._super();
	},
	setCoins: function(coins) {
		this.coins = coins;
		
		if(this.coins >= constants.max_coins) {
			this.addLife()
			this.coins -= constants.max_coins;
		}
				
		this.level.world.parent().children('#coinNumber').text(this.coins);
	},
	death: function() {
		if(this.deathBeginWait) {
			this.deathBeginWait--;
			return true;
		}
		
		if(this.deathEndWait)
			return --this.deathEndWait;
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			this.deathEndWait = Math.floor(1800 / constants.interval);
			
		return true;
	},
	die: function() {
        socket.emit("d2",salon+"&"+1)
		adddeathplayer += 1
		this.setLuigiState(luigi_states.normal);
		this.deathStepDown = Math.ceil(240 / this.deathFrames);
		this.setupFrames(9, 2, false);
		this.setImage(images.spritesl, 81, 324);
		this.level.playMusic('die');
		this._super();
	},
	
	hurt: function(from) {
		if(this.deadly)
			from.die();
		else if(this.invulnerable)
			return;
		else if(this.state === size_states.small) {
			this.die();
		} else {
			this.invulnerable = Math.floor(constants.invulnerable / constants.interval);
			this.blink(Math.ceil(this.invulnerable / (2 * constants.blinkfactor)));
			this.setState(size_states.small);
			this.level.playSound('hurt');			
            socket.emit("c22",salon+"&"+"hurt")
		}
	},
}, 'luigi');


/*
 * -------------------------------------------
 * PEACH CLASS
 * -------------------------------------------
 */
var w = 0
var Peach = Hero.extend({
	init: function(x, y, level) {
        peach1 = x
        peach2 = y
        peach5 = 0
		this.standSprites = [
			[[{ x : 0, y : 81},{ x: 481, y : 83}],[{ x : 81, y : 0},{ x: 561, y : 83}]],
			[[{ x : 0, y : 162},{ x: 481, y : 247}],[{ x : 81, y : 243},{ x: 561, y : 247}]]
		];
		this.crouchSprites = [
			[{ x : 241, y : 0},{ x: 161, y : 0}],
			[{ x : 241, y : 162},{ x: 241, y : 243}]
		];
		this.deadly = 0;
		this.invulnerable = 0;
		this.width = 80;
		this._super(x, y, level);
		this.blinking = 0;
		this.setOffset(-24, 0);
		this.setSize(80, 80);
		this.cooldown = 0;
		this.setPeachState(peach_states.normal);
		this.deathBeginWait = Math.floor(700 / constants.interval);
		this.deathEndWait = 0;
		this.deathFrames = Math.floor(600 / constants.interval);
		this.deathStepUp = Math.ceil(200 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.direction = directions.right;
		if (this.peachState === peach_states.normal)
		this.setImage(images.spritesp, 81, 0);
		else
		this.setImage(images.spritespf, 81, 0);
		this.crouching = false;
		this.fast = false;
	},
	setPeachState: function(state) {
		this.peachState = state;
	},
	setState: function(state) {
		if(state !== this.state) {
			this.setPeachState(peach_states.normal);
			this._super(state);
		}
	},

	setPosition: function(x, y) {
        if(you=="peach"){socket.emit("peach1",salon+"&"+this.x)}
		if(you=="peach"){socket.emit("peach2",salon+"&"+this.y)}
		if(you=="peach"){socket.emit("peach5",salon+"&"+this.crouching)}
		if(you!="peach"){this._super(peach1, peach2);}
		if(you=="peach"){this._super(x, y);}
		var r = this.level.width - 640;
		// var r2 = this.level.height - 640;
		if (cam==2){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
		if (cam==1 && counterplayer==2){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
        levelheight = 32* 6
		if (cam==2) {ley = this.y >= levelheight?-this.y+levelheight:0}
		if (cam==1 && counterplayer==2) {ley = this.y >= levelheight?-this.y+levelheight:0}
		var marge = 30
		var demimarge = marge/10*7
		this.level.setParallax(w);
                document.getElementById("finish").style.position = 'absolute'
		document.getElementById("finish").style.left = definedLevels[levelnumber].x+'px'
		document.getElementById("finish").style.bottom = definedLevels[levelnumber].y-5+'px'
		if (this.x <= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '98'
		if (this.x >= definedLevels[levelnumber].x + demimarge)
		document.getElementById("finish").style.zIndex= '100'
		if (this.x >= definedLevels[levelnumber].x && this.x <= definedLevels[levelnumber].x + marge && this.y >= definedLevels[levelnumber].y && this.y <= definedLevels[levelnumber].y + 128 && this.onground)
			 {this.victory()}
			 if(victory==1){this.victory()}
            if(d3==1) this.die()
        if(c32=="hurt" && you!="peach") this.hurt()
        if(c3=="grow"  && you!="peach") this.grow()
        if(s3=="true"  && you!="peach") this.shooter()
		//setInterval("i++;ghost123[i]={x:"+this.x+",y:"+this.y+"}",1000)
			 // alert(x+","+y)
	},
	input: function(keys) {
        if(you=="peach"){this.crouching = keyspeach.down;}
        if(you!="peach"){this.crouching = peach5;}
		this.fast = keys.accelerate;
		this.crouching = keys.down;
		
		if(!this.crouching) {
			if(this.onground && keys.up)
				this.jump();
				
			if(keys.accelerate && this.peachState === peach_states.fire)
				this.shoot();
				
			if(keys.right=="true" || keys.left=="true")
				this.walk(keys.left, keys.accelerate);
			else
				this.vx = 0;
		}
	},
	victory: function() {
        
        socket.emit("victory",salon+"&"+true)
		document.getElementById("finish").innerHTML ='<img id="finish_level" src="Content\/'+localStorage.getItem("attr")+'mario-finish-2.gif">'

		this.level.playMusic('success');
		this.clearFrames();
		this.view.show();
		if (this.peachState === peach_states.normal)
		this.setImage(images.spritesp, this.state === size_states.small ? 241 : 161, 81);
		else
		this.setImage(images.spritespf, this.state === size_states.small ? 241 : 161, 81);
		this.level.next();
		setTimeout("document.getElementById(\"finish\").style.display = 'none'",7000)
		setTimeout("document.write(JSON.stringify(ghost123))",1)

	},
	shoot: function() {
		if(!this.cooldown) {
			this.cooldown = constants.cooldown;
			this.level.playSound('shoot');
			new Bullet(this);
		}
	},
	setVelocity: function(vx, vy) {
		if(this.crouching) {
			vx = 0;
			this.crouch();
		} else {
			if(this.onground && vx > 0)
				this.walkRight();
			else if(this.onground && vx < 0)
				this.walkLeft();
			else
				this.stand();
		}
	
		this._super(vx, vy);
	},
	blink: function(times) {
		this.blinking = Math.max(2 * times * constants.blinkfactor, this.blinking || 0);
	},
	invincible: function() {
		this.level.playMusic('invincibility');
		this.deadly = Math.floor(constants.invincible / constants.interval);
		this.invulnerable = this.deadly;
		this.blink(Math.ceil(this.deadly / (2 * constants.blinkfactor)));
	},
	grow: function() {
		if(this.state === size_states.small) {
        socket.emit("c3",salon+"&"+"grow")
			this.level.playSound('grow');
			this.setState(size_states.big);
			this.blink(3);
		}
	},
	shooter: function() {
		if(this.state === size_states.small)
			this.grow();
		else
			this.level.playSound('grow');
			
        
        socket.emit("s3",salon+"&"+true)
		this.setPeachState(peach_states.fire);
	},
	walk: function(reverse, fast) {
		this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse=="true" ? - 1 : 1);
	},
	walkRight: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, true, 'WalkRightSmall'))
				this.setImage(images.spritesp, 0, 0);
		} else {
			if(!this.setupFrames(9, 2, true, 'WalkRightBig'))
				if (this.peachState === peach_states.normal)
				this.setImage(images.spritesp, 0, 243);
				else
				this.setImage(images.spritespf, 0, 243);
		}
	},
	walkLeft: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, false, 'WalkLeftSmall'))
				this.setImage(images.spritesp, 80, 81);
		} else {
			if(!this.setupFrames(9, 2, false, 'WalkLeftBig'))
				if (this.peachState === peach_states.normal)
				this.setImage(images.spritesp, 81, 162);
				else
				this.setImage(images.spritespf, 81, 162);
		}
	},
	stand: function() {
		var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
		if (this.peachState === peach_states.normal)
		this.setImage(images.spritesp, coords.x, coords.y);
		else
		this.setImage(images.spritespf, coords.x, coords.y);
		this.clearFrames();
	},
	crouch: function() {
		var coords = this.crouchSprites[this.state - 1][this.direction === directions.left ? 0 : 1];
		if (this.peachState === peach_states.normal)
		this.setImage(images.spritesp, coords.x, coords.y);
		else
		this.setImage(images.spritespf, coords.x, coords.y);
		this.clearFrames();
	},
	jump: function() {
		this.level.playSound('jump');
		this.vy = constants.jumping_v;
	},
	move: function() {
		this.input(keyspeach);		
		this._super();
	},
		addCoin: function() {
		this.setCoins(this.coins + 1);
		numberCoin -= -1
		if (document.getElementById("coinNumber").innerHTML==99)
		this.level.playSound("lifeupgrade")
		document.getElementById("coinNumber").innerHTML = numberCoin%100
		la100aine = (numberCoin - numberCoin%100) /100
		document.getElementById("liveNumber").innerHTML = constants.start_lives + la100aine
		window.location = "#"+la100aine


	},
	playFrame: function() {		
		if(this.blinking) {
			if(this.blinking % constants.blinkfactor === 0)
				this.view.toggle();
				
			this.blinking--;
		}
		
		if(this.cooldown)
			this.cooldown--;
		
		if(this.deadly)
			this.deadly--;
		
		if(this.invulnerable)
			this.invulnerable--;
		
		this._super();
	},
	setCoins: function(coins) {
		this.coins = coins;
		
		if(this.coins >= constants.max_coins) {
			this.addLife()
			this.coins -= constants.max_coins;
		}
				
		this.level.world.parent().children('#coinNumber').text(this.coins);
	},
	death: function() {
		if(this.deathBeginWait) {
			this.deathBeginWait--;
			return true;
		}
		
		if(this.deathEndWait)
			return --this.deathEndWait;
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			this.deathEndWait = Math.floor(1800 / constants.interval);
			
		return true;
	},
	die: function() {
        socket.emit("d3",salon+"&"+1)
		adddeathplayer += 1
		this.setPeachState(peach_states.normal);
		this.deathStepDown = Math.ceil(240 / this.deathFrames);
		this.setupFrames(9, 2, false);
		this.setImage(images.spritesp, 81, 324);
		this.level.playMusic('die');
//         socket.emit("mariodie",salon)
		this._super();
	},
	
	hurt: function(from) {
		if(this.deadly)
			from.die();
		else if(this.invulnerable)
			return;
		else if(this.state === size_states.small) {
			this.die();
		} else {
			this.invulnerable = Math.floor(constants.invulnerable / constants.interval);
			this.blink(Math.ceil(this.invulnerable / (2 * constants.blinkfactor)));
			this.setState(size_states.small);
			this.level.playSound('hurt');			
            socket.emit("c32",salon+"&"+"hurt");
		}
	},
}, 'peach');

/*
 * -------------------------------------------
 * ENEMY CLASS
 * -------------------------------------------
 */
var Enemy = Figure.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.speed = 0;
	},
	hide: function() {
		this.invisible = true;
		this.view.hide();
	},
	show: function() {	
		this.invisible = false;
		this.view.show();
	},
	move: function() {
		if(!this.invisible) {
			this._super();
		
			if(this.vx === 0) {
				var s = this.speed * Math.sign(this.speed);
				this.setVelocity(this.direction === directions.right ? -s : s, this.vy);
			}
		}
	},
	collides: function(is, ie, js, je, blocking) {
		if(this.j + 1 < this.level.getGridHeight()) {
			for(var i = is; i <= ie; i++) {
				if(i < 0 || i >= this.level.getGridWidth())
					return true;
					
				var obj = this.level.obstacles[i][this.j + 1];
				
				if(!obj || (obj.blocking & ground_blocking.top) !== ground_blocking.top)
					return true;
			}
		}
		
		return this._super(is, ie, js, je, blocking);
	},
	setSpeed: function(v) {
		this.speed = v;
		this.setVelocity(-v, 0);
	},
	hurt: function(from) {
		this.die();
	},
	hit: function(opponent) {
		if(this.invisible)
			return;
			
		if(opponent instanceof Mario) {
			if(you=="mario"){
			if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
				opponent.setVelocity(opponent.vx, constants.bounce);
				this.hurt(opponent);
			} else {
				opponent.hurt(this);
			}
			}
		}
			
		if(opponent instanceof Luigi) {
			if(you=="luigi"){
				if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
					opponent.setVelocity(opponent.vx, constants.bounce);
					this.hurt(opponent);
				} else {
					opponent.hurt(this);
				}
				}
		}
			
		if(opponent instanceof Peach) {
			if(you=="peach"){
				if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
					opponent.setVelocity(opponent.vx, constants.bounce);
					this.hurt(opponent);
				} else {
					opponent.hurt(this);
				}
				}
		}
	},
});

/*
 * -------------------------------------------
 * GUMPA CLASS
 * -------------------------------------------
 */
var Gumpa = Enemy.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setSize(34, 32);
		this.setSpeed(constants.ballmonster_v);
		this.death_mode = death_modes.normal;
		this.deathCount = 0;
	},
	setVelocity: function(vx, vy) {
		this._super(vx, vy);
		
		if(this.direction === directions.left) {
			if(!this.setupFrames(6, 2, false, 'LeftWalk'))
				this.setImage(images.enemies, 34, 188);
		} else {
			if(!this.setupFrames(6, 2, true, 'RightWalk'))
				this.setImage(images.enemies, 0, 228);
		}
	},
	death: function() {
		if(this.death_mode === death_modes.normal)
			return --this.deathCount;
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			return false;
			
		return true;
	},
	die: function() {
		this.clearFrames();
		
		if(this.death_mode === death_modes.normal) {
			this.level.playSound('enemy_die');
			this.setImage(images.enemies, 102, 228);
			this.deathCount = Math.ceil(600 / constants.interval);
		} else if(this.death_mode === death_modes.shell) {
			this.level.playSound('shell');
			this.setImage(images.enemies, 68, this.direction === directions.right ? 228 : 188);
			this.deathFrames = Math.floor(250 / constants.interval);
			this.deathDir = 1;
			this.deathStep = Math.ceil(150 / this.deathFrames);
		}
		
		this._super();
	},
}, 'ballmonster');

/*
 * -------------------------------------------
 * TURTLESHELL CLASS
 * -------------------------------------------
 */
var TurtleShell = Enemy.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setSize(34, 32);
		this.speed = 0;
		this.setImage(images.enemies, 0, 494);
	},
	activate: function(x, y) {
		this.setupFrames(6, 4, false)
		this.setPosition(x, y);
		this.show();
	},
	takeBack: function(where) {
		if(where.setShell(this))
			this.clearFrames();
	},
	hit: function(opponent) {
		if(this.invisible)
			return;
			
		if(this.vx) {
			if(this.idle)
				this.idle--;
			else if(opponent instanceof Mario)
				opponent.hurt(this);
			else {
				opponent.deathMode = death_modes.shell;
				opponent.die();
			}
		} else {
			if(opponent instanceof Mario) {
				if (you=="mario"){
				this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);
				opponent.setVelocity(opponent.vx, constants.bounce);
				this.idle = 2;
				}
			}
			if(opponent instanceof Luigi) {
				if (you=="luigi"){
					this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);
					opponent.setVelocity(opponent.vx, constants.bounce);
					this.idle = 2;
					}
			}
			if(opponent instanceof Peach) {
				if (you=="peach"){
					this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);
					opponent.setVelocity(opponent.vx, constants.bounce);
					this.idle = 2;
					}
			} else if(opponent instanceof GreenTurtle && opponent.state === size_states.small)
				this.takeBack(opponent);
		}
	},
	collides: function(is, ie, js, je, blocking) {		
		if(is < 0 || ie >= this.level.obstacles.length)
			return true;
			
		if(js < 0 || je >= this.level.getGridHeight())
			return false;
			
		for(var i = is; i <= ie; i++) {
			for(var j = je; j >= js; j--) {
				var obj = this.level.obstacles[i][j];
				
				if(obj && ((obj.blocking & blocking) === blocking))
					return true;
			}
		}
		
		return false;
	},
}, 'shell');

/*
 * -------------------------------------------
 * GREENTURTLE CLASS
 * -------------------------------------------
 */
var GreenTurtle = Enemy.extend({
	init: function(x, y, level) {
		this.walkSprites = [
			[{ x : 34, y : 382 },{ x : 0, y : 437 }],
			[{ x : 34, y : 266 },{ x : 0, y : 325 }]
		];
		this._super(x, y, level);
		this.wait = 0;
		this.deathMode = death_modes.normal;
		this.deathFrames = Math.floor(250 / constants.interval);
		this.deathStepUp = Math.ceil(150 / this.deathFrames);
		this.deathStepDown = Math.ceil(182 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.setSize(34, 54);
		this.setShell(new TurtleShell(x, y, level));
	},
	setShell: function(shell) {
		if(this.shell || this.wait)
			return false;
			
		this.shell = shell;
		shell.hide();
		this.setState(size_states.big);
		return true;
	},
	setState: function(state) {
		this._super(state);
		
		if(state === size_states.big)
			this.setSpeed(constants.big_turtle_v);
		else
			this.setSpeed(constants.small_turtle_v);
	},
	setVelocity: function(vx, vy) {
		this._super(vx, vy);
		var rewind = this.direction === directions.right;
		var coords = this.walkSprites[this.state - 1][rewind ? 1 : 0];
		var label = Math.sign(vx) + '-' + this.state;
		
		if(!this.setupFrames(6, 2, rewind, label))
			this.setImage(images.enemies, coords.x, coords.y);
	},
	die: function() {
		this._super();
		this.clearFrames();
		
		if(this.deathMode === death_modes.normal) {
			this.deathFrames = Math.floor(600 / constants.interval);
			this.setImage(images.enemies, 102, 437);
		} else if(this.deathMode === death_modes.shell) {
			this.level.playSound('shell');
			this.setImage(images.enemies, 68, (this.state === size_states.small ? (this.direction === directions.right ? 437 : 382) : 325));
		}
	},
	death: function() {
		if(this.deathMode === death_modes.normal)
			return --this.deathFrames;
			
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			return false;
			
		return true;
	},
	move: function() {
		if(this.wait)
			this.wait--;
			
		this._super();
	},
	hurt: function(opponent) {	
		this.level.playSound('enemy_die');
		
		if(this.state === size_states.small)
			return this.die();
		
		this.wait = constants.shell_wait
		this.setState(size_states.small);
		this.shell.activate(this.x, this.y);
		this.shell = undefined;
	},
}, 'greenturtle');

/*
 * -------------------------------------------
 * SPIKEDTURTLE CLASS
 * -------------------------------------------
 */
var SpikedTurtle = Enemy.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setSize(34, 32);
		this.setSpeed(constants.spiked_turtle_v);
		this.deathFrames = Math.floor(250 / constants.interval);
		this.deathStepUp = Math.ceil(150 / this.deathFrames);
		this.deathStepDown = Math.ceil(182 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
	},
	setVelocity: function(vx, vy) {
		this._super(vx, vy);
		
		if(this.direction === directions.left) {
			if(!this.setupFrames(4, 2, true, 'LeftWalk'))
				this.setImage(images.enemies, 0, 106);
		} else {
			if(!this.setupFrames(6, 2, false, 'RightWalk'))
				this.setImage(images.enemies, 34, 147);
		}
	},
	death: function() {
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			return false;
			
		return true;
	},
	die: function() {
		this.level.playSound('shell');
		this.clearFrames();
		this._super();
		this.setImage(images.enemies, 68, this.direction === directions.left ? 106 : 147);
	},
	hit: function(opponent) {
		if(this.invisible)
			return;
			
		if(opponent instanceof Mario) {
			if (you=="mario"){
			opponent.hurt(this);
			}
		}
			
		if(opponent instanceof Luigi) {
			if (you=="luigi"){
				opponent.hurt(this);
				}
		}
			
		if(opponent instanceof Peach) {
			if (you=="peach"){
				opponent.hurt(this);
				}
		}
	},
}, 'spikedturtle');

/*
 * -------------------------------------------
 * PLANT CLASS
 * -------------------------------------------
 */
var Plant = Enemy.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.setSize(34, 42);
		this.setupFrames(5, 2, true);
		this.setImage(images.enemies, 0, 3);
	},
	setVelocity: function(vx, vy) {
		this._super(0, 0);
	},
	die: function() {
		this.level.playSound('shell');
		this.clearFrames();
		this._super();
	},
	hit: function(opponent) {
		if(this.invisible)
			return;
			
		if(opponent instanceof Mario) {
			if (you=="mario"){
				opponent.hurt(this);
				}
		}
			
		if(opponent instanceof Luigi) {
			if (you=="luigi"){
				opponent.hurt(this);
				}
		}
			
		if(opponent instanceof Peach) {
			if (you=="peach"){
				opponent.hurt(this);
				}
		}
	},
});

/*
 * -------------------------------------------
 * STATICPLANT CLASS
 * -------------------------------------------
 */
var StaticPlant = Plant.extend({
	init: function(x, y, level) {
		this._super(x, y, level);
		this.deathFrames = Math.floor(250 / constants.interval);
		this.deathStepUp = Math.ceil(100 / this.deathFrames);
		this.deathStepDown = Math.ceil(132 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
	},
	die: function() {
		this._super();
		this.setImage(images.enemies, 68, 3);
	},
	death: function() {
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			return false;
			
		return true;
	},
}, 'staticplant');

/*
 * -------------------------------------------
 * PIPEPLANT CLASS
 * -------------------------------------------
 */
var PipePlant = Plant.extend({
	init: function(x, y, level) {
		this.bottom = y - 48;
		this.top = y - 6;
		this._super(x + 16, y - 6, level);
		this.setDirection(directions.down);
		this.setImage(images.enemies, 0, 56);
		this.deathFrames = Math.floor(250 / constants.interval);
		this.deathFramesExtended = 6;
		this.deathFramesExtendedActive = false;
		this.deathStep = Math.ceil(100 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.view.css('z-index', 95);
	},
	setDirection: function(dir) {
		this.direction = dir;
	},
	setPosition: function(x, y) {
		if(y === this.bottom || y === this.top) {
			this.minimum = constants.pipeplant_count;
			this.setDirection(this.direction === directions.up ? directions.down : directions.up);
		}
		
		this._super(x, y);
	},
	blocked: function() {
		if(this.y === this.bottom) {
			var state = false;
			this.y += 48;
			
			for(var i = this.level.figures.length; i--; ) {
				if(this.level.figures[i] != this && q2q(this.level.figures[i], this)) {
					state = true;
					break;
				}
			}
			
			this.y -= 48;
			return state;
		}
		
		return false;
	},
	move: function() {
		if(this.minimum === 0) {
			if(!this.blocked())
				this.setPosition(this.x, this.y - (this.direction - 3) * constants.pipeplant_v);
		} else
			this.minimum--;
	},
	die: function() {		
		this._super();
		this.setImage(images.enemies, 68, 56);
	},
	death: function() {
		if(this.deathFramesExtendedActive) {
			this.setPosition(this.x, this.y - 8);
			return --this.deathFramesExtended;
		}
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			this.deathFramesExtendedActive = true;
			
		return true;
	},
}, 'pipeplant');

/*
 * -------------------------------------------
 * DOCUMENT READY STARTUP METHOD
 * -------------------------------------------
 */
// started=0
// compterlesjoueurs = parseInt(location.href.split("&number=")[1].split("&")[0])
//you = parseInt(location.href.split("&player=")[1].split("&")[0])
// allplayersconnected = true
// player1 = "no"
// player2 = "no"
// player3 = "no"
// 
// socket.on('player1', function(msg){
// player1 = msg;
// });
// 
// socket.on('player2', function(msg){
// player2 = msg;
// });   
// 
// socket.on('player3', function(msg){
// player3 = msg;
// });
// 
// function compter()
// {
//  if (compterlesjoueurs==1) allplayersconnected=true   
//  if (compterlesjoueurs==2 && player1=="ready" && player2=="ready") allplayersconnected=true   
//  if (compterlesjoueurs==3 && player1=="ready" && player2=="ready"&& player3=="ready") allplayersconnected=true   
// }

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
