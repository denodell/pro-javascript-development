// Update extendObj() to duplicate object-based properties rather than point to them
// by reference
function extendObj(obj1, obj2) {
    var obj2Key,
        value;

    for (obj2Key in obj2) {
        if (obj2.hasOwnProperty(obj2Key)) {
            value = obj2[obj2Key];

            // If the value being copied is an array, then copy a duplicate of that array using
            // the slice() method
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                obj1[obj2Key] = value.slice();

            // Otherwise, if the value being copied in an object, and not an array, then copy
            // across a duplicate of that object using a recursive call to this function
            } else if (typeof obj2[obj2Key] === "object") {
                obj1[obj2Key] = extendObj({}, value);

            // Otherwise, copy across the value as usual
            } else {
                obj1[obj2Key] = value;
            }
        }
    }

    return obj1;
}