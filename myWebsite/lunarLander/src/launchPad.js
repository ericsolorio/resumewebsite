// Lunar Lander
import { Game } from "./game.js"
import { isLPActiveLL } from "../../main/main.js";

let game = null

let counter = 0

export class LaunchPad{
    constructor(){
        this.deltaTime = null
        this.canvas = document.querySelector("#llGameScreen")
        this.ctx = this.canvas.getContext("2d")
    }

    update(deltaTime){
        this.deltaTime = deltaTime

        console.log(isLPActiveLL)

        if(isLPActiveLL){
            if(counter == 0){
                game = new Game()
                counter++
            }
            game.update(this)
        }
        else{
            if(counter == 1){
                game = null
                counter = 0
            }
        }



        game.update(this)
    }
}