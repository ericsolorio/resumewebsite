// Lunar Lander
import { Game } from "./game.js"

export class LaunchPad{
    constructor(){
        this.deltaTime = null
        this.canvas = document.querySelector("#llGameScreen")
        //this.ctx = this.canvas.getContext("2d")


        let newCTX = this.canvas.getContext("2d")
        this.ctx = newCTX
        

        
        console.log("THIS SHOULD BE EMPTY")
        console.log(this.gameList)
        

        this.gameList = new Set()
        this.game = new Game()
        this.gameList.add(this.game)

        console.log("THIS SHOULD be one")
        console.log(this.gameList)
    }

    update(deltaTime){
        this.deltaTime = deltaTime
        this.gameList.forEach(game => {
            game.update(this)
        })
    }
}