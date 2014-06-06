// To proxy the myData.cookies.get() method from Listing 6-13, we begin by storing the current
// method in a variable
var proxiedGet = myData.cookies.get;

// Override the get() method with a new function which proxies the original and augments its
// behavior
myData.cookies.get = function() {

    // Call the proxied (original) method to get the value it would have produced
    var value = proxiedGet.apply(this, arguments);

    // Do something with the value returned from the proxied method
    value = value.toUpperCase();

    // Return the manipulated value with the same type as the proxied method, so that the use of
    // this new method does not break any existing calls to it
    return value;
};