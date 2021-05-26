const overlay = document.getElementById("overlay")

const openBtn = document.getElementById("open-modal");

openBtn.addEventListener("click", function() {
    overlay.style.display = "block";
})

const closeBtn = document.getElementById("close-modal");

closeBtn.addEventListener("click", function() {
    overlay.style.display = "none";
})