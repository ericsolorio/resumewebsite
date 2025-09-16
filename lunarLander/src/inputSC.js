// Lunar Lander


//this concept of storing the active keys in a dictionary/object list
// came from Google AI

export function inputSC(sc, GAME){
    document.addEventListener("keydown", e =>{
        if(GAME.status != "gameover"){
            if(e.key == "w"){
                sc.keysPressed["w"] = true
            }
            if(e.key == "a" && sc.angle > -90){
                sc.keysPressed["a"] = true
            }
            if(e.key == "d" && sc.angle < 90){
                sc.keysPressed["d"] = true
            }
        }
    })

    document.addEventListener("keyup", e =>{
        if(e.key == "w" && GAME.status != "gameover"){
            sc.keysPressed["w"] = false
        }
        if(e.key == "a" && GAME.status != "gameover"){
            sc.keysPressed["a"] = false
        }
        if(e.key == "d" && GAME.status != "gameover"){
            sc.keysPressed["d"] = false
        }

    })
}