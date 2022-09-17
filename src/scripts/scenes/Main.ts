import { Fonts, Screens, State } from '../types';
import Utils from './../libs/Utils';
import langs from './../langs';
import { HoroscopeScroll } from '../component/HoroscopeScroll';
import { ModalType } from './Modal';

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
    this.createStars();
    this.createProgress();
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
    
    const { centerX, centerY } = this.cameras.main;
    const buyY = centerY + 330;
    const adY = centerY + 440;
    const price = 2;
    const starAdCount = 2;
    const stageAdCount = 1;

    const textButtonStyle = { fontSize: '30px', fontFamily: Fonts.Nasalization };
    const buyButton = this.add.sprite(centerX, buyY, 'big-button-active');
    const text = this.add.text(
      centerX,
      buyY,
      'Читать полностью за ' + price,
      textButtonStyle,
      ).setOrigin(0, 0.5);
    const star = this.add.sprite(centerX, buyY, 'star').setOrigin(0, 0.5);
    const width = text.displayWidth + star.displayWidth + 10;
    text.setX(centerX - width / 2);
    star.setX(text.getBounds().right + 5);

    Utils.click(buyButton, () => {
      this.buyHoroscope();
    });

    const adButton = this.add.sprite(centerX, adY, 'big-button-disable');
    const adText = this.add.text(
      centerX,
      adY,
      'Посмотреть рекламу',
      textButtonStyle,
    ).setOrigin(0, 0.5);
    
    const countStarText = this.add.text(centerX, adY, `+${starAdCount}`, textButtonStyle).setOrigin(0, 0.5);
    const adStar = this.add.sprite(centerX, adY, 'star').setOrigin(0, 0.5);

    const countStageText = this.add.text(centerX, adY, `+${stageAdCount}`, textButtonStyle).setOrigin(0, 0.5);
    const adStage = this.add.sprite(centerX, adY, 'moon-stage1').setOrigin(0, 0.5);

    const addWidth = adText.displayWidth + countStarText.displayWidth + adStar.displayWidth + countStageText.displayWidth + adStage.displayWidth + 40;

    adText.setX(centerX - addWidth / 2);
    countStarText.setX(adText.getBounds().right + 5);
    adStar.setX(countStarText.getBounds().right + 5);
    countStageText.setX(adStar.getBounds().right + 5);
    adStage.setX(countStageText.getBounds().right + 5);

    Utils.click(adButton, () => {
      this.showAd();
    });
  }

  private buyHoroscope() {
    console.log('buy horoscope');
  }

  private showAd() {
    console.log('show ad');
  }

  private createTomorrowScreen() {
    const { centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY + 285, 'tomorrow-tutorial');

    const timer = this.add.text(centerX, centerY + 290, '08:24:36', { fontSize: '40px', fontFamily: Fonts.Nasalization }).setOrigin(0.5);

    const close = this.add.sprite(centerX, centerY + 400, 'button').setScale(1.3);
    this.add.text(close.x, close.y, 'Напомните мне', { fontFamily: Fonts.GothaPro, fontSize: '22px' }).setOrigin(0.5);
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

  private createProgress() {
    const { day } = this.state;
    const x = 54;
    const y = 200;
    const OFFSET = 40;
    const MAX_DAY = 5;

    for (let i = 1; i <= MAX_DAY; i += 1) {
      const spriteX = x + (i - 1) * OFFSET;
      this.add.sprite(spriteX, y, i <= day ? `moon-stage${day}` : 'moon-clear');
    }

    const text = this.add.text(
      x + OFFSET * MAX_DAY,
      y,
      'что это?',
      { fontSize: '20px', fontFamily: Fonts.GothaPro, color: '#1570FE' }
    )
      .setOrigin(0, 0.5);

    const fixString = langs[this.state.sign][0] + langs[this.state.sign].toLocaleLowerCase().slice(1);

    this.add.text(
      this.cameras.main.displayWidth - 32,
      y,
      fixString,
      { fontSize: '28px', fontFamily: Fonts.GothaPro, color: '#BCBED1' },
    )
      .setOrigin(1, 0.5)

    Utils.click(text, () => {
      this.openTutorial();
    });
  }

  private openTutorial() {
    this.scene.launch('Modal', { type: ModalType.Tutorial });
  }

  private createStars() {
    const { centerX } = this.cameras.main;
    const x = centerX - 50;
    const y = 85;
    const count = this.add.text(
      x, y,
      this.state.stars.toString(),
      { fontFamily: Fonts.Nasalization, fontSize: '24px' }
    )
      .setOrigin(1, 0.5);
    this.add.sprite(x + 5, y, 'star').setOrigin(0, 0.5).setScale(0.7);

    const button = this.add.text(
      centerX, y, 
      'пополнить',
      { fontFamily: Fonts.GothaPro, fontSize: '20px', color: '#BBBED1' }
    )
      .setOrigin(0, 0.5);
    
    Utils.click(button, () => {
      this.openShop();
    });
  }

  private openShop() {
    console.log('open shop')
  }
};

type Button = {
  sprite: Phaser.GameObjects.Sprite;
  update: () => void;
};
