// Let's fetch unsplash API for some nature photos. Note the query=nature:
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        // Using the returned data, let's set the background image with the fetched photo:
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        // And also display the photo's author:
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    // In case there's an error let's catch it and use a default image/author:
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
        document.getElementById("author").textContent = `By: Dodi Achmad`
    })

// Now we will use another fetch to get some real time data on bitcoin:
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        // If there's something wrong we will throw an error:
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        // If all good we get the json:
        return res.json()
    })
    .then(data => {
        // Using the return data we will show bitcoin's name and image:
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name}</span>
        `

        // And then get the data's properties to show the prices (actual, 24h max and min):
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    // If something's wrong we catch the error and console.log it:
    .catch(err => console.log(err))

// Let's set up a function to display the actual time
function getCurrentTime() {
    // First we need to define a new Date:
    const date = new Date()
    // Then we use the DOM to display it, specifying some date's parameters:
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}
// Now we call a setInterval every second with the previous function:
setInterval(getCurrentTime, 1000)

// Now we will use a method to get the user's geolocation:
navigator.geolocation.getCurrentPosition(position => {
    // The position object has a coords property with latitude, longitude, etc.
    // Let's use an fetch on an weather API and use these parameters to get our location's weather:
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            // If there's something wrong we will throw an error:
            if (!res.ok) {
                throw Error("Weather data not available")
            } // Otherwise we return the json:
            return res.json()
        })
        .then(data => {
            // Using the return's data from the weather API we will display the weather's icon,
            // the temperature and our current city. Note the query for the icon:
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
            <img src=${iconUrl}>
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>    
            `
        })
        // If something wrong we catch the error:
        .catch(err => console.error(err))

})