/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
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
			
		if(opponent instanceof Mario)  {if(you=="mario")  {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Luigi)  {if(you=="luigi")  {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Peach)  {if(you=="peach")  {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Orange) {if(you=="orange") {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Blue)   {if(you=="blue")   {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Cyan)   {if(you=="cyan")   {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Indigo) {if(you=="indigo") {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Dark)   {if(you=="dark")   {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Yellow) {if(you=="yellow") {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
		if(opponent instanceof Purple) {if(you=="purple") {if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {opponent.setVelocity(opponent.vx, constants.bounce);this.hurt(opponent);} else{opponent.hurt(this);}}}
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
			if(opponent instanceof Mario) {if (you=="mario"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Luigi) {if (you=="luigi"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Peach) {if (you=="peach"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Orange) {if (you=="orange"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Blue) {if (you=="blue"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Cyan) {if (you=="cyan"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Indigo) {if (you=="indigo"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Dark) {if (you=="dark"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Yellow) {if (you=="yellow"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
			if(opponent instanceof Purple) {if (you=="purple"){this.setSpeed(opponent.direction === directions.right ? -constants.shell_v : constants.shell_v);opponent.setVelocity(opponent.vx, constants.bounce);this.idle = 2;}}
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
			
		if(opponent instanceof Mario) {if (you=="mario"){opponent.hurt(this);}}
        if(opponent instanceof Luigi) {if (you=="luigi"){opponent.hurt(this);}}
        if(opponent instanceof Peach) {if (you=="peach"){opponent.hurt(this);}}
        if(opponent instanceof Orange) {if (you=="orange"){opponent.hurt(this);}}
        if(opponent instanceof Blue) {if (you=="blue"){opponent.hurt(this);}}
        if(opponent instanceof Cyan) {if (you=="cyan"){opponent.hurt(this);}}
        if(opponent instanceof Indigo) {if (you=="indigo"){opponent.hurt(this);}}
        if(opponent instanceof Dark) {if (you=="dark"){opponent.hurt(this);}}
        if(opponent instanceof Yellow) {if (you=="yellow"){opponent.hurt(this);}}
        if(opponent instanceof Purple) {if (you=="purple"){opponent.hurt(this);}}
        
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
			
		if(opponent instanceof Mario) {if (you=="mario"){opponent.hurt(this);}}
        if(opponent instanceof Luigi) {if (you=="luigi"){opponent.hurt(this);}}
        if(opponent instanceof Peach) {if (you=="peach"){opponent.hurt(this);}}
        if(opponent instanceof Orange) {if (you=="orange"){opponent.hurt(this);}}
        if(opponent instanceof Blue) {if (you=="blue"){opponent.hurt(this);}}
        if(opponent instanceof Cyan) {if (you=="cyan"){opponent.hurt(this);}}
        if(opponent instanceof Indigo) {if (you=="indigo"){opponent.hurt(this);}}
        if(opponent instanceof Dark) {if (you=="dark"){opponent.hurt(this);}}
        if(opponent instanceof Yellow) {if (you=="yellow"){opponent.hurt(this);}}
        if(opponent instanceof Purple) {if (you=="purple"){opponent.hurt(this);}}
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
