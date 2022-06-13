import * as PIXI from "pixi.js"

import Menu from "./Menu"
import Gameboard from "./Gameboard";
import Game from "./Game";
import Lose from "./Lose";
import { scenes } from "./strings"

class Main {
    constructor() {
        this.app = new PIXI.Application({
            width: 400,
            height: 600,
            backgroundColor: 0x300E81
        });
        this.currentScene = scenes.MENU
    }

    initGame() {
        const gameDiv = document.getElementById("game");
        gameDiv.appendChild(this.app.view);
        const gameboard = new Gameboard(this.app, 4);
        gameboard.renderStars();
        this.setScene(scenes.MENU)
    }

    setScene(scene, score) {
        this.currentScene = scene
        switch (this.currentScene) {
            case scenes.MENU:
                const menu = new Menu(this.app, this.setScene);
                menu.displayMenu();
                break;
            case scenes.GAME:
                const game = new Game(this.app, this.setScene);
                game.initGame();
                break;
            case scenes.LOSE:
                const lose = new Lose(this.app, this.setScene, score);
                lose.displayLoseScene();

                break;
            default:
                break;
        }
    }
}

PIXI.utils.skipHello();
export default Main;
