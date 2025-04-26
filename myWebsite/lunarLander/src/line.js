export class Line{
    constructor(){
        
        this.image = document.querySelector("#img_line")
        this.x = 0
        this.y = 0

        this.width = 70
        this.height = 3

        this.angle = 0


        this.myVertices = {}
        this.myEdges = {}
        this.myPerpVectors = {}
    }

    update(launchPad, game){

        // needs to be drawn multiple times because the canvas is cleared multiple times

        launchPad.ctx.save()
        launchPad.ctx.translate(this.x, this.y)
        launchPad.ctx.rotate(this.angle * (Math.PI/180))
        launchPad.ctx.drawImage(this.image,-(this.width/2), -(this.height/2), this.width, this.height)
        launchPad.ctx.restore()
    }
}