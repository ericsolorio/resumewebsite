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

    // tactable.appendChild(tr0)
    // tactable.appendChild(tr1)
    // tactable.appendChild(tr2)

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

        makeTac()
        gameExitBox.appendChild(tactable)

        tactable.classList.add("active")
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
    tactable.classList.remove("active")
    gameExitBox.classList.remove("active")
    gameExitBox.removeChild(tactable)
}
























////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// //letter and enemyletter get changed throughout the game
// let letter = 'X';

// let grid = [["#","#","#"], ["#","#","#"], ["#","#","#"]];
// let winner = false;

// let won = false;
// let lost = false;

// let tie = false;
// // ai starts off with random row and column
// let aiNext = [];
// aiNext.push([Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]);
// //this map used for html reference
// let map = {"00": "box0", "01": "box1" , "02": "box2", "10":"box3", "11":"box4", "12": "box5", "20": "box6", "21":"box7", "22":"box8"};
// let map2 = {"box0": "00", "box1": "01" , "box2": "02", "box3":"10", "box4":"11", "box5": "12", "box6": "20", "box7":"21", "box8":"22"};
// //keep tack of available spots
// let avaiGrid = new Set();
// for(let i = 0; i < grid.length; i++)
// {
//     for(let j = 0; j < grid[i].length; j++)
//     {
//         avaiGrid.add(i.toString() + j.toString());
//     }
// }

// function retryButton()
// {
//     let img2 = document.createElement("img");
//     img2.id = "retry";
//     img2.src = "images/retry.png";
//     img2.onclick = function() {wipeGame();};
//     document.querySelector(".tactable").appendChild(img2);
// }

// function whoWon()
// {
//     let img = document.createElement("img");
//     if(letter == "X")
//     {
//         img.id = "won";
//         img.src = "images/won.png";
//         won = true;
//         winner = true;
//     }
//     else{
//         img.id = "lost";
//         img.src = "images/lost.png";
//         lost = true;
//     }
//     document.querySelector(".tactable").appendChild(img);

//     retryButton();
// }

// function putLine(idName)
// {
//     let img = document.createElement("img");
//     img.className = "line";
//     img.src = "images/line.png";
//     img.id = idName;
//     document.querySelector(".tactable").appendChild(img);
// }

// function horizontalCheck()
// {
//     //rowEnemies keeps track if there is atleast ONE enemy in the current row
//     for(let i = 0; i < grid.length; i++)
//     {
//         let count = 0;
//         //missing is used to detect AI next move//to find a gap
//         let missing = NaN;
//         for (let j = 0; j < grid[i].length; j++)
//         {
//             if (grid[i][j] == letter)
//             {
//                 count++;
//             }
//             else if(grid[i][j] == "#")
//             {
//                 missing = j;
//             }

//             //put strike image on screen if strike
//             // i will either be 0,1,2. Depending on row.
//             if(count == 3)
//             {
//                 let idName = "strikeH" + i.toString();
//                 putLine(idName);
//                 whoWon();
//                 return true;
//             }
//             //for ai next move is based on user move
//             if (count == 2 && j == grid[i].length-1 && letter == "X" && missing>=0)
//             {
//                 console.log("adding from H", i , missing);
//                 aiNext.push([i,missing]);
//             }
//         }
//     }
//     return false
// }

// function verticalCheck()
// {
//     //columnEnemy keeps track if there is atleast ONE enemy in the current column
//     //very similar to horizontalCheck, check comments over there for help
    
//     for(let i = 0; i < grid.length; i++)
//     {
//         let count = 0;
//         let missing = NaN;
//         for(let j = 0; j < grid[i].length; j++)
//         {
//             if(grid[j][i]==letter)
//             {
//                 count++;
//             }
//             else if(grid[j][i] == "#")
//             {
//                 missing = j;

//             }
            

//             if(count == 3)
//             {
//                 let idName = "strikeV" + i.toString();
//                 putLine(idName);
//                 whoWon();
//                 return true;
//             }
//             if(count == 2 && j == grid[i].length-1 && letter == "X" && missing>=0)
//             {
//                 console.log("adding from V", missing, i);
//                 aiNext.push([missing,i]);
//             }
//         }
//     }
//     return false
// }

// function diagnolLCheck()
// {
//     //same concept as horizontal check just one less for loop
//     //check comments in horizontal check for help
//     //to check diagnol from upper left, row and column are the same number
//     let count = 0;
//     let missing = NaN;
//     let enemyFound = false;
//     for(let i = 0; i < grid.length; i++)
//     {
//         if (grid[i][i] == letter)
//         {
//             count++;
//         }
//         else if(grid[i][i] == "#")
//         {
//             missing = i;
//         }


//         if (count == 3)
//         {
//             let idName = "strikeDL";
//             putLine(idName);
//             whoWon();
//             return true;
//         }
//         if(count == 2 && letter == "X" && missing>=0)
//         {
//             console.log("adding from DL", missing,missing);
//             aiNext.push([missing,missing]);
//         }
//     }
//     return false
// }

