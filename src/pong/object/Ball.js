const Radius = 7;
const LineWidth = 3;

class Ball extends Phaser.Sprite {

  constructor(game, x, y, velX, velY, color = "#FDFDFD") {
    const bmd = game.add.bitmapData(Radius * 2, Radius * 2);
    bmd.ctx.beginPath();
    bmd.ctx.arc(Radius, Radius, Radius - LineWidth, 0, 2 * Math.PI, false);
    debugger
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    bmd.ctx.lineWidth = LineWidth;
    bmd.ctx.strokeStyle = "#BBBBBB";
    bmd.ctx.stroke();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;
    this.anchor.set(0.5, 0.5);
    this.body.velocity.setTo(velX, velY);
    this.body.bounce.set(1);
  }

}

export default Ball;