var firstName = "Den",
    lastName = "Odell",
    company = "AKQA",
    city = "London",
    email = "denodell@me.com",
    divElem = document.createElement("div");

// Applying data and strings to HTML structures results in a complicated mess of difficult to
// maintain code
divElem.innerHTML = "<p>Name: <a href=\"mailto:" + email + "\">" + firstName + " " + lastName +
    "</a><br>Company: " + company + "</p><p>City: " + city + "</p>";

document.body.appendChild(divElem);