// Define player object:
let player = {
    name: "Pedro",
    chips: 1500
}

// Define empty array of cards:
let cards = []
// Define sum of the cards:
let sum = 0
// Define variable that indicates if the player has blackjack:
let hasBlackjack = false
// Define variable that indicates if the player is still alive in the game:
let isAlive = false
// Define message to show when game starts:
let message = ""
// Get message element:
let messageEl = document.getElementById("message-el")
// Get sum element:
let sumEl = document.getElementById("sum-el")
// Get cards element:
let cardsEl = document.getElementById("cards-el")
// Get player element:
let playerEl = document.getElementById("player-el")

// Change playerEl text to the player's name and chips:
playerEl.textContent = player.name + ": $" + player.chips

// Define function that returns a random number for a card:
function getRandomCard() {
    let randomNumber = Math.floor(Math.random()*13) + 1
    // If cards 11, 12, and 13 are generated, return 10:
    if (randomNumber > 10) {
        return 10
    }
    // If card 1 is generated, return 11:
    if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

// Define function that starts game, called by the START GAME button:
function startGame() {
    isAlive = true
    // Create 2 variables that represent 2 cards:
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    // Populate cards array:
    cards = [firstCard, secondCard]
    // Add the two cards:
    sum = firstCard + secondCard
    // Call renderGame function:
    renderGame()
}

// Define a function to render the game results on the page:
function renderGame() {
    // Set the cards element to the cards generated:
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    // Set the sum element to the sum of the cards:
    sumEl.textContent = "Sum: " + sum
    // Show specific messages depending on the sum:
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack"
        // In this case we set hasBlackjack to true:
        hasBlackjack = true
    } else {
        message = "You're out of the game"
        // In this case we set isAlive to false:
        isAlive = false
    }
    // Set the message element to one of the messages above:
    messageEl.textContent = message
}

// Define a function to generate new card when NEW CARD button is clicked:
function newCard() {
    // This function will only run if player is still alive and did not get Blackjack:
    if (isAlive === true && hasBlackjack === false) {
        // Generate new card and add it to the sum:
        let card = getRandomCard()
        sum += card
        // push the new card to the cards array:
        cards.push(card)
        // And call the renderGame function to show the new results:
        renderGame()
    }
}