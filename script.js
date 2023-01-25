const container = document.querySelector('.container');
const input = document.querySelector('.input');
const toggleBoard = document.querySelector('.toggleBoard');
const random = document.querySelector('.random');
const content = document.querySelector('.content');
const mystery = document.querySelector('.mystery');

input.value = 'Enter a single board dimension between 3 and 60.';

let createBoardClicked = false;
let brushActive = false;
let num;

input.onclick = function() {
   toggleBoard.style.display = 'flex';
   input.value = '';
   input.setAttribute('style', 'font-size: 30px; color: rgb(0, 0, 0);');
};

toggleBoard.onclick = function() { 
   if (createBoardClicked == true) resetGameBoard();
   else getNum();
 };

 random.onclick = function() {
   brushCounter1 = randomAngle();
   brushCounter2 = randomAngle();
   brushCounter3 = randomAngle();
};

mystery.onclick = function() {
   brushActive = true;

   let i = 0;
   let intervalID;
   intervalID = setInterval(function(){
      brushActive = true;
      colorPixels(i);
      i++;
      if (i > 350) clearInterval(intervalID);
   }, 110);
}

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
      square.setAttribute('style', `background: rgb(0, 0, 0);width: 
      ${600/num}px; height: ${600/num}px; border: solid 0px;`);

      container.appendChild(square);
      container.setAttribute('style', `max-width: 600px;`);
      
      i++;
      if (i == (num * num)) clearInterval(intervalID);
   });

   toggleBoard.textContent = 'reset board';
   brushTool();
};

let brushCounter1 = 0;
let brushCounter2 = 90;
let brushCounter3 = 180;

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
   startingColor[0] = oscillate0(brushCounter1);
   startingColor[1] = oscillate1(brushCounter2);
   startingColor[2] = oscillate2(brushCounter3);

   brushCounter1 += increm1;
   brushCounter2 += increm2;
   brushCounter3 += increm3;
   //console.log(startingColor[0], startingColor[1], startingColor[2]); 
   if (brushActive) { e.style.backgroundColor = `rgb(${startingColor[0]} ${startingColor[1]} 
   ${startingColor[2]})`;
   }
   else {
   e.target.style.backgroundColor = `rgb(${startingColor[0]} ${startingColor[1]} ${startingColor[2]})`;
   }
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
   console.log(0 + Math.abs(((input + range) % (range * 2)) - range));
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };
 function oscillate2(input) {
   let max = 255;
   let min = 0;
   let range = max - min;
   return 0 + Math.abs(((input + range) % (range * 2)) - range);
 };

 function colorPixels(i) {
   NodeList.prototype.forEach = Array.prototype.forEach;
   let children = container.childNodes;
   children.forEach(function(item){
      colorChanger(item, 1+i, 2+i, 4+i);
   }); 
   brushActive = false;
};

function resetGameBoard() {
   toggleBoard.style.display = 'none';
   let element = document.querySelector(".container");

         while (element.firstChild) {
            element.removeChild(element.firstChild);
         }

   createBoardClicked = false;
   resetInput();
   toggleBoard.textContent = 'create board';
}