// function diagnolRCheck()
// {
//     //diagnol starting from upper right. a bit different
//     //as the number for row increases the column decreases
//     //similar concept as other checks though
//     let count = 0;
//     let k = grid.length-1;
//     let missingRow = NaN;
//     let missingCol = NaN;
//     for(let i = 0; i < grid.length; i++)
//     {
//         if (grid[i][k] == letter)
//         {
//             count++;
//         }
//         else if(grid[i][k] == "#")
//         {
//             missingRow = i;
//             missingCol = k;
//         }


//         if(count == 3)
//         {
//             let idName = "strikeDR";
//             putLine(idName);
//             whoWon();
//             return true;
//         }
//         if(count == 2 && letter == "X" && missingRow >= 0 && missingCol >= 0)
//         {
//             console.log("adding from DR",missingRow,missingCol);
//             aiNext.push([missingRow,missingCol]);
//         }
//         k--;
//     }
//     return false
// }

// //adding onclick to new html
//     //S.0.: Add onclick event to newly added element in JavaScript
// //deleting html elements
//     // W3 schools: HTML DOM Element remove()
//     // S.O.: How to remove all elements of a certain class from the DOM?
//         // thanks to Paul for the idea to index at [0]
// function wipeGame()
// {
//     let xHtmlList = document.getElementsByClassName("x");
//     let oHtmlList = document.getElementsByClassName("circle");

//     while(xHtmlList.length > 0)
//     {
//         xHtmlList[0].remove();
//     }
//     while(oHtmlList.length > 0)
//     {
//         oHtmlList[0].remove();
//     }

//     /////////////////////////////////

//     grid = [["#","#", "#"],["#","#","#"],["#","#","#"]];

//     for(let i = 0; i < grid.length; i++)
//     {
//         for(let j = 0; j < grid[i].length; j++)
//         {
//             avaiGrid.add(i.toString() + j.toString());
//         }
//     }

//     /////////////////////////////////////////////////////
//     if(won)
//     {
//         document.getElementById("won").remove();
//         document.getElementsByClassName("line")[0].remove();
//         winner = false;
//         won = false;
//     }
//     else if(lost)
//     {
//         document.getElementById("lost").remove();
//         document.getElementsByClassName("line")[0].remove();
//         lost = false;
//     }
//     else if(tie)
//     {
//         document.getElementById("tie").remove();
//         tie = false;
//     }

//     document.getElementById("retry").remove();
// }

// function tieCheck()
// {
//     if(avaiGrid.size <= 0)
//     {
//         tie = true;
//         let img = document.createElement("img");
//         img.id = "tie";
//         img.src = "images/tie.png";
//         document.querySelector(".tactable").appendChild(img);
//         retryButton();
        
//     }
// }

// function check()
// {
//     let h = horizontalCheck();
//     let v = verticalCheck();
//     let dL = diagnolLCheck();
//     let dR = diagnolRCheck();

//     /////////////////////////////////////////////////////////
//     //  SO BOTH NEED TO GET TIED CHECK B4 DECLARING A TIE  //
//     /////////////////////////////////////////////////////////

//     if(h || v || dL || dR)
//     {
//         return true;
//     }
// }

// function taken(row,column)
// {
//     if (grid[row][column] != "#")
//     {
//         return true;
//     }
//     return false;
// }


// function someAI()
// {
//     letter = 'O';
//     if (avaiGrid.size > 0)
//     {
//         while(aiNext.length > 0)
//         {
//             let ran = Math.floor(Math.random() * aiNext.length);
//             if(!taken(aiNext[ran][0],aiNext[ran][1]))
//             {
//                 let row = aiNext[ran][0];
//                 let column = aiNext[ran][1];
//                 let strRC = row.toString() + column.toString();
        
//                 let img = document.createElement("img");
//                 img.className = "circle";
//                 img.src = "images/circle.png";
//                 document.getElementById(map[strRC]).appendChild(img);
        
//                 grid[row][column] = "O";
//                 avaiGrid.delete(strRC);
//                 aiNext = [];
//                 return;
//             }
//             else
//             {
//                 aiNext.splice(ran,1)
//             }
//         }

//         ///////////////////////////////////////////////////////
//         //  aiNext indexes are taken or doesn't have data   //
//         ///////////////////////////////////////////////////////

//         let temp = [...avaiGrid.keys()];
//         let tempIndex = Math.floor(Math.random() * temp.length)
//         let row = temp[tempIndex][0];
//         let column = temp[tempIndex][1];

//         let img = document.createElement("img");
//         img.className = "circle";
//         img.src = "images/circle.png";
//         document.getElementById(map[row+column]).appendChild(img);

//         grid[row][column] = "O";

//         avaiGrid.delete(row+column);
//         return;
//     }
// }

// function boxClick(box)
// {
//     boxID = box.id
//     boxID = boxID.toString()
//     console.log(boxID.toString())
//     let row = map2[boxID][0]
//     let column = map2[boxID][1]
//     if(!winner && !tie && !lost &&!taken(row,column))
//     {
//         letter = 'X';

//         let img = document.createElement("img");
//         img.className = "x";
//         img.src = "images/x.png";
//         document.getElementById(box.id).appendChild(img);

//         grid[row][column] = "X";
//         avaiGrid.delete(row.toString()+column.toString());

//         if(check())
//         {
//             return;
//         }

//         tieCheck();

//         someAI();
        
//         if(check())
//         {
//             return;
//         }
//     }
// }