module.exports = function(grunt) {
    "use strict";

    // Define the location of the JavaScript files in our application that we wish to run our
    // tasks against - along with this Gruntfile, the use of wildcard (* and **) values means
    // that we're representing .js files within the scripts/ folder directly, as well as files
    // one level beneath that in the folder hierarchy
    var scriptFiles = ["Gruntfile.js", "scripts/**/*.js"];

    // Load the JSHint, Connect and Watch plugin tasks previously installed via npm
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Configure Grunt with the JSHint, Connect and Watch tasks
    grunt.initConfig({

        // Configure the JSHint task to perform static code analysis on the files in our
        // scripts/ folder and enforce strict mode in all
        jshint: {
            options: {
                strict: true
            },
            src: scriptFiles
        },

        // Configure the Connect task to start up a web server at http://localhost:3000 - by
        // default it will point to the files in the root of the project folder, so a file
        // named index.html in the root folder will be displayed when browser this new URL.
        // By enabling the "livereload" property, the server will inject a reference to a
        // Live Reload script into your HTML pages automatically - used in conjunction with
        // another task that will trigger the Live Reload in specific circumstances, such as
        // the Watch task, below
        connect: {
            server: {
                options: {
                    port: 3000,
                    livereload: true
                }
            }
        },

        // Configure the Watch task to observe changes made to any JavaScript file in our
        // scripts/ folder and trigger the JSHint task when those files are changed, ensuring
        // code quality standards are kept high throughout project development. Enabling the
        // "livereload" option ensures that any Live Reload script in a running web page is
        // notified once the JSHint task has run, causing it to be reloaded automatically,
        // saving us the task of manually refreshing the page. This option thus works in
        // conjunction with the Live Reload script injected into the page by the Connect task
        watch: {
            scripts: {
                files: scriptFiles,
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            }

            // Extra targets can be added in here for different file types, such as CSS or HTML
            // files, to allow specific tasks to be triggered when those file types are changed
        }
    });

    // Configure the default Grunt task to run JSHint, Connect and Watch tasks in sequence.
    // The Watch plugin will continue to monitor for changes and, together with the LiveReload
    // capability, will ensure that the web site hosted on our new web server will be kept
    // up to date automatically as we change the JavaScript files in our project - no need to
    // even press Refresh in our browsers!
    grunt.registerTask("default", ["jshint", "connect", "watch"]);
};