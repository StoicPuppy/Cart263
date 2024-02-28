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


//personal note

//a lot of this code is not optimally written.
//Im overusing boleans everywhere and it gets really complicated for no reason
//need to find a way to optimize the text so it shows up every time the user clicks and not like this.
*/

"use strict";

let state = 'loading';
let video;
let modelName = 'CocoSsd';
let cocossd;
let predictions = [];
//the CocoSsd model will any piece of clothing as 'person'.
let clothesPiece = 'person';

//store rating of shirt
let shirtRating = 0;
let showShirt = false;
//store rating of pants
let pantsRating = 0;
let showPants = false;
//store rating of socks
let socksRating = 0;
let showSocks = false;

//is player ready to continue
let ready = false;
let clothesShown = 0; //amount of clothes shown
let ReviewGiven = false; //did the computer review the oufit
//
let catFound = false; //did the computer find a cat
let bigCat = false; //big cat
let dogFound = false;//did the computer see a dog
let dogCount = 0; //increases with the amount of time the dog is on screen

/**
setup the canvas ad video
assigne cocossd as the objectDetector
start game in start state
*/
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    cocossd = ml5.objectDetector('cocossd', {}, function(){
        cocossd.detect(video, gotResults);
        state = 'start';
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
        loading(); //state of loading screen
    }else 
    if(state === 'running'){
        running(); //program is running
    } else 
    if (state === 'found'){
        pieceFound(); //program is waiting for user input
    } else 
    if(state === 'catMode'){
        catMode(); //secret catMode state
    } else 
    if(state === 'start'){
        start(); //start state with instructions
    } else 
    if(state === 'end'){
        dogDetectedError(); //end dog state
    } else 
    if(state === 'goodEnd'){
        catDectetedSuccess(); //end cat state
    }
}

//loading screen
function loading(){
    background(255);
    push();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Loading Oufit Rating Game...', width/2, height/2 );
    pop();
}

// start function with instructions for the user
function start(){
    background(255);
    image(video, 0, 0, width, height);
    textSize(24);
    textStyle(BOLD);
    text("Hi! I'm trying to help people pick out the best oufits.", 10, 30);
    text("Lets do something simple and only do three items.", 10, 60);
    text("Show me what you've got!", 10, 90);
    text("I'll give you my review at the end!", 10, 120);
}


function running() {
    background(255);
    image(video, 0, 0, width, height); //show video
    
    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];
            //if the computer sees a cat it goes crazy
            if(object.label === 'cat'){
                text("IS THAT A CAT???", 10, 90);
                catFound = true;
                console.log(catFound);
            } else //these if statements are a roundabout way of checking each and every piece of clothing shown so far
                   //so that new text can be displayed on the screen
            if(object.label === clothesPiece && showSocks == false && clothesShown == 2) {
                text("Finally show me your best pair of socks or shoes!", 10, 45);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object); //border box for clothes
                console.log("socks found!");
                console.log(object.confidence.toFixed(2) *100)
                socksRating = object.confidence.toFixed(1) *10;
                
            }else 
            if(object.label === clothesPiece && showPants == false && clothesShown == 1) {
                text("Now...show me a pair of pants or skirt or shorts!", 10, 45);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object); //border box for clothes
                console.log("pants found!");
                console.log(object.confidence.toFixed(2) *100)
                pantsRating = object.confidence.toFixed(1) *10;
                
            }else 
            if(object.label === clothesPiece && showShirt == false && clothesShown == 0){
                text("Lets see what your shirt looks like", 10, 45);
                text("Also, one piece of clothing at a time please!", 10, 75);
                textSize(24);
                textStyle(BOLD);
                highlightBox(object); //border box for clothes
                console.log("shirt found!");
                console.log(object.confidence.toFixed(2) *100)
                shirtRating = object.confidence.toFixed(1) *10;
                
            } else //once all three piece of clothing have been shown, the computer gives a review
             if (clothesShown >= 3){
                text("I think im ready to give my review!", 10, 45);
                text("I give your oufit a "+(shirtRating+pantsRating+socksRating)/3+" out of 10!", 10, 75);
                textSize(24);
                textStyle(BOLD);
                ReviewGiven = true;
            }else{
                text("ERROR ERROR TOO MANY ITEMS", 10, 150);
            }
        }
    }
}

