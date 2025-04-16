// Lunar Lander
import { Flame } from "./flame.js"
import { SpaceCraft } from "./spaceCraft.js"
import { inputSC } from "./inputSC.js"
import { wIsPressed } from "./inputSC.js"
import { Line } from "./line.js"
import { mousePointer } from "./mousePointerTesting.js"


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


function checkCollisionSAT(sc, lineStorage, tempLineStorage, scAndLeftPerp, scAndRightPerp){
    
    //compare sc with left line
    //check dot product
    for(let i = 0; i < scAndLeftPerp.length; i++){
        //since i know both shapes have 4 vertices, im going to hardcode it

        Object.keys(lineStorage[tempLineStorage["left"]].myVertices).forEach(vertici =>{
            console.log(scAndLeftPerp)
            scAndLeftPerp[i].x * lineStorage[tempLineStorage["left"]].myVertices[vertici].x
        })

        for(let j = 0; j < 4; j++){

        }
        for(let j = 0; j < 4; j++){

        }
    }
}


//let allPerpVectors = []
let scAndLeftPerp = []
let scAndRightPerp = []

export class Game{
    constructor(launchPad){

        this.launchPad = launchPad

        this.GAMEHEIGHT = 650
        this.GAMEWIDTH = 650
        
        

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        ///multiple lines the make the map

        this.lineStorage = {}

        this.line0 = new Line()
        this.line0.x = 0
        this.line0.y = 550
        this.line0.angle = 0
        this.lineStorage[0] = this.line0

        this.line1 = new Line()
        this.line1.x = 50
        this.line1.y = 550
        this.line1.angle = 0
        this.lineStorage[1] = this.line1

        this.line2 = new Line()
        this.line2.x = 110
        this.line2.y = 525
        this.line2.angle = -45
        this.lineStorage[2] = this.line2

        this.line3 = new Line()
        this.line3.x = 170
        this.line3.y = 500
        this.line3.angle = 0
        this.lineStorage[3] = this.line3

        this.line4 = new Line()
        this.line4.x = 223
        this.line4.y = 470
        this.line4.angle = -60
        this.lineStorage[4] = this.line4

        this.line5 = new Line()
        this.line5.x = 263
        this.line5.y = 412
        this.line5.angle = -50
        this.lineStorage[5] = this.line5

        // diff width
        this.line6 = new Line()
        this.line6.x = 304
        this.line6.y = 385
        this.line6.angle = 0
        this.line6.width = 35
        this.lineStorage[6] = this.line6

        this.line7 = new Line()
        this.line7.x = 346
        this.line7.y = 360
        this.line7.angle = -45
        this.lineStorage[7] = this.line7

        this.line8 = new Line()
        this.line8.x = 396
        this.line8.y = 360
        this.line8.angle = 45
        this.lineStorage[8] = this.line8

        this.line9 = new Line()
        this.line9.x = 422
        this.line9.y = 420
        this.line9.angle = 90
        this.lineStorage[9] = this.line9

        this.line10 = new Line()
        this.line10.x = 433
        this.line10.y = 488
        this.line10.angle = 70
        this.lineStorage[10] = this.line10

        // diff width
        this.line11 = new Line()
        this.line11.x = 470
        this.line11.y = 520
        this.line11.width = 50
        this.lineStorage[11] = this.line11

        this.line12 = new Line()
        this.line12.x = 520
        this.line12.y = 495
        this.line12.angle = -45
        this.lineStorage[12] = this.line12

        this.line13 = new Line()
        this.line13.x = 580
        this.line13.y = 470
        this.lineStorage[13] = this.line13

        this.line14 = new Line()
        this.line14.x = 640
        this.line14.y = 493
        this.line14.angle = 45
        this.lineStorage[14] = this.line14


        ///////////////////////////////////////
        this.line99 = new Line()
        this.line99.x = 100
        this.line99.y = 150
        this.line99.angle = 45
        this.line99.height = 20
        this.line99.width = 100
        this.lineStorage[99] = this.line99


        


        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////


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

        //each line has a local map/dictionary of its vertices
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        let i = 0
        Object.values(this.lineStorage).forEach(line => {
            let tr = getAngledCoords(line.x, line.y, line.x + line.width/2, line.y - line.height/2, line.angle)
            let br = getAngledCoords(line.x, line.y, line.x + line.width/2, line.y + line.height/2, line.angle)
            let bl = getAngledCoords(line.x, line.y, line.x - line.width/2, line.y + line.height/2, line.angle)
            let tl = getAngledCoords(line.x, line.y, line.x - line.width/2, line.y - line.height/2, line.angle)


            line.myVertices["tr"] = tr
            line.myVertices["br"] = br
            line.myVertices["bl"] = bl
            line.myVertices["tl"] = tl

            // console.log("line " + i + "\n"+
            //             "tr " + "x: " + line.myVertices["tr"].x + " y: " + line.myVertices["tr"].y + "\n"+
            //             "br " + "x: " + line.myVertices["br"].x + " y: " + line.myVertices["br"].y + "\n"+
            //             "bl " + "x: " + line.myVertices["bl"].x + " y: " + line.myVertices["bl"].y + "\n"+
            //             "tl " + "x: " + line.myVertices["tl"].x + " y: " + line.myVertices["tl"].y + "\n")
            // i++
        })
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////

        // now that we have vertices get edges and perpendicular vectors 
        Object.values(this.lineStorage).forEach(line => {
            let right = {
                x: line.myVertices["br"].x - line.myVertices["tr"].x,
                y: line.myVertices["br"].y - line.myVertices["tr"].y
            }
            let bottom = {
                x: line.myVertices["bl"].x - line.myVertices["br"].x,
                y: line.myVertices["bl"].y - line.myVertices["br"].y
            }
            let left = {
                x: line.myVertices["tl"].x - line.myVertices["bl"].x,
                y: line.myVertices["tl"].y - line.myVertices["bl"].y
            }
            let top = {
                x: line.myVertices["tr"].x - line.myVertices["tl"].x,
                y: line.myVertices["tr"].y - line.myVertices["tl"].y
            }

            line.myEdges["right"] = right
            line.myEdges["bottom"] = bottom
            line.myEdges["left"] = left
            line.myEdges["top"] = top

            // okay now inverse to find perpendicular lines
            // flip x and y, and times x by -1

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


            //i++


        })

        



        /////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        this.tempLineStorage  = {
            "left": 4, 
            "right": 5
        }
        ///////////////////////////////////////////////
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


