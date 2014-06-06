// Define a "class" representing a promise, allowing readable and understandable code to be
// written to support asynchronous methods and their callbacks. Instances created from this
// "class" adhere to the Promises/A+ specification detailed at http://promisesaplus.com and
// pass all the official unit tests found at https://github.com/promises-aplus/promises-tests
// which prove compliance of this specification.
var Promise = (function() {

    // Define the three possible states a promise can take - "pending" - the default value
    // meaning it has not resolved yet, "fulfilled" - meaning the promise has resolved
    // successfully, and "rejected" - meaning the promise has failed and an error has occurred
    var state = {
            PENDING: "pending",
            FULFILLED: "fulfilled",
            REJECTED: "rejected"
        };

    // Define the "class" to represent a promise. If an asynchronous function is passed in at
    // the point of instantiation, it will be executed immediately
    function Promise(asyncFunction) {
        var that = this;

        // Define a property to represent the current state of the promise, set to "pending" by
        // default
        this.state = state.PENDING;

        // Define a property to be used to store a list of callback functions to call once the
        // asynchronous method has completed execution
        this.callbacks = [];

        // Define a property to store the value returned by the asynchronous method represented
        // by this promise
        this.value = null;

        // Define a property to store the details of any error that occurs as a result of
        // executing the asynchronous method
        this.error = null;

        // Define two functions which will be passed to the asynchronous function
        // represented by this promise. The first will be executed if the asynchronous
        // function executed successfully, the second will be executed if the execution
        // failed in some way
        function success(value) {

            // Executes the resolve() method of this promise, which will ensure that any
            // functions linked to this promise to be executed once its asynchronous method
            // has executed successfully is executed at this point
            that.resolve(value);
        }

        function failure(reason) {

            // Executes the reject() method of this promise, which will execute any
            // linked callback functions for displaying or handling errors. Any further
            // associated promises chained to this one will not be executed.
            that.reject(reason);
        }

        // If an asynchronous function is passed to this promise at instantiation, it is
        // executed immediately, and the success() and failure() functions defined above
        // are passed in as function parameters. The asynchronous function must ensure it
        // executes the most appropriate of these two functions depending on the outcome
        // of the behaviour it is attempting to perform
        if (typeof asyncFunction === "function") {
            asyncFunction(success, failure);
        }
    }

    // Define a then() method, the crux of the Promises/A+ spec, which allows callbacks to
    // be associated to the result of the asynchronous function's execution depending on
    // whether that function completed its task successfully or not. It allows chaining of
    // promises to each other to allow further asynchronous functions to be executed at
    // the point at which the current one is completed successfully
    Promise.prototype.then = function(onFulfilled, onRejected) {

        // Create a new promise (and return it at the end of this method) to allow for
        // chaining of calls to then()
        var promise = new Promise(),

            // Define a callback object to be stored in this promise and associate the new
            // promise instance to it to act as the context of any callback methods
            callback = {
                promise: promise
            };

        // If a function was provided to be executed on successful completion of the
        // asynchronous function's action, store that function in the callback object
        // together with its newly created promise as context
        if (typeof onFulfilled === "function") {
            callback.fulfill = onFulfilled;
        }

        // If a function was provided to be executed on unsuccessful completion of the
        // asynchronous function's action, store that function in the callback object
        // together with the new context promise
        if (typeof onRejected === "function") {
            callback.reject = onRejected;
        }

        // Add the callback object to the list of callbacks
        this.callbacks.push(callback);

        // Attempt to execute the stored callbacks (will only do this if the asynchronous
        // function has completed execution by this point - if not, it will be called at
        // such time as it has by other code in the "class")
        this.executeCallbacks();

        // Return the newly created promise, to allow for chaining of other asynchronous
        // functions through repeated calls to the then() method
        return promise;
    };

    // Define a method to execute any callbacks associated with this promise if the
    // associated asynchronous function has completed execution
    Promise.prototype.executeCallbacks = function() {
        var that = this,
            value,
            callback;

        // Define two functions to use as defaults to execute if an equivalent function has
        // not been stored in the list of callbacks tied to this promise
        function fulfill(value) {
            return value;
        }

        function reject(reason) {
            throw reason;
        }

        // Only execute the callbacks if the promise is not in its pending state, i.e. that
        // the asynchronous function has completed execution
        if (this.state !== state.PENDING) {

            // Point 2.2.4 of the Promises/A+ spec dictates that callback functions should
            // be executed asynchronously, outside of the flow of any other calls to then()
            // which might take place. This ensures the whole chain of promises is in place
            // before calls to the callbacks take place. Using a setTimeout with a delay of
            // 0 milliseconds gives the JavaScript engine a split second to complete the
            // process of going through the promise chain before any callbacks are run.
            // Browsers have a minimum delay value possible for a setTimeout call so in
            // reality the callbacks will be executed after, typically, 4 milliseconds
            setTimeout(function() {

                // Loop through all the callbacks associated with this promise and execute
                // them each in turn, selecting the callback's fulfill method if the promise
                // was fulfilled (by the asynchronous function completing execution
                // successfully), or its reject method if the function returned an error
                // during execution
                while(that.callbacks.length) {
                    callback = that.callbacks.shift();

                    // Wrap the execution of the callback in a try/catch block, in case it
                    // throws an error. We don't want the promise chain to stop executing if
                    // an error is thrown, rather we want to reject the promise, allowing
                    // the calling code to handle the error itself
                    try {

                        // Execute the appropriate callback method based on the state of
                        // the promise. If no callback method has been associated, fall
                        // back to the default fulfill() and reject() functions defined at
                        // the top of the executeCallbacks() method, above
                        if (that.state === state.FULFILLED) {
                            value = (callback.fulfill || fulfill)(that.value);
                        } else {
                            value = (callback.reject || reject)(that.error);
                        }

                        // Pass the result of executing the callback function to the
                        // resolve() method, which will either mark the promise as fulfilled
                        // or continue to further execute chained calls to the then() method
                        callback.promise.resolve(value);
                    } catch (reason) {

                        // If an error is thrown by the callback
                        callback.promise.reject(reason);
                    }
                }
            }, 0);
        }
    };


    // The fulfill() method will mark this promise as fulfilled provided it has not already
    // been fulfilled or rejected before. Any associated callbacks will be executed at
    // this point
    Promise.prototype.fulfill = function(value) {

        // Only transition the promise to the fulfilled state if it is still in the pending
        // state, and a value is passed to this method when it is executed
        if (this.state === state.PENDING && arguments.length) {
            this.state = state.FULFILLED;
            this.value = value;

            this.executeCallbacks();
        }
    };

    // The reject() method will mark this promise as rejected provided it has not already
    // been fulfilled or rejected before. Any associated callbacks will be executed at
    // this point
    Promise.prototype.reject = function(reason) {

        // Only transition the promise to the rejected state if it is still in the pending
        // state, and a value is passed to this method when it is executed
        if (this.state === state.PENDING && arguments.length) {
            this.state = state.REJECTED;
            this.error = reason;

            this.executeCallbacks();
        }
    };

    // The resolve() method takes the return value from a successfull call to a promise's
    // fulfill() callback and uses it to fulfill the promise if it is the last promise in
    // a chain of then() method calls. If it is not the last promise, it continues down
    // the promise chain, recursively fulfilling and rejecting the linked promises as
    // appropriate
    Promise.prototype.resolve = function(value) {
        var promise = this,

            // Detect the type of the value returned from the fulfill() callback method. If
            // this is the last promise in a chain, this should be the result of executing
            // the asynchronous function itself. If this promise has other chained promises
            // then the value passed to this method will contain another promise which will
            // call the resolve() method again, recursively
            valueIsThisPromise = promise === value,
            valueIsAPromise = value && value.constructor === Promise,

            // The term "thenable" refers to an object that looks like a promise in that it
            // contains a then() method of its own, yet isn't an instance of this Promise
            // "class" - useful for connecting promises created by other implementations of
            // the Promises/A+ spec together
            valueIsThenable = value && (typeof value === "object" || typeof value === "function"),

            isExecuted = false,
            then;

        // Reject this promise if the value passed to this method represents the same
        // promise represented here - otherwise we could potentially get stuck in a loop
        if (valueIsThisPromise) {

            // The Promises/A+ spec dictates that should this promise be the same as the
            // one passed to this method, then a TypeError should be passed to the reject()
            // method, effectively stopping execution of further promises in the chain
            promise.reject(new TypeError());

        // If the value passed to the resolve() method is another instance of this Promise
        // "class", then either fulfill or reject the current promise based on the state of
        // the provided promise
        } else if (valueIsAPromise) {

            // If the promise passed into this method has already been fulfilled or
            // rejected, pass on the value or error contained within it to this promise
            if (value.state === state.FULFILLED) {
                promise.fulfill(value.value);
            } else if (value.state === state.REJECTED) {
                promise.reject(value.error);

            // If the promise passed into this method hasn't yet been fulfilled or rejected,
            // execute its then() method to ensure the current promise will get resolved
            // or rejected along with that promise once it has completed execution of its
            // asynchronous function
            } else {
                value.then(function(value) {
                    promise.resolve(value);
                }, function(reason) {
                    promise.reject(reason);
                });
            }

        // If the value passed to the resolve() method is not an instance of this Promise
        // "class" but resembles a promise in that it is an object containing its own
        // then() method, then execute its then() method, fulfilling or rejecting the
        // current promise based on the state of this promise. This comes in useful when
        // attempting to connect promises created with other implementations of the same
        // spec together with this one
        } else if (valueIsThenable) {

            // Wrap execution in a try/catch block in case an error is thrown in the
            // underlying code of the other promise implementation
            try {
                then = value.then;

                // If the object stored in the value variable contains a then() method,
                // execute it to ensure the current promise gets fulfilled or rejected when
                // that promise does
                if (typeof then === "function") {
                    then.call(value, function(successValue) {
                        if (!isExecuted) {
                            isExecuted = true;
                            promise.resolve(successValue);
                        }
                    }, function(reason) {
                        if (!isExecuted) {
                            isExecuted = true;
                            promise.reject(reason);
                        }
                    });
                } else {
                    promise.fulfill(value);
                }
            } catch (reason) {
                if (!isExecuted) {
                    isExecuted = true;
                    promise.reject(reason);
                }
            }

        // If the value passed to the resolve() method is not a promise, then fulfill the
        // current promise using its value. Any associated callbacks will then be executed
        } else {
            promise.fulfill(value);
        }
    };

    // Add a bonus method, Promise.all(), which isn't part of the Promises/A+ spec, but is part
    // of the spec for ECMAScript 6 Promises, which bring the benefits of promises straight into
    // the JavaScript language itself.
    //
    // The method accepts an array of promises, each representing an asynchronous function,
    // which are executed simultaneously, and returns a single promise, allowing a single
    // then() method to be executed at such point all the supplied promsies are fulfilled. The
    // value passed on fulfillment contains an array of all the returned values of the
    // individual promises, in the same order as the promises in the original array passed to
    // this method
    Promise.all = function(promises) {
        var index = 0,
            promiseCount = promises.length;

        // Return a single promise representing all the promises supplied to this method. It
        // will be fulfilled as soon as every one of the supplied promises have been fulfilled.
        return new Promise(function(fulfill, reject) {
            var promise,
                results = [],
                resultsCount = 0;

            // Execute an onSuccess() function each time one of the supplied promises is
            // fulfilled, adding its resulting value to an array in the same index position as
            // the promise was in the original array
            function onSuccess(result, index) {
                results[index] = result;
                resultsCount++;

                // If we have collected the results for all of the promises, then fulfill the
                // current single promise, passing across the array of fulfilled values from
                // the individual promises
                if (resultsCount === promiseCount) {
                    fulfill(results);
                }
            }

            // If any of the supplied promises are rejected, then reject the current promise
            function onError(error) {
                reject(error);
            }

            // Resolve a given promise, executing onSuccess() if fulfilled, or onError() if not
            function resolvePromise(index, promise) {
                promise.then(function(value) {
                    onSuccess(value, index);
                }, onError);
            }

            // Loop through all the promises supplied to this method, resolving each in turn
            for (; index < promiseCount; index++) {
                promise = promises[index];
                resolvePromise(index, promise);
            }
        });
    };

    return Promise;
}());