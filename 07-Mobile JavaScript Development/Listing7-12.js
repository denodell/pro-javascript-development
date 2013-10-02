// Check to see if we have stored a value for the "favoriteBrowser" key before
var favoriteBrowser = window.localStorage.getItem("favoriteBrowser");

// If not, prompt the user to tell us their favorite web browser
if (!favoriteBrowser || favoriteBrowser === "") {
    favoriteBrowser = prompt("Which is your favorite web browser?", "Google Chrome");

    // Store their favorite browser in localStorage for next time they visit
    window.localStorage.setItem("favoriteBrowser", favoriteBrowser);
}

// Show the user that we know what their favorite browser is, even if they told us some time ago
alert("Your favorite browser is " + favoriteBrowser);

// Ask if the user would like us to remove their favorite browser value from persistent storage
if (confirm("Would you like us to forget your favorite browser?")) {

    // Remove the value from localStorage
    window.localStorage.removeItem("favoriteBrowser");
}