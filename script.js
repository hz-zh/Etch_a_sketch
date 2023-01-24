const container = document.querySelector('.container');
const input = document.querySelector('.input');
const toggleBoard = document.querySelector('.toggleBoard');
const random = document.querySelector('.random');

input.value = 'Enter a single board dimension between 3 and 60.';

let createBoardClicked = false;
let num;

toggleBoard.onclick = function() { 
   if (createBoardClicked == true) resetGameBoard();
   else getNum();
 };

input.onclick = function() {
   toggleBoard.style.display = 'flex';
   input.value = '';
   input.setAttribute('style', 'font-size: 30px; color: rgb(0, 0, 0);');
};

function resetInput() {
   input.setAttribute('style', 'color:rgba(0, 0, 0, 0.513); font-size: 18px;');
   input.value = 'Enter a single board dimension between 3 and 60.';
};

function getNum () {
   num = input.value;
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

   intervalID = setInterval(function(){
      createBoardClicked = true;

      const square = document.createElement('div');
      square.setAttribute('style', `background: rgb(54, 14, 14); width: 
      ${575/num}px; height: ${575/num}px; border: solid 0px;`);

      container.appendChild(square);
      container.setAttribute('style', `max-width: 575px`);

      i++;
      if (i == (num * num)) clearInterval(intervalID);

   });

   toggleBoard.textContent = 'reset board';
   brushTool();
};

function brushTool() {
   let brushCounter = 0;
   let brushCounter2 = 90;
   let brushCounter3 = 180;
   random.onclick = function() {
      brushCounter = randomAngle();
      brushCounter2 = randomAngle();
      brushCounter3 = randomAngle();
   };

   container.addEventListener('mouseover', 
   function(e) {
      let startingColor = [0, 0, 0]; 
      //if (brushCounter > 10) brushCounter = 100;
      //if (brushCounter2 > 500) brushCounter2 = 270;
     // if (brushCounter3 > 300) brushCounter3 = 0;
   
      startingColor[0] = oscillate0(brushCounter);
      startingColor[1] = oscillate1(brushCounter2);
      startingColor[2] = oscillate2(brushCounter3);

      brushCounter += 5;
      brushCounter2 += 7;
      brushCounter3 += 10;
      console.log(startingColor[0], startingColor[1], startingColor[2]);
      e.target.style.backgroundColor = `rgb(${colorPicker(startingColor[0])} 
      ${colorPicker(startingColor[1])} ${colorPicker(startingColor[2])})`;
    }, false); 
}

function randomAngle() {
   return Number(Math.floor(Math.random() * 180));
}

function colorPicker(color) {
   let newColor = Number(255 - color);
   return newColor;
};

function oscillate0(input) {
   let max = 255;
   let min = 0;
   let range = max - min;
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
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
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };

 function colorChanger() {
   let startingColor = [0, 0, 0]; 
   //if (brushCounter > 10) brushCounter = 100;
   //if (brushCounter2 > 500) brushCounter2 = 270;
  // if (brushCounter3 > 300) brushCounter3 = 0;

   startingColor[0] = oscillate0(brushCounter);
   startingColor[1] = oscillate1(brushCounter2);
   startingColor[2] = oscillate2(brushCounter3);

   brushCounter += 5;
   brushCounter2 += 7;
   brushCounter3 += 10;
   console.log(startingColor[0], startingColor[1], startingColor[2]);
   container.style.backgroundColor = `rgb(${colorPicker(startingColor[0])} 
   ${colorPicker(startingColor[1])} ${colorPicker(startingColor[2])})`;
 }; 


function resetGameBoard() {
   toggleBoard.style.display = 'none';
   let element = document.querySelector(".container");
   let intervalID;

         intervalID = setInterval(function(){
            element.removeChild(element.firstChild);
            if (!element.firstChild) clearInterval(intervalID);
         }, (.5/num));

   createBoardClicked = false;
   resetInput();
   toggleBoard.textContent = 'create board';
}
