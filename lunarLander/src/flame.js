// lunar lander

export class Flame{
    constructor(spaceCraft){
        this.image = document.querySelector("#img_flame")
        this.width = 10
        this.height = 40

        this.size = 0

        this.spaceCraft = spaceCraft

        this.angle = this.spaceCraft.angle
        this.x = this.spaceCraft.x
        this.y = this.spaceCraft.y + 30
    }

    update(launchPad, game){
        this.angle = this.spaceCraft.angle
        
        this.x = this.spaceCraft.x + (30 * -Math.sin(this.spaceCraft.angle * (Math.PI / 180)))
        this.y = this.spaceCraft.y + (30 * Math.cos(this.spaceCraft.angle * (Math.PI / 180)))




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
        launchPad.ctx.rotate(this.spaceCraft.angle * (Math.PI/180))
        launchPad.ctx.drawImage(this.image,-(this.width/2), -(this.height/2), this.size * this.width, this.size * this.height)
        launchPad.ctx.restore()

    }
}