
/**
 * @file helper for moving the bullets & bullet logic
 * @author bluepie <gopinath2nr@gmail.com>
 */
class BulletMovement extends BulletAnimationHelper {
  /** constructor*/
  constructor() {
    super();
    this.playerMode = false;
  }

  /** override this method in inherited class */
  fire() { }

  /**
   * Straight along the x axis.
   */
  straight() {
    this.position.x = this.position.x - this.speed;
  }

  /**
   * based on the defined pattern, that specific function is called.
   * @override
   */
  _Movement() {
    if (this.position != null) {
      if (this.playerMode) {/* Hack, no time :() */
        this._playerBulletMotion();
        return;
      }
      eval('this.'+this.pattern+'()');
    }
  }

  /**
   * follows enemie's position at the time of firing the bullet.
   * & despawns on reaching position if it didnt encounter player
   * till that time.
   * @return {void}
   */
  follow() {
    if (this.playerPositionSnap == null) {
      return this.straight();
    }
    let xAxis = this.playerPositionSnap.x - this.position.x;
    let yAxis = this.playerPositionSnap.y - this.position.y;
    const length = Math.sqrt((yAxis*yAxis) + (xAxis*xAxis));
    /*
     * despawn bullet after reaching its follow position
     * right to left, so sub works need to change this if more complex gameplay
     */
    if (xAxis > -10 && yAxis > -10 && !this.playerMode) {
      this.despawn();
    }
    xAxis = xAxis / length;
    yAxis = yAxis / length;
    if (this.position != null) {
      this.position.x += xAxis * this.speed;
      this.position.y += yAxis * this.speed;
    }
  }

  /**
   * player bullet movement
   * set the bullet mode to belong to player.
   */
  setPlayerMode() {
    this.playerMode = true;
  }

  /**
   * @return {boolean} - true if player mode
   */
  isPlayerMode() {
    return this.playerMode;
  }

  /**
   * player bullet moves from left to right
   */
  _playerBulletMotion() {
    this.position.x = this.position.x + this.speed;
  }
}

/**
 *  Each bullet has its own behaviour and properties
 *
*/
class Bullet extends BulletMovement {
  /**
   * @param {Sprite} sprite
   * @param {Position|null} startposition - where the bullet originates
   * @param {BulletPattern|string} pattern
   * @param {number} speed - 1 is the slowest bullet possible
   * @param {number} damage
   */
  constructor(sprite = null,
      startposition = null,
      pattern = BulletPattern.FOLLOW,
      speed = 1,
      damage = 1) {
    super();
    this.sprite = sprite;
    this.position = startposition;
    this.pattern = pattern;
    this.speed = speed;
    this.damage = damage;
    this.playerPositionSnap = null;
  }

  /**
   * returns default bullet, which is straight
   */
  static get DEFAULT() {
    return new Bullet();
  }

  /**
     * the postion that the bullet should travel towards,
     * bullet explodes at end?(inrelation with bulletPattern)
     *  or just goes offscreen
     * @param {Position} position
     * @return {Position}
     */
  setBulletTarget(position) {
    this.targetPosition = position;
    return this.targetPosition;
  }

  /**
     * if you are insane, and teleport a bullet for some reason.
     * @param {Position} position,
     * @return {Position}
     */
  setBulletPostition(position) {
    this.position = position;
    return this.position;
  }

  /**
   * player Position at the time of generating bullet.
   * @param {Position} position
   */
  setPlayerPositionSnap(position) {
    this.playerPositionSnap = position;
  }

  /**
   * getbulletPosition
   * @return {Position}
   */
  getBulletPosition() {
    return this.position;
  }

  /**
   * @override
   */
  fire() {
    AudioEffects.playEnemyPewSound();
    this.objectAnimation(this.context);
  }

  /**
   * remove bullet
   */
  despawn() {
    this.position = null;
    this.sprite = null;
    this.position = null;
    this.pattern = null;
    this.speed = null;
    this.damage = null;
    this.playerPositionSnap = null;
    /* clear motion animation for bullet */
    clearTimeout(this.animationTimerId);
  }

  /**
   * detects collision with the given player coordinates
  * @param {Position} playerPosition
  * @return {boolean}
  */
  collideDetect(playerPosition) {
    if (playerPosition.x == null || this.position.x == null) {
      return false; /* dont proceed, if despawned */
    }
    const bulletObject={'x': this.position.x,
      'y': this.position.y,
      'width': this.sprite.individualSpriteSize*this.sprite.scaleFactorX,
      'height': this.sprite.individualSpriteSize*this.sprite.scaleFactorY,
    };
    const playerObject={
      'x': playerPosition.x,
      'y': playerPosition.y,
      'width': 32*2,
      'height': 32*2,
    };
    return CollisionDetection.detect(bulletObject, playerObject);
  }
}
