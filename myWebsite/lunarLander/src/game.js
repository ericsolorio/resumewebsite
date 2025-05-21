// Lunar Lander
import { Flame } from "./flame.js"
import { SpaceCraft } from "./spaceCraft.js"
import { inputSC } from "./inputSC.js"
import { wIsPressed } from "./inputSC.js"
import { mousePointer } from "./mousePointerTesting.js"
import { checkCollisionSAT, findMax, findMin, goodAndFailed, makeEdgesLines, makeEdgesSC, makeMap, makePerpVectorsLines, makePerpVectorsSC, makeVerticesLines, makeVerticesSC } from "./extraFunctions.js"
import { LaunchPad } from "./launchPad.js"


let scAndLeftPerp = []
let scAndRightPerp = []



export class Game{
    constructor(launchPad){

        this.status = ""

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
        new inputSC(this.sc, this)



        goodAndFailed(this)


        //this.mp = new mousePointer(launchPad)
    }


    update(launchPad){
        console.log("status: ", this.status)
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

        
        launchPad.ctx.font = "20px Arial"
        launchPad.ctx.fillStyle = "white"
        launchPad.ctx.textAlign = "center"


        launchPad.ctx.fillText("speed" + this.sc.speed.toFixed(1), 560, 50)
        

        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////
        if(this.status == ""){
            this.status = checkCollisionSAT(this.sc, this.lineStorage, this.tempLineStorage, scAndLeftPerp, scAndRightPerp, "left")
        }
        if(this.status == ""){
            this.status = checkCollisionSAT(this.sc, this.lineStorage, this.tempLineStorage, scAndLeftPerp, scAndRightPerp, "right")
        }
        /////////////////////////////////////////////////////////////////////////
        if(this.status == "gameover"){
            launchPad.ctx.strokeStyle = "white"
            launchPad.ctx.lineWidth = 5
            launchPad.ctx.strokeRect((650/2) - (400/2), (650/2) - (250/2), 400, 250)
            launchPad.ctx.fillRect((650/2) - (200/2), (650/2) - (50/2) + 40, 200, 50)    
            launchPad.ctx.fillText("MISSION FAILED", (650/2), (650/2) - (50/2))
            launchPad.ctx.fillStyle = "black"
            launchPad.ctx.fillText("RETRY", (650/2), (650/2) - (50/2) + 71)
            this.sc.yVelocity = 0
            this.sc.xVelocity = 0
        }
        if(this.status == "goodLanding"){
            launchPad.ctx.strokeStyle = "white"
            launchPad.ctx.lineWidth = 5
            launchPad.ctx.strokeRect((650/2) - (400/2), (650/2) - (250/2), 400, 250)
            launchPad.ctx.fillRect((650/2) - (200/2), (650/2) - (50/2) + 40, 200, 50)    
            launchPad.ctx.fillText("GOOD LANDING", (650/2), (650/2) - (50/2))
            launchPad.ctx.fillStyle = "black"
            launchPad.ctx.fillText("RETRY", (650/2), (650/2) - (50/2) + 71)
            this.sc.yVelocity = 0
            this.sc.xVelocity = 0
        }

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




        //this.mp.update(launchPad)


    }
}