// Create the game variables:
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");

// Create function to show the Reset Button:
function showResetButton() {
    rollBtn.style.display = "none";
    resetBtn.style.display = "block"
}

// Create an event listener for the Roll Button:
rollBtn.addEventListener("click", function(){
    // Create random number between 1 and 6:
    const randomNumber = Math.floor(Math.random() * 6) + 1

    // Check if it is player's 1 turn:
    if (player1Turn) {
        // Then add the new random number to player1Score:
        player1Score += randomNumber;
        // Change the text with that score:
        player1Scoreboard.textContent = player1Score;
        // Show the number in player's 1 dice:
        player1Dice.textContent = randomNumber;
        // Remove "active" class and add it to player 2:
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        // Change the message:
        message.textContent = "Player 2 Turn";
    }

    // Check if it is player's 2 turn:
    else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";

    }

    // Check if any of the players have reached 20 points so we end the game and call showResetButton():
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳";
        showResetButton()
    } else if(player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉";
        showResetButton()
    }


    /* On each click of the button, we must change the boolean of player1Turn so we make it
     either true or false. Very important for the logic of our game*/
    player1Turn = !player1Turn;
})

// Create event listener for the the reset button:
resetBtn.addEventListener("click", function(){
    reset()
})

// And let's define the reset() function, where every element returns to its original state (like refreshing the page)
function reset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    message.textContent = "Player 1 Turn";
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
}