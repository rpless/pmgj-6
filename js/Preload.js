var SideScroller = SideScroller || {};

//loading the game assets
SideScroller.Preload = function(){};

SideScroller.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    // images
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
    this.load.image('eye', 'assets/images/eye.png');
    this.load.spritesheet('eye-walk', 'assets/images/eyewalk/eye-walk-cycle.png', 90, 97);
    this.load.spritesheet('eye-hold', 'assets/images/eyehold/eye-hold-cycle.png', 71, 90);
    this.load.image('playerDead', 'assets/images/player_dead.png');
    this.load.image('goldCoin', 'assets/images/goldCoin.png');
    // audio
    this.load.audio('level1', 'assets/audio/level01.mp3');
    this.load.audio('transform', ['assets/audio/Transform_mutate.wav']);
    this.load.audio('jump', ['assets/audio/Jump.wav']);
    this.load.audio('walking', ['assets/audio/Walking.wav']);
  },
  create: function() {
    this.state.start('Game');
  }
};
