try {
    // Code that might throw an error to go here
} catch (error) {
    if (error instanceof SyntaxError) {
        // A syntax error was thrown
    } else if (error instanceof TypeError) {
        // A type error was thrown
    } else if (error instanceof RangeError) {
        // A range error was thrown
    } else if (error instanceof EvalError) {
        // An eval error was thrown
    } else if (error instanceof ReferenceError) {
        // A reference error was thrown
    } else if (error instanceof URIError) {
        // A URI error was thrown
    }
}