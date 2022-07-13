import { State } from '../types';

export default class Game extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Game');
  }

  public init(state: State): void {
    this.state = state;
  }

  public create(): void {

  }
};
