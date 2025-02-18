// Lunar Lander
export function inputSC(sc){
    document.addEventListener("keydown", e =>{
        if(e.key == "w"){
            if(sc.yVelocity > -20){
                sc.yVelocity -= 4
            }
        }
        if(e.key == "a"){
            sc.angle -= 1
        }
        if(e.key == "d"){
            sc.angle += 1
        }
    })
}