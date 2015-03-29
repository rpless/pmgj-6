var SideScroller = SideScroller || {};

SideScroller.Game = function(){};

SideScroller.Game.prototype = {
  preload: function() {
    this.game.time.advancedTiming = true;
  },

  monsterInfusions: {
    feet: Eyeball,
    kangaroo: Kangaroo,
    rhino: Rhino
  },

  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

    //create layers
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    //this.glass1 = this.map.createLayer('glass1');
    //this.glass2 = this.map.createLayer('glass2');
    //this.glass3 = this.map.createLayer('glass3');
    //this.glass4 = this.map.createLayer('glass4');
    //this.glass4 = this.map.createLayer('glass5');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');
    //this.map.setCollisionBetween(1, 5000, true, 'glass1');
    //this.map.setCollisionBetween(1, 5000, true, 'glass2');
    //this.map.setCollisionBetween(1, 5000, true, 'glass3');
    //this.map.setCollisionBetween(1, 5000, true, 'glass4');
    //this.map.setCollisionBetween(1, 5000, true, 'glass5');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    //create infusions
    this.createMonsterInfusion();

    //create player
    this.player = this.game.add.sprite(70*55, 70*96, 'eye'); //initial position

    //enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //player gravity
    this.player.body.gravity.y = 1200;
    // this.player.movement = this.monsterInfusions['blob'].bind(this);
    this.player.monster = new Eyeball(this);

    this.player.standDimensions = {width: this.player.width, height: this.player.height};
    this.player.anchor.setTo(0.5, 0.5);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //sounds

    this.level1Sound = this.game.add.audio('level1');
    this.level1Sound.play("", 0, 0.5, true);
    this.transformSound = this.game.add.audio('transform');

    //create glass
    this.createGlass();


  },

  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.infusions, this.collect, null, this);

    //only respond to keys and keep the speed if the player is alive
    if(this.player.alive) {

      this.player.monster.update(this.cursors)

      //restart the game if reaching the edge
      //if(this.player.x >= this.game.world.width) {
      //  this.game.state.start('Game');
      //}
    }
  },

  playerHit: function(player, blockLayer) {
    if (player.body.blocked.down &&
        player.animations.currentAnim &&
        player.monster.jumping) {
      player.monster.jumping = false;
      player.monster.holdAnimation();
    }
  },

  collect: function(player, collectable) {
    player.monster = new collectable.Monster(this);
    this.transformSound.play('', 0, 3);
    collectable.destroy();
  },

  createGlass: function() {
    var glassnames = ['glass1', 'glass2', 'glass3', 'glass4', 'glass5'];
    for (var glass in glassnames) {
      this.glasses = this.game.add.group();
      this.glasses.enableBody = true;

      var result = this.findObjectsByType('glass', this.map, glassnames[glass]);
      result.forEach(function(element) {
        var g = this.createFromTiledObject(element, this.glasses);
        //TODO add in a callback for collision
      }, this);
    }
  },

  //create infusions
  createMonsterInfusion: function() {
    this.infusions = this.game.add.group();
    this.infusions.enableBody = true;
    var result = this.findObjectsByType('infusion', this.map, 'objectsLayer');

    result.forEach(function(element) {
      var infusion = this.createFromTiledObject(element, this.infusions);
      infusion.Monster = this.monsterInfusions[element.properties.infusion_type];
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
   findObjectsByType: function(type, map, layerName) {
     var result = new Array();
     map.objects[layerName].forEach(function(element){
       if(element.properties.type === type) {
         //Phaser uses top left, Tiled bottom left so we have to adjust
         //also keep in mind that some images could be of different size as the tile size
         //so they might not be placed in the exact position as in Tiled
         element.y -= map.tileHeight;
         result.push(element);
       }
     });
     return result;
   },

  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });
    return sprite;
  },

  /*
  createFromGlassObject: function(element, group) {
    var line = group.create(element.x, element.y, element.properties);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      line[key] = element.properties[key];
    });
    return line;
  },
  */

  gameOver: function() {
    this.game.state.start('Game');
  },

  render: function() {
     this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
     this.game.debug.bodyInfo(this.player, 0, 80);
  }
};
