var nav = document.getElementsByTagName("nav");

nav.style.display = "none"; // Causes a browser reflow, hiding the element from display
nav.style.backgroundColor = "#000"; // Causes no reflow since the element is hidden
nav.style.color = "#fff"; // Causes no reflow
nav.style.opacity = 0.5; // Causes no reflow
nav.style.display = "block"; // Causes a browser reflow, bringing the element back on display