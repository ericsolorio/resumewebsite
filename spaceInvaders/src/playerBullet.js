import {deletePlayerBullet} from "./functions.js"
export default class PlayerBullet{
    constructor(){
        this.img_playerBullet = document.querySelector("#img_playerBullet")
        this.width = 5
        this.height = 25
        this.x = null
        this.y = null
        this.speed = -200
    }

    update(launchPad, game){
        //deletes if touches top of screen
        if(this.y < 0){
            deletePlayerBullet(game, this)
        }

        this.y += this.speed * (1/launchPad.deltaTime)
        launchPad.ctx.drawImage(this.img_playerBullet, this.x, this.y, this.width, this.height)
    }
}
