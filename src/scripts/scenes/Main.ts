import { Fonts, Screens, State } from '../types';
import Utils from './../libs/Utils';
import langs from './../langs';
import { HoroscopeScroll } from '../component/HoroscopeScroll';

export default class Main extends Phaser.Scene {
  state: State;
  private _screenButtons: Button[];

  constructor() {
    super('Main');
  }

  init(state: State) {
    this.state = state;
    if (!this.state.screen) {
      this.state.screen = Screens.Today;
    }
  }

  create() {
    this.add.sprite(0, 0, 'background-star').setOrigin(0);
    this.createSign();
    this.createButtons();
    this.createSocialButtons();

    switch(this.state.screen) {
      case Screens.Today:
        this.createTodayScreen();
        break;
      case Screens.Tomorrow:
        this.createTomorrowScreen();
        break;
      default:
        break;
    }
  }

  private createSign() {
    const x = this.cameras.main.centerX;
    const y = 400;
    const { sign } = this.state;
    const main = this.add.sprite(x, y, `${sign}-image`).setScale(1);
    const min = this.add.sprite(main.x, main.y + 120, `${sign}-icons`);
    const text = this.add.text(x, y + 200, langs[sign], {
      fontFamily: Fonts.Nasalization,
      fontSize: '36px',
    }).setOrigin(0.5);
  }

  private createButtons() {
    const x = 140;
    const y = 680;
    const buttonOffset = 235;
    this._screenButtons = [];
    this._screenButtons.push(this.createScreenButton(x, y, Screens.Today));
    this._screenButtons.push(this.createScreenButton(x + buttonOffset, y, Screens.Tomorrow));
    this._screenButtons.push(this.createScreenButton(x + buttonOffset * 2, y, Screens.Week));
    this._screenButtons.forEach(button => button.update());
  }

  private createScreenButton(x: number, y: number, screen: Screens): Button {
    const sprite = this.add.sprite(x, y, 'button-disable');
    const text = this.add.text(x, y, screen, {
      fontFamily: Fonts.Nasalization,
      fontSize: '24px',
    }).setOrigin(0.5);

    Utils.click(sprite, () => {
      if (screen !== this.state.screen) {
        this.state.screen = screen;
        this.scene.restart(this.state);
      }
    });

    const update = () => {
      sprite.setTexture(this.state.screen === screen ? 'button-active' : 'button-disable');
    }
    return { sprite, update };
  }

  private createTodayScreen() {
    const scroll = new HoroscopeScroll(this);
  }

  private createTomorrowScreen() {
    const { centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY + 285, 'tomorrow-tutorial');
  }

  private createSocialButtons() {
    const x = 138;
    const y = this.cameras.main.displayHeight - 60;
    const offset = 235;
    this.add.text(
      this.cameras.main.centerX,
      y - 65,
      'Поделиться гороскопом',
      { fontSize: '24px', fontFamily: Fonts.GothaPro, color: '#BCBED1' },
    )
      .setOrigin(0.5);

    const textStyle = { fontSize: '22px', fontFamily: Fonts.Nasalization };
    const wallButton = this.add.sprite(x, y, 'button');
    const wallText = this.add.text(x, y, 'На стену', textStyle).setOrigin(0.5);
    const storyButton = this.add.sprite(x + offset, y, 'button');
    const storyText = this.add.text(x + offset, y, 'В историю', textStyle).setOrigin(0.5);
    const messageButton = this.add.sprite(x + offset * 2, y, 'button');
    const messageText = this.add.text(x + offset * 2, y, 'В личку', textStyle).setOrigin(0.5);

    Utils.click(wallButton, () => {
      this.wallButtonHandler();
    });
    Utils.click(storyButton, () => {
      this.storyButtonHandler();
    });
    Utils.click(messageButton, () => {
      this.messageButtonHandler();
    });
  }

  private wallButtonHandler() {
    console.log('wallButton');
  }

  private storyButtonHandler() {
    console.log('storyButton');
  }

  private messageButtonHandler() {
    console.log('messageButton');
  }
};

type Button = {
  sprite: Phaser.GameObjects.Sprite;
  update: () => void;
};
