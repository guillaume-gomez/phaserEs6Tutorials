import GameState from 'states/GameState';

class MapGenerator extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

  importFromJson(JSONData)
  {
     this.state.start('GameState',true, false, JSONData);
  }
}

window.game = new MapGenerator();
