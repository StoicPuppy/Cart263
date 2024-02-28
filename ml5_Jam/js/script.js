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

let shirtRating = 0;
let showShirt = false;
let pantsRating = 0;
let showPants = false;
let socksRating = 0;
let showSocks = false;

let timer;
let countdown;

/**
Description of setup
*/
function setup() {
    createCanvas(640, 480);
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
    if(state === 'loading'){
        loading();
    }else if(state === 'running'){
        running();
    } else if (state === 'found'){
        pieceFound();
    }
}

function loading(){
    background(255);
    push();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Loading ${modelName}', width/2, height/2 );
    text("let me rate your oufit before you put it on!");
    pop();
}


function running() {
    background(255);
    image(video, 0, 0, width, height);

    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];
            text("let me rate your oufit before you put it on!");
            if(object.label === clothesPiece && showShirt == false) {
                text("lets see what your shirt looks like", 10, 15*i+30);
                text("also, one piece of clothing at a time please!", 10, 15*i+60);
                textSize(24);
                textStyle(BOLD);
                highlightObject(object);
                console.log("shirt found!");
                console.log(object.confidence.toFixed(2) *100)
                shirtRating = object.confidence.toFixed(1) *10;
                //showShirt = true;
                //state = 'found';

            }else if(object.label === clothesPiece && showPants == false) {
                text("show me the pants, shorts or skirt you want to wear!");
                textSize(24);
                textStyle(BOLD);
                highlightObject(object);
                console.log("pants found!");
                console.log(object.confidence.toFixed(2) *100)
                pantsRatingRating = object.confidence.toFixed(1) *10;
            }else if(object.label === clothesPiece && showSocks == false){
                text("finally show me your best pair of socks!");
                textSize(24);
                textStyle(BOLD);
                highlightObject(object);
                console.log("socks found!");
                console.log(object.confidence.toFixed(2) *100)
                socksRating = object.confidence.toFixed(1) *10;
            } else{
                text("I think im ready to give my review!");
                textSize(24);
                textStyle(BOLD);
            }
        }
    }

    //computer asks user to show an article of clothing
    //after three second counter we take the confidence level

    //show me an object: I chose which object first
    //once it detects the object I want, start countdown.
    //save confidence level.

}

function mousePressed(){
    if(shirtRating != 0){
        state = 'found';
        console.log("send me funny cat videos");
    }
    console.log('hi');
    //text("let me rate your oufit before you put it on!");
}

function pieceFound(){
    background(255);
    //text("let me rate your oufit before you put it on!", 10, 115);
    image(video, 0, 0, width, height);


    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];

            text("lets see the next item!", 10, 15*i+100);
            /*
            if(object.label === clothesPiece && showSocks == false){
                if(object.label === clothesPiece && showPants == false){
                    if(object.label === clothesPiece && showShirt == false){

                    }
                }
            }
            */
        }
    }
}

function countDown(){
    countdown = 3;

    timer = setInterval(interval, 800);
    //if (countdown == 0) { clearInterval(timer);}
}

function interval(){
    countdown--;
    if (countdown == 0) { clearInterval(timer);}
}

function drawCountDown(){
    push();
    textSize(48);
    textAlign(CENTER, CENTER);
    text(countdown, width/2, height/2 );
    //console.log(countdown);
    pop();
}

function highlightObject(object) {
    // Display a box around it
    push();
    noFill();
    stroke(255, 255, 0);
    rect(object.x, object.y, object.width, object.height);
    pop();
    // Display the label and confidence in the center of the box
    push();
    textSize(18);
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
    pop();
  }