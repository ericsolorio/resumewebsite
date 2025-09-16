//Google AI says canvas needs to be loaded first
    // before javascript code
    // so the current code can work

export let isLPActive = false;
export let isLPActiveLL = false;
import * as tac from "../tictactoe/tictactoe.js";


///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//imgslideshow

let leftButtonFAITH = document.querySelector(".Topic.Left#FAITH .leftButton")
let rightButtonFAITH = document.querySelector(".Topic.Left#FAITH .rightButton")
let faithImgs = document.querySelectorAll(".faithImgs")
let j = 0

leftButtonFAITH.addEventListener("click", ()=>{
    j += 1
    if(j <= 0){
        let calcNum = j * 100
        faithImgs.forEach(img=>{
            img.animate([
                    {transform: `translateX(${calcNum}%)`}
                ],
                {
                    duration: 1000,
                    fill: 'forwards'
                }
            )
        })
    }
    else{
        j--
    }
})

rightButtonFAITH.addEventListener("click", ()=>{
    j -= 1
    if(j >= -1){
        let calcNum = j * 100
        faithImgs.forEach(img=>{
            img.animate([
                    {transform: `translateX(${calcNum}%)`}
                ],
                {
                    duration: 1000,
                    fill: 'forwards'
                }
            )
        })
    }
    else{
        j++
    }
})


//thanks to Google Gemini for specific query selector
let leftButton = document.querySelector(".Topic.Left#CFA .leftButton")
let rightButton = document.querySelector(".Topic.Left#CFA .rightButton")
let cfaImgs = document.querySelectorAll(".cfaImgs")
let i = 0


leftButton.addEventListener("click", ()=>{
    i += 1
    if(i <= 0){
        let calcNum = i * 100
        cfaImgs.forEach(img=>{
            img.animate([
                    {transform: `translateX(${calcNum}%)`}
                ],
                {
                    duration: 1000,
                    fill: 'forwards'
                }
            )
        })
    }
    else{
        i--
    }
})

rightButton.addEventListener("click", ()=>{
    i -= 1
    if(i >= -15){
        let calcNum = i * 100
        cfaImgs.forEach(img=>{
            img.animate([
                    {transform: `translateX(${calcNum}%)`}
                ],
                {
                    duration: 1000,
                    fill: 'forwards'
                }
            )
        })
    }
    else{
        i++
    }
})


//img slideshow
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


///////////////////////////////////////////
//animations start

//understood IntersectObserver by 
// Steve Griffith - Prof3ssorSt3v3
// https://www.youtube.com/watch?v=gQ8WggeHoJU


let observer = new IntersectionObserver(divAnimation, {rootMargin: "-25% 200%"})

let divTopics = document.querySelectorAll(".Topic")
divTopics.forEach(Topic=>{
    observer.observe(Topic)
})

// observer.observe(document.querySelector(".GameArea"))

document.querySelectorAll(".Game").forEach(Box =>{
    observer.observe(Box)
})

function divAnimation(entries, ob){
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("Inter")
            ob.unobserve(entry.target)
        }
        // else{
        //     // entry.target.classList.remove("Inter")
        // }
    })
}




// animation end
//////////////////////////////////////////




const gameExitBox = document.querySelector(".gameExitBox")
let img0 = null
let img1 = null
let img2 = null
let img3 = null

function makeLL(){
    let canvas = document.createElement("canvas")
    canvas.id = "llGameScreen"
    canvas.width = "650"
    canvas.height = "650"

    let llScript = document.createElement("script")
    llScript.id = "llScript"
    llScript.type = "module"
    llScript.src = "lunarLander/src/index.js"

    img0 = document.createElement("img")
    img0.id = "img_SC"
    img0.src = "lunarLander/images/newSpaceship.png"
    img0.classList.add("llImg")

    img1 = document.createElement("img")
    img1.id = "img_flame"
    img1.src = "lunarLander/images/scFlame.png"
    img1.classList.add("llImg")

    img2 = document.createElement("img")
    img2.id = "img_line"
    img2.src = "lunarLander/images/line.png"
    img2.classList.add("llImg")

    img3 = document.createElement("img")
    img3.id = "img_mousePointer"
    img3.src = "lunarLander/images/mousePointer.png"
    img3.classList.add("llImg")

    document.body.append(img0)
    document.body.append(img1)
    document.body.append(img2)
    document.body.append(img3)

    document.head.append(llScript)
    gameExitBox.append(canvas)
}

// clicking spacebar
function turnOffSpace(e){
    console.log("hi")
    if(e.key == " "){
        e.preventDefault()
    }
}

function makeSI(){
    let canvas = document.createElement("canvas")
    canvas.id = "siGameScreen"
    canvas.width = "650"
    canvas.height = "650"

    let siScript = document.createElement("script")
    siScript.id = "siScript"
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
    
    document.addEventListener("keydown", turnOffSpace)
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

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


const gameBoxes = document.querySelectorAll(".Game")
const overlay = document.querySelector(".Overlay");
const exitButton = document.querySelector("#exitButton")

// const tacBoxes = document.querySelectorAll(".")


gameBoxes.forEach(box => {
    box.addEventListener('click', ()=> {
        overlay.classList.add("active")
        gameExitBox.classList.add("active")

        if(box.className == "Game one Inter"){
            makeTac()
            gameExitBox.appendChild(tactable)
            tactable.classList.add("active")
        }
        if(box.className == "Game two Inter"){
            makeSI()
            isLPActive = true
            gameExitBox.classList.add("si")
        }
        if(box.className == "Game three Inter"){
            makeLL()
            isLPActiveLL = true
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
    if(document.querySelector("#siGameScreen")){
        let noway = document.querySelector("#siGameScreen")
        gameExitBox.removeChild(noway)
        let nowaypt2 = document.querySelector("#siScript")
        document.head.removeChild(nowaypt2)
        
        isLPActive = false

        document.body.removeChild(img0)
        document.body.removeChild(img1)
        document.body.removeChild(img2)
        document.body.removeChild(img3)

        document.removeEventListener("keydown", turnOffSpace)
    }

    if(document.querySelector("#llGameScreen")){
        let noway = document.querySelector("#llGameScreen")
        gameExitBox.removeChild(noway)
        let nowaypt2 = document.querySelector("#llScript")
        document.head.removeChild(nowaypt2)

        isLPActiveLL = false

        document.body.removeChild(img0)
        document.body.removeChild(img1)
        document.body.removeChild(img2)
        document.body.removeChild(img3)

    }
    
}
