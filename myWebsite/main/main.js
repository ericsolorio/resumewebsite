//Mr. Polywhirl @ S.O.: "Append multiple items in JavaScript"
    //can use append() with spread operator -> bar.append(...[])

tactable = null
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
            boxClick(box)
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
            boxClick(box)
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
            boxClick(box)
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
const gameExitBox = document.querySelector(".gameExitBox")
const exitButton = document.querySelector("#exitButton")

// const tacBoxes = document.querySelectorAll(".")


gameBoxes.forEach(box => {
    box.addEventListener('click', ()=> {
        overlay.classList.add("active")

        if(box.id == "game1"){
            makeTac()
            gameExitBox.appendChild(tactable)
            tactable.classList.add("active")
        }
        if(box.id == "game2"){
            
        }

        gameExitBox.classList.add("active")
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
        tactable.classList.remove("active")
        gameExitBox.removeChild(tactable)
        tactable = null
    }
    
}
