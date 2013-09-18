var wrapper = document.getElementById("wrapper"),
    header = wrapper.getElementsByTagName("header")[0],
    nav = wrapper.getElementsByTagName("nav")[0];

header.className += " " + nav.className;