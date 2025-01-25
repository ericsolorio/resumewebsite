import LaunchPad from "./launchPad.js"

// this is the MAIN FILE
// THE MAIN LOOP

// NOTE:
// I LEARNED CANVAS WITH:
    // https://www.youtube.com/watch?v=3EMxBkqC4z0
// FREECODECAMP VIDEO
// THIS BEING THE FIRST GAME I MADE WITH CANVAS
// THERE MIGHT BE SIMILARTIES WITH MY GAME WITH THE ONE
// IN THE VIDEO. 
// MY GAME IS DEFINITLY INSPIRED/INFLUENCED
// BY THE TUTURIOL VIDEO

let launchPad = new LaunchPad()

let lastTime = 0;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp

    // LaunchPad is where the swithces scenerios,
        // menu, game, victory, gameover
    launchPad.update(deltaTime)

    requestAnimationFrame(gameLoop)
}


requestAnimationFrame(gameLoop)