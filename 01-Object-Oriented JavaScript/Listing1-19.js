// Define an object called Class with a create() method for use creating "classes".
// Use a closure to maintain inner functions without exposing them publicly.
var Class = (function() {

    // The create() method defines and returns a new "class" when called, based on an object
    // literal representing the public properties and methods for its prototype. A method named
    // initialize() will be executed as the constructor function. If an optional
    // ‘parentPrototype’ property is passed in, representing a parent "class", it creates the
    // new "class" as a subclass of that.
    function create(classDefinition, parentPrototype) {

        // Define the constructor function of a new "class", using the initialize() method from
        // the ‘classDefinition’ object literal if it exists
        var _NewClass = function() {
                if (this.initialize && typeof this.initialize === 'function') {
                    this.initialize.apply(this, arguments);
                }
            },
            _name;

        // If a ‘parentPrototype’ object has been passed in (when inheriting from other
        // "classes"), inherit everything from the parent to this subclass
        if (parentPrototype) {
            _NewClass.prototype = new parentPrototype.constructor();

            for (_name in parentPrototype) {
                if (parentPrototype.hasOwnProperty(_name)) {
                    _NewClass.prototype[_name] = parentPrototype[_name];
                }
            }
        }

        // Define a function to create a closure and return a function to replace the one
        // passed in, wrapping it and providing a __parent() method which points to the
        // method of the same name from a parent "class", to enable support for polymorphism
        function polymorph(thisFunction, parentFunction) {
            return function () {
                var output;

                this.__parent = parentFunction;

                output = thisFunction.apply(this, arguments);

                delete this.__parent;

                return output;
            };
        }

        // Apply the newly provided "class" definition, overriding anything that already exists
        // from the parentPrototype
        for (_name in classDefinition) {
            if (classDefinition.hasOwnProperty(_name)) {

                // If we’re attempting polymorphism, creating new methods named the same as
                // ones from the parent "class", then we want to expose a way of calling the
                // parent function of the same name in a simple way
                if (parentPrototype && parentPrototype[_name] &&
                        typeof classDefinition[_name] === 'function') {
                    _NewClass.prototype[_name] = polymorph(classDefinition[_name], parentPrototype[_name]);
                } else {

                    // If we’re not attempting polymorphism, just map over the entry from the
                    // ‘classDefinition’ object literal to the prototype directly
                    _NewClass.prototype[_name] = classDefinition[_name];
                }
            }
        }

        // Ensure the constructor is set correctly, whether inherited or not (in case a
        // ‘constructor’ property or method was passed in the ‘classDefinition’ object literal)
        _NewClass.prototype.constructor = _NewClass;

        // Define an extend() method on the "class" itself, pointing to the private extend()
        // function, below, which allows the current "class" to be used as a parent for
        // a new subclass
        _NewClass.extend = extend;

        return _NewClass;
    }

    // The extend() method is the same as the create() method but with an additional parameter
    // containing the prototype from the parent "class" for inheriting from
    function extend(classDefinition) {
        return create(classDefinition, this.prototype);
    }

    // Expose the private create() method publicly under the same name
    return {
        create: create
    };
}());