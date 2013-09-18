var list = document.createElement("ul"),
    listItem = document.createElement("li");

// Perform all the DOM manipulation possible within JavaScript first
listItem.innerHTML = "I am a list item";
list.appendChild(listItem);

// Finally, add the element to the page when you are sure you no longer need to alter it
// before display
document.body.appendChild(list);