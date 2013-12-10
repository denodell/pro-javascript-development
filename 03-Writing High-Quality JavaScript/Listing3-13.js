module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            coverage: {
                src: ["src/*.js"],
                options: {
                    specs: ["spec/*.js"],
                    template: require("grunt-template-jasmine-istanbul"),
                    templateOptions: {
                        coverage: "reports/coverage.json",
                        report: [
                            {
                                type: "lcov",
                                options: {
                                    dir: "reports"
                                }
                            },
                            {
                                type: "text-summary"
                            }
                        ]
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-template-jasmine-istanbul");

    grunt.registerTask("default", ["jasmine:coverage"]);
};