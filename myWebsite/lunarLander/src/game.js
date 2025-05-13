// Lunar Lander
import { Flame } from "./flame.js"
import { SpaceCraft } from "./spaceCraft.js"
import { inputSC } from "./inputSC.js"
import { wIsPressed } from "./inputSC.js"
import { mousePointer } from "./mousePointerTesting.js"
import { findMax, findMin, makeEdgesLines, makeEdgesSC, makeMap, makePerpVectorsLines, makePerpVectorsSC, makeVerticesLines, makeVerticesSC } from "./extraFunctions.js"




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
            if(minA === null || dp < minA){
                minA = dp
            }
            if(maxA === null || dp > maxA){
                maxA = dp
            }
        })



        let minB = null
        let maxB = null

        Object.keys(lineStorage[tempLineStorage[specificLine]].myVertices).forEach(vertici =>{


            let dp = (specificPerpList[i].x * lineStorage[tempLineStorage[specificLine]].myVertices[vertici].x) +
                    (specificPerpList[i].y * lineStorage[tempLineStorage[specificLine]].myVertices[vertici].y)

            if(minB === null || dp < minB){
                minB = dp
            }
            if(maxB === null || dp > maxB){
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

    // if for loops ends without any interuptions than colliding
    console.log("colliding!")
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



        makeVerticesLines(this)
        // now that we have vertices get edges
        makeEdgesLines(this)
        // okay now inverse to find perpendicular lines
        // flip x and y, and times x by -1
        makePerpVectorsLines(this)


        
        this.tempLineStorage  = {
            "left": 4, 
            "right": 5
        }

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

        


        // find the vertices, edges, and perpendicular vectors of the spaceship
        makeVerticesSC(this)
        makeEdgesSC(this)
        makePerpVectorsSC(this)


        scAndLeftPerp = []
        scAndRightPerp = []
        
        scAndLeftPerp.push(this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["right"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["bottom"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["left"], this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["top"])
        scAndRightPerp.push(this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["right"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["bottom"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["left"], this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["top"])
        
        scAndLeftPerp.push(this.sc.myPerpVectors["right"], this.sc.myPerpVectors["bottom"], this.sc.myPerpVectors["left"], this.sc.myPerpVectors["top"])
        scAndRightPerp.push(this.sc.myPerpVectors["right"], this.sc.myPerpVectors["bottom"], this.sc.myPerpVectors["left"], this.sc.myPerpVectors["top"])

        

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


        // also add basic collision 

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