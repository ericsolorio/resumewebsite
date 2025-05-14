import { Line } from "./line.js"


export function checkCollisionSAT(sc, lineStorage, tempLineStorage, scAndLeftPerp, scAndRightPerp, specificLine){
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
    //console.log("colliding!")



    //if collided need to check if the platform is at an angle of 0 or not
    if(lineStorage[tempLineStorage[specificLine]].angle == 0){
        // land is flat
        if(sc.angle > -7 && sc.angle < 7){
            //good SC angle
            if(sc.speed < 6){
                // good speed
                console.log("good landing")
                return "goodLanding"
            }
            else{
                // too fast
                console.log("to fast")
                return "gameover"
            }
        }
        else{
            // bad SC angle
            console.log("angle not good")
            return "gameover"
        }
    }
    else{
        // land is NOT flat
        console.log("land NOT FLAT")
        return "gameover"
    }

}


export function getAngledCoords(xc, yc, xi, yi, angleOfLine){
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

export function makeVerticesLines(GAME){
    Object.values(GAME.lineStorage).forEach(line => {
        line.myVertices["tr"] = 
            getAngledCoords(line.x, line.y, line.x + line.width/2, line.y - line.height/2, line.angle)
        line.myVertices["br"] = 
            getAngledCoords(line.x, line.y, line.x + line.width/2, line.y + line.height/2, line.angle)
        line.myVertices["bl"] = 
            getAngledCoords(line.x, line.y, line.x - line.width/2, line.y + line.height/2, line.angle)
        line.myVertices["tl"] = 
            getAngledCoords(line.x, line.y, line.x - line.width/2, line.y - line.height/2, line.angle)

    })
}

export function makeVerticesSC(GAME){
    GAME.sc.myVertices["tr"] = 
        getAngledCoords(GAME.sc.x, GAME.sc.y, GAME.sc.x + GAME.sc.width/2, GAME.sc.y - GAME.sc.height/2, GAME.sc.angle)
    GAME.sc.myVertices["br"] = 
        getAngledCoords(GAME.sc.x, GAME.sc.y, GAME.sc.x + GAME.sc.width/2, GAME.sc.y + GAME.sc.height/2, GAME.sc.angle)
    GAME.sc.myVertices["bl"] = 
        getAngledCoords(GAME.sc.x, GAME.sc.y, GAME.sc.x - GAME.sc.width/2, GAME.sc.y + GAME.sc.height/2, GAME.sc.angle)
    GAME.sc.myVertices["tl"] = 
        getAngledCoords(GAME.sc.x, GAME.sc.y, GAME.sc.x - GAME.sc.width/2, GAME.sc.y - GAME.sc.height/2, GAME.sc.angle)
}


export function makeEdgesLines(GAME){
    Object.values(GAME.lineStorage).forEach(line => {
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
    })
}

export function makePerpVectorsLines(GAME){
    Object.values(GAME.lineStorage).forEach(line => {
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
    })
}



export function makeEdgesSC(GAME){
    GAME.sc.myEdges["right"] = {
        x: GAME.sc.myVertices["br"].x - GAME.sc.myVertices["tr"].x,
        y: GAME.sc.myVertices["br"].y - GAME.sc.myVertices["tr"].y
    }
    GAME.sc.myEdges["bottom"] = {
        x: GAME.sc.myVertices["bl"].x - GAME.sc.myVertices["br"].x,
        y: GAME.sc.myVertices["bl"].y - GAME.sc.myVertices["br"].y
    }
    GAME.sc.myEdges["left"] = {
        x: GAME.sc.myVertices["tl"].x - GAME.sc.myVertices["bl"].x,
        y: GAME.sc.myVertices["tl"].y - GAME.sc.myVertices["bl"].y
    }
    GAME.sc.myEdges["top"] = {
        x: GAME.sc.myVertices["tr"].x - GAME.sc.myVertices["tl"].x,
        y: GAME.sc.myVertices["tr"].y - GAME.sc.myVertices["tl"].y
    }
}

export function makePerpVectorsSC(GAME){
    GAME.sc.myPerpVectors["right"] = {
        x: (-1) * GAME.sc.myEdges["right"].y,
        y: GAME.sc.myEdges["right"].x
    }
    GAME.sc.myPerpVectors["bottom"] = {
        x: (-1) * GAME.sc.myEdges["bottom"].y,
        y: GAME.sc.myEdges["bottom"].x
    }
    GAME.sc.myPerpVectors["left"] = {
        x: (-1) * GAME.sc.myEdges["left"].y,
        y: GAME.sc.myEdges["left"].x
    }
    GAME.sc.myPerpVectors["top"] = {
        x: (-1) * GAME.sc.myEdges["top"].y,
        y: GAME.sc.myEdges["top"].x
    }
}


export function findMax(myVertices){
    let max = null

    Object.keys(myVertices).forEach(vertici =>{
        if(myVertices[vertici].x > max){
            max = myVertices[vertici].x
        }
        else if(max == null){
            max = myVertices[vertici].x
        }

        // //this leaves anynomouse function
        // return
    })
    return max
}


export function findMin(myVertices){
    let min = null

    Object.keys(myVertices).forEach(vertici =>{
        if(myVertices[vertici].x < min){
            min = myVertices[vertici].x
        }
        else if(min == null){
            min = myVertices[vertici].x
        }
        
        // // this exits anynomous function
        // return
        
    })
    return min
}


export function makeMap(GAME){
    ///multiple lines the make the map

    GAME.lineStorage = {}

    GAME.line0 = new Line()
    GAME.line0.x = 0
    GAME.line0.y = 550
    GAME.line0.angle = 0
    GAME.lineStorage[0] = GAME.line0

    GAME.line1 = new Line()
    GAME.line1.x = 50
    GAME.line1.y = 550
    GAME.line1.angle = 0
    GAME.lineStorage[1] = GAME.line1

    GAME.line2 = new Line()
    GAME.line2.x = 110
    GAME.line2.y = 525
    GAME.line2.angle = -45
    GAME.lineStorage[2] = GAME.line2

    GAME.line3 = new Line()
    GAME.line3.x = 170
    GAME.line3.y = 500
    GAME.line3.angle = 0
    GAME.lineStorage[3] = GAME.line3

    GAME.line4 = new Line()
    GAME.line4.x = 223
    GAME.line4.y = 470
    GAME.line4.angle = -60
    GAME.lineStorage[4] = GAME.line4

    GAME.line5 = new Line()
    GAME.line5.x = 263
    GAME.line5.y = 412
    GAME.line5.angle = -50
    GAME.lineStorage[5] = GAME.line5

    // diff width
    GAME.line6 = new Line()
    GAME.line6.x = 304
    GAME.line6.y = 385
    GAME.line6.angle = 0
    GAME.line6.width = 35
    GAME.lineStorage[6] = GAME.line6

    GAME.line7 = new Line()
    GAME.line7.x = 346
    GAME.line7.y = 360
    GAME.line7.angle = -45
    GAME.lineStorage[7] = GAME.line7

    GAME.line8 = new Line()
    GAME.line8.x = 396
    GAME.line8.y = 360
    GAME.line8.angle = 45
    GAME.lineStorage[8] = GAME.line8

    GAME.line9 = new Line()
    GAME.line9.x = 422
    GAME.line9.y = 420
    GAME.line9.angle = 90
    GAME.lineStorage[9] = GAME.line9

    GAME.line10 = new Line()
    GAME.line10.x = 433
    GAME.line10.y = 488
    GAME.line10.angle = 70
    GAME.lineStorage[10] = GAME.line10

    // diff width
    GAME.line11 = new Line()
    GAME.line11.x = 470
    GAME.line11.y = 520
    GAME.line11.width = 50
    GAME.lineStorage[11] = GAME.line11

    GAME.line12 = new Line()
    GAME.line12.x = 520
    GAME.line12.y = 495
    GAME.line12.angle = -45
    GAME.lineStorage[12] = GAME.line12

    GAME.line13 = new Line()
    GAME.line13.x = 580
    GAME.line13.y = 470
    GAME.lineStorage[13] = GAME.line13

    GAME.line14 = new Line()
    GAME.line14.x = 640
    GAME.line14.y = 493
    GAME.line14.angle = 45
    GAME.lineStorage[14] = GAME.line14
}