        let spaceCraftTR = getAngledCoords(this.sc.x, this.sc.y, this.sc.x + this.sc.width/2, this.sc.y - this.sc.height/2, this.sc.angle)
        let spaceCraftBR = getAngledCoords(this.sc.x, this.sc.y, this.sc.x + this.sc.width/2, this.sc.y + this.sc.height/2, this.sc.angle)
        let spaceCraftBL = getAngledCoords(this.sc.x, this.sc.y, this.sc.x - this.sc.width/2, this.sc.y + this.sc.height/2, this.sc.angle)
        let spaceCraftTL = getAngledCoords(this.sc.x, this.sc.y, this.sc.x - this.sc.width/2, this.sc.y - this.sc.height/2, this.sc.angle)

        this.sc.myVertices["tr"] = spaceCraftTR
        this.sc.myVertices["br"] = spaceCraftBR
        this.sc.myVertices["bl"] = spaceCraftBL
        this.sc.myVertices["tl"] = spaceCraftTL


        // console.log(
        //     "tr " + "x: " + this.sc.myVertices["tr"].x + " y: " + this.sc.myVertices["tr"].y + "\n"+
        //     "br " + "x: " + this.sc.myVertices["br"].x + " y: " + this.sc.myVertices["br"].y + "\n"+
        //     "bl " + "x: " + this.sc.myVertices["bl"].x + " y: " + this.sc.myVertices["bl"].y + "\n"+
        //     "tl " + "x: " + this.sc.myVertices["tl"].x + " y: " + this.sc.myVertices["tl"].y + "\n")



        let right = {
            x: this.sc.myVertices["br"].x - this.sc.myVertices["tr"].x,
            y: this.sc.myVertices["br"].y - this.sc.myVertices["tr"].y
        }
        let bottom = {
            x: this.sc.myVertices["bl"].x - this.sc.myVertices["br"].x,
            y: this.sc.myVertices["bl"].y - this.sc.myVertices["br"].y
        }
        let left = {
            x: this.sc.myVertices["tl"].x - this.sc.myVertices["bl"].x,
            y: this.sc.myVertices["tl"].y - this.sc.myVertices["bl"].y
        }
        let top = {
            x: this.sc.myVertices["tr"].x - this.sc.myVertices["tl"].x,
            y: this.sc.myVertices["tr"].y - this.sc.myVertices["tl"].y
        }

        this.sc.myEdges["right"] = right
        this.sc.myEdges["bottom"] = bottom
        this.sc.myEdges["left"] = left
        this.sc.myEdges["top"] = top


        // console.log("Edges: \n" + 
        //     "right " + "x: " + this.sc.myEdges["right"].x + " y: " + this.sc.myEdges["right"].y + "\n"+
        //     "bottom " + "x: " + this.sc.myEdges["bottom"].x + " y: " + this.sc.myEdges["bottom"].y + "\n"+
        //     "left " + "x: " + this.sc.myEdges["left"].x + " y: " + this.sc.myEdges["left"].y + "\n"+
        //     "top " + "x: " + this.sc.myEdges["top"].x + " y: " + this.sc.myEdges["top"].y + "\n")


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


        


        
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////


        //you might need to add angled math

        //this works just need to figure out a way to deep copy
        if(this.sc.x > this.lineStorage[this.tempLineStorage["right"]].x){ 
            scAndLeftPerp = []
            scAndRightPerp = []
            this.tempLineStorage["left"] = this.tempLineStorage["right"]
            this.tempLineStorage["right"] = (this.tempLineStorage["right"] + 1)


            scAndLeftPerp.push(
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["right"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["bottom"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["left"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["top"]
            )


            scAndRightPerp.push(
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["right"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["bottom"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["left"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["top"]
            )
            
            //console.log(allPerpVectors)

        }

        

        else if(this.sc.x < this.lineStorage[this.tempLineStorage["left"]].x){
            scAndLeftPerp = []
            scAndRightPerp = []
            this.tempLineStorage["right"] = this.tempLineStorage["left"]
            this.tempLineStorage["left"] = (this.tempLineStorage["left"] - 1)


            scAndLeftPerp.push(
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["right"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["bottom"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["left"],
                this.lineStorage[this.tempLineStorage["left"]].myPerpVectors["top"]
            )


            scAndRightPerp.push(
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["right"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["bottom"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["left"],
                this.lineStorage[this.tempLineStorage["right"]].myPerpVectors["top"]
            )
            
            //console.log(allPerpVectors)

        }

        //console.log(allPerpVectors)

        // also push the perps of spacecraft
        //////////
        scAndLeftPerp.push(this.sc.myPerpVectors)
        scAndRightPerp.push(this.sc.myPerpVectors)

        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////

        checkCollisionSAT(this.sc, this.lineStorage, this.tempLineStorage, scAndLeftPerp, scAndRightPerp)

        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////



        //google ai help, how to iterate over dictionary
        Object.keys(this.lineStorage).forEach(line => {
            this.lineStorage[line].update(launchPad, this)
        })


        this.mp.update(launchPad)


    }
}