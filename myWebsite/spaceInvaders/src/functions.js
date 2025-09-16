import PlayerBullet from "./playerBullet.js"
import EnemyBullet from "./enemyBullet.js"

//functions that are found throughout different files
// I moved them here to make the game file look cleaner

export function controlledEnemies(game){
    let randomNum = Math.floor(Math.random() * game.avaiShooters.length)

    game.avaiShooters[randomNum].avaiToShoot = true

    game.copyEnemiesList.delete(game.avaiShooters[randomNum])

    game.avaiShooters = [...game.copyEnemiesList]
}

export function spawnPlayerBullet(game){
    let newPlayerBullet = new PlayerBullet()
    newPlayerBullet.x = game.player.x + 20
    newPlayerBullet.y = game.player.y - 20
    game.playerBulletList.add(newPlayerBullet)
}

export function deletePlayerBullet(game, specificPlayerBullet){
    game.playerBulletList.delete(specificPlayerBullet)
}

export function spawnEnemyBullet(game, specificEnemy){
    let newEnemyBullet1 = new EnemyBullet()
    let newEnemyBullet2 = new EnemyBullet()

    newEnemyBullet1.x = specificEnemy.x + 7
    newEnemyBullet1.y = specificEnemy.y + 30
    // this are the coords where the enemy shoots (the grey part of the enemy)
    newEnemyBullet2.x = specificEnemy.x + 25
    newEnemyBullet2.y = specificEnemy.y + 30

    game.enemyBulletList.add(newEnemyBullet1)
    game.enemyBulletList.add(newEnemyBullet2)
}

export function deleteEnemyBullet(game, specificEnemyBullet){
    game.enemyBulletList.delete(specificEnemyBullet)
}




// thanks to pimvdb for the help
// from S.O. in the forum "JavaScript function not returning true"
// realized that the anonymous function is a function haha
// basically realized it was a nested function
// pimvdb also helped by making me realize I could use a variable
    // in this case my variable "theyCollided"

// arguments/ parameters influenced by the website/engine Pixelpad 
export function getCollision(game, specificObj, className){
    let listObjs = game.mapObjects[className]
    let theyCollided = false
    listObjs.forEach(obj => {
        if(specificObj.x < obj.x + (obj.width/2)){
            if(specificObj.x > obj.x - (obj.width/2)){
                if(specificObj.y < obj.y + (obj.height/2)){
                    if(specificObj.y > obj.y - (obj.height/2)){
                        listObjs.delete(obj)
                        theyCollided = true
                    }
                }
            }
        }
    })
    return theyCollided
}



export function getCollision2(game, specificObj, enemyBullet){
    specificObj = game.mapObjects[specificObj]
    let player = [...specificObj][0]

    
    let theyCollided = false
    if(game.playerList.size > 0){
        //orginal x and y are top left so must translate to center
        if(enemyBullet.y + (enemyBullet.height/2) < (player.y + player.height/2) + (player.height/2)){
            if(enemyBullet.y + (enemyBullet.height/2) > (player.y + player.height/2) - (player.height/2)){
                if(enemyBullet.x < (player.x + player.width/2) + (player.width/2)){
                    if(enemyBullet.x > (player.x + player.width/2) - (player.width/2)){
                        game.mapObjects["Player"].delete(player)
                        theyCollided = true
                        return
                    }
                }
            }
        }
    }    
    return theyCollided
}