// Load the Gulp package, along with the JSHint and Connect plugins for Gulp, all of which
// have previously been installed through npm
var gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    connect = require("gulp-connect"),

    // Define the location of the JavaScript files in our application that we wish to run our
    // tasks against - this gulpfile and any .js file within the scripts/ folder and its
    // sub directories
    scriptFiles = ["gulpfile.js", "scripts/**/*.js"];

// Define a Connect task, which will start up a web server at http://localhost:3000, pointing
// to the files stored in the project root folder. Enabling the "livereload" property injects
// a Live Reload script into any running HTML page so that, if a message is received to reload
// the page, or any files within, the browser will do so - we will trigger this message in the
// JSHint task below
gulp.task("connect", function() {
    "use strict";

    connect.server({
        port: 3000,
        livereload: true
    });
});

// Define the JSHint task to perform static code analysis on our code files, ensuring that
// strict mode is enabled for all our functions. This is similar to the JSHint task from
// Listing 15-3 with an additional command at the end of the function chain to force a Live
// Reload of any running HTML page through the web server spun up in the Connect task previously
gulp.task("jshint", function() {
    "use strict";

    return gulp.src(scriptFiles)
        .pipe(jshint({
            strict: true
        }))
        .pipe(jshint.reporter("default"))

        // Send the message through the web server to perform a Live Reload of any HTML pages
        // running from the server in any connected web browser
        .pipe(connect.reload());
});

// Define a Watch task to execute the JSHint task when any of the predefined JavaScript files
// are altered. Gulp.js features its own built-in watch() method - no external plugin required
gulp.task("watch", function() {
    "use strict";

    gulp.watch(scriptFiles, ["jshint"]);
});

// Configure the default Grunt task to run JSHint, Connect and Watch tasks in sequence, ensuring
// high code quality whilst hosting our application and reloading the browser when changes are
// made to JavaScript files
gulp.task("default", ["jshint", "connect", "watch"]);