/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!
*/
///////////
//
// I want the player to ask the computer to guess the color on screen.
// The computer will answer with a random color from the choices I give it.
// The player will respond with yes or no.
// if the comuter gets it wrong 3 times, it will get upset and stop talking.
// get points for each successful result
// reset the game.
//
///////////
"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();
let currentSpeech = '?';
let score = 0;
let randomNum = randomNumber(1, 10);
let randomNum2 = randomNumber(1, 10);

let r, g, b = 0;

/**
Description of setup
*/
function setup() {
    createCanvas(500,500);

    speechRecognizer.onResult = handleSpeechInput;

   // Synthesis settings
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice('Google UK English Female');
    //speechSynthesizer.onStart = speechStarted;
    //speechSynthesizer.onEnd = speechEnded;
    //console.log(speechSynthesizer.listVoices());

    speechRecognizer.start();
}

/**
Description of draw()
*/
function draw() {
    background(100,100,100);

    textAlign(CENTER, CENTER);
    textSize(24);
    text("hi", width / 2, height / 4);
    text(currentSpeech, width / 2, height / 2);
    text(randomNum, width / 2, height / 1.5);
}

function handleSpeechInput(){
    currentSpeech = speechRecognizer.resultString;
}

function mousePressed() {
    // Start talking to the computer.
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function checkAnswer(){
    
}

function checkColor(n){
    switch(n){
        case 1:
            //red
            speechSynthesizer.speak('Is it the color Red ?')
        break;
        case 2:
            //blue
            speechSynthesizer.speak('Is it the color Blue ?')
        break;
        case 3:
            //green
            speechSynthesizer.speak('Is it the color Green ?')
        break;
        case 4:
            //yellow #FFFF00
            speechSynthesizer.speak('Is it the color yellow ?')
        break;
        case 5:
            //orange FFA500
            speechSynthesizer.speak('Is it the color Orange ?')
        break;
        case 6:
            //purple a020f0
            speechSynthesizer.speak('Is it the color Purple ?')
        break;
        case 7:
            //brown #A52A2A
            speechSynthesizer.speak('Is it the color Brown ?')
        break;
        case 8:
            //pink #ffc0cb
            speechSynthesizer.speak('Is it the color Pink ?')
        break;
        case 9:
            //black #000000
            speechSynthesizer.speak('Is it the color Black ?')
        break;
        case 10:
            //white #FFFFFF
            speechSynthesizer.speak('Is it the color White ?')
        break;
    }
}

function BGColor(n){
    switch(n){
        case 1:
            //red
            r=255;
            g=0;
            b=0;
        break;
        case 2:
            //blue
            r=0;
            g=0;
            b=255;
        break;
        case 3:
            //green
            r=0;
            g=255;
            b=0;
        break;
        case 4:
            //yellow #FFFF00
            r=255;
            g=255;
            b=0;
        break;
        case 5:
            //orange FFA500
            r=255;
            g=165;
            b=0;
        break;
        case 6:
            //purple a020f0
            r=160;
            g=32;
            b=240;
        break;
        case 7:
            //brown #A52A2A
            r=165;
            g=42;
            b=42;
        break;
        case 8:
            //pink #ffc0cb
            r=255;
            g=192;
            b=203;
        break;
        case 9:
            //black #000000
            r=0;
            g=0;
            b=0;
        break;
        case 10:
            //white #FFFFFF
            r=255;
            g=255;
            b=255;
        break;
    }
};
