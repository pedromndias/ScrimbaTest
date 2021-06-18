// Let's create an event listener for when submit our form

// First we create a variable of the form itself:
let emailCollectorForm = document.getElementById("Email-Collector");
// Then we create the event listener:
emailCollectorForm.addEventListener("submit", event => {
    // First we stop the default behavior when submitting:
    event.preventDefault();

    // Then we use FormData to het the user's name and email:
    let ourFormData = new FormData(event.target);
    let userFirstName = ourFormData.get("firstName");
    let userEmailAddress = ourFormData.get("emailAddress");

    // Then we create a variable containing the new text and username and email variables we just created:
    let updatedHtmlContent = `
        <h2>Congratulations, ${userFirstName}!<h2>
        <p>You're on your way to becoming a BBQ Master!</p>
        <p class="fine-print">You will get weekly BBQ tips sent to: ${userEmailAddress}</p>
    `

    // And finally we update the page content with our new content variable:
    let updatedContentContainer = document.getElementById("Main-Content");
    updatedContentContainer.innerHTML = updatedHtmlContent;
})