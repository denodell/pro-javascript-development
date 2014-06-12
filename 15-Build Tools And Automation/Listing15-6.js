module.exports = function(grunt) {
    "use strict";

    // Define variables to represent the folder and file locations required for task
    // configuration - saves repetition

    // The "src/" folder contains the code we will work on during development, including
    // "scripts/" and "tests/" folders containing our JavaScript code and Jasmine test spec
    // scripts, respectively
    var srcFolder = "src/",
        scriptFolder = srcFolder + "scripts/",
        scriptFiles = scriptFolder + "**/*.js",
        unitTestFolder = srcFolder + "tests/",
        unitTestFiles = unitTestFolder + "**/*.js",

        // The "dist/" folder will be generated automatically by this Gruntfile when run, and
        // populated with the release version of our application files
        outputFolder = "dist/",
        outputScriptFolder = outputFolder + "scripts/",

        // Define the name and location of a single script file into which all others will
        // be concatenated into, becoming the main JavaScript file of our application
        outputScriptFile = outputScriptFolder + "main.js",

        // Define the name and location for a minified version of our single application script
        outputScriptFileMinified = outputScriptFolder + "main.min.js",

        // Define output folders for generated Istanbul reports and YUIDoc documentation files
        outputReportFolder = outputFolder + "report/",
        outputDocsFolder = outputFolder + "docs/";

    // Load the JSHint, Connect and Watch tasks, which will be used for local development
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Load the Clean, Copy, Jasmine, Concat, Uglify and YUIDoc tasks, which will be used
    // together with JSHint (loaded previously) to form our release build, preparing all
    // files for public consumption
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    // Configure Grunt for all tasks
    grunt.initConfig({

        // Load the properties from the package.json file into a property for use in task
        // configuration
        pkg: grunt.file.readJSON("package.json"),

        // Configure JSHint as in Listing 15-4
        jshint: {
            options: {
                strict: true
            },
            src: scriptFiles
        },

        // Configure Connect as in Listing 15-4
        connect: {
            server: {
                options: {
                    port: 3000,
                    livereload: true,

                    // Now we're working within the "src/" folder, use this as the location
                    // to find the files to host on this web server
                    base: srcFolder
                }
            }
        },

        // Configure Watch as in Listing 15-4
        watch: {
            scripts: {
                files: scriptFiles,
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            }
        },

        // Probably the simplest Grunt plugin to configure, the Clean task empties the contents
        // of a given folder - here we wish to ensure the "dist/" folder is empty each time
        // we wish to regenerate our production-ready files
        clean: [outputFolder],

        // We'll use the Copy task to duplicate static files from the "src/" folder that need
        // no extra processing, placing them into the "dist/" folder. In this case, we copy
        // over everything except the contents of the "scripts/" and "tests/" folders
        copy: {
            all: {
                files: [{

                    // The use of the exclamation point (!) before a folder or file name
                    // causes it to be excluded from the list of files. Here we wish to copy
                    // all files witin "src/", except those in the "scripts/" and "tests/"
                    // folders, over to the "dist/" output folder
                    cwd: srcFolder,
                    src: ["**", "!scripts/**", "!tests/**"],
                    dest: outputFolder,

                    // The "expand" property ensures the orginal folder structure is kept
                    // intact when the files are copied over
                    expand: true
                }]
            }
        },

        // Configure Jasmine to run together with Istanbul to ensure unit tests pass and to
        // generate a code coverage report which will be placed in the "dist/report" output
        // folder for review. We saw this Jasmine task first in Listing 3-13.
        jasmine: {
            coverage: {
                src: scriptFiles,
                options: {

                    // Point to the location of the unit test spec files
                    specs: unitTestFiles,

                    // Import the Istanbul template plugin for the Jasmine plugin task
                    template: require("grunt-template-jasmine-istanbul"),

                    // Configure the output folder and file for Istanbul's code coverage
                    // reports
                    templateOptions: {
                        coverage: outputReportFolder + "coverage.json",
                        report: outputReportFolder
                    }
                }
            }
        },

        // Instruct the Concat task to combine all the JavaScript files located in the
        // "src/scripts/" folder into a single file, which we'll call "main.js". We can
        // then separate our development across separate JavaScript files and combine them
        // in this stage to avoid the need for an excessive number of HTTP requests to load
        // all our scripts on our page
        concat: {
            scripts: {
                src: scriptFiles,
                dest: outputScriptFile
            }
        },

        // The Uglify task will minify our concatenated JavaScript file, reducing its file
        // size without removing any functionality
        uglify: {

            // The "banner" option allows us to add a comment to the top of the generated
            // minified file, in which we can display the name and version of our project, as
            // taken from our package.json file
            options: {
                banner: "/*! <%= pkg.name %> - version <%= pkg.version %> */\n"
            },
            scripts: {

                // Execute a function to dynamically create the name of the destination file
                // from the variable names above. This is equivalent of an object of the
                // following structure, which will minify the "dist/scripts/main.js" file,
                // storing the result in "dist/scripts/main.min.js", ready for use in our
                // HTML page:
                // {
                //     "dist/scripts/main.min.js": "dist/scripts/main.js"
                // }
                files: (function() {
                    var files = {};

                    files[outputScriptFileMinified] = outputScriptFile;

                    return files;
                }())
            }
        },

        // The YUIDoc task will generate a separate static web site derived from specially
        // formatted comments placed in our JavaScript files, allowing new developers to get
        // up to speed with the structure of the project code without needing to comb through
        // each line of code
        yuidoc: {
            docs: {

                // The generated site will feature the name and version number, taken directly
                // from the project package.json file
                name: "<%= pkg.name %>",
                version: "<%= pkg.version %>",

                // Tell YUIDoc where to find the JavaScript files for this project, and where
                // to place the generated web site files
                options: {
                    paths: scriptFolder,
                    outdir: outputDocsFolder
                }
            }
        }
    });

    // Define the default task to run JSHint, Connect and Watch, for local development
    grunt.registerTask("default", ["jshint", "connect", "watch"]);

    // Define a new "build" task to empty the "dist/" folder, copy over site files, run JSHint
    // and Jasmine to check code quality, generate code coverage reports through Istanbul,
    // concatenate the JavaScript files into a single application file, minify the contents of
    // that file, and finally generate a documentation site based on the YUIDoc-formatted code
    // comments in the original JavaScript files
    grunt.registerTask("build", ["clean", "copy", "jshint", "jasmine", "concat", "uglify", "yuidoc"]);
};