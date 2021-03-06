/**
 * @file basic animation wrapper for making life simpler,
 * both bullet and enemy extends this class and uses this class
 * as thier core functionality.
 * @author bluepie <gopinath2nr@gmail.com>
 */
class animationHelper extends Timer {
  /**
   * @param {number} animationTime
   * @param {number} MovementTime
   */
  constructor(animationTime, MovementTime) {
    super(animationTime, MovementTime);
    this.animationTimerId = null;
  }

  /**
   * wrapper Draw.
   */
  wDraw() {
    if (this.sprite == null) {
      return;
    }
    this.context.drawImage(
        this.sprite.image,
        this.sprite.position.x,
        this.sprite.position.y,
        this.sprite.individualSpriteSize,
        this.sprite.individualSpriteSize,
        this.position.x, this.position.y,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorX,
        this.sprite.individualSpriteSize * this.sprite.scaleFactorY
    );
  }

  /**
   * override this method in child classe, for animation logic.
   * when it is time for next frame, this method will be called.
   */
  objectUpdate() {
  }

  /**
   * makes decisions whether to redraw,
   * based on the fps defined.
   */
  postObjectUpdate() {
    this.stepTimer();
    if (this.isTimeToMove()) {
      this._Movement();
    } if (this.isTimeToAnimate()) {
      this.objectUpdate();
    } this.objectAnimation();
  }

  /**
   * set context before using wDraw
   * @param {context} context
   */
  setContext(context) {
    this.context = context;
  }

  /**
   * object movement loop
   */
  objectAnimation() {
    this.animationTimerId = setTimeout(() => {
      this.postObjectUpdate();
    }, 1);
  }
}
