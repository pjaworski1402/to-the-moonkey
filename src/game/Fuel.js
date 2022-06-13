import * as PIXI from "pixi.js"
import fuel from "../images/fuel.svg"

class Fuel {
    constructor(app, speed, setFuel) {
        this.app = app;
        this.speed = speed;
        this.fuelSprite = new PIXI.Sprite.from(fuel, { resolution: 2, resourceOptions: { scale: 2 } });
        this.fuel_ticker = new PIXI.Ticker;
        this.setFuel = setFuel
        this.isVisible = true
    }
    renderFuel() {
        const xPos = Math.floor(Math.random() * (this.app.renderer.width - (-10))) + (-10);
        const yPos = Math.floor(Math.random() * ((-1 * this.app.renderer.height) - 1)) + 1;
        this.fuelSprite.anchor.set(0.5);
        this.fuelSprite.x = xPos
        this.fuelSprite.y = yPos
        this.fuelSprite.width = 28
        this.fuelSprite.height = 34
        this.app.stage.addChild(this.fuelSprite);
        const moveFuel = () => {
            this.fuelSprite.y += this.speed
            if (this.fuelSprite.y >= this.app.renderer.height + this.fuelSprite.height) {
                this.app.stage.removeChild(this.fuelSprite)
                this.fuel_ticker.destroy()
            }
        }
        this.fuel_ticker.add(() => moveFuel())
        this.fuel_ticker.start()
    }

    spawnFuel(player) {
        this.renderFuel();
        // Collision 
        this.app.ticker.add(() => {
            const playerPos = player.getPosition;
            const fuelPos = this.getPosition;
            const innerBoxValue = 0
            playerPos.width = playerPos.width - innerBoxValue
            playerPos.height = playerPos.height - innerBoxValue
            playerPos.x = playerPos.x + innerBoxValue
            playerPos.y = playerPos.y + innerBoxValue
            fuelPos.width = fuelPos.width - innerBoxValue
            fuelPos.height = fuelPos.height - innerBoxValue
            fuelPos.x = fuelPos.x + innerBoxValue
            fuelPos.y = fuelPos.y + innerBoxValue
            if (playerPos.intersects(fuelPos)) {
                if (this.isVisible) {
                    this.fuel_ticker.destroy()
                    this.app.stage.removeChild(this.fuelSprite)
                    this.setFuel()
                    this.isVisible = false
                }
            }
        })
    }

    get getPosition() {
        return this.fuelSprite.getBounds();
    }

    removeFuel() {
        this.app.stage.removeChild(this.fuelSprite);
    }
}
export default Fuel