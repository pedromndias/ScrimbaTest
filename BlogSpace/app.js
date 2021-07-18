// To manage posts we will create an array:
let postsArray = []

// We create variables to access the form's fields and the form itself:
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")
// Then we create a function to render the posts:
function renderPosts() {
    // Create a variable to store the posts HTML:
    let html = ""
    // And for each post get its title and body and make them HTML
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr>
        `
    }
    // Now we add the new variable as the HTML of the blog list:
    document.getElementById("blog-list").innerHTML = html
}


// Let's fetch an API with random posts and get the first 5:
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })


// We now create an event listener for when we submit our form:
form.addEventListener("submit", function(e) {
    // First we will prevent the form from updating the page everytime we submit:
    e.preventDefault()
    // Now we access the data we introduce in the title and body of the new post:
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    // And we set a data object with those variables:
    const data = {
        title: postTitle,
        body: postBody
    }

    // We also create another object with the options for our POST fetch:
    const options = {
        // The method is POST:
        method: "POST",
        // The data needs to be turned into JSON first:
        body: JSON.stringify(data),
        // We use headers to tell the server that we are sending JSON:
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Now we POST the data with that options object:
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        // After we get the data and change its body from JSON to JS, we 
        // will add the new post to the postsArray and render the posts again:
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
            // Finally we clear the form's fields:
            titleInput.value =""
            bodyInput.value =""
        })

})