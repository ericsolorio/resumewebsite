// Lunar Lander
export let wIsPressed = false
export function inputSC(sc, GAME){
    document.addEventListener("keydown", e =>{
        if(GAME.status != "gameover"){
            if(e.key == "w"){
                
                if(sc.yVelocity > -10){
                    sc.xVelocity += .6 * Math.sin(sc.angle * (Math.PI/180))
                    sc.yVelocity -= .6 * Math.cos(sc.angle * (Math.PI/180))
                }

                wIsPressed = true

            }
            if(e.key == "a" && sc.angle > -90){
                sc.angle -= 3
            }
            if(e.key == "d" && sc.angle < 90){
                sc.angle += 3
            }
        }
    })

    document.addEventListener("keyup", e =>{
        if(e.key == "w" && GAME.status != "gameover"){
            wIsPressed = false
        }
    })
}