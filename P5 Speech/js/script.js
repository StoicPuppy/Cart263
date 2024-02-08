/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();


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

   
}

function mousePressed() {
    // Say something
}


function speechStarted(){
    showSubtitle = true;
}

function speechEnded(){
    showSubtitle = false;
}
