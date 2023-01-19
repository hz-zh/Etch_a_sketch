const container = document.querySelector('.container');
const input = document.querySelector('.input');
const createBoard = document.querySelector('.createBoard');
const resetBoard = document.querySelector('.resetBoard');

input.value = 'Enter a single dimension between 3 and 15.';

createBoard.onclick = function() { getNum() };
resetBoard.onclick = function() { resetBoard() };
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
};
