// Lunar Lander
import { Flame } from "./flame.js"
import { SpaceCraft } from "./spaceCraft.js"
import { inputSC } from "./inputSC.js"
import { wIsPressed } from "./inputSC.js"
import { Line } from "./line.js"


export class Game{
    constructor(){
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
        //this.lineStorage.add(this.line0)
        this.lineStorage[0] = this.line0

        this.line1 = new Line()
        this.line1.x = 50
        this.line1.y = 550
        this.line1.angle = 0
        //this.lineStorage.add(this.line1)
        this.lineStorage[1] = this.line1

        this.line2 = new Line()
        this.line2.x = 110
        this.line2.y = 525
        this.line2.angle = -45
        //this.lineStorage.add(this.line2)
        this.lineStorage[2] = this.line2

        this.line3 = new Line()
        this.line3.x = 170
        this.line3.y = 500
        this.line3.angle = 0
        //this.lineStorage.add(this.line3)
        this.lineStorage[3] = this.line3

        this.line4 = new Line()
        this.line4.x = 223
        this.line4.y = 470
        this.line4.angle = -60
        //this.lineStorage.add(this.line4)
        this.lineStorage[4] = this.line4

        this.line5 = new Line()
        this.line5.x = 263
        this.line5.y = 412
        this.line5.angle = -50
        //this.lineStorage.add(this.line5)
        this.lineStorage[5] = this.line5

        // diff width
        this.line6 = new Line()
        this.line6.x = 304
        this.line6.y = 385
        this.line6.angle = 0
        this.line6.width = 35
        //this.lineStorage.add(this.line6)
        this.lineStorage[6] = this.line6

        this.line7 = new Line()
        this.line7.x = 346
        this.line7.y = 360
        this.line7.angle = -45
        //this.lineStorage.add(this.line7)
        this.lineStorage[7] = this.line7

        this.line8 = new Line()
        this.line8.x = 396
        this.line8.y = 360
        this.line8.angle = 45
        //this.lineStorage.add(this.line8)
        this.lineStorage[8] = this.line8

        this.line9 = new Line()
        this.line9.x = 422
        this.line9.y = 420
        this.line9.angle = 90
        //this.lineStorage.add(this.line9)
        this.lineStorage[9] = this.line9

        this.line10 = new Line()
        this.line10.x = 433
        this.line10.y = 488
        this.line10.angle = 70
        //this.lineStorage.add(this.line10)
        this.lineStorage[10] = this.line10

        // diff width
        this.line11 = new Line()
        this.line11.x = 470
        this.line11.y = 520
        this.line11.angle = 0
        this.line11.width = 50
        //this.lineStorage.add(this.line11)
        this.lineStorage[11] = this.line11

        this.line12 = new Line()
        this.line12.x = 520
        this.line12.y = 495
        this.line12.angle = -45
        //this.lineStorage.add(this.line12)
        this.lineStorage[12] = this.line12

        this.line13 = new Line()
        this.line13.x = 580
        this.line13.y = 470
        this.line13.angle = 0
        //this.lineStorage.add(this.line13)
        this.lineStorage[13] = this.line13

        this.line14 = new Line()
        this.line14.x = 640
        this.line14.y = 493
        this.line14.angle = 45
        //this.lineStorage.add(this.line14)
        this.lineStorage[14] = this.line14


        /////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        this.tempLineStorage  = {
            "left": 4, 
            "right": 5
        }
        //////////////////////////////////////

        this.sc = new SpaceCraft(this)
        this.flame = new Flame(this.sc)
        new inputSC(this.sc)


        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
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


        
        console.log(this.lineStorage[this.tempLineStorage["right"]].x)

        if(this.sc.x > this.lineStorage[this.tempLineStorage["right"]].x + this.lineStorage[this.tempLineStorage["right"]].width/2){ 
            this.tempLineStorage["left"] = this.tempLineStorage["right"]
            this.tempLineStorage["right"] = (this.tempLineStorage["right"] + 1) % 15
        }

        console.log(this.tempLineStorage)



        //google ai help, how to iterate over dictionary
        Object.keys(this.lineStorage).forEach(line => {
            this.lineStorage[line].update(launchPad, this)
        })





    }
}