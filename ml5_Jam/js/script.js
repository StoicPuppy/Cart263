/**
Oufit rating game !
Patrick Marler

This is a template. You must fill in the title,
author, and this description to match your project!

1- I need to get the computer to say hi
2- get the computer to ask for an article of clothing to be shown
3- user shows article of clothing and computer stores the confidence level.
4- ask for 2 more articles of clothing
5- display final rating based on combined confidence level of all three pieces of clothing

extra game***
1- get user to show cat
2- try to get cat to fill up the screen as much as possible
3- big cat

*/

"use strict";

let state = 'loading';
let video;
let modelName = 'CocoSsd';
let cocossd;
let predictions = [];
let clothesPiece = 'person';


/**
Description of setup
*/
function setup() {
    createCanvas(700, 500);
    video = createCapture(VIDEO);
    video.hide();
    cocossd = ml5.objectDetector('cocossd', {}, function(){
        cocossd.detect(video, gotResults);
        state = 'running';
    });
}

function gotResults(err, results){
    if(err){
        console.error(err);
    }else{
        predictions = results;
    }
    cocossd.detect(video, gotResults);
}

/**
Description of draw()
*/
function draw() {
    if(state === 'loadin'){
        loading();
    }
    else if(state === 'running'){
        running();
    } else if (state === oufit){
        pieceFound();
    }
}

function loading(){
    background(255);
    push();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Loading ${modelName}', width/2, height/2 );
    pop();
}

function running() {
    background(255)
    text("let me rate your oufit before you put it on!")

    
}