var SideScroller = SideScroller || {};

//loading the game assets
SideScroller.Win = function(){};

SideScroller.Win.prototype = {
  create: function() {
    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center" };
    text = this.game.add.text(600, 350, "You Escaped!", style);
    text.anchor.set(0.5);
  }
};
