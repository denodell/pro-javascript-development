// Reference the gulp package and JSHint plugin package
var gulp = require("gulp"),
    jshint = require("gulp-jshint");

// Define a Gulp.js task, naming it "jshint" - we can then execute it directly by name, or link
// it together with other tasks under an alias name, to be executed in sequence
gulp.task("jshint", function() {

    // Return the result of the operation to the calling function
    // Locate the files to use with this task - here, this gulpfile itself and any .js file
    // within the scripts/ folder and its subfolders
    return gulp.src(["gulpfile.js", "scripts/**/*.js"])

        // Pipe those files to the "jshint" plugin, specifying the options to apply - here, we
        // ensure strict mode is enforced in the selected files. This runs JSHint but does not
        // display its results
        .pipe(jshint({
            strict: true
        }))

        // Finally, pipe the output of JSHint to a reporter for displaying on the command line.
        // By splitting up JSHint into one part that performs the static code analysis and one
        // part that displays the results, we are capable of creating more functional tasks
        // that can take the direct results from JSHint and use them in any other way we
        // wish to. This is what makes Gulp.js so highly configurable.
        .pipe(jshint.reporter("default"));
});

// Define a default task - naming it "default" ensures it will be executed without the need to
// pass through a specific task name from the command line
gulp.task("default", ["jshint"]);