import * as PIXI from "pixi.js"

import Player from "./player";
import Enemy from "./Enemy";
import Fuel from "./Fuel";
import fuelIco from "../images/fuel_ico.png";
import { scenes } from "./strings";
import { setCookie, getCookie } from "./cookie";

const screens = {
    GAME: "GAME",
    MENU: "MENU",
    LOSE: "LOSE"
}

class Game {
    constructor(app, setScene) {
        this.app = app
        this.level = 0;
        this.highScore = getCookie("score")
        this.score = 0;
        this.enemies = []
        this.currentScreen = screens.MENU
        this.text = new PIXI.Text(`Score: 0`, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        this.player = new Player(this.app, 0, 0);
        this.fuelSprite = new PIXI.Sprite.from(fuelIco, { resolution: 2, resourceOptions: { scale: 2 } });
        this.setScene = setScene
        this.isLose = false
        this.game_ticker = new PIXI.Ticker
        this.fuel = 100;
    }
    initGame() {
        const firstLayer = new PIXI.Container()
        const secondLayer = new PIXI.Container()
        let monkey = this.player
        this.text.x = 12
        this.text.y = 12
        monkey.show();
        firstLayer.addChild(this.text)
        this.app.stage.addChild(secondLayer)
        this.app.stage.addChild(firstLayer)

        // fuel
        const fuelWidth = 164;
        const fuelHeight = 32

        const fuelBg = new PIXI.Graphics();
        fuelBg.beginFill(0x000000);
        fuelBg.drawRoundedRect(((this.app.renderer.width / 2) - (fuelWidth / 2)), this.app.renderer.height - (fuelHeight + 6), fuelWidth, fuelHeight, 50);

        const fuelBar = new PIXI.Graphics();
        fuelBar.beginFill(0x0C9900);
        fuelBar.lineStyle(2, 0x000000);

        fuelBar.drawRoundedRect(0, this.app.renderer.height - (fuelHeight + 6), fuelWidth, fuelHeight, 50);

        this.fuelSprite.anchor.set(0.5);
        this.fuelSprite.x = this.app.view.width / 2;
        this.fuelSprite.width = 17
        this.fuelSprite.height = 20
        this.fuelSprite.y = this.app.renderer.height - (this.fuelSprite.height + 3);

        firstLayer.addChild(fuelBg);
        firstLayer.addChild(fuelBar);
        firstLayer.addChild(this.fuelSprite);

        const gameOver = () => {
            if (!this.isLose) {
                for (let i = this.app.stage.children.length - 1; i >= 0; i--) {
                    if (!this.app.stage.children[i].isGameboard) {
                        this.app.stage.removeChild(this.app.stage.children[i]);
                    }
                };
                if (this.highScore < this.score) {
                    setCookie("score", Math.round(this.score), 999)
                }
                this.game_ticker.destroy()
                this.setScene(scenes.LOSE, this.score);
            }
            this.isLose = true;
        }
        // Score
        this.game_ticker.add(() => {
            this.text.text = `Score: ${Math.round(this.score)}`
            this.score += 0.01;
            this.fuel -= 0.04;
            fuelBar.setTransform((this.app.renderer.width / 2) - (fuelWidth / 2), 0, this.fuel / 100)
            if (Math.round(this.score) > this.level) {
                this.level++;
                const speed = 1 + (this.score / 10)
                let enemy = new Enemy(this.app, speed, gameOver, secondLayer)
                if (Math.round(this.score) % 5 === 0) {
                    let fuell = new Fuel(this.app, speed, () => this.fuel = 100)
                    fuell.spawnFuel(monkey)
                }
                enemy.spawnEnemy(monkey)
            }
            if (this.fuel <= 0) {
                gameOver();
            }
        })
        this.game_ticker.start()

        function keyDown(e) {
            switch (e.keyCode) {
                case 37:
                    // Left arrow
                    monkey.rotateIsActive = true
                    monkey.rotateDirection = "left"
                    break;
                case 39:
                    // Right arrow
                    monkey.rotateIsActive = true
                    monkey.rotateDirection = "right"
                    break;
                case 32:
                    // Space
                    monkey.movementIsActive = true
                    break;
                default:
                    break;
            }
        }

        function keyUp(e) {
            switch (e.keyCode) {
                case 37:
                    // Left arrow
                    monkey.rotateIsActive = false
                    break;
                case 39:
                    // Right arrow
                    monkey.rotateIsActive = false
                    break;
                case 32:
                    // Space
                    monkey.movementIsActive = false
                    break;
                default:
                    break;
            }
        }

        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
    }
}

export default Game;
