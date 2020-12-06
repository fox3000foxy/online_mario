/* -------------------------------------------
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
                {
                    if(col[j]=="mario"){
                        new (reflection["luigi"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["peach"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["orange"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["blue"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["cyan"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["indigo"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["dark"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["yellow"])(i * 32, (height - j - 1) * 32, this);
                        new (reflection["purple"])(i * 32, (height - j - 1) * 32, this);
                    }
                    if(col[j]!="peach"||col[j]!="luigi")
                    new (reflection[col[j]])(i * 32, (height - j - 1) * 32, this);
                }
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
		if(!this.taken && this.active && opponent instanceof Mario) {if (you=="mario"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Luigi) {if (you=="luigi"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Peach) {if (you=="peach"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Orange) {if (you=="orange"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Blue) {if (you=="blue"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Cyan) {if (you=="cyan"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Indigo) {if (you=="indigo"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Dark) {if (you=="dark"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Yellow) {if (you=="yellow"){opponent.invincible();this.die();}}
		if(!this.taken && this.active && opponent instanceof Purple) {if (you=="purple"){opponent.invincible();this.die();}}
		
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
		if(this.active && opponent instanceof Mario && you=="mario") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Luigi && you=="luigi") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Peach && you=="peach") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Orange && you=="orange") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Blue && you=="blue") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Cyan && you=="cyan") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Indigo && you=="indigo") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Dark && you=="dark") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Yellow && you=="yellow") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
		if(this.active && opponent instanceof Purple && you=="purple") {if(this.mode === mushroom_mode.mushroom){opponent.grow();}else if(this.mode === mushroom_mode.plant){opponent.shooter();};this.die();		}
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
		if(!(opponent instanceof Mario) && 
            !(opponent instanceof Luigi)&& 
            !(opponent instanceof Peach)) {
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
