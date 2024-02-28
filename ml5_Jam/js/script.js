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

let ready = false;
let clothesShown = 0;
let ReviewGiven = false;

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
    pop();
}


function running() {
    background(255);
    image(video, 0, 0, width, height);

    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];
            if(object.label === clothesPiece && showSocks == false && clothesShown == 2) {
                text("finally show me your best pair of socks!", 10, 15*i+60);
                text("also, one piece of clothing at a time please!", 10, 15*i+30);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object);
                console.log("socks found!");
                console.log(object.confidence.toFixed(2) *100)
                socksRating = object.confidence.toFixed(1) *10;
                
            }else if(object.label === clothesPiece && showPants == false && clothesShown == 1) {
                text("show me the pants, shorts or skirt you want to wear!", 10, 15*i+30);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object);
                console.log("pants found!");
                console.log(object.confidence.toFixed(2) *100)
                pantsRating = object.confidence.toFixed(1) *10;
                
            }else if(object.label === clothesPiece && showShirt == false && clothesShown == 0){
                text("lets see what your shirt looks like", 10, 15*i+30);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object);
                console.log("shirt found!");
                console.log(object.confidence.toFixed(2) *100)
                shirtRating = object.confidence.toFixed(1) *10;
                
            } else if (clothesShown >= 3){
                text("I think im ready to give my review!", 10, 15*i+30);
                text("I give your oufit a "+(shirtRating+pantsRating+socksRating)/3+" out of 10!", 10, 15*i+60);
                textSize(24);
                textStyle(BOLD);
                ReviewGiven = true;
            }else{
                text("ERROR ERROR TOO MANY ITEMS", 10, 15*i+60);
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
    if(ready == true){
        state = 'running';
        ready = false;
    } else 
    if(socksRating != 0){
        state = 'found';
        showSocks = true;
        clothesShown++;
        console.log("socks found");
    } else
    if(pantsRating != 0){
        state = 'found';
        showPants = true;
        clothesShown++;
        console.log("pants found");
    } else
    if(shirtRating != 0){
        state = 'found';
        showShirt = true;
        clothesShown++;
        console.log("shirt found");
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

            if(ReviewGiven == true){
                text("You're going to look as cute as a cat!", 10, 15*i+30);
                text("I love cats", 10, 15*i+60);
            } else
            if(object.label === clothesPiece && showSocks == true){
                text("Awesome! I think I'm ready to give you a review", 10, 15*i+30);
                ready = true;
                
            }else 
            if(object.label === clothesPiece && showPants == true){
                text("Amazing! Let me know when you're ready to continue!", 10, 15*i+30);
                ready = true;
                
            } else 
            if(object.label === clothesPiece && showShirt == true){
                text("great! Tell me when you're ready and I'll rate the next item!", 10, 15*i+30);
                ready = true;

            }
            
        }
    }
}

function highlightBox(object) {
    push();
    noFill();
    stroke(255, 255, 255);
    rect(object.x, object.y, object.width, object.height);
    pop();
}