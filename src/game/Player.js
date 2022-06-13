import * as PIXI from "pixi.js"
import monkey from "../images/monkey_helmet.svg"
import monkeyFire from "../images/monkey_fire.svg"


class Player {
    constructor(app, x = 0, y = 0) {
        this.app = app
        this.w = 49 * 1.5;
        this.h = 77 * 1.5;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.angle = 0;
        this.rotateSpeed = 0;
        this.rotateIsActive = false;
        this.movementIsActive = false;
        this.rotateDirection = "left";
        this.playerSprite = new PIXI.Sprite.from(monkey, { resolution: 2, resourceOptions: { scale: 2 } });
    }
    show() {
        this.playerSprite.anchor.set(0.5);
        this.playerSprite.x = this.app.view.width / 2;
        this.playerSprite.y = this.app.view.height / 1.5;
        this.playerSprite.width = this.w
        this.playerSprite.height = this.h
        this.app.stage.addChild(this.playerSprite);
        this.app.ticker.add(() => {
            const maxRotateSpeed = 2;
            const maxXSpeed = 3;
            this.angle -= this.rotateSpeed;
            this.playerSprite.x -= this.xSpeed;
            this.playerSprite.angle = this.angle
            if (this.angle >= 360 || this.angle <= -360) {
                this.angle = 0
            }
            if (this.rotateSpeed > 0) {
                this.rotateSpeed -= 0.01
            } else if (this.rotateSpeed < 0) {
                this.rotateSpeed += 0.01
            }
            if (this.rotateIsActive) {
                if (this.rotateDirection === "left" && this.rotateSpeed < maxRotateSpeed) {
                    this.rotateSpeed += 0.04;
                } else if (this.rotateDirection === "right" && this.rotateSpeed > -maxRotateSpeed) {
                    this.rotateSpeed -= 0.04;
                }
            }

            if (this.xSpeed > 0 && this.xSpeed) {
                this.xSpeed -= 0.02
            } else if (this.xSpeed < 0) {
                this.xSpeed += 0.02
            }

            if (this.movementIsActive) {
                if (((this.angle > -180 && this.angle < 1) || (this.angle > 180)) && this.xSpeed < maxXSpeed) {
                    this.xSpeed += 0.1;
                } else if (((this.angle < 180 && this.angle > 1) || (this.angle < -180)) && this.xSpeed > -maxXSpeed) {
                    this.xSpeed -= 0.1;
                }
            }
            // change player site
            if (this.playerSprite.x < 0 - this.playerSprite.width / 2) {
                this.playerSprite.x = this.app.view.width + this.playerSprite.width / 2
            } else if (this.playerSprite.x > this.app.view.width + this.playerSprite.width / 2) {
                this.playerSprite.x = 0 - this.playerSprite.width / 2
            }
        })
    }
    get getPosition() {
        return this.playerSprite.getBounds()
    }
    removePlayer() {
        this.app.stage.removeChild(this.playerSprite);
    }
}
export default Player;