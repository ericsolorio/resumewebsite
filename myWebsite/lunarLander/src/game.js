// Lunar Lander
import { Flame } from "./flame.js"
import { SpaceCraft } from "./spaceCraft.js"
import { inputSC } from "./inputSC.js"
import { wIsPressed } from "./inputSC.js"
import { Line } from "./line.js"
import { mousePointer } from "./mousePointerTesting.js"
import { makeMap } from "./makeMap.js"


function getAngledCoords(xc, yc, xi, yi, angleOfLine){
    angleOfLine = angleOfLine * (Math.PI/180)
    let lenX = xi - xc
    let lenY = yi - yc
    let hyp = Math.sqrt( (lenX * lenX) + (lenY * lenY) )
    let angleToPoint = Math.atan2(lenY,lenX)


    let xRotated = xc + hyp * Math.cos(angleToPoint + angleOfLine)
    let yRotated = yc + hyp * Math.sin(angleToPoint + angleOfLine)

    return {
        x : xRotated,
        y : yRotated
    }
}


// function basicCollision(sc, lineStorage, tempLineStorage){
//     // left and right
//     // send over if left or right
//     if(
//         (
//             sc.x + sc.width > lineStorage[tempLineStorage["left"]].x - lineStorage[tempLineStorage["left"]].width
//             && sc.x + sc.width < lineStorage[tempLineStorage["left"]].x + lineStorage[tempLineStorage["left"]].width
//             ||
//             sc.x - sc.width < lineStorage[tempLineStorage["left"]].x + lineStorage[tempLineStorage["left"]].width
//             && sc.x - sc.width > lineStorage[tempLineStorage["left"]].x - lineStorage[tempLineStorage["left"]].width
//         )
        
//         &&
        
//         (
//             sc.y - sc.height < lineStorage[tempLineStorage["left"]].y + lineStorage[tempLineStorage["left"]].height
//             && sc.y - sc.height > lineStorage[tempLineStorage["left"]].y - lineStorage[tempLineStorage["left"]].height
//             ||
//             sc.y + sc.height > lineStorage[tempLineStorage["left"]].y - lineStorage[tempLineStorage["left"]].height
//             && sc.y + sc.height < lineStorage[tempLineStorage["left"]].y + lineStorage[tempLineStorage["left"]].height

//         )
//     )
//     {

//     }

// }


function checkCollisionSAT(sc, lineStorage, tempLineStorage, scAndLeftPerp, scAndRightPerp, specificLine){
    //compare sc with left and right line
    //check dot product


    let specificPerpList = null
    if(specificLine == "left"){
        specificPerpList = scAndLeftPerp
    }
    else{
        specificPerpList = scAndRightPerp
    }


    for(let i = 0; i < specificPerpList.length; i++){

        let minA = null
        let maxA = null
        Object.keys(sc.myVertices).forEach(vertici =>{
            let dp = (specificPerpList[i].x * sc.myVertices[vertici].x) +
                    (specificPerpList[i].y * sc.myVertices[vertici].y)
            if(dp < minA){
                minA = dp
            }
            else if(dp > maxA){
                maxA = dp
            }
            else{
                minA = dp
                maxA = dp
            }
        })



        let minB = null
        let maxB = null

        Object.keys(lineStorage[tempLineStorage[specificLine]].myVertices).forEach(vertici =>{


            let dp = (specificPerpList[i].x * lineStorage[tempLineStorage[specificLine]].myVertices[vertici].x) +
                    (specificPerpList[i].y * lineStorage[tempLineStorage[specificLine]].myVertices[vertici].y)

            if(dp < minB){
                minB = dp
            }
            else if(dp > maxB){
                maxB = dp
            }
            else{
                minB = dp
                maxB = dp
            }
        })


        //check if gap
        // if true leave function
        // if never true that means there colliding in that specific axis
        if(maxA <= minB || maxB <= minA){
            return
        }
        
    }


    // check basic collision
    //basicCollision()

    // if for loops ends without any interuptions than colliding
    console.log("colliding!")
}





