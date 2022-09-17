export class HoroscopeScroll {
  private _topSide: Phaser.GameObjects.Sprite;
  private _bottomSide: Phaser.GameObjects.Sprite;
  private _background: Phaser.GameObjects.TileSprite;
  private _height = 100;
  private readonly START_Y = 730;
  private readonly BACKGROUND_WIDTH = 652;

  constructor(private readonly _scene: Phaser.Scene) {
    const { centerX } = this._scene.cameras.main;

    this._topSide = this._scene.add.sprite(centerX, this.START_Y, 'scroll').setOrigin(0.5, 0);
    this._background = this._scene.add.tileSprite(
      centerX,
      this._topSide.getBounds().bottom,
      this.BACKGROUND_WIDTH,
      this._height,
      'scroll-background',
    )
      .setOrigin(0.5, 0);
    this._bottomSide = this._scene.add.sprite(
      centerX,
      this.START_Y + this._height,
      'scroll',
    )
      .setOrigin(0.5, 1)
      .setScale(1, -1);
  }
}
