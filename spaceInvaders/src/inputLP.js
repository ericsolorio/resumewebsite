export function InputLP(lanuchPad){
    document.addEventListener("keydown", function() {

        // detects keyboard to move away from main menu,
        // game over, or victory screen
        // pause variable is used so you need to release the button
        // to go to the next screen, avoids really fast transitions

        if(!lanuchPad.pause){
            if(lanuchPad.victoryScreen){
                lanuchPad.victoryScreen = false
            }
            else if(lanuchPad.gameOverScreen){
                lanuchPad.gameOverScreen = false
            }
            else{
                lanuchPad.startGame = true
            }
            lanuchPad.pause = true
        }
    })
    
    document.addEventListener("keyup", function() {
        lanuchPad.pause = false
    })
}