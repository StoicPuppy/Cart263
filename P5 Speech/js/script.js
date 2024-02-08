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
let mistake = 0;
let happiness = 3;
let randomNum = randomNumber(1, 10);
let randomNum2 = randomNumber(1, 10);

let r, g, b = 0;

/**
Description of setup
*/
function setup() {

    createCanvas(800,600);

    speechRecognizer.onResult = HandleResult;

    checkColor();
    // Synthesis settings

    speechSynthesizer.setVoice('Google UK English Female');
    //speechSynthesizer.speak("Help me learn the names of Colors!")

    speechRecognizer.onStart = console.log("Waiting for Answer")
    speechRecognizer.onEnd = console.log("Contemplating Result...")
    speechRecognizer.start();

}

/**
Description of draw()
*/
function draw() {
    background(100,100,100);

    fill(r,g,b)
    circle(400, 200, 250, 250);

    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("hi", width / 2, height / 4);
    text(currentSpeech, width / 2, height / 1.6);
    text(randomNum, width / 2, height / 1.3);
    text(randomNum2, width / 2, height / 1.2);
}

function HandleResult(){
    currentSpeech = speechRecognizer.resultString;
    if(happiness > 0)
    {
        switch(currentSpeech){
            case "yes": case "correct": case "good": case "good job": case "you're good":
                speechSynthesizer.speak('YAY!');
                score++;
                console.log("Computer seems happy")
            break;
            case "try again": case "no": case "nope": case "incorrect": case "negative": case "sorry":
                speechSynthesizer.setRate(0.8)
                speechSynthesizer.speak(':(');
                mistake++;
                happiness--;
                console.log("Computer seems upset...")
            break;
        }
    }else {
        speechSynthesizer.speak("You're no fun");
        console.log("The computer doesn't look happy");
    }

}

function mousePressed() {
    // Start talking to the computer.
    if(happiness > 0){
        try{
            console.log("Listening...")
            speechRecognizer.start();
        } catch (error){
            console.log("Already Listening...");
        }
    }else{
        speechSynthesizer.speak("You're no fun");
        console.log("The computer isn't responding...");
    }
    
    
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
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
