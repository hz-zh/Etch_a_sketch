const container = document.querySelector('.container');
const toggleBoard = document.querySelector('.toggleBoard');
const random = document.querySelector('.random');
const content = document.querySelector('.content');
const mystery = document.querySelector('.mystery');
const expo = document.querySelector('.expo');
const slider = document.getElementById("myRange");
const sliderValue = document.querySelector(".sliderValue");

let createBoardClicked = false;
let brushActive = false;
let expoClicked = false;
let mysteryClicked = false;
let num;

sliderValue.textContent = slider.value; 

slider.oninput = function() {
   sliderValue.textContent = this.value;
 };

toggleBoard.onclick = function() { 
      if (createBoardClicked) resetGameBoard();
      else if (!createBoardClicked) getNum();
   return;
 };

 random.onclick = function() {
   oscCounter1 = randomAngle();
   oscCounter2 = randomAngle();
   oscCounter3 = randomAngle();
};

mystery.onclick = function() {
   brushActive = true;
   mysteryClicked = !mysteryClicked;
   if (mysteryClicked) mystery.style.backgroundColor = 'rgb(50, 41, 108)';
   else if (!mysteryClicked) mystery.style.backgroundColor = 'rgba(26, 96, 1, 0.604)';

   let i = 0;
   let intervalID;
   intervalID = setInterval(function(){
      brushActive = true;
      colorPixels(i);
      i++;
      if (i > 350 || !mysteryClicked) clearInterval(intervalID);
   }, 110);
};

expo.onclick = function() {
   expoClicked = !expoClicked;
   if (expoClicked) expo.style.backgroundColor = 'rgb(50, 41, 108)';
   else if (!expoClicked) expo.style.backgroundColor = 'rgba(26, 96, 1, 0.604)';
};

function colorPixels(i) {
   NodeList.prototype.forEach = Array.prototype.forEach;
   let children = container.childNodes;
   if (expoClicked) {
      children.forEach(function(item){
         if (mysteryClicked) colorChanger(item, 1*i, 3*i, 6*i);
      }); 
   }
   else {
      children.forEach(function(item){
         if (mysteryClicked) colorChanger(item, i, i, i);
      }); 
   }
   brushActive = false;
};

function getNum () {
   num = slider.value;
   if (num > 60 || num < 3 || 
      num == 'Enter a single board dimension between 3 and 60.' 
      || typeof(num) === 'NaN')
      { 
      alert('Please enter a value between 3 and 60.');
      resetInput();
      return;
      }
   makeSquares(num);
};

function makeSquares (num) {
   let i = 0;
   let intervalID;

   for (i = 0; i < (num * num); i++) {
      createBoardClicked = true;

      const square = document.createElement('div');
      square.setAttribute('style', `background: rgb(0, 0, 0);width: 
      ${600/num}px; height: ${600/num}px; border: solid 0px;`);

      container.appendChild(square);
      container.setAttribute('style', `max-width: 600px;`);
   };

   toggleBoard.textContent = 'reset board';
   brushTool();
   return;
};

let oscCounter1 = 0;
let oscCounter2 = 90;
let oscCounter3 = 40;

function brushTool() {
   let i = 0;
   container.addEventListener('mouseover', 
   function(e) { 
      colorChanger(e, 1, 4, 9)
      i++;
   }, false);
      
};

function randomAngle() {
   return Number(Math.floor(Math.random() * 180));
};

 let startingColor = [0, 0, 0]; 

function colorChanger(e, increm1, increm2, increm3) {
   startingColor[0] = oscillate1(oscCounter1);
   startingColor[1] = oscillate2(oscCounter2);
   startingColor[2] = oscillate3(oscCounter3);

   oscCounter1 += increm1;
   oscCounter2 += increm2;
   oscCounter3 += increm3;
   //console.log(startingColor[0], startingColor[1], startingColor[2]); 
   if (brushActive) { e.style.backgroundColor = `rgb(${startingColor[0]} ${startingColor[1]} 
   ${startingColor[2]})`;
   }
   else {
   e.target.style.backgroundColor = `rgb(${startingColor[0]} ${startingColor[1]} ${startingColor[2]})`;
   }
 }; 

 function oscillate1(input) {
   let max = 255;
   let min = 0;
   let range = max - min;
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };
 function oscillate2(input) {
   let max = 255;
   let min = 0;
   let range = max - min;
   console.log(0 + Math.abs(((input + range) % (range * 2)) - range));
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };
 function oscillate3(input) {
   let max = 255;
   let min = 0;
   let range = max - min;
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };

function resetGameBoard() {
   let element = document.querySelector(".container");

         while (element.firstChild) {
            element.removeChild(element.firstChild);
         }

   createBoardClicked = false; 
   toggleBoard.textContent = 'create board';
}
