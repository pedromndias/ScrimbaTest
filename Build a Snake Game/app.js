// Get the grid element and save it a variable:
const grid = document.querySelector('.grid')
// Get the start button element and save it in a vaiable:
const startButton = document.getElementById('start')
// Get the score element and save it in a variable:
const scoreDisplay = document.getElementById('score')
// Get the score text element to adjust its margin when game is over:
const scoreText = document.getElementById('scoreText')
// Get the game over element and save it in a variable:
const gameOver = document.getElementById('gameOver')
// Create an array for our squares:
let squares = []
// Create an array for our snake. The first value is the snake's head so it has higher value:
let currentSnake = [2,1,0]
// Create a direction variable, which will change during the game:
let direction = 1
// Define a width variable which represents a side of the grid (10 squares):
const width = 10
// Create an index to where we will display the apple:
let appleIndex = 0
// Set a time interval for the movement of the snake:
let intervalTime = 1000
// Define a variable speed which we will use on each level:
let speed = 0.9
// Define a timeId for the intervalTime:
let timerId = 0

// Let's define a function that creates our grid:
function createGrid() {
    // Let's use a for loop to create our 100 (width*width) squares:
    for (let i=0; i < width*width; i++) {
        // Create each element square:
        const square = document.createElement('div')
        // Now we add the 'square' class so each square has 20px*20px size
        square.classList.add('square')
        // Then we put the element into our grid:
        grid.appendChild(square)
        // And finally populate our squares array:
        squares.push(square)
    }
}
// Call the function so the grid is creating when the page is launched:
createGrid()

// Having created the grid we can give the class 'snake' o the indexes corresponding to currentSnake:
// For this we can use a forEach loop that takes each index of currentSnake and passes it in squares array:
currentSnake.forEach(index => squares[index].classList.add('snake'))

// Let's generate a random apple in the grid:
function generateApple() {
    // Let's use a do while loop to generate a random index until the square does not have the class 'snake':
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
    
}
// We call the function when we launch the page:
generateApple()


// Let's define our move function:
function move() {
    // First we need to check if the snake has hit one of the walls or itself and stop it:
    if (
        // Hits the bottom wall. We check if the head is at the last line of the grid (in our case numbers between 90 and 99), moving downwards:
        (currentSnake[0] + width >= width*width && direction === width) ||
        // Hits the right wall. We check if the snake head is at any number width-1 (in our case all the 9's), and moving right:
        (currentSnake[0] % width === width-1 && direction === 1) ||
        // Hits the left wall. We check if the snake head is at any number 0, moving left:
        (currentSnake[0] % width === 0 && direction === -1) ||
        // Hit the top wall. We check if the snake head is at the top line (numbers from 0 to 9), moving up:
        (currentSnake[0] - width < 0 && direction === -width) ||
        // Hits itself. We check if the snake head moves toward another square with class 'snake':
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        // We show the "Game Over" text:
        gameOver.textContent = "Game Over"
        // And adjust the margin bottom of the score element:
        scoreText.classList.add("adjustScoreText")
        // If any of the above happens we stop the snake (clear the setInterval):
        return clearInterval(timerId)

    }
    

    // When the snake moves we need to pop the last item of the snake array:
    const tail = currentSnake.pop()
    // And remove the 'snake' class from that square:
    squares[tail].classList.remove('snake')
    // Then we add one square in the direction we are heading:
    currentSnake.unshift(currentSnake[0] + direction)
    // And finally we style it:
    squares[currentSnake[0]].classList.add('snake')

    // If the snake head gets an apple:
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // First we remove the class 'apple'
        squares[currentSnake[0]].classList.remove('apple')
        // We grow the snake by giving the class 'snake' to the tail:
        squares[tail].classList.add('snake')
        // And the push it to the snake array:
        currentSnake.push(tail)
        // Generate new apple:
        generateApple()
        // Increment the score by 1:
        score++
        // And display it:
        scoreDisplay.textContent = score
        // And we speed up the snake to increase difficulty. First we clear the previous setInterval:
        clearInterval(timerId)
        // Then we multiply it by our speed (0.9) so each movement happens in less time:
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
}




// Let's define the function to start the game. Mainly, we have to reset our variables:
function startGame() {
    // When we start the game we must remove the class 'snake' to our currentSnake and add reset it (done at the end of the function):
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    // We also have to remove the apple and generate a new on (done at the end of the function):
    squares[appleIndex].classList.remove('apple')
    // Clear the current intervalTime:
    clearInterval(timerId)
    // Reset our snake to the original:
    currentSnake = [2,1,0]
    // Reset the score and add display 0 in the browser:
    score = 0
    scoreDisplay.textContent = score
    // Reset the direction:
    direction = 1
    // Reset the intervalTime:
    intervalTime = 1000
    // Generate new apple:
    generateApple()
    // Hide the text for game over:
    gameOver.textContent = ""
    // Adjust the margin-bottom for the score text:
    scoreText.classList.remove("adjustScoreText")
    // Re add the class snake to our currentSnake (now the original again):
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    // And finally restart the setInterval with its origianl intervalTime:
    timerId = setInterval(move, intervalTime)
}

/* Let's create the function to control the snake's movement. It returns the value
of the variable direction, which is updated everytime the move function is called
by the setInterval. If we don't press any arrow key, direction will be always 1
and the snake will only move right.
Note the argument 'e' so we get access to the keyboard keys. */
function control(e) {
    // Right arrow (key number 39)
    if (e.key === "ArrowRight") {
        // If moving right, we increment 1 in the currentSnake array
        direction = 1
    } 
    // Up arrow (key number 38)
    else if (e.key === "ArrowUp") {
        // If moving up, we remove -10 to the currentSnake array (square[] is a 10x10 grid)
        direction = -width
    }
    // Left arrow (key number 37)
    else if (e.key === "ArrowLeft") {
        // If moving left, we remove 1 in the currentSnake array
        direction = -1
    }
    // Down arrow (key number 40)
    else if (e.key === "ArrowDown") {
        // If moving down, we increment 10 to the currentSnake array
        direction = +width
    }

}

// Finally, we add an event listener for "keyup" that calls the control function to check what to do with the keys:
document.addEventListener("keyup", control)

// Add an event listener for our startButton:
startButton.addEventListener('click', startGame)