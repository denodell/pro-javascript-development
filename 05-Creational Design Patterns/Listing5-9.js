// Group related properties and methods together into a single object literal, which
// we call a Singleton
var element = {

        // Create an array for storage of page element references
        allElements: [],

        // Get an element reference by its ID and store it
        get: function(id) {
            var elem = document.getElementById(id);
            this.allElements.push(elem);
            return elem;
        },

        // Create a new element of a given type, and store it
        create: function(type) {
            var elem = document.createElement(type);
            this.allElements.push(elem);
            return elem;
        },

        // Return all stored elements
        getAllElements: function() {
            return this.allElements;
        }
    },

    // Get and store a reference to a page element with ID of "header"
    header = element.get("header"),

    // Create a new <input> element
    input = element.create("input"),

    // Contains id="header", and new <input> elements
    allElements = element.getAllElements();

// Check to see how many elements are stored
alert(allElements.length); // 2