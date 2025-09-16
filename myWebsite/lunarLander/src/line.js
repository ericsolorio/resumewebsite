export class Line{
    constructor(){
        
        this.image = document.querySelector("#img_line")
        this.x = 0
        this.y = 0

        this.width = 70
        this.height = 3

        // this.width = 80
        // this.height = 80

        this.angle = 0


        this.myVertices = {}
        this.myEdges = {}
        this.myPerpVectors = {}
    }

    update(launchPad, game){

        // needs to be drawn multiple times because the canvas is cleared multiple times


        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        //EVERYONE STOP, THE ROTATING WAS ONLY POSSIBLE BC OF Luis Estrada FROM GAMEDEV.STACKEXCHANGE
        // THE URL IS: https://gamedev.stackexchange.com/questions/67274/how-to-rotate-an-image-on-an-html5-canvas-without-rotating-the-whole-canvas 
        // THIS IS VERY IMPORTANT
        // DIRECT CODE FROM Luis Estrada AND HEAVILY INFLUENCED
        // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        // THE CODE DOWN HERE
        // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////



        launchPad.ctx.save()
        launchPad.ctx.translate(this.x, this.y)
        launchPad.ctx.rotate(this.angle * (Math.PI/180))
        launchPad.ctx.drawImage(this.image,-(this.width/2), -(this.height/2), this.width, this.height)
        launchPad.ctx.restore()
    }
}