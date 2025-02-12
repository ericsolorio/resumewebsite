// Lunar Lander
import { SpaceCraft } from "./spaceCraft.js"


export class Game{
    constructor(){
        this.GAMEHEIGHT = 650
        this.GAMEWIDTH = 650
        this.sc = new SpaceCraft()
    }
    update(launchPad){
        launchPad.ctx.clearRect(0,0,this.GAMEWIDTH,this.GAMEHEIGHT)
        launchPad.ctx.fillStyle = "black"
        launchPad.ctx.fillRect(0,0, this.GAMEHEIGHT,this.GAMEHEIGHT)

        this.sc.update(launchPad, this)
    }
}