function mousePressed(){
    if(state == 'end'){ //ends the game if theres too many dogs
        console.log("some people are scared of dogs");
    }else 
    if(state == 'goodEnd'){ //ends the game if theres a big cat
        console.log("you might want to reboot"); 
    } else
    if(state == 'start'){ //after start we run the program
        state = 'running';
    }else
    if(catFound == true){ //if theres a cat on screen we engage cat mode
        state = 'catMode';
    } else
    if(ready == true){ // when the player is ready we run the game again
        state = 'running';
        ready = false;
    } else 
    if(socksRating != 0){ //checks if the socks have been reviewed
        state = 'found';
        showSocks = true;
        clothesShown++;
        console.log("socks found");
    } else
    if(pantsRating != 0){ //checks if the pants have been reviewed
        state = 'found';
        showPants = true;
        clothesShown++;
        console.log("pants found");
    } else
    if(shirtRating != 0){ //checks if the shirt has been reviewed
        state = 'found';
        showShirt = true;
        clothesShown++;
        console.log("shirt found");
    }
    console.log('clicked');
}
//function that comes after the user confirms a piece of clothings. acts the same as running() only this function
//is just for displaying text and waiting for the user to get ready for the next part.
function pieceFound(){
    background(255);
    image(video, 0, 0, width, height);

    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];

            if(ReviewGiven == true){
                text("You're going to look as cute as a cat!", 10, 45);
                text("I love cats :)", 10, 75);
                //I love cats too
            } else
            if(object.label === clothesPiece && showSocks == true){
                text("Awesome! I think I'm ready to give you a review", 10, 75);
                ready = true; 
                //check if the player ready to show their next oufit piece 
            }else 
            if(object.label === clothesPiece && showPants == true){
                text("Amazing! Lets do the next one!", 10, 45);
                ready = true;
                //check if the player ready to show their next oufit piece
            } else
            if(object.label === clothesPiece && showShirt == true){
                text("Great! Tell me when you're ready to contine!", 10, 45);
                ready = true;
                //check if the player ready to show their next oufit piece 
            }
        }
    }
}
//secret cat function that overides the main game
function catMode(){
    background(255);
    image(video, 0, 0, width, height);
    if(dogCount == 0){
        text("I love cats show me your cat please", 10, 40);
    }
    if(predictions){
        for (let i = 0; i<predictions.length; i++){
            let object = predictions[i];
            textSize(36);
            if(object.label === 'dog' && dogCount >= 1000)
            {
                text("SYSTEM SHUTDOWN...", 10, 165); 
                text("TOO MUCH DOG...", 10, 315);
                state = 'end'; // end the game if the dog has been on screen for too long
            }else
            if(object.label === 'dog'){
                censorBox(object);
                text("You lied to me.", 10, 95);
                text("I dont like dogs.", 10, 135);
                text("show my your cat.", 10, 175);
                dogCount++; //if the player shows a dog for too long the game with crash eventually
                dogCountChecker();
            }else
            
            if(object.label === 'cat'){
                highlightBox(object);
                text("bring your cat closer to the screen!", 10, 105);
                textSize(36);
                if(object.width >= 550 && object.height >= 380)
                {
                    text("THATS A BIG CAT!", 10, 215);
                    textSize(54);
                    text("SYSTEM OVERLOADED...", 10, 165); 
                    text("TOO MUCH CUTENESS...", 10, 315);
                    textSize(80);
                    bigCat = true;
                    state = 'goodEnd'; //game ends if the cat gets too close to the screen
                }
            }
        }
    }
}
//function to draw borderbox around objects
function highlightBox(object) {
    push();
    noFill();
    stroke(255, 255, 255);
    rect(object.x, object.y, object.width, object.height);
    pop();
}
//function to censor any dogs on screen
function censorBox(object){
    push();
    stroke(0,0,0);
    rect(object.x, object.y, object.width, object.height);
    pop();
}
//checks dog count before crashing
function dogCountChecker(){
    if(dogCount >= 1000){
        console.log(dogCount);
    }
}


function dogDetectedError(){
    console.log("dog detected"); 
}

function catDectetedSuccess(){
    console.log("cat detected");
}