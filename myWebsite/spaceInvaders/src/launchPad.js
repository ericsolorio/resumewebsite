import Game from "./game.js";
import GameOverScreen from "./gameOverScreen.js";
import MainMenu from "./mainMenu.js";
import VictoryScreen from "./victoryScreen.js";

import { InputLP } from "./inputLP.js";

export default class LaunchPad{
    constructor(){
        this.deltaTime = null

        this.startGame = false
        this.gameOverScreen = false
        this.victoryScreen = false

        this.canvas = document.querySelector("#gameScreen")
        /////////////////////////////////////////////////////////
        let newCTX = this.canvas.getContext("2d")
        this.ctx = newCTX

        // this.ctx = this.canvas.getContext("2d")
        //////////////////////////////////////////////////
        console.log("is this running?")

        this.gameList = new Set()

        // detects keyboard to move away from main menu,
        // game over, or victory screen
        // pause variable is used so you need to release the button
        // to go to the next screen, avoids really fast transitions
        this.pause = false
        new InputLP(this)

        this.menu = new MainMenu()
        this.victory = new VictoryScreen()
        this.gameOver = new GameOverScreen()
    }


    // this class basically deals with decidicing what scenario to show
        // it also detects the keyboard
        // depending on what happened in the game
        // it will throw the victory or G.O. screen
    update(deltaTime){
        this.deltaTime = deltaTime

        if(this.startGame){
            if(this.gameList.size < 1){
                this.game = new Game()
                this.gameList.add(this.game)
            }

            this.gameList.forEach(game => {
                game.update(this)
            })
        }

        else if(this.victoryScreen){
            this.victory.update(this)
        }

        else if(this.gameOverScreen){
            this.gameOver.update(this)
        }

        else{
            if(this.gameList.size > 0){
                this.gameList.clear()
            }
            this.menu.update(this)
        }

    }
}