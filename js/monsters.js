function Eyeball(Game){
  this.player = Game.player;
}

Eyeball.prototype = {
  update: function(cursors) {
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -200; //TODO slow down
    }

    if (cursors.right.isDown) {
      this.player.body.velocity.x = 200; //TODO slow down
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
    }
  }
};

function Kangaroo(Game) {
  this.player = Game.player;
  this.jumpSound = Game.add.audio('jump');
}

Kangaroo.prototype = {
  create: function() {
    console.log("CREATED!");
  },

  update: function(cursors) {
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -300;
    }

    if (cursors.right.isDown) {
      this.player.body.velocity.x = 300;
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
      this.player.body.velocity.x = 0;
    }

    if(cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y -= 1000;
      this.jumpSound.play();
    }
  }
};

function Rhino(Game) {
  this.player = Game.player;
  this.jumpSound = Game.add.audio('jump');
}

Rhino.prototype = {
  create: function() {},
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
}
