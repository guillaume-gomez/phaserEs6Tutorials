class Bird extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.width = this.width / 6.5;
    this.height = this.height / 6.5;
    this.y = game.height / 2 - this.height / 2;

    //Enable physics on the player
    game.physics.arcade.enable(this);
    //no rebound after colission
    this.body.bounce.x = this.body.bounce.y = 0;
    //rotation in the center
    this.anchor.setTo(0.5, 0.5);
    this.rotation = -Math.PI / 8;
    this.birdInJump = false;


    // On ajoute l'animation qui va permettre à l'oiseau de flotter dans les airs
    this.tweenFlap = game.add.tween(this);
    this.tweenFlap.to({ y: this.y + 20}, 400, Phaser.Easing.Quadratic.InOut, true, 0, 10000000000, true);

    this.tweenJump = game.add.tween(this);
    this.tweenJump.to({rotation: -Math.PI / 8}, 70, Phaser.Easing.Quadratic.In, true, 0, 0, true);
    this.tweenJump.stop();

    this.tweenFall = game.add.tween(this);
    this.tweenFall.to({rotation: Math.PI / 2}, 300, Phaser.Easing.Quadratic.In, true, 200, 0, true);
    this.tweenFall.stop();

    // On ajoute l'animation du battement des ailes, animation contenu dans le JSON
    this.animations.add('fly');
    // On fait démarrer l'animation, avec 8 images par seconde et répétée en boucle
    this.animations.play('fly', 8, true);
  }



  onStart() {
    // Gravité de l'oiseau
    this.body.gravity.y = 2000;
    // Premier saut
    this.body.velocity.y = -600;
    // On note que l'oiseau est dans l'action jump
    this.birdInJump = true;

    this.tweenFlap.stop();
    this.animations.stop('fly');
    this.animations.play('fly', 15, true);
  }

  jump() {
    if(this.y >= 0) {
      this.birdInJump = true;
      this.body.velocity.y = -600;

      if(this.tweenFall.isRunning) {
        this.tweenFall.stop();
      }
      this.tweenJump.start();
      this.animations.play('fly');
      this.animations.frame = 0;
    }
  }

  update() {
    if(this.body.velocity.y > 0 && this.birdInJump) {
      this.birdInJump = false;

      if(this.tweenJump.isRunning){
        this.tweenJump.stop();
      }
      this.tweenFall.start();
      this.tweenFall.onStart.add(function() {
        // On stop l'animation des battements d'ailes
        this.animations.stop('fly');
        this.animations.frame = 1;
      });
    }
  }
}

export default Bird;