// Create MediaQueryList objects for different CSS3 Media Query rules
var landscapeMQL = window.matchMedia("(orientation: landscape)"),
    smallScreenMQL = window.matchMedia("(max-width: 480px)");

function checkMediaQueries() {

    // Execute specific code if the browser is now in landscape orientation
    if (landscapeMQL.matches) {
        alert("The browser is now in landscape orientation");
    }

    // Execute specific code if the browser window is 480px or narrower in width
    if (smallScreenMQL.matches) {
        alert("Your browser window is 480px or narrower in width");
    }
}

// Execute the function on page load and when the screen is resized or its orientation changes
window.addEventListener("load", checkMediaQueries, false);
window.addEventListener("resize", checkMediaQueries, false);