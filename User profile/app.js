// Let's write a function that fetches user data from an user's API:
async function getUser() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/3")
    let user = await response.json()
    console.log(user)
    return user
}

// Now we code a function that actually displays the data returned by the fetch:
function displayUser(user) {
    // We will add some CSS styles to the body using classes:
    document.body.innerHTML = `<div class="user-profile">
        <div class="user-profile-header">
            <div>${user.name}</div>
            <div>${user.username}</div>
        </div>

        <div class="user-profile-company">
            <div>Company: ${user.company.name}</div>
            <div>${user.company.catchPhrase}</div>
            <div>${user.company.bs}</div>
        </div>

        <div class="user-profile-contact">
            <div>📧${user.email}</div>
            <div>📞${user.phone}</div>
            <div>💻${user.website}</div>
        </div>

        <div class="user-profile-address">
            <div>${user.address.street}, ${user.address.suite}</div>
            <div>${user.address.city} ${user.address.zipcode}</div>
        </div>
    </div>`
}

// Finally, we call the getUser function followed by the displayUser with the return:
getUser().then(displayUser)