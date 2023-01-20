const container = document.querySelector('.container');
const input = document.querySelector('.input');
const createBoard = document.querySelector('.createBoard');
const resetBoard = document.querySelector('.resetBoard');

input.value = 'Enter a single board dimension between 3 and 15.';

let createBoardClicked = false;

createBoard.onclick = function() { 
   if (createBoardClicked == true) return;
   else getNum();
 };

resetBoard.onclick = function() { resetGameBoard() };

input.onclick = function() {
   input.value = '';
   input.setAttribute('style', 'font-size: 30px; color: rgb(0, 0, 0);');
};

function resetInput() {
   input.setAttribute('style', 'color:rgba(0, 0, 0, 0.513); font-size: 18px;');
   input.value = 'Enter a single dimension between 3 and 15.';
};

function makeSquares (num) {
   for (i = 0; i < (num * num); i++) {
      const square = document.createElement('div');

      square.setAttribute('style', 'background: blue; width: 2em; height: 2em');
      square.setAttribute('id', 'boardDiv');

      container.setAttribute('style', `max-width: ${(num * 2) + (num * .5) - 0.5}em;`);

      container.appendChild(square);
   }
};

function getNum () {
   let num = input.value;
   if (num > 15 || num < 3) { 
      alert('Please enter a value between 3 and 15.');
      resetInput();
      return;
   }
   makeSquares(num);
   createBoardClicked = true;
};

function resetGameBoard() {
   let element = document.querySelector(".container");
   while (element.firstChild) {
      element.removeChild(element.firstChild)
    };

   createBoardClicked = false;
}
