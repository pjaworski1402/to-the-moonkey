import * as PIXI from "pixi.js"

import rocket from "../images/rocket.svg"
import startButton from "../images/start_button.svg"
import { scenes } from "./strings"
import { getCookie } from "./cookie"

class Menu {
    constructor(app, setScene) {
        this.app = app;
        this.score = getCookie("score") ? getCookie("score") : 0
        this.rocketSprite = new PIXI.Sprite.from(rocket, { resolution: 2, resourceOptions: { scale: 2 } });
        this.startButton = new PIXI.Sprite.from(startButton, { resolution: 2, resourceOptions: { scale: 2 } });
        this.title = new PIXI.Text(`TO THE\nMOONKEY`, {
            fontFamily: 'Arial', fontSize: 64, fill: 0xffffff, align: 'center',
        });
        this.totalScore = new PIXI.Text(`High score ${this.score}`, {
            fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center',
        });
        this.setScene = setScene
    }

    displayMenu() {
        this.title.y = 50
        this.title.x = (this.app.renderer.width - this.title.width) / 2
        this.app.stage.addChild(this.title)

        this.totalScore.y = this.app.renderer.height - this.totalScore.height - 12
        this.totalScore.x = (this.app.renderer.width - this.totalScore.width) / 2
        this.app.stage.addChild(this.totalScore)

        this.rocketSprite.anchor.set(0.5);
        this.rocketSprite.x = this.app.view.width / 2;
        this.rocketSprite.y = this.app.view.height / 1.5;
        this.app.stage.addChild(this.rocketSprite);

        this.startButton.anchor.set(0.5);
        this.startButton.x = this.app.view.width / 2;
        this.startButton.y = this.app.view.height / 2;
        this.startButton.interactive = true;
        this.startButton.buttonMode = true;
        this.startButton.on('pointerup', () => {
            this.closeMenu();
            this.setScene(scenes.GAME);
        })
        this.app.stage.addChild(this.startButton);
    }

    closeMenu() {
        this.app.stage.removeChild(this.title)
        this.app.stage.removeChild(this.totalScore)
        this.app.stage.removeChild(this.rocketSprite)
        this.app.stage.removeChild(this.startButton)
    }
}

export default Menu;
