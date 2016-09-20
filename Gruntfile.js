module.exports = function(grunt){

    // so we dont need to require all the dependencies seperately
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            files: ["js/*.js"],
            options: {
                globals: {
                    module: true,
                    console: true,
                    document: true
                }
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["js/*.js"],
                dest: "js/all.js"
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "bower_components/jquery/",
                        src: ["jquery.min.js"],
                        dest: "../public/js/lib/"
                    },
                    {
                        expand: true,
                        cwd: "relativesource/path/",
                        src: ["filename.min.js"],
                        dest: "../relativedestination/path/"
                    }
                ]
            }
        },
        uglify: {
            build: {
                files: {
                    "js/all.min.js": ["js/all.js"]
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {

                },
                src: "stylesheets/style.css",
                dest: "stylesheets/style.css"
            }
        },
        sass: {
            dist: {
                options: {
                    style: "compressed",
                },
                files: [{
                    src: ["sass/style.scss"],
                    dest: "stylesheets/style.css",
                    ext: ".css"
                }]
            },
            dev: {
                options: {
                    trace: true,
                    sourcemap: "file",
                    style: "expanded",
                    lineNumbers: true,
                },
                files: [{
                    src: ["sass/style.scss"],
                    dest: "stylesheets/style.css",
                    ext: ".css"
                }]}
        },
        watch: {
            compass: {
                files: ["**/*.{scss,sass}"],
                tasks: ["sass:dev", "autoprefixer:dev"]
            },
            js: {
                files: ["js/somefolder/*.js", "js/someotherfolder/*.js"],
                tasks: ["copy", "concat"]
            }
        }
    });
    grunt.registerTask("default", ["sass:dev", "autoprefixer:dev", "concat", "copy"]);
    grunt.registerTask("build", ["sass:dist", "autoprefixer:dev", "copy", "uglify", "concat"]);
};
