function Eyeball(Game) {
  this.player = Game.player;
  this.rotation_factor = 5 * (Math.PI / 180);
}

Eyeball.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -50;
      this.player.rotation = this.player.rotation - this.rotation_factor;
    }

    if (cursors.right.isDown) {
      this.player.body.velocity.x = 50;
      this.player.rotation = this.player.rotation + this.rotation_factor;
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
    }
  }
};

function Kangaroo(Game) {
  this.player = Game.player;
  this.player.rotation = 0;
  this.player.loadTexture('eye-walk', 0);
  this.player.animations.add('eye-walk', [5, 4, 3, 2, 1]);
  this.jumpSound = Game.add.audio('jump');
}

Kangaroo.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -300;
      this.player.animations.play('eye-walk', 12, true);
      if (this.player.scale.x > 0) {
        this.player.scale.x *= -1;
      }
    }

    if (cursors.right.isDown) {
      this.player.body.velocity.x = 300;
      this.player.animations.play('eye-walk', 12, true);
      if (this.player.scale.x < 0) {
        this.player.scale.x *= -1;
      }
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
      this.player.animations.stop(null, true);
    }

    if(cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y -= 700;
      this.jumpSound.play();
    }
  }
};

function Rhino(Game) {
  this.player = Game.player;
  this.jumpSound = Game.add.audio('jump');
}

Rhino.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown) {
       if (this.player.body.velocity.x > -300) {
         this.player.body.velocity.x = -300;
       }
       this.player.body.acceleration.x = -100;
     }

     if (cursors.right.isDown) {
       if (this.player.body.velocity.x < 300) {
         this.player.body.velocity.x = 300
       }
       this.player.body.acceleration.x = 100;
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

    if(cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y -= 700;
      this.jumpSound.play();
    }
  }
};
