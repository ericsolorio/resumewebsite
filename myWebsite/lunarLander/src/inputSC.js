// Lunar Lander
export function inputSC(sc){
    document.addEventListener("keydown", e =>{
        if(e.key == "w"){
            
            if(sc.yVelocity > -10){
                sc.xVelocity += .6 * Math.sin(sc.angle * (Math.PI/180))
                sc.yVelocity -= .6 * Math.cos(sc.angle * (Math.PI/180))
            }
        }
        if(e.key == "a" && sc.angle > -90){
            sc.angle -= 3
        }
        if(e.key == "d" && sc.angle < 90){
            sc.angle += 3
        }
    })
}