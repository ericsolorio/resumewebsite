// Lunar Lander
export function inputSC(sc){
    document.addEventListener("keydown", e =>{
        if(e.key == "w"){
            if(sc.yVelocity > -20){
                sc.yVelocity -= 4
            }
        }
        if(e.key == "a"){
            sc.left = true
        }
        if(e.key == "d"){
            sc.right = true
        }
    })
}