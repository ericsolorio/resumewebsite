//Lunar Lander
import { LaunchPad } from "./launchPad.js";
import { isLPActiveLL } from "../../main/main.js";

let launchPad = null

let lastTime = 0;


function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp

    if(isLPActiveLL){
        if(launchPad == null){
            launchPad = new LaunchPad()
        }
        launchPad.update(deltaTime)
    }
    else{
        if(launchPad != null){
            launchPad.gameList.clear()
            launchPad = null
        }
    }

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)