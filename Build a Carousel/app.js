// Get the images and create an array with them:
const slides = document.getElementsByClassName("carousel-item");
// Define a position for the images:
let slidePosition = 0;
// Set total number of images to the array's length:
const totalSlides = slides.length;
// Get the span for the image number:
let span = document.getElementById("slideNumber");
// Let's create a variable for the slideNumber and set it to 1:
let slideNumber = 1;

// Create click events on the buttons that call functions to change the images:
document.getElementById("prev").addEventListener("click", moveToPrevSlide)
document.getElementById("next").addEventListener("click", moveToNextSlide)

// Create a function that hides all the images:
function hideAllSlides() {
    // A "for of" loop will remove all the "visible" classes and add "hidden"
    for (let slide of slides) {
        slide.classList.remove("visible");
        slide.classList.add("hidden");
    }
}

let timer = setInterval(moveToNextSlide, 4000)

// Define moveToNextSlide function:
function moveToNextSlide() {
    // So when we press the "next" button we hide all the images:
    hideAllSlides();
    // If we are on the last image then we will show the first one (index 0):
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        // Otherwise we increment the position
        slidePosition++;
    }
    // And update the "visible" class on the showing image:
    slides[slidePosition].classList.add("visible");

    // Now let's change the Destination Number:
    // If the we are showing the last image of the array, the next one will be 1:
    if (slideNumber === totalSlides) {
        slideNumber = 1;
    } else {
        // Otherwise increment the number:
        slideNumber++;
    }
    console.log(slideNumber)
    // Update the slideNumber in the image description:
    span.textContent = slideNumber;
}

// Define moveToPrevSlide:
function moveToPrevSlide() {
    hideAllSlides();
    if(slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    slides[slidePosition].classList.add("visible");

    if(slideNumber === 1) {
        slideNumber = totalSlides;
    } else {
        slideNumber--;
    }
    span.textContent = slideNumber;
}

