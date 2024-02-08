/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Init 
// let world = [
//   ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
//   ['W', ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, 'W'],
//   ['W', ` `, 'W', 'W', 'W', 'W', 'W', 'W', ` `, 'W'],
//   ['W', ` `, ` `, ` `, ` `, ` `, ` `, 'W', ` `, 'W'],
//   ['W', ` `, 'W', 'W', 'W', 'W', 'W', 'W', ` `, 'W'],
//   ['W', ` `, 'W', ` `, ` `, ` `, ` `, 'W', ` `, 'W'],
//   ['W', ` `, 'W', ` `, 'W', 'W', ` `, 'W', ` `, 'W'],
//   ['W', ` `, ` `, ` `, ` `, 'W', 'W', 'W', ` `, 'W'],
//   [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
//   ['W', `W`, `W`, `W`, 'W', 'W', `W`, `W`, `W`, 'W'],
//   ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
// ];
/////////////

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

speechRecognizer.continuous = true;

let showSubtitle = false;
let toSay = "Hi";

/**
Description of preload
*/
function preload() {

}

const player_size = 50;
const gravity_strength = 4;

class player_class {
    constructor(position, speed) {
        this.position = position;
        this.speed = speed;
    }

    displayPlayer() {
        push();
        noStroke();
        fill(0, 0, 0);
        rect(player.position[0], player.position[1], 50);
        pop();
    }

    jump() {
        player.position[1] -= 100;
    }

    movePlayer() {
        // Gravity
        if (player.position[1] < height - player_size)
            player.position[1] += gravity_strength;

        if (!speechRecognizer.resultValue) {
            return;
        }

        let sentence = speechRecognizer.resultString;
        console.log("heard something");
        console.log(speechRecognizer.resultString)
        switch (sentence) {
            case "left":
                player.position[0] -= player.speed;
                break;
            case "right":
                player.position[0] += player.speed;
                break;
            case "up":
                player.jump();
                break;
            case "down":
                player.position[1] += player.speed;
                break;
        }
    }
}

let player = new player_class([100,100], 30);

/**
Description of setup
*/
function setup() {
    createCanvas(800,600);

    // Synthesis settings
    
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice('Google UK English Female');

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    console.log(speechSynthesizer.listVoices());

    speechRecognizer.start();
}

/**
Description of draw()
*/
function draw() {
    background(227,127,111);

    if(showSubtitle){
        textSize(24);
        text(toSay, 100, 100)
    }

    player.movePlayer();
    player.displayPlayer();
}

function mousePressed() {
    // Say something
    player.jump();
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            player.jump();
            break;
        case LEFT_ARROW:
            player.position[0] -= player.speed;
            break;
        case RIGHT_ARROW:
            player.position[0] += player.speed;
            break;
        // case DOWN_ARROW:
        //     player.position[1] += player.speed;
        //     break;
        // case 87:
        //     player.jump();
        //     break;
    }
}

function speechStarted(){
    showSubtitle = true;
}

function speechEnded(){
    showSubtitle = false;
}


//////////////////////////////////////////////////////// EXEMPLES //////////////////////////////////////////////////////////
// const TILE_SIZE = 50;
// let voice = new p5.Speech()
// let speechRecognizer = new p5.SpeechRec();
// let currentSpeech = "Here we go!";
// let bgc = {
//     red: 255,
//     green: 255,
//     blue: 255};
// let speed = 1;

// let world = [
//   ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
//   ['W', ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, 'W'],
//   ['W', ` `, 'W', 'W', 'W', 'W', 'W', 'W', ` `, 'W'],
//   ['W', ` `, ` `, ` `, ` `, ` `, ` `, 'W', ` `, 'W'],
//   ['W', ` `, 'W', 'W', 'W', 'W', 'W', 'W', ` `, 'W'],
//   ['W', ` `, 'W', ` `, ` `, ` `, ` `, 'W', ` `, 'W'],
//   ['W', ` `, 'W', ` `, 'W', 'W', ` `, 'W', ` `, 'W'],
//   ['W', ` `, ` `, ` `, ` `, 'W', 'W', 'W', ` `, 'W'],
//   ['W', 'W', 'W', 'W', ` `, ` `, ` `, 'W', ` `, 'W'],
//   ['W', ` `, ` `, ` `, ` `, 'W', ` `, ` `, ` `, 'W'],
//   ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
// ];

// let player = {
//   row: 5,
//   col: 5
// };

// function setup() {
//   let canvasHeight = world.length * TILE_SIZE;
//   let canvasWidth = world[0].length * TILE_SIZE;
//   createCanvas(canvasWidth, canvasHeight);
//   speechRecognizer.onResult = handleResult;
//   speechRecognizer.continuous = true;
//   speechRecognizer.start();
// }

// function draw() {
//   background(bgc.red, bgc.green, bgc.blue);
//   displayWorld();
//   displayPlayer();
// }


// function displayWorld() {
//   for (let row = 0; row < world.length; row++) {
//     for (let col = 0; col < world[row].length; col++) {
//       let tile = world[row][col];
//       switch (tile) {
//         case ` `:
//           break;
//         case 'W':
//           displayWall(row, col);
//           break;
//       }
//     }
//   }
// }

// function displayWall(row, col) {
//   let x = col * TILE_SIZE;
//   let y = row * TILE_SIZE;
//   push();
//   noStroke();
//   fill(0);
//   rect(x, y, TILE_SIZE);
//   pop();
// }

// function displayPlayer() {
//   let x = player.col * TILE_SIZE;
//   let y = player.row * TILE_SIZE;
//   push();
//   noStroke();
//   fill(255, 0, 0);
//   rect(x, y, TILE_SIZE);
//   pop();
// }

// function handleResult() {
//   let move = {
//     row: 0,
//     col: 0
//   };

//   if (speechRecognizer.resultValue) {
//     currentSpeech = speechRecognizer.resultString;
//     console.log("heard something");
//     console.log(speechRecognizer.resultString)
//     }
//     switch (currentSpeech) {
//         case "left":
//             move.col = -speed;
//         break;
//         case "right":
//             move.col = speed;
//         break;
//         case "up":
//             move.row = -speed;
//         break;
//         case "down":
//             move.row = speed;
//         break;
//         case "pink":
//             bgc.green=0;
//             bgc.red=255;
//             bgc.blue=255;
//         break;
//         case "yellow":
//             bgc.green=255;
//             bgc.red=255;
//             bgc.blue=0;
//         break;
//         case "cyan":
//             bgc.green=255;
//             bgc.red=0;
//             bgc.blue=255;
//         break;
//     }

//     let nextPosition = {
//         row: player.row + move.row,
//         col: player.col + move.col
//     };

//     if (world[nextPosition.row][nextPosition.col] !== 'W') {
//         player.row = nextPosition.row;
//         player.col = nextPosition.col;
//     }

//     if(currentSpeech == "faster"){
//         speed++;
//     }
//     if(currentSpeech == "slower"){
//         speed--;
//     }
// }