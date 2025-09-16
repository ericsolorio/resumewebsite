import {spawnPlayerBullet} from "./functions.js"

export default class InputPlayer{
    constructor(player, game){

        //how player is controlled with keyboard
        document.addEventListener("keydown", e =>{
            if(e.key == "a"){
                player.speed = -200;
            }
            if(e.key == "d"){
                player.speed = 200;
            }
            if(e.key == " "){
                spawnPlayerBullet(game)
            }
        })
    
        document.addEventListener("keyup", e =>{
            if(e.key == "a"){
                if (player.speed < 0){
                    player.speed = 0;
                }
                
            }
            if(e.key == "d"){
                if (player.speed > 0){
                    player.speed = 0;
                }
            }
        })




    }
    
}