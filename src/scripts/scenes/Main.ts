import { State } from '../types';

export default class Main extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Main');
  }

  public init(state: State): void {
    this.state = state;
  }

  public create(): void {

  }
};
