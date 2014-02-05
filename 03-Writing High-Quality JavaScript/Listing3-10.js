var ElementNotFoundError = Class.create({
    id: "",
    message: "The element could not be found by the given ID",
    initialize: function(id) {
        this.id = id;
    }
});