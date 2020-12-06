/* -------------------------------------------
 * PEACH CLASS
 * -------------------------------------------
 */
var Dark = Hero.extend({
	init: function(x, y, level) {
        dark1 = x
        dark2 = y
        dark5 = 0
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
		this.setDarkState(dark_states.normal);
		this.deathBeginWait = Math.floor(700 / constants.interval);
		this.deathEndWait = 0;
		this.deathFrames = Math.floor(600 / constants.interval);
		this.deathStepUp = Math.ceil(200 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.direction = directions.right;
		if (this.darkState === dark_states.normal)
		this.setImage(images.spritesd, 81, 0);
		else
		this.setImage(images.spritesdf, 81, 0);
		this.crouching = false;
		this.fast = false;
	},
	setDarkState: function(state) {
		this.darkState = state;
	},
	setState: function(state) {
		if(state !== this.state) {
			this.setDarkState(dark_states.normal);
			this._super(state);
		}
	},

	setPosition: function(x, y) {
        if(you=="dark"){socket.emit("dark1",salon+"&"+this.x)}
		if(you=="dark"){socket.emit("dark2",salon+"&"+this.y)}
		if(you=="dark"){socket.emit("dark5",salon+"&"+this.crouching)}
		if(you!="dark"){this._super(dark1, dark2);}
		if(you=="dark"){this._super(x, y);}
		var r = this.level.width - 640;
		// var r2 = this.level.height - 640;
		if (cam==7){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
// 		if (cam==1 && counterplayer==2){w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));}
        levelheight = 32* 6
		if (cam==7) {ley = this.y >= levelheight?-this.y+levelheight:0}
// 		if (cam==1 && counterplayer==2) {ley = this.y >= levelheight?-this.y+levelheight:0}
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
            if(d8==1) this.die()
        if(c82=="hurt" && you!="dark") this.hurt()
        if(c8=="grow"  && you!="dark") this.grow()
        if(s8=="true"  && you!="dark") this.shooter()
		//setInterval("i++;ghost123[i]={x:"+this.x+",y:"+this.y+"}",1000)
			 // alert(x+","+y)
	},
	input: function(keys) {
        if(you=="dark"){this.crouching = keysd.down;}
        if(you!="dark"){this.crouching = dark5;}
		this.fast = keys.accelerate;
		
		if(!this.crouching) {
			if(this.onground && keys.up)
				this.jump();
				
			if(keys.accelerate && this.darkState === dark_states.fire)
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
		if (this.darkState === dark_states.normal)
		this.setImage(images.spritesd, this.state === size_states.small ? 241 : 161, 81);
		else
		this.setImage(images.spritesdf, this.state === size_states.small ? 241 : 161, 81);
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
        socket.emit("c8",salon+"&"+"grow")
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
			
        
        socket.emit("s8",salon+"&"+true)
		this.setDarkState(dark_states.fire);
	},
	walk: function(reverse, fast) {
		this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse=="true" ? - 1 : 1);
	},
	walkRight: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, true, 'WalkRightSmall'))
				this.setImage(images.spritesd, 0, 0);
		} else {
			if(!this.setupFrames(9, 2, true, 'WalkRightBig'))
				if (this.darkState === dark_states.normal)
				this.setImage(images.spritesd, 0, 243);
				else
				this.setImage(images.spritesdf, 0, 243);
		}
	},
	walkLeft: function() {
		if(this.state === size_states.small) {
			if(!this.setupFrames(8, 2, false, 'WalkLeftSmall'))
				this.setImage(images.spritesd, 80, 81);
		} else {
			if(!this.setupFrames(9, 2, false, 'WalkLeftBig'))
				if (this.darkState === dark_states.normal)
				this.setImage(images.spritesd, 81, 162);
				else
				this.setImage(images.spritesdf, 81, 162);
		}
	},
	stand: function() {
		var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
		if (this.darkState === dark_states.normal)
		this.setImage(images.spritesd, coords.x, coords.y);
		else
		this.setImage(images.spritesdf, coords.x, coords.y);
		this.clearFrames();
	},
	crouch: function() {
		var coords = this.crouchSprites[this.state - 1][this.direction === directions.left ? 0 : 1];
		if (this.darkState === dark_states.normal)
		this.setImage(images.spritesd, coords.x, coords.y);
		else
		this.setImage(images.spritesdf, coords.x, coords.y);
		this.clearFrames();
	},
	jump: function() {
		this.level.playSound('jump');
		this.vy = constants.jumping_v;
	},
	move: function() {
		this.input(keysd);		
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
        socket.emit("d8",salon+"&"+1)
		adddeathplayer += 1
		this.setDarkState(dark_states.normal);
		this.deathStepDown = Math.ceil(240 / this.deathFrames);
		this.setupFrames(9, 2, false);
		this.setImage(images.spritesd, 81, 324);
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
            socket.emit("c82",salon+"&"+"hurt");
		}
	},
}, 'dark');