function findMax(myVertices){
    let max = null

    Object.keys(myVertices).forEach(vertici =>{
        if(myVertices[vertici].x > max){
            max = myVertices[vertici].x
        }
        else if(max == null){
            max = myVertices[vertici].x
        }
        

        //this leaves anynomouse function
        return
    })
    return max
}

function findMin(myVertices){
    let min = null

    Object.keys(myVertices).forEach(vertici =>{
        if(myVertices[vertici].x < min){
            min = myVertices[vertici].x
        }
        else if(min == null){
            min = myVertices[vertici].x
        }
        
        // this exits anynomous function
        return
        
    })
    return min
}


let scAndLeftPerp = []
let scAndRightPerp = []

export class Game{
    constructor(launchPad){

        this.launchPad = launchPad

        this.GAMEHEIGHT = 650
        this.GAMEWIDTH = 650


        //lineStorage created here
        makeMap(this)



        //this good doubled checked
        //let i = 0
        Object.values(this.lineStorage).forEach(line => {
            line.myVertices["tr"] = 
                getAngledCoords(line.x, line.y, line.x + line.width/2, line.y - line.height/2, line.angle)
            line.myVertices["br"] = 
                getAngledCoords(line.x, line.y, line.x + line.width/2, line.y + line.height/2, line.angle)
            line.myVertices["bl"] = 
                getAngledCoords(line.x, line.y, line.x - line.width/2, line.y + line.height/2, line.angle)
            line.myVertices["tl"] = 
                getAngledCoords(line.x, line.y, line.x - line.width/2, line.y - line.height/2, line.angle)

            // console.log("line " + i + "\n"+
            //             "tr " + "x: " + line.myVertices["tr"].x + " y: " + line.myVertices["tr"].y + "\n"+
            //             "br " + "x: " + line.myVertices["br"].x + " y: " + line.myVertices["br"].y + "\n"+
            //             "bl " + "x: " + line.myVertices["bl"].x + " y: " + line.myVertices["bl"].y + "\n"+
            //             "tl " + "x: " + line.myVertices["tl"].x + " y: " + line.myVertices["tl"].y + "\n")
            // i++
        })


        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////


        let i = 0
        // this was doubled checked
        // now that we have vertices get edges 
        Object.values(this.lineStorage).forEach(line => {
            line.myEdges["right"] = {
                x: line.myVertices["br"].x - line.myVertices["tr"].x,
                y: line.myVertices["br"].y - line.myVertices["tr"].y
            }
            line.myEdges["bottom"] = {
                x: line.myVertices["bl"].x - line.myVertices["br"].x,
                y: line.myVertices["bl"].y - line.myVertices["br"].y
            }
            line.myEdges["left"] = {
                x: line.myVertices["tl"].x - line.myVertices["bl"].x,
                y: line.myVertices["tl"].y - line.myVertices["bl"].y
            }
            line.myEdges["top"] = {
                x: line.myVertices["tr"].x - line.myVertices["tl"].x,
                y: line.myVertices["tr"].y - line.myVertices["tl"].y
            }

            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////

            // okay now inverse to find perpendicular lines
            // flip x and y, and times x by -1

            //this was doubled checked
            line.myPerpVectors["right"] = {
                x: (-1) * line.myEdges["right"].y,
                y: line.myEdges["right"].x
            }
            line.myPerpVectors["bottom"] = {
                x: (-1) * line.myEdges["bottom"].y,
                y: line.myEdges["bottom"].x
            }
            line.myPerpVectors["left"] = {
                x: (-1) * line.myEdges["left"].y,
                y: line.myEdges["left"].x
            }
            line.myPerpVectors["top"] = {
                x: (-1) * line.myEdges["top"].y,
                y: line.myEdges["top"].x
            }




            // console.log("Edges: " + 
            //             "line " + i + "\n"+
            //             "right " + "x: " + line.myEdges["right"].x + " y: " + line.myEdges["right"].y + "\n"+
            //             "bottom " + "x: " + line.myEdges["bottom"].x + " y: " + line.myEdges["bottom"].y + "\n"+
            //             "left " + "x: " + line.myEdges["left"].x + " y: " + line.myEdges["left"].y + "\n"+
            //             "top " + "x: " + line.myEdges["top"].x + " y: " + line.myEdges["top"].y + "\n")

            // console.log("Perp Vectors: " + 
            //             "line " + i + "\n" +
            //             "right " + "x: " + line.myPerpVectors["right"].x + " y: " + line.myPerpVectors["right"].y + "\n"+
            //             "bottom " + "x: " + line.myPerpVectors["bottom"].x + " y: " + line.myPerpVectors["bottom"].y + "\n"+
            //             "left " + "x: " + line.myPerpVectors["left"].x + " y: " + line.myPerpVectors["left"].y + "\n"+
            //             "top " + "x: " + line.myPerpVectors["top"].x + " y: " + line.myPerpVectors["top"].y + "\n")


            // i++


        })

        
        /////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        this.tempLineStorage  = {
            "left": 4, 
            "right": 5
        }
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        this.sc = new SpaceCraft(this)
        this.flame = new Flame(this.sc)
        new inputSC(this.sc)



