import { getCollision, deleteEnemyBullet } from "./functions.js"

export default class EnemyBullet{
    constructor(){
        this.img_enemyBullet = document.querySelector("#img_enemyBullet")
        this.width = 3
        this.height = 35
        this.x = null
        this.y = null
    }

    update(launchPad, game){
        //deletes bullet if it collides with player or 
        //bottom of screen
        if(getCollision(game, this, "Player")){
            deleteEnemyBullet(game, this)
        }
        
        if(this.y > game.GAMEHEIGHT){
            deleteEnemyBullet(game, this)
        }
        this.y += 5
        launchPad.ctx.drawImage(this.img_enemyBullet, this.x, this.y, this.width, this.height)
    }
}