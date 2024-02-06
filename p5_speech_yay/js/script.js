/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynthesizer = new p5.Speech();

let showSubtitle = false;
let toSay = 'when does the fun start ?\n I love pokemon Unite Buzzwole';

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
    
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice('Google UK English Female');

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    console.log(speechSynthesizer.listVoices());
}


/**
Description of draw()
*/
function draw() {
    background(227,127,111);

    if(showSubtitle){
        textSize(15);
        Text(toSay, 100, 100)
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