        this.mp = new mousePointer(launchPad)
    }



    


    update(launchPad){
        launchPad.ctx.clearRect(0,0,this.GAMEWIDTH,this.GAMEHEIGHT)
        launchPad.ctx.fillStyle = "black"
        launchPad.ctx.fillRect(0,0, this.GAMEHEIGHT,this.GAMEHEIGHT)

        if(this.flame.size < 1 && wIsPressed){
            this.flame.size += 0.01
        }
        if (this.flame.size > 0.2 && !wIsPressed){
            this.flame.size -= 0.01
        }

        this.sc.update(launchPad, this)
        this.flame.update(launchPad, this)

        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////


        // find the vertices, edges, and perpendicular vectors of the spaceship
        // this was doubled checked
        this.sc.myVertices["tr"] = 
            getAngledCoords(this.sc.x, this.sc.y, this.sc.x + this.sc.width/2, this.sc.y - this.sc.height/2, this.sc.angle)
        this.sc.myVertices["br"] = 
            getAngledCoords(this.sc.x, this.sc.y, this.sc.x + this.sc.width/2, this.sc.y + this.sc.height/2, this.sc.angle)
        this.sc.myVertices["bl"] = 
            getAngledCoords(this.sc.x, this.sc.y, this.sc.x - this.sc.width/2, this.sc.y + this.sc.height/2, this.sc.angle)
        this.sc.myVertices["tl"] = 
            getAngledCoords(this.sc.x, this.sc.y, this.sc.x - this.sc.width/2, this.sc.y - this.sc.height/2, this.sc.angle)


        // console.log(
        //     "sc tr " + "x: " + this.sc.myVertices["tr"].x + " y: " + this.sc.myVertices["tr"].y + "\n"+
        //     "sc br " + "x: " + this.sc.myVertices["br"].x + " y: " + this.sc.myVertices["br"].y + "\n"+
        //     "sc bl " + "x: " + this.sc.myVertices["bl"].x + " y: " + this.sc.myVertices["bl"].y + "\n"+
        //     "sc tl " + "x: " + this.sc.myVertices["tl"].x + " y: " + this.sc.myVertices["tl"].y + "\n")


        // this was doubled checked
        this.sc.myEdges["right"] = {
            x: this.sc.myVertices["br"].x - this.sc.myVertices["tr"].x,
            y: this.sc.myVertices["br"].y - this.sc.myVertices["tr"].y
        }
        this.sc.myEdges["bottom"] = {
            x: this.sc.myVertices["bl"].x - this.sc.myVertices["br"].x,
            y: this.sc.myVertices["bl"].y - this.sc.myVertices["br"].y
        }
        this.sc.myEdges["left"] = {
            x: this.sc.myVertices["tl"].x - this.sc.myVertices["bl"].x,
            y: this.sc.myVertices["tl"].y - this.sc.myVertices["bl"].y
        }
        this.sc.myEdges["top"] = {
            x: this.sc.myVertices["tr"].x - this.sc.myVertices["tl"].x,
            y: this.sc.myVertices["tr"].y - this.sc.myVertices["tl"].y
        }


        // console.log("Edges: \n" + 
        //     "EDGES right " + "x: " + this.sc.myEdges["right"].x + " y: " + this.sc.myEdges["right"].y + "\n"+
        //     "EDGES bottom " + "x: " + this.sc.myEdges["bottom"].x + " y: " + this.sc.myEdges["bottom"].y + "\n"+
        //     "EDGES left " + "x: " + this.sc.myEdges["left"].x + " y: " + this.sc.myEdges["left"].y + "\n"+
        //     "EDGES top " + "x: " + this.sc.myEdges["top"].x + " y: " + this.sc.myEdges["top"].y + "\n")


        // this was doubled checked
        this.sc.myPerpVectors["right"] = {
            x: (-1) * this.sc.myEdges["right"].y,
            y: this.sc.myEdges["right"].x
        }
        this.sc.myPerpVectors["bottom"] = {
            x: (-1) * this.sc.myEdges["bottom"].y,
            y: this.sc.myEdges["bottom"].x
        }
        this.sc.myPerpVectors["left"] = {
            x: (-1) * this.sc.myEdges["left"].y,
            y: this.sc.myEdges["left"].x
        }
        this.sc.myPerpVectors["top"] = {
            x: (-1) * this.sc.myEdges["top"].y,
            y: this.sc.myEdges["top"].x
        }


        // console.log("Perp Vectors: " + 
        //             "right " + "x: " + this.sc.myPerpVectors["right"].x + " y: " + this.sc.myPerpVectors["right"].y + "\n"+
        //             "bottom " + "x: " + this.sc.myPerpVectors["bottom"].x + " y: " + this.sc.myPerpVectors["bottom"].y + "\n"+
        //             "left " + "x: " + this.sc.myPerpVectors["left"].x + " y: " + this.sc.myPerpVectors["left"].y + "\n"+
        //             "top " + "x: " + this.sc.myPerpVectors["top"].x + " y: " + this.sc.myPerpVectors["top"].y + "\n")


        scAndLeftPerp = []
        scAndRightPerp = []
        
        scAndLeftPerp.push(this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["right"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["bottom"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["left"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["top"])
        scAndRightPerp.push(this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["right"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["bottom"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["left"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["top"])
        
        scAndLeftPerp.push(this.sc.myPerpVectors["right"], this.sc.myPerpVectors["bottom"], this.sc.myPerpVectors["left"], this.sc.myPerpVectors["top"])
        scAndRightPerp.push(this.sc.myPerpVectors["right"], this.sc.myPerpVectors["bottom"], this.sc.myPerpVectors["left"], this.sc.myPerpVectors["top"])


        //console.log(" in update state of list: " + scAndRightPerp.length)
        
        
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////


        //you might need to add angled math
        //the problem could be here

        if(this.sc.x > findMax(this.lineStorage[this.tempLineStorage["right"]].myVertices)){ 
            this.tempLineStorage["left"] = this.tempLineStorage["right"]
            this.tempLineStorage["right"] = (this.tempLineStorage["right"] + 1)
        }
        else if(this.sc.x < findMin(this.lineStorage[this.tempLineStorage["left"]].myVertices)){
            this.tempLineStorage["right"] = this.tempLineStorage["left"]
            this.tempLineStorage["left"] = (this.tempLineStorage["left"] - 1)
        }

        
        

        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////

        
        checkCollisionSAT(this.sc, this.lineStorage, this.tempLineStorage, scAndLeftPerp, scAndRightPerp, "left")
        checkCollisionSAT(this.sc, this.lineStorage, this.tempLineStorage, scAndLeftPerp, scAndRightPerp, "right")


        // also add basic collision X + width...........
        // than maybe try thicker lines.


        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////



        //google ai help, how to iterate over dictionary
        Object.keys(this.lineStorage).forEach(line => {
            this.lineStorage[line].update(launchPad, this)
        })

        // Object.values(this.tempLineStorage).forEach(line => {
        //     this.lineStorage[line].update(launchPad, this)
        // })




        this.mp.update(launchPad)


    }
}