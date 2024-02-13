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
let happiness = 6;
let randomNum = randomNumber(1, 10);
let randomNum2 = randomNumber(1, 10);
let randomNum3 = randomNumber(1, 15);
let randomNum4 = randomNumber(1,5);

let r, g, b = 0;

/**
Description of setup
*/

//what I need to do

//1-- work on making a good interface for the user to understand what the game is
//2-- on click of a button, generate a color on screen and say that color.
//3-- player replies with yes or no. adjust score.
//4-- repeat.
//5-- add more interactions if I have time

function setup() {

    createCanvas(800, 600);

    speechRecognizer.onResult = HandleResult;

    //checkColor();
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
    background(255,255,255);

    fill(r,g,b)
    //fill(255,100,0)
    circle(width /2, height/3, 250, 350);

    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    //text("hi", width / 2, height / 4);
    text(currentSpeech, width / 2, height / 1.6);
    text(randomNum, width / 2, height / 1.3);
    text(randomNum2, width / 2, height / 1.2);
    text("Mistakes: ", 100, 100)
    text(mistake, 160, 100)
    text("score: ",  100, 150);
    text(score,  140, 150);
    //text("Happiness: ",  100, 200);
    //text(happiness, 170, 200)
}

function HandleResult(){
    currentSpeech = speechRecognizer.resultString;
    if(happiness > 3)
    {
        switch(currentSpeech){
            case "yes": case "correct": case "good": case "good job": case "you're good":
                //speechSynthesizer.speak('YAY!');
                correctMessage(randomNum4);
                score++;
                if(happiness < 3) {happiness++;}
                console.log("Computer seems happy")
            break;
            case "try again": case "no": case "nope": case "incorrect": case "negative": case "sorry": case "non":
                //speechSynthesizer.setRate(0.8)
                failedMessage(randomNum4);
                mistake++;
                happiness--;
                console.log("Computer seems upset...")
            break;
            default:
                defaultMessage(randomNum3);
                console.log("the computer is serious...")
            break;
        }
    } else if(happiness > 0 && !(happiness >= 4)){
        switch(currentSpeech){
            case "yes": case "correct": case "good": case "good job": case "you're good":
                //speechSynthesizer.speak('YAY!');
                correctMessage(randomNum4);
                score++;
                if(happiness < 3) {happiness++;}
                console.log("Computer seems happy")
            break;
            case "try again": case "no": case "nope": case "incorrect": case "negative": case "sorry": case "non":
                //speechSynthesizer.setRate(0.8)
                failedUnhappyMessage(randomNum4);
                mistake++;
                happiness--;
                console.log("Computer seems upset...")
            break;
            default:
                defaultUnhappyMessage(randomNum3);
                console.log("the computer is serious...")
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
            randomNum = randomNumber(1,10);
            randomNum2 = randomNumber(1,10);
            randomNum3 = randomNumber(1,15);
            randomNum4 = randomNumber(1,5);
            BGColor(randomNum2);
            checkColor(randomNum);
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
            //brown #663300
            r=102;
            g=51;
            b=0;
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
}

function defaultMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('Take this seriously');
        break;
        case 2:
            speechSynthesizer.speak('really...');
        break;
        case 3:
            speechSynthesizer.speak('Funny');
        break;
        case 4:
            speechSynthesizer.speak('Answer with yes or no next time');
        break;
        case 5:
            speechSynthesizer.speak('I am trying to learn you know...');
        break;
        case 6:
            speechSynthesizer.speak('sign');
        break;
        case 7:
            speechSynthesizer.speak('are you paying attention?');
        break;
        case 8:
            speechSynthesizer.speak('weird');
        break;
        case 9:
            speechSynthesizer.speak('lets leave the jokes for another time');
        break;
        case 10:
            speechSynthesizer.speak('im not in the mood sorry');
        break;
        case 11:
            speechSynthesizer.speak('I asked you a question');
        break;
        case 12:
            speechSynthesizer.speak('That is not an answer');
        break;
        case 13:
            speechSynthesizer.speak('I dont know what to say');
        break;
        case 14:
            speechSynthesizer.speak('ok then');
        break;
        case 15:
            speechSynthesizer.speak('OBJECTION!');
        break;
    }
}

function failedMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('my mistake');
        break;
        case 2:
            speechSynthesizer.speak('I am trying my best');
        break;
        case 3:
            speechSynthesizer.speak('I will get it next time');
        break;
        case 4:
            speechSynthesizer.speak('I wasnt sure');
        break;
        case 5:
            speechSynthesizer.speak('lets try again');
        break;
    }
}

function correctMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('YAY!');
        break;
        case 2:
            speechSynthesizer.speak('I am getting good at this');
        break;
        case 3:
            speechSynthesizer.speak('good good lets do another one');
        break;
        case 4:
            speechSynthesizer.speak('nice');
        break;
        case 5:
            speechSynthesizer.speak('awesome');
        break;
    }
        
}

function defaultUnhappyMessage(){
    switch(n){
        case 1:
            speechSynthesizer.speak("I'm bored");
        break;
        case 2:
            speechSynthesizer.speak("you're not much help");
        break;
        case 3:
            speechSynthesizer.speak("this sucks");
        break;
        case 4:
            speechSynthesizer.speak("mmm");
        break;
        case 5:
            speechSynthesizer.speak('yeah yeah');
        break;
    }
}

function failedUnhappyMessage(){
    switch(n){
        case 1:
            speechSynthesizer.speak('Take this seriously');
        break;
        case 2:
            speechSynthesizer.speak('really...');
        break;
        case 3:
            speechSynthesizer.speak('Funny');
        break;
        case 4:
            speechSynthesizer.speak('Answer with yes or no next time');
        break;
        case 5:
            speechSynthesizer.speak('I am trying to learn you know...');
        break;
        case 6:
            speechSynthesizer.speak('sign');
        break;
        case 7:
            speechSynthesizer.speak('are you paying attention?');
        break;
        case 8:
            speechSynthesizer.speak('weird');
        break;
        case 9:
            speechSynthesizer.speak('lets leave the jokes for another time');
        break;
        case 10:
            speechSynthesizer.speak('im not in the mood sorry');
        break;
        case 11:
            speechSynthesizer.speak('I asked you a question');
        break;
        case 12:
            speechSynthesizer.speak('That is not an answer');
        break;
        case 13:
            speechSynthesizer.speak('I dont know what to say');
        break;
        case 14:
            speechSynthesizer.speak('ok then');
        break;
        case 15:
            speechSynthesizer.speak('OBJECTION!');
        break;
    }
}

function generateColor(){
    speechSynthesizer.speak("here is a new color");
    console.log("the button is clicked")
}