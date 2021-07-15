// Let's define our width:
const width = 28
// Get the grid:
const grid = document.querySelector('.grid')
// And the score display:
const scoreDisplay = document.getElementById('score')
// Let's create an array for the squares:
let squares = []
// And set the score to 0:
let score = 0

// The next code is a chosen layout for the game board, where:
// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// Now let's code a function to create our board:
function createBoard() {
    // We'll use a for loop to iterate through all the elemtents of the layout array:
    for (let i = 0; i < layout.length; i++) {
        // For each element we create a square:
        const square = document.createElement('div')
        // Append the square to our grid:
        grid.appendChild(square)
        // And push the square to our squares array:
        squares.push(square)

        // Now we color each square depending on its number, by adding the corresponding class:
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
// And we call the function so the board is created:
createBoard()


// Now we will make pacman move with the arrow keys. the key numbers are:
// down - 40
// up key - 38
// left - 37
// right - 39
// First let's define pacman's starting position:
let pacmanCurrentIndex = 490;
// So we add that style to that square:
squares[pacmanCurrentIndex].classList.add('pacman')
// Now we create the function to control pacman (note the e, event for the keys)
function control(e) {
    // First thing we do when moving pacman is removing the style from the previous square:
    squares[pacmanCurrentIndex].classList.remove('pacman')
    // Now we have 4 different scenarios, depending on the key pressed:
    switch (e.keyCode) {
        // If we press the down key:
        case 40:
            // By pressing down we are advancing 28(width) squares. So we must
            // check if there's no ghost, wall or end of the board:
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width // does not exceed the south board wall
            )
                // If all good then we add one width to the current index:
                pacmanCurrentIndex += width
            break
        // If we press the up key:
        case 38:
            // By pressing up we are moving back 28(width) squares. We also need to check 
            // that there is no ghost, wall or the start of the board:
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0 // does not exceed the north board wall
            )
                // If all good then we remove one width to the current index:
                pacmanCurrentIndex -= width
            break
        // If we press left:
        case 37:
            // By pressing left we are moving back one square. We also need to check that
            // there is no ghost, wall or the left board wall:
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0 // If the remainder is 0 then we are on the left board wall
            )
                // If all good, we remove 1 from the current index:
                pacmanCurrentIndex -= 1
            // Since we have a special passage, if pacman is on 364 we go to 391:
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
        // If we press right:
        case 39:
            // By pressing right, we are moving one square. We also need to check that there
            // is no ghost, wall or right board wall:
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width -1 // Does not exceed the rigth wall
            )
            // If all good we advance 1 from the current index:
            pacmanCurrentIndex += 1
            // Once again we have that special passage so if pacman is in square 391 it goes to 364:
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break
    } // End og the switch cases
    // Since we removed the pacman style from the previous square, we need to add it to the new position:
    squares[pacmanCurrentIndex].classList.add('pacman')
    // We call pacDotEaten, powerPelletEaten(), checkForWin() and checkForGameOver():
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}
// And we create the event listener for the keys to call the control function:
document.addEventListener('keyup', control)


// Let's define a function for when pacman eats a pac dot:
function pacDotEaten() {
    // If the pacman's current square has the pac dot style, we remove it and add 1 to the score:
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

// Let's define a function for when pacman eats a power pellet:
function powerPelletEaten() {
    // We need to check if pacman's current square has the power pellet style:
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        // If it has, then we remove the style and add 10 to the score:
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score +=10
        scoreDisplay.innerHTML = score
        // We also need to activate the isScared mode on each ghost:
        ghosts.forEach(ghost => ghost.isScared = true)
        // And use setTimeout to unscare the ghosts after 10 seconds:
        setTimeout(unScareGhosts, 10000)
    }
}

// We now define the unScareGhosts function:
function unScareGhosts() {
    // It just changes the isScared to false again:
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Let's define a class Ghost where we define the parameters for a new ghost:
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN // This will be used to break the time interval
    }
}

// Using the Ghost class and constructor, we will create 4 ghosts.
// Note how the className matches with the style classes in our CSS file.
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// Using each ghost startIndex we can draw them on our board grid:
ghosts.forEach(ghost => {
    // Each one will have a different color depending on its className:
    squares[ghost.currentIndex].classList.add(ghost.className)
    // We will also add a general class of "ghost" to use it in other functions:
    squares[ghost.currentIndex].classList.add('ghost')
})

// Now we call a function to move all ghosts:
ghosts.forEach (ghost => moveGhost(ghost))
// And we define that function:
function moveGhost(ghost) {
    // Let's define all direction which a ghost can move:
    const directions = [-1, +1, -width, +width]
    // Now we randomly assign one of those directions to a variable:
    let direction = directions[Math.floor(Math.random() * directions.length)]

    // Then we create a time interval for the ghosts to move:
    ghost.timerId = setInterval(function() {
        // The ghosts should only move to a square without wall or other ghosts:
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            // If all good, first we remove the classes from the square:
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            // And we add the direction to the current index:
            ghost.currentIndex += direction
            // And now the classes to new square:
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')

        } // If not, we randomly try another direction:
        else direction = directions[Math.floor(Math.random() * directions.length)]

        // If the ghost is currently scared we add the style class to it:
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        // If the ghost is currently scared and pacman is on the same square:
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            // we remove the ghost's classnames:
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // And we move the ghost back to its original position:
            ghost.currentIndex = ghost.startIndex
            // And add a score of 100:
            score +=100
            scoreDisplay.innerHTML = score
            // And re-add the classnames for the new position:
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        // we also check if it is game over:
        checkForGameOver()

    // And set the interval for the specific ghost:
    }, ghost.speed)
}

// Now let's code a function to check if it's game over:
function checkForGameOver() {
    // If pacman is in a square with a ghost and that ghost is not scared:
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
        // Then we stop all ghost from moving:
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // We remove the event listener from the control function:
        document.removeEventListener('keyup', control)
        // And we display a game over message:
        scoreDisplay.innerHTML = 'You LOSE'
    }
}

// Finally we code a function to check if the player has won:
function checkForWin() {
    // If the score reaches 273:
    if (score === 273) {
        // Then we stop the ghosts:
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // We remove the event listener from the control function:
        document.removeEventListener('keyup', control)
        // And we display a win message:
        scoreDisplay.innerHTML = 'You WON'
    }
}