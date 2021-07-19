// Let's define an ID for the deck so we can use it (it will be provided by the API):
let deckId
// Let's define variables for the computer's and player's scores:
let computerScore = 0
let myScore = 0
// Now we access all the elements from our HTML file:
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

// We will define a function for when we click the button for a new deck:
function handleClick() {
    // It will fetch an play cards API for a new deck:
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        // Then we change the response body from JSON to Javascript:
        .then(res => res.json())
        // And then we have the data so we can work with its object's variables (remaining, deck_id, etc)
        .then(data => {
            // We will set the remainingText to the number of cards remaining in the deck:
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            // And we asign the deckId:
            deckId = data.deck_id
            console.log(deckId)
        })
        // Finally, if there was a finished game we need to reset the game so we call resetFunction():
        resetFunction()

}
// We now code an event listener for the draw button:
newDeckBtn.addEventListener("click", handleClick)

// Let's define a function for when we need to reset the game's values:
function resetFunction() {
    // In case the draw button is disabled, let's undo it:
    drawCardBtn.disabled = false
    // If there's something else in the headers, let's show the default text:
    header.textContent = "Game of War"
    // And we also reset all the other variables to 0, since the game starts again:
    computerScore = 0
    myScore = 0
    computerScoreEl.textContent = "Computer score = 0"
    myScoreEl.textContent = "My score = 0"
}

// Now we create an event listener for the draw button:
drawCardBtn.addEventListener("click", () => {
    // We will also use fetch to draw 2 cards from the deck we have already.
    // Note how we insert the deckId and choose the number of cards drew (2):
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            // We will update the remaining cards text:
            remainingText.textContent = `Remaining cards ${data.remaining}`
            // And add those cards image to our card-slot divs, using the children property in the cardsContainer:
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `

            // We define the winner's text by calling determinCardWinner function:
            const winnerText = determinCardWinner(data.cards[0], data.cards[1])
            // And update the header text:
            header.textContent = winnerText

            // Finally we code a if else statement to show the final message
            if (data.remaining === 0) {
                // And also disable the draw button:
                drawCardBtn.disabled = true
                if ( computerScore > myScore) {
                    header.textContent = "The final winner is the computer.. play again?"
                } else if ( computerScore < myScore) {
                    header.textContent = "The final winner is YOU!"
                } else {
                    header.textContent = "You both tied"
                }
            }
        })
})

// Next, we define a function that takes to cards and returns a message depending on the highest card:
function determinCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    // We now get the index of each card and save it in variables. Note that ".value" comes from the fetch data:
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    // Now depending on each card is highest we return a different message:
    // If the computer's card index is higher:
    if(card1ValueIndex > card2ValueIndex) {
        // We increment computer's score:
        computerScore++
        // And update the score display:
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    // If the player's card index is higher:
    } else if (card1ValueIndex < card2ValueIndex) {
        // We increment the player's score:
        myScore++
        // And update the score display:
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    // In case of draw we return a different message:
    } else {
        return "War!"
    }
}