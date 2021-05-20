// Create array to populate with links (leads)
let myLeads = []
// Get the input element:
const inputEl = document.getElementById("input-el")
// Get the input button:
const inputBtn = document.getElementById("input-btn")
// Get the unordered list:
const ulEl = document.getElementById("ul-el")
// Get the delete button:
const deleteBtn = document.getElementById("delete-btn")
// Get the key "myLeads" stored in local storage and parse it to save it as an array:
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// Get the tab button:
const tabBtn = document.getElementById("tab-btn")

// Create a function to render the array if there's some local storage of myLeads:
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Create and event listener to the tab button:
tabBtn.addEventListener("click", function(){    
    // We use the "tab" object in Chrome to query the active tab on the current window:
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // Save the url of the tab in our myLeads array:
        myLeads.push(tabs[0].url)
        // Stringigy the myLeads array and set it to local storage with the name "myLeads":
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        // Display the new list items by calling render(myLeads)
        render(myLeads)
    })
})

// Create function to display the array. We create list items and then add it to the UL
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// Add an event listener to the delete button. It's a mouse double click event:
deleteBtn.addEventListener("dblclick", function() {
    // Clear local storage:
    localStorage.clear()
    // Set myLeads to an empty array:
    myLeads = []
    // Call render(myLeads) and it will display an empty UL:
    render(myLeads)
})

// Add an event listenr to the input button:
inputBtn.addEventListener("click", function() {
    // Get the value of the input an push it to our array:
    myLeads.push(inputEl.value)
    // Clear the value from the input:
    inputEl.value = ""
    // Stringigy the myLeads array and set it to local storage with the name "myLeads":
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    // Call render(myLeads) to display the new list items:
    render(myLeads)
})