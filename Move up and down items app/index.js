// This app will move items from one array to another, displaying them in two different areas

// Get the elements from the page and save them in variables:
const buttonDown = document.querySelector('#down')
const buttonUp = document.querySelector('#up')
const buyListDisplay = document.querySelector('#first-list')
const fridgeListDisplay = document.querySelector('#second-list')

// Define our arrays:
const buyList = ['avocado', 'cheese', 'salad', 'onion', 'juice']
const fridge = []

// Populate our fridge array:
fridge.push('chocolate', 'ioghurts', 'milk', 'apples', 'lettuce')

// Change item from buyList to fridge:
let itemOut = buyList.shift()
fridge.unshift(itemOut);

// Add function that moves item from fridge to buyList:
function moveUp() {
    let item = fridge.pop()
    buyList.push(item)
    buyListDisplay.innerHTML = buyList
    fridgeListDisplay.innerHTML = fridge;
}

// Add event listener for the Move Up button:
buttonUp.addEventListener('click', moveUp)

// Add function that moves item from buyList to fridge:
function moveDown() {
    let item = buyList.pop()
    fridge.push(item);
    buyListDisplay.innerHTML = buyList
    fridgeListDisplay.innerHTML = fridge;
}

// Add event listener for the Move Down button:
buttonDown.addEventListener('click', moveDown)

// Display items on correspondant areas in the page:
buyListDisplay.innerHTML = buyList
fridgeListDisplay.innerHTML = fridge;