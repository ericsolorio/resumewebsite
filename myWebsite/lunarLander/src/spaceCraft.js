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

        this.keysPressed = {}


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


        if(this.keysPressed["w"] == true){
            if(this.yVelocity > -10){
                this.xVelocity += .6 * Math.sin(this.angle * (Math.PI/180))
                this.yVelocity -= .6 * Math.cos(this.angle * (Math.PI/180))
            }
        }

        if(this.keysPressed["a"] == true && this.angle > -90){
            this.angle -=3
        }

        if(this.keysPressed["d"] == true && this.angle < 90){
            this.angle +=3
        }


        if(GAME.status == ""){
            //console.log("this is running")
            this.yVelocity += .1

            this.x += this.xVelocity * (1/launchPad.deltaTime)
            this.y += this.yVelocity * (1/launchPad.deltaTime)
        }

        
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