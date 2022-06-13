import * as PIXI from "pixi.js"

class Gameboard {
    constructor(app, speed) {
        this.app = app;
        this.speed = speed;
        this.stars = 100;
    }
    renderStars() {
        for (let i = 0; i < 50; i++) {
            const xPos = Math.floor(Math.random() * (this.app.renderer.width - 1)) + 1;
            const yPos = Math.floor(Math.random() * ((-1 * this.app.renderer.height) - 1)) + 1;
            const gr = new PIXI.Graphics();
            gr.beginFill(0xffffff);
            gr.drawCircle(0, 0, 2);
            gr.endFill();
            gr.x = xPos
            gr.y = yPos
            gr.isGameboard = true
            this.app.stage.addChild(gr)
            this.app.ticker.add(() => {
                gr.y += this.speed
                if (gr.y >= this.app.renderer.height) {
                    gr.y = yPos
                }
            })
        }
    }
}
export default Gameboard;