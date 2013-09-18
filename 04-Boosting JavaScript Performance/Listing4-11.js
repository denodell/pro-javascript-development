// Create a DocumentFragment object as an offline DOM structure, disconnected from the live DOM
var offlineDOM = document.createDocumentFragment(),

    // Create elements for adding to the page dynamically
    header = document.createElement("header"),
    nav = document.createElement("nav");

// Add each element to the offline DOM
offlineDOM.appendChild(header);
offlineDOM.appendChild(nav);

// Add a copy of the offline DOM to the live page
document.body.appendChild(offlineDOM);