/**
 * @file Helper to the Player class.
 * @author Frostin <iamfrostin@gmail.com>
 */

/** Utility methods for player. */
class PlayerUtil {
  /**
   * @typedef {Object} position
   * @property {number} x
   * @property {number} y
   */

  /**
   * Ensures player stays inside the canvas.
   * @param {string} direction Move Direction.
   * @param {number} move Distance.
   * @param {number} bound Bound value to stay inside.
   * @param {number} spriteSize Sprite size.
   * @param {number} scale Sprite scale.
   * @param {position} position Player position.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @return {boolean}
   */
  static bound(
      direction,
      move,
      bound,
      spriteSize,
      scale,
      position,
      canvasSize
  ) {
    let result = false;
    const MAX_BOUND = bound + (spriteSize * scale);
    switch (direction) {
      case 'left':
        result = position.x - move > (0 + bound)
          ? true
          : false;
        break;
      case 'right':
        result = position.x + move < (canvasSize.width - MAX_BOUND)
          ? true
          : false;
        break;
      case 'up':
        result = position.y - move > (0 + bound)
          ? true
          : false;
        break;
      case 'down':
        result = position.y + move < (canvasSize.height - MAX_BOUND)
          ? true
          : false;
        break;
    }
    return result;
  }

  /**
   * @param {number} playerScale Player Scale.
   * @param {number} barrierScale Barrier Scale.
   * @param {number} size Sprite Size.
   * @return {number} Size difference between barrier and player.
   */
  static getBarrierPosition(playerScale, barrierScale, size) {
    const DIFF = barrierScale - playerScale;
    return (size * DIFF) / 2;
  }

  /**
   * Checks if idle animation is playing.
   * @param {number} state Animation state.
   * @return {boolean}
   */
  static isIdleAnim(state) {
    if (state === 0 || state === 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * drawImage() Helper.
   * @param {CanvasRenderingContext2D} ctx
   * @param {SpriteSheet} spriteSheet
   * @param {string} spriteName
   * @param {number} size
   * @param {number} x
   * @param {number} y
   * @param {number} scale
   */
  static imgDrawCall(ctx, spriteSheet, spriteName, size, x, y, scale) {
    const SPRITE = spriteSheet.getSprite(spriteName);
    const SPRITE_IMG = new Image();
    SPRITE_IMG.src = spriteSheet.image;
    ctx.drawImage(
        SPRITE_IMG,
        SPRITE.x,
        SPRITE.y,
        size,
        size,
        x,
        y,
        size * scale,
        size * scale
    );
  }
}
