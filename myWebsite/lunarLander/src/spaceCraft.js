// Lunar Lander

export class SpaceCraft{
    constructor(GAME){
        this.image = document.querySelector("#img_SC")
        this.x = GAME.line7.x
        this.y = 50


        this.width = 20
        this.height = 20

        // this.width = 50
        // this.height = 50


        this.xVelocity = 0
        this.yVelocity = 0

        

        this.myVertices = {}
        this.myEdges = {}
        this.myPerpVectors = {}


        // this.left = false
        // this.right = false


        ///
        // this.imageCenterX = image.width / 2
        // this.imageCenterY = image.height / 2
        ///

        // this.imageCenterX = this.image.width / 2
        // this.imageCenterY = this.image.height / 2

        this.angle = 0

    }
    update(launchPad, GAME){

        this.speed = Math.sqrt((this.xVelocity * this.xVelocity) + (this.yVelocity * this.yVelocity))

        if(GAME.status != "gameover"){
            this.yVelocity += .1

            this.x += this.xVelocity * (1/launchPad.deltaTime)
            this.y += this.yVelocity * (1/launchPad.deltaTime)
        }

        //
        // ctx.translate(imageCenterX, imageCenterY)
        // ctx.rotate(rotationAngleToRadians)
        // ctx.drawImage(Image, -imageCenterX, -imageCenterY)
        //

        //launchPad.ctx.translate(this.imageCenterX, this.imageCenterY)
        //launchPad.ctx.rotate(180 * (3.16/180))

        //launchPad.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)


        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        //EVERYONE STOP, THE ROTATING WAS ONLY POSSIBLE BC OF Luis Estrada FROM GAMEDEV.STACKEXCHANGE
        // THE URL IS: https://gamedev.stackexchange.com/questions/67274/how-to-rotate-an-image-on-an-html5-canvas-without-rotating-the-whole-canvas 
        // THIS IS VERY IMPORTANT
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////


        
        launchPad.ctx.save()
        launchPad.ctx.translate(this.x, this.y)
        launchPad.ctx.rotate(this.angle * (Math.PI/180))
        launchPad.ctx.drawImage(this.image,-(this.width/2), -(this.height/2), this.width, this.height)
        launchPad.ctx.restore()
    }

}