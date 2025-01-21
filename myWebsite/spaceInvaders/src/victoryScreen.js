export default class VictoryScreen{
    constructor(){

    }

    // just text

    update(launchPad){
        launchPad.ctx.clearRect(0,0,650,650)
        launchPad.ctx.rect(0, 0, 650, 650)
        launchPad.ctx.fillStyle = "rgba(0,0,0.1)"
        launchPad.ctx.fill()

        launchPad.ctx.font = "50px Arial"
        launchPad.ctx.fillStyle = "white"
        launchPad.ctx.textAlign = "center"

        launchPad.ctx.fillText("Victory!!!!!!!!!", 650/2, 650/2)
        launchPad.ctx.font = "20px Arial"
        launchPad.ctx.fillText("Click Anything To Restart", 650/2, 750/2)
    }
}