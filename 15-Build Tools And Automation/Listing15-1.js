// Specify the wrapper function, which will be passed the Grunt API as a parameter, making this
// function externally available outside of this file by applying it to the module.exports
// property, as with any other Node.js modules
module.exports = function(grunt) {

    // Load the Grunt plugin tasks we have previously installed with the npm tool
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Configure the JSHint task loaded previously with options to apply to the listed files
    grunt.initConfig({
        jshint: {
            options: {
                strict: true
            },

            // The use of the ** and * wildcard values ensures all .js files within the
            // scripts/ folder and any subfolders are loaded for use with JSHint
            src: ["Gruntfile.js", "scripts/**/*.js"]
        }
    });

    // Register a task alias. The "default" task name ensures the listed tasks will load
    // simply by executing the "grunt" command on the command line
    grunt.registerTask("default", ["jshint"]);
};