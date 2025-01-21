import Player from "./player.js"
import Enemy from "./enemy.js"
import { controlledEnemies } from "./functions.js"

export default class Game{
    constructor(){
        this.GAMEWIDTH = 650
        this.GAMEHEIGHT = 650

        this.playerList = new Set()
        this.player = new Player(this)
        this.playerList.add(this.player)

        this.playerBulletList = new Set()

        this.timer = 120

        this.enemyBulletList = new Set()
        this.enemiesList = new Set()
        this.enemyMap = [
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1]
        ]
        for(let i = 0; i < this.enemyMap.length; i++){
            for(let j = 0; j < this.enemyMap[i].length; j++){
                let enemy = new Enemy()
                // random number here are just spacing

                enemy.x = (this.GAMEWIDTH/2 - 200) + (60 * j)
                enemy.y = 100 + (50 * i)

                this.enemiesList.add(enemy)
            }
        }

        // this two are used to assign random enemies
        // with the ability to shoot
        // with the function controlledEnemies which is down below
        this.copyEnemiesList = new Set(this.enemiesList)
        this.avaiShooters = [...this.copyEnemiesList]


        //used for collision
        //instead of passing arguments
        // a string is used instead
        this.mapObjects = {
            "Player": this.playerList,
            "PlayerBullet" : this.playerBulletList,
            "Enemy" : this.enemiesList,
            "EnemyBullet" : this.enemyBulletList
        }
    }

    update(launchPad){
        launchPad.ctx.clearRect(0,0,this.GAMEWIDTH,this.GAMEHEIGHT)

        // this updates the objects frame per frame

        // These two ifs will send the game either
        // to gameover or victory screen
        if(this.playerList.size == 0){
            launchPad.startGame = false
            launchPad.gameOverScreen = true
        }
        if(this.enemiesList.size == 0){
            launchPad.startGame = false
            launchPad.victoryScreen = true
        }
        
        this.playerList.forEach(player =>{
            player.update(launchPad, this)
        })
        this.playerBulletList.forEach(bullet =>{
            bullet.update(launchPad, this)
        })
        this.enemiesList.forEach(enemy =>{
            enemy.update(launchPad, this)
        })
        this.enemyBulletList.forEach(bullet =>{
            bullet.update(launchPad, this)
        })

        //assigns a new enemy shooter randomly if there is
        // any available non-shooters left
        // every two seconds
        if(this.timer > 120 && this.avaiShooters.length > 0){
            controlledEnemies(this)
            this.timer = 0
        }
        this.timer += 1
    }
}