//Google AI says canvas needs to be loaded first
    // before javascript code
    // so the current code can work

export let isLPActive = false;
import * as tac from "../tictactoe/tictactoe.js";
console.log(tac)

const gameExitBox = document.querySelector(".gameExitBox")
let img0 = null
let img1 = null
let img2 = null
let img3 = null


function makeSI(){
    let canvas = document.createElement("canvas")
    canvas.id = "gameScreen"
    canvas.width = "650"
    canvas.height = "650"

    let siScript = document.createElement("script")
    siScript.id = "siSCript"
    siScript.type = "module"
    siScript.src = "spaceInvaders/src/index.js"

    img0 = document.createElement("img")
    img1 = document.createElement("img")
    img2 = document.createElement("img")
    img3 = document.createElement("img")

    img0.id = "img_player"
    img0.src = "spaceInvaders/images/player.png"
    img0.classList.add("siImg")
    img1.id = "img_playerBullet"
    img1.src = "spaceInvaders/images/playerBullet.png"
    img1.classList.add("siImg")
    img2.id = "img_enemy"
    img2.src = "spaceInvaders/images/enemy.png"
    img2.classList.add("siImg")
    img3.id = "img_enemyBullet"
    img3.src = "spaceInvaders/images/enemyBullet.png"
    img3.classList.add("siImg")

    document.head.append(siScript)
    document.body.append(img0,img1,img2,img3)
    gameExitBox.append(canvas)
    
}




//Mr. Polywhirl @ S.O.: "Append multiple items in JavaScript"
    //can use append() with spread operator -> bar.append(...[])

let tactable = null
function makeTac(){
    tactable = document.createElement("table")
    tactable.classList.add("tactable")

    let tr0 = document.createElement("tr")
    let box0 = document.createElement("td")
    box0.id = "box0"
    let box1 = document.createElement("td")
    box1.id = "box1"
    let box2 = document.createElement("td")
    box2.id = "box2"
    tr0.append(box0,box1,box2)
    tr0.childNodes.forEach(box => {
        box.addEventListener("click", ()=>{
            tac.boxClick(box)
        })
    })
    
    let tr1 = document.createElement("tr")
    let box3 = document.createElement("td")
    box3.id = "box3"
    let box4 = document.createElement("td")
    box4.id = "box4"
    let box5 = document.createElement("td")
    box5.id = "box5"
    tr1.append(box3,box4,box5)
    tr1.childNodes.forEach(box => {
        box.addEventListener("click", ()=>{
            tac.boxClick(box)
        })
    })

    let tr2 = document.createElement("tr")
    let box6 = document.createElement("td")
    box6.id = "box6"
    let box7 = document.createElement("td")
    box7.id = "box7"
    let box8 = document.createElement("td")
    box8.id = "box8"
    tr2.append(box6,box7,box8)
    tr2.childNodes.forEach(box =>{
        box.addEventListener("click",()=>{
            tac.boxClick(box)
        })
    })

    let tbody = document.createElement("tbody")
    tbody.appendChild(tr0)
    tbody.appendChild(tr1)
    tbody.appendChild(tr2)

    tactable.appendChild(tbody)

}


const gameBoxes = document.querySelectorAll(".GamesTableBox")
const overlay = document.querySelector(".Overlay");
const exitButton = document.querySelector("#exitButton")

// const tacBoxes = document.querySelectorAll(".")


gameBoxes.forEach(box => {
    box.addEventListener('click', ()=> {
        overlay.classList.add("active")
        gameExitBox.classList.add("active")

        if(box.id == "game1"){
            makeTac()
            gameExitBox.appendChild(tactable)
            tactable.classList.add("active")
        }
        if(box.id == "game2"){
            makeSI()
            isLPActive = true
            gameExitBox.classList.add("si")
        }

    })
});



// thanks to Coding2GO for the closeGame syntax
    // you don't need () = > or e =>
    // "Learning JavaScript EventListeners in 4 Minutes" by Coding2GO from Youtube
overlay.addEventListener("click", closeGame)

exitButton.addEventListener("click", closeGame)

function closeGame(){
    overlay.classList.remove("active")
    gameExitBox.classList.remove("active")
    if(tactable != null){
        tac.wipeGame()
        tactable.classList.remove("active")
        gameExitBox.removeChild(tactable)
        tactable = null
        
    }

    // influenced & inspired from https://stackoverflow.com/questions/73354312/how-can-i-detect-if-a-parent-element-has-a-specific-child-element-with-javascrip 
    // from Stack Overflow
    // Forum: how can i detect if a parent element has a specific child element with javascript?
    // Shai said that I can use getElementById
    // I used querySelector
    if(document.querySelector("canvas")){
        let noway = document.querySelector("canvas")
        gameExitBox.removeChild(noway)
        let nowaypt2 = document.querySelector("#siScript")
        document.head.removeChild(nowaypt2)
        
        isLPActive = false

        document.body.removeChild(img0)
        document.body.removeChild(img1)
        document.body.removeChild(img2)
        document.body.removeChild(img3)
    }
    
}
