var ElementNotFoundError = Class.create({
    id: "",
    message: "The element could not be found by the given ID",
    initialize: function(id) {
        this.id = id;
    }
});

function findElement(id) {
    var elem = document.getElementById(id);
    if (!elem) {
        throw new ElementNotFoundError(id);
    }
    return elem;
}

try {
    findElement("header");
} catch (error) {
    if (error instanceof ElementNotFoundError) {
        alert("Sorry, the 'header' element was not found");
    }
}