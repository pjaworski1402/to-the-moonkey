import * as PIXI from "pixi.js"
import rock from "../images/rock.svg"

class Enemy {
    constructor(app, speed, lose, secondLayer) {
        this.app = app;
        this.speed = speed;
        this.enemySprite = new PIXI.Sprite.from(rock, { resolution: 2, resourceOptions: { scale: 2 } });
        this.lose = lose;
        this.enemy_ticker = new PIXI.Ticker;
        this.secondLayer = secondLayer
    }
    renderEnemy() {
        const xPos = Math.floor(Math.random() * (this.app.renderer.width - (-10))) + (-10);
        const yPos = Math.floor(Math.random() * ((-1 * this.app.renderer.height) - 1)) + 1;
        this.enemySprite.anchor.set(0.5);
        this.enemySprite.x = xPos
        this.enemySprite.y = yPos
        this.enemySprite.width = 57
        this.enemySprite.height = 51
        this.secondLayer.addChild(this.enemySprite);
        const moveEnemy = () => {
            this.enemySprite.y += this.speed
            if (this.enemySprite.y >= this.app.renderer.height + this.enemySprite.height) {
                this.secondLayer.removeChild(this.enemySprite)
                this.enemy_ticker.destroy()
            }
        }
        this.enemy_ticker.add(() => moveEnemy())
        this.enemy_ticker.start()
    }

    spawnEnemy(player) {
        this.renderEnemy();
        // Collision 
        this.app.ticker.add(() => {
            const playerPos = player.getPosition;
            const enemyPos = this.getPosition;
            const innerBoxValue = 36
            playerPos.width = playerPos.width - innerBoxValue
            playerPos.height = playerPos.height - innerBoxValue
            playerPos.x = playerPos.x + innerBoxValue
            playerPos.y = playerPos.y + innerBoxValue
            enemyPos.width = enemyPos.width - innerBoxValue
            enemyPos.height = enemyPos.height - innerBoxValue
            enemyPos.x = enemyPos.x + innerBoxValue
            enemyPos.y = enemyPos.y + innerBoxValue
            if (playerPos.intersects(enemyPos)) {
                this.lose();
            }
        })
    }

    get getPosition() {
        return this.enemySprite.getBounds();
    }

    removeEnemy() {
        this.app.stage.removeChild(this.enemySprite);
    }
}
export default Enemy;