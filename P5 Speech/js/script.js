/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

speechRecognizer.continuous = true;

let showSubtitle = false;
let toSay = 'I love pokemon Unite Buzzwole';

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    createCanvas(500,500);

    // Synthesis settings
    
    speechSynthesizer.setPitch(0.9);
    speechSynthesizer.setRate(0.8);
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

}

function ResultCase(){
    switch(speechRecognizer.resultString){
        case "Hi":
            speechSynthesizer.speak('Hello my name is freddy fazbear');
        break;
        case "welcome":
            speechSynthesizer.speak('its me mario');
    }
       
}

function mousePressed() {
    // Say something
    
    speechSynthesizer.speak(toSay);
}

function speechStarted(){
    showSubtitle = true;
}

function speechEnded(){
    showSubtitle = false;
}
