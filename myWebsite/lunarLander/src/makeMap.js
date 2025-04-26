import { Line } from "./line.js"

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


    ///////////////////////////////////////
    GAME.line99 = new Line()
    GAME.line99.x = 100
    GAME.line99.y = 150
    GAME.line99.angle = 45
    GAME.line99.height = 20
    GAME.line99.width = 100
    GAME.lineStorage[99] = GAME.line99
}