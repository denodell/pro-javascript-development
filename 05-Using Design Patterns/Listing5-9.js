var element = {
        allElements: [],

        get: function(id) {
            var elem = document.getElementById(id);
            allElements.push(elem);
            return elem;
        },

        create: function(type) {
            var elem = document.createElement(type);
            allElements.push(elem);
            return elem;
        },

        getAllElements: function() {
            return allElements;
        }
    },
    header = element.get("header"),
    input = element.create("input");

// Contains id="header", and new <input> elements
element.getAllElements();