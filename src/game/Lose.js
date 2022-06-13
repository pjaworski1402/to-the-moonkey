import * as PIXI from "pixi.js"

import monkeyLose from "../images/monkey_lose.svg"
import { scenes } from "./strings"
import { getCookie } from "./cookie"

class Lose {
    constructor(app, setScene, score) {
        this.app = app;
        this.score = Math.round(score)
        this.scoreText = this.score == (getCookie("score") ? getCookie("score") : 0) ? `NEW HIGH\nSCORE` : `YOU LOSE`
        this.hightScore =
            this.monkeySprite = new PIXI.Sprite.from(monkeyLose, { resolution: 2, resourceOptions: { scale: 2 } });
        this.title = new PIXI.Text(this.scoreText, {
            fontFamily: 'Arial', fontSize: 64, fill: 0xffffff, align: 'center',
        });
        this.text = new PIXI.Text(`Click to play again`, {
            fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center',
        });
        this.scoreText = new PIXI.Text(`Score ${this.score}`, {
            fontFamily: 'Arial', fontSize: 36, fill: 0xffffff, align: 'center',
        });
        this.screenButton = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.setScene = setScene
    }

    displayLoseScene() {
        this.title.y = 50
        this.title.x = (this.app.renderer.width - this.title.width) / 2
        this.app.stage.addChild(this.title)

        this.text.y = this.app.renderer.height - this.text.height - 12
        this.text.x = (this.app.renderer.width - this.text.width) / 2
        this.app.stage.addChild(this.text)

        this.scoreText.y = this.app.renderer.height / 2.3
        this.scoreText.x = (this.app.renderer.width - this.scoreText.width) / 2
        this.app.stage.addChild(this.scoreText)

        this.monkeySprite.anchor.set(0.5);
        this.monkeySprite.x = this.app.view.width / 2;
        this.monkeySprite.y = this.app.view.height / 1.4;
        this.app.stage.addChild(this.monkeySprite);

        this.screenButton.width = this.app.screen.width;
        this.screenButton.height = this.app.screen.height;
        this.screenButton.tint = 0x000000;
        this.screenButton.alpha = 0
        this.screenButton.interactive = true;
        this.screenButton.on('click', () => {
            this.closeLoseScene();
            this.setScene(scenes.MENU);
        });
        this.screenButton.interactive = true;
        this.app.stage.addChild(this.screenButton);
    }

    closeLoseScene() {
        this.app.stage.removeChild(this.title)
        this.app.stage.removeChild(this.text)
        this.app.stage.removeChild(this.scoreText)
        this.app.stage.removeChild(this.monkeySprite)
        this.app.stage.removeChild(this.screenButton)
    }
}

export default Lose;
