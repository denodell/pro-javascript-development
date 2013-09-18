var add = function() {
    var total = 0,
        index = 0,
        length = arguments.length;

    for (; index < length; index++) {
        if (typeof arguments[index] === "number") {
            total  = total + arguments[index];
        }
    }

    return total;
};