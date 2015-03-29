function Eyeball(Game) {
  this.player = Game.player;
  this.rotation_factor = 5 * (Math.PI / 180);
  this.player.block = 0 // block keyboard input for some animations if > 0
}

Eyeball.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown && this.player.block < 1) {
      this.player.body.velocity.x = -200;
      this.player.rotation = this.player.rotation - this.rotation_factor;
    }

    if (cursors.right.isDown && this.player.block < 1) {
      this.player.body.velocity.x = 200;
      this.player.rotation = this.player.rotation + this.rotation_factor;
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
    }

    if (this.player.block > 0) {
      this.player.block = this.player.block - 1;
    }

  }
};

function Kangaroo(Game) {
  this.player = Game.player;
  this.player.rotation = 0;
  this.player.animations.add('eye-walk', [5, 4, 3, 2, 1]);
  this.player.animations.add('eye-hold', [1, 2, 3, 4]);
  this.player.animations.add('eye-jump', [1, 2, 3, 4]);
  this.jumping = false;
  this.holdAnimation();
  this.jumpSound = Game.add.audio('jump');
  Game.sound.stopAll();
  //Game.sound.remove('level1');
  //Game.add.audio('level2').play("", 0, 0.5, true);
}

Kangaroo.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown && this.player.block < 1) {
      this.player.body.velocity.x = -300;
      this.walkAnimation();
      if (this.player.scale.x > 0) {
        this.player.scale.x *= -1;
      }
    }

    if (cursors.right.isDown && this.player.block < 1) {
      this.player.body.velocity.x = 300;
      this.walkAnimation();
      if (this.player.scale.x < 0) {
        this.player.scale.x *= -1;
      }
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
      this.holdAnimation();
    }

    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y -= 1000;
      this.jumpSound.play();
      this.jumpAnimation();
      this.jumping = true;
    }
    if (this.player.block > 0) {
      this.player.block = this.player.block - 1;
    }

    this.player.body.velocity.y = Math.min(this.player.body.velocity.y, 800);
  },

  jumpAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eye-jump') {
      this.player.loadTexture('eye-jump', 0);
      this.player.animations.play('eye-jump', 4, false);
    }
  },

  holdAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eye-hold') {
      this.player.loadTexture('eye-hold', 0);
      this.player.animations.play('eye-hold', 4, true);
    }
  },

  walkAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eye-walk' &&
      !this.jumping) {
      this.player.loadTexture('eye-walk', 0);
      this.player.animations.play('eye-walk', 12, true);
    }
  }
};

function Rhino(Game) {
  this.player = Game.player;
  this.player.rotation = 0;
  this.player.animations.add('eyewalk-horn', [5, 4, 3, 2, 1]);
  this.player.animations.add('eyehold-horn', [1, 2, 3, 4]);
  this.player.animations.add('eyejump-horn', [1, 2, 3, 4]);
  this.jumping = false;
  this.holdAnimation();
  this.jumpSound = Game.add.audio('jump');
  Game.sound.stopAll();
  Game.sound.remove('level1');
  Game.add.audio('level2').play("", 0, 0.5, true);
}

Rhino.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown && this.player.block < 1) {
      if (this.player.body.velocity.x > -300) {
        this.player.body.velocity.x = -300;
      }
      this.player.body.acceleration.x = -100;
      this.walkAnimation();
      if (this.player.scale.x > 0) {
        this.player.scale.x *= -1;
      }
    }

    if (cursors.right.isDown && this.player.block < 1) {
      if (this.player.body.velocity.x < 300) {
        this.player.body.velocity.x = 300
      }
      this.player.body.acceleration.x = 100;
      this.walkAnimation();
      if (this.player.scale.x < 0) {
        this.player.scale.x *= -1;
      }
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.acceleration.x = 0;
      this.holdAnimation();
      if (this.player.body.velocity.x > 10) { //drag
        this.player.body.velocity.x -= 10;
      } else if (this.player.body.velocity.x < -10) { //drag
        this.player.body.velocity.x += 10;
      } else if (-10 < this.player.body.velocity < 10) {
        this.player.body.velocity.x = 0;
      }
    }

    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y -= 1000;
      this.jumpSound.play();
      this.jumpAnimation();
      this.jumping = true;
    }

    if (this.player.block > 0) {
      this.player.block = this.player.block - 1;
    }

    this.player.body.velocity.y = Math.min(this.player.body.velocity.y, 800);
  },

  jumpAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eyejump-horn') {
      this.player.loadTexture('eyejump-horn', 0);
      this.player.animations.play('eyejump-horn', 4, false);
    }
  },


  holdAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eyehold-horn') {
      this.player.loadTexture('eyehold-horn', 0);
      this.player.animations.play('eyehold-horn', 4, true);
    }
  },

  walkAnimation: function() {
    if (!this.player.animations.currentAnim ||
      this.player.animations.currentAnim.name != 'eyewalk-horn' &&
      !this.jumping) {
      this.player.loadTexture('eyewalk-horn', 0);
      this.player.animations.play('eyewalk-horn', 12, true);
    }
  }
};

function ButterFly(Game) {
  this.player = Game.player;
  this.player.rotation = 0;
  this.player.animations.add('eyefly', [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12]);
  this.player.loadTexture('eyefly', 0);
  this.player.animations.play('eyefly', 12, true);
  this.jumping = false;
  Game.sound.stopAll();
  Game.sound.remove('level2');
  Game.add.audio('level3').play("", 0, 0.5, true);
}

ButterFly.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown && this.player.block < 1) {
      if (this.player.body.velocity.x > -300) {
        this.player.body.velocity.x = -300;
      }
      this.player.body.acceleration.x = -100;
      if (this.player.scale.x > 0) {
        this.player.scale.x *= -1;
      }
    }

    if (cursors.right.isDown && this.player.block < 1) {
      if (this.player.body.velocity.x < 300) {
        this.player.body.velocity.x = 300
      }
      this.player.body.acceleration.x = 100;
      if (this.player.scale.x < 0) {
        this.player.scale.x *= -1;
      }
    }

    if (cursors.up.isDown && this.player.block < 1) {
      if (this.player.body.velocity.y > -300) {
        this.player.body.velocity.y = -700;
      }
      this.player.body.acceleration.y = -600;
    }

    if (cursors.down.isDown && this.player.block < 1) {
      if (this.player.body.velocity.y < 300) {
        this.player.body.velocity.y = 300;
      }
      this.player.body.acceleration.y = 250;
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.acceleration.x = 0;
      if (this.player.body.velocity.x > 10) { //drag
        this.player.body.velocity.x -= 10;
      } else if (this.player.body.velocity.x < -10) { //drag
        this.player.body.velocity.x += 10;
      } else if (-10 < this.player.body.velocity < 10) {
        this.player.body.velocity.x = 0;
      }
    }

    if (!cursors.up.isDown && !cursors.down.isDown) {
      this.player.body.acceleration.y = 0;
      if (this.player.body.velocity.y > 10) { //drag
        this.player.body.velocity.y -= 10;
      } else if (this.player.body.velocity.y < -10) { //drag
        this.player.body.velocity.y += 10;
      } else if (-10 < this.player.body.velocity < 10) {
        this.player.body.velocity.y = 0;
      }
    }

    if (this.player.block > 0) {
      this.player.block = this.player.block - 1;
    }
    this.player.body.velocity.y = Math.min(this.player.body.velocity.y, 800);
  },
};
