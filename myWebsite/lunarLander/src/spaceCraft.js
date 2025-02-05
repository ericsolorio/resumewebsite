// Lunar Lander
import { inputSC } from "./inputSC.js"

export class SpaceCraft{
    constructor(){
        this.image = document.querySelector("#img_SC")
        this.x = 10
        this.y = 10
        this.width = 50
        this.height = 50

        this.xVelocity = 0
        this.yVelocity = 0


        new inputSC(this)
    }
    update(launchPad){

        this.x += this.xVelocity
        this.y += this.yVelocity

        launchPad.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}