// Lunar Lander
export function inputSC(sc){
    document.addEventListener("keydown", e =>{
        if(e.key == "w"){
            sc.yVelocity += 0.01
        }
    })
}