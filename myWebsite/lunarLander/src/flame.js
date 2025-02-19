// lunar lander

export class Flame{
    constructor(spaceCraft){
        this.image = document.querySelector("#img_flame")
        this.width = 10
        this.height = 40

        this.spaceCraft = spaceCraft

        this.angle = this.spaceCraft.angle
        this.x = this.spaceCraft.x
        this.y = this.spaceCraft.y + 30
    }

    update(launchPad, game){
        this.angle = this.spaceCraft.angle
        
        this.x = this.spaceCraft.x + (30 * -Math.sin(this.spaceCraft.angle * (Math.PI / 180)))
        this.y = this.spaceCraft.y + (30 * Math.cos(this.spaceCraft.angle * (Math.PI / 180)))

        console.log("flame y: ", this.y)
        console.log("flame x: ", this.x)

        launchPad.ctx.save()
        launchPad.ctx.translate(this.x, this.y)
        launchPad.ctx.rotate(this.spaceCraft.angle * (Math.PI/180))
        launchPad.ctx.drawImage(this.image,-(this.width/2), -(this.height/2), this.width, this.height)
        launchPad.ctx.restore()

    }
}