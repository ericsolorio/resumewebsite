// Lunar Lander
import { inputSC } from "./inputSC.js"

export class SpaceCraft{
    constructor(){
        this.image = document.querySelector("#img_SC")
        this.x = 300
        this.y = 550
        this.width = 50
        this.height = 50

        this.xVelocity = 0
        this.yVelocity = 0

        this.left = false
        this.right = false


        new inputSC(this)
    }
    update(launchPad){

        if(this.left){
            launchPad.ctx.rotate(.001)
            this.left = false
        }
        if(this.right){
            launchPad.ctx.rotate(-.001)
            this.right = false
        }

        console.log(this.yVelocity)

        this.yVelocity += .1

        this.x += this.xVelocity * (1/launchPad.deltaTime)
        this.y += this.yVelocity * (1/launchPad.deltaTime)

        launchPad.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}