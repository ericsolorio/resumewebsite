import { spawnEnemyBullet } from "./functions.js"
import {getCollision} from "./functions.js"
export default class Enemy{
    constructor(){
        this.img_enemy = document.querySelector("#img_enemy")
        this.width = 35
        this.height = 35
        this.x = null
        this.y = null

        this.health = 100

        this.speed = 5
        this.timer = 0

        this.avaiToShoot = false

        // W3, how to make a random range
            //https://www.w3schools.com/js/js_random.asp
        this.randomNum = Math.floor(Math.random() * (120 - 60 + 1)) + 60
    }

    update(lanuchPad, game){
        this.timer += 1

        if (getCollision(game, this, "PlayerBullet")){
            this.health -= 20
        }

        if(this.health < 1){
            game.enemiesList.delete(this)
        }

        // timer is always runniing
        // randomNum is a random number generated between 60-120
        // the enemy must also be announced as a shooter
        // they are announced a shooters in game with controlledEnemies
        if(this.timer > this.randomNum && this.avaiToShoot){
            spawnEnemyBullet(game, this)
            this.timer = 0
            this.randomNum = Math.floor(Math.random() * (120 - 60 + 1)) + 60
        }
        
        // can't pass left or right of the screen
        if(this.x > game.GAMEWIDTH - this.width){
            this.speed = -this.speed
        }
        else if(this.x < 0){
            this.speed = -this.speed
        }

        this.x += this.speed
        
        lanuchPad.ctx.drawImage(this.img_enemy, this.x, this.y, this.width, this.height)
        
        //this is code for the health bar for the enemy
        lanuchPad.ctx.fillStyle = "#00f"
        lanuchPad.ctx.fillRect(this.x, this.y, (this.health/100) * this.width, this.height/5)
    }
}