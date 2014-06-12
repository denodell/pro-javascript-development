module.exports = function(grunt) {

    // Enable strict mode
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.initConfig({

        // Load external data from another file for use within task configuration
        pkg: grunt.file.readJSON("package.json"),
        jshint: {

            // Apply a set of JSHint options to apply to all targets
            options: {
                strict: true
            },

            // Define a target with settings to apply in addition to those defined for all
            // JSHint tasks above, including which files to apply JSHint to
            grunt: {
                src: ["Gruntfile.js"]
            },

            // Define a second target, named "project"
            project: {

                // Apply extra options for this target, in addition to those options applied
                // for all JSHint tasks. In this case, both "strict" and "trailing" properties
                // will be set to "true". Settings at this level with the same name as those
                // previously defined will cause the setting to be overwritten
                options: {
                    trailing: true
                },

                // Use the settings from the package.json file, stored locally in the "pkg"
                // property to dynamically apply values to the Gruntfile configuration
                src: ["<%= pkg.name %>-<%= pkg.version %>.js"]
            }
        }
    });

    grunt.registerTask("default", ["jshint"]);
};