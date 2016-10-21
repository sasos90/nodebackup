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
                src: ["source/js/*.js"],
                dest: "public/js/all.js"
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "source/js/libs/",
                        src: ["jquery.min.js"],
                        dest: "public/js/libs/"
                    },
                    {
                        expand: true,
                        cwd: "source/js/libs/",
                        src: ["jquery-ui.min.js"],
                        dest: "public/js/libs/"
                    },
                    {
                        expand: true,
                        cwd: "source/sass/libs/",
                        src: ["jquery-ui.min.css"],
                        dest: "public/css/libs/"
                    }
                ]
            }
        },
        uglify: {
            build: {
                files: {
                    "public/js/all.min.js": ["public/js/all.js"]
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {

                },
                src: "public/css/style.css",
                dest: "public/css/style.css"
            }
        },
        sass: {
            dist: {
                options: {
                    style: "compressed",
                },
                files: [{
                    src: ["source/sass/style.scss"],
                    dest: "public/css/style.min.css",
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
                    src: ["source/sass/style.scss"],
                    dest: "public/css/style.css",
                    ext: ".css"
                }]}
        },
        watch: {
            compass: {
                files: ["**/*.{scss,sass}"],
                tasks: ["sass:dev", "autoprefixer:dev"]
            },
            js: {
                files: ["source/js/*.js"],
                tasks: ["copy", "concat"]
            }
        }
    });
    grunt.registerTask("default", ["sass:dev", "autoprefixer:dev", "concat", "copy"]);
    grunt.registerTask("build", ["sass:dist", "autoprefixer:dev", "copy", "concat", "uglify"]);
};
