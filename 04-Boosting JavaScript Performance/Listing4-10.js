var list1 = document.createElement("ul"),
    list2,
    listItem1 = document.createElement("li"),
    listItem2,
    listItem3;

listItem1.className = "list-item";
listItem1.innerHTML = "I am a list item";

// The cloneNode method duplicates the element efficiently. Setting the optional parameter
// to ‘true’ also copies across any child elements and properties. Leaving this property out
// copies just the individual element itself
listItem2 = listItem1.cloneNode(true);
listItem3 = listItem1.cloneNode(true);

// Add the three list items to the unordered list element
list1.appendChild(listItem1);
list1.appendChild(listItem2);
list1.appendChild(listItem3);

// Duplicate the entire unordered list
list2 = list1.cloneNode(true);

// Add the two identical unordered list elements to the live page
document.body.appendChild(list1);
document.body.appendChild(list2);