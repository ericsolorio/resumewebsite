//Lunar Lander
import { LaunchPad } from "./launchPad.js";
import { isLPActiveLL } from "../../main/main.js";

let launchPad = null

let counter = 0;

let lastTime = 0;


function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp


    if(isLPActiveLL){
        if(counter == 0){
            launchPad = new LaunchPad()
            counter++;
        }
        launchPad.update(deltaTime)
    }
    else{
        if(counter == 1){
            launchPad = null
            counter = 0
        }
    }

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)