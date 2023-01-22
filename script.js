const container = document.querySelector('.container');
const input = document.querySelector('.input');
const toggleBoard = document.querySelector('.toggleBoard');

input.value = 'Enter a single board dimension between 3 and 18.';

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
   input.value = 'Enter a single board dimension between 3 and 18.';
};

function makeSquares (num) {
   let i = 0;
   let intervalID;
   
   intervalID = setInterval(function(){
      createBoardClicked = true;
      const square = document.createElement('div');

      square.setAttribute('style', `background: rgb(54, 14, 14); width: ${575/num}px; height: ${575/num}px; border: solid 0px;`);

      container.appendChild(square);

      container.setAttribute('style', `max-width: 575px`);

      i++;
      if (i == (num * num)) clearInterval(intervalID);
   });
   toggleBoard.textContent = 'reset board';

   let colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
   container.addEventListener('mouseover', function(event) {
      event.target.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }, false); 
};

function getNum () {
   num = input.value;
   if (num > 60 || num < 3 || 
      num == 'Enter a single board dimension between 3 and 18.') 
      { 
      alert('Please enter a value between 3 and 18.');
      resetInput();
      return;
      }
   makeSquares(num);
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
