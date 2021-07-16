// Let's create a function that fetches a random idea:
function getActivityIdea() {
    // Let's fetch from an api:
    fetch("https://apis.scrimba.com/bored/api/activity")
        // Then we take the response and change its body from json to JS:   
        .then(res => res.json())
        // And we get the data of that body:
        .then(data => {
            // We set the h4's text to the activity parameter of the data:
            document.getElementById("idea").textContent = data.activity
            // When the idea is fetched, we will change the background, adding the "fun" style class:
            document.body.classList.add("fun")
            // And also change the title:
            document.getElementById("title").textContent = "🦾 HappyBot🦿"
        })
}

// Finally, we create and event listener for our button, that calls the getActivityIdea function:
document.getElementById("bored-button").addEventListener("click", getActivityIdea)