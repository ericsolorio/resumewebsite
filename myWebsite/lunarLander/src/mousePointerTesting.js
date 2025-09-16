// THIS CLASS IS NOT USED IT WAS MADE FOR TESTING PURPOSES
export class mousePointer{
    constructor(launchPad){
        this.launchPad = launchPad
        this.image = document.querySelector("#img_mousePointer")
        this.width = 5
        this.height = 5

        this.mouse_x = 0
        this.mouse_y = 0


        //thanks to google AI and Adam Khoury from Youtube
        // how to get x and y from mouse in canvas
        this.launchPad.ctx.canvas.addEventListener("mousemove", e => {
            this.mouse_x = e.offsetX
            this.mouse_y = e.offsetY
        })

        
    }

    update(launchPad){
        // add x and y on screen!!!!!!!!!!!!!!
        launchPad.ctx.drawImage(this.image, this.mouse_x, this.mouse_y, this.width, this.height)
        launchPad.ctx.font = "20px Times New Roman"
        launchPad.ctx.fillStyle = "white"
        launchPad.ctx.fillText("x: " + this.mouse_x + " y: " + this.mouse_y , this.mouse_x, this.mouse_y)
    }
}