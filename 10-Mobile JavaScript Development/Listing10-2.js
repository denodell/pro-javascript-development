// Create a <img> element on the page to display the map tile in
var mapElem = document.createElement("img");

// Define a function to execute once the user’s location has been established,
// plotting their latitude and longitude as a map tile image
function successCallback(position) {
    var lat = position.coords.latitude,
        long = position.coords.longitude;

    mapElem.setAttribute("src", "http://maps.googleapis.com/maps/api/staticmap?markers=" + lat + "," + long + "&zoom=15&size=300x300&sensor=false");
}

// Define a function to execute if the user’s location couldn’t be established
function errorCallback() {
    alert("Sorry - couldn't get your location.");
}

// Detect the Geolocation API before using it – ‘feature detection’ – exposed in the
// navigator.geolocation object in the browser
if (navigator.geolocation) {

    // Start watching the user’s location, updating once per second (1s = 1000ms)
    // and execute the appropriate callback function based on whether the user
    // was successfully located or not
    navigator.geolocation.watchPosition(successCallback, errorCallback, {
        maximumAge: 1000
    });

    // Size the map tile image element and add it to the current page
    mapElem.setAttribute("width", 300);
    mapElem.setAttribute("height", 300);
    document.body.appendChild(mapElem);
}