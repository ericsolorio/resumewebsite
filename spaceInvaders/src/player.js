import InputPlayer from "./inputPlayer.js"

export default class Player{
    constructor(game){
        this.img_player = document.querySelector("#img_player")
        this.width = 45
        this.height = 35
        this.x = game.GAMEWIDTH/2 - this.width;
        this.y = game.GAMEHEIGHT - this.height - 20;
        this.speed = 0;

        //this is how the keyboard controls the player
        new InputPlayer(this,game)
    }

    update(launchPad, game){
        //can't leave left side of screen
        if(this.x < 0){
            this.x = 0
        }
        //can't leave rigth side of screen
        else if(this.x > game.GAMEWIDTH - this.width){
            this.x = game.GAMEWIDTH - this.width
        }

        this.x += this.speed * (1/launchPad.deltaTime);

        // launchPad.ctx.fillStyle = "red"
        // launchPad.ctx.fillRect(this.x, this.y, 10, 10)
        launchPad.ctx.drawImage(this.img_player, this.x, this.y, this.width, this.height)        
    }
}