// Lunar Lander
import { Game } from "./game.js"

export class LaunchPad{
    constructor(){
        this.deltaTime = null
        this.canvas = document.querySelector("#llGameScreen")
        //this.ctx = this.canvas.getContext("2d")


        let newCTX = this.canvas.getContext("2d")
        this.ctx = newCTX
        

        this.gameList = new Set()
        this.game = new Game(this)
        this.gameList.add(this.game)

        this.addNewGame = false
    }

    update(deltaTime){
        this.deltaTime = deltaTime

        if(this.addNewGame == true){
            this.addNewGame = false
            this.gameList.clear()
            this.game = new Game(this)
            this.gameList.add(this.game)
        }


        this.gameList.forEach(game => {
            game.update(this)
        })
    }
}