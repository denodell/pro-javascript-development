// Data within localStorage can be accessed as if they were properties on a standard object
var favoriteBrowser = localStorage["favoriteBrowser"];

if (!favoriteBrowser || favoriteBrowser === "") {
    localStorage["favoriteBrowser"] = prompt("Which is your favorite web browser?", "Google Chrome");
}

alert("Your favorite browser is " + favoriteBrowser);

if (confirm("Would you like us to forget your favorite browser?")) {

    // The delete keyword allows the removal of a property from localStorage
    delete localStorage["favoriteBrowser"];
}