import {Screen} from "./Screen";

export class Game {
    constructor() {
        this.screen = new Screen();
    }

    run = () => {
        requestAnimationFrame((time) => this.frame(time))
    }

    frame = () => {
        requestAnimationFrame((time) => this.frame(time))
    }
}