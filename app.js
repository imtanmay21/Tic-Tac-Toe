// UI Vars
const board = document.getElementById('board');
const boxes = Array.from(document.querySelectorAll('.box'));
const rows = Array.from(document.querySelectorAll('.row'));
const playBox = document.querySelector('.play-box');
const text = document.querySelector('.play-box h4');

// Program vars
let boxesFilled = 0;
let player1Turn = true;
let player2Turn = false;
let turn1Text = `Player 1's Turn (X)`;
let turn2Text = `Player 2's Turn (O)`;
let row1 = Array.from(rows[0].children);
let row2 = Array.from(rows[1].children);
let row3 = Array.from(rows[2].children);

// Classes
class Player {

    constructor(id, sign) {
        this.id = id;
        this.win = false;
        this.sign = sign
    }

}

// Create objects
const player1 = new Player(1, 'X');
const player2 = new Player(2, 'O');

// Initializing function
playGame();

function playGame() {

    text.innerHTML = turn1Text;

    // Emptying all boxes
    boxes.forEach(function (box) {
        box.innerText = '';
    })

    // Adding event listeners
    boxes.forEach(function (box) {
        box.addEventListener('click', fillBox);
    })
}

// Filling box function
function fillBox(e) {

    // If turn is of player 1 and if its empty
    if (player1Turn && (e.target.innerText.length == 0 || e.target.innerText == '')) {

        // Telling which players turn is next
        text.innerHTML = turn2Text;

        // Filling the box with the sign
        e.target.innerText = player1.sign;

        // No of boxes increased
        boxesFilled++;

        // Changing turns
        player1Turn = false;
        player2Turn = true;

        // Checking win everytime
        player1.win = checkWin(player1.sign);

        // Check if player 1 wins
        if (player1.win) {
            showWin(player1.id);
        }

    }
    // If turn is of player 1 and if its empty
    if (player2Turn && (e.target.innerText.length == 0 || e.target.innerText == '')) {

        // Telling which players turn is next
        text.innerHTML = turn1Text;

        // Filling the box with the sign
        e.target.innerText = player2.sign;

        // No of boxes increased
        boxesFilled++;

        // Changing turns
        player2Turn = false;
        player1Turn = true;

        // Checking win everytime
        player2.win = checkWin(player2.sign);

        // Check if player 2 wins
        if (player2.win) {
            showWin(player2.id);
        }
    }

    // Checking draw condition
    if (boxesFilled == 9 && player1.win == false && player2.win == false) {
        showWin(0);
    }

}

// Check win condition
function checkWin(sign) {

    // Checking all win conditions
    if (row1[0].innerText == sign && row1[1].innerText == sign && row1[2].innerText == sign) {
        return true;
    } else if (row2[0].innerText == sign && row2[1].innerText == sign && row2[2].innerText == sign) {
        return true;
    } else if (row3[0].innerText == sign && row3[1].innerText == sign && row3[2].innerText == sign) {
        return true;
    } else if (row1[0].innerText == sign && row2[0].innerText == sign && row3[0].innerText == sign) {
        return true;
    } else if (row1[1].innerText == sign && row2[1].innerText == sign && row3[1].innerText == sign) {
        return true;
    } else if (row1[2].innerText == sign && row2[2].innerText == sign && row3[2].innerText == sign) {
        return true;
    } else if (row1[0].innerText == sign && row2[1].innerText == sign && row3[2].innerText == sign) {
        return true;
    } else if (row1[2].innerText == sign && row2[1].innerText == sign && row3[0].innerText == sign) {
        return true;
    } else {
        return false;
    }
}

// Show win function
function showWin(id) {

    // If id is 0 show draw
    if (id == 0) {
        text.innerHTML = `Draw`;
    } else {
        text.innerHTML = `Player ${id} wins !`;
    }

    // Creating play again button
    const playBtn = document.createElement('a');
    playBtn.innerHTML = 'Play Again !';
    playBtn.className = 'btn';

    // Appending it to the box
    playBox.append(playBtn);

    // Adding event listener to the play button
    playBtn.addEventListener('click', function () {

        // Removing the play button
        playBtn.remove();

        // Initialzing turns
        player1Turn = true;
        player2Turn = false;

        // Initializing boxes filled
        boxesFilled = 0;

        // Playing again
        playGame();
    });

}