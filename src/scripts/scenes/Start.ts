import { Fonts, Signs, State } from '../types';
import langs from '../langs';
export default class Start extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Start');
  }

  public init(state: State) {
    this.state = state;
  }

  public create(): void {
    console.log('start')
    const { centerX } = this.cameras.main;
    this.add.sprite(0, 0, 'background').setOrigin(0);
    this.add.text(centerX, 200, 'Выбери свой знак', {
      fontFamily: Fonts.Nasalization,
      fontSize: '44px',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5);
  }

  private createButton(x: number, y: number, sign: Signs) {
    const round = this.add.sprite(x, y, 'rect');
    const icon = this.add.sprite(x, y, sign);
    const text = this.add.text(x, y, langs[sign], {
      
    }).setOrigin(0.5);
  }
}
