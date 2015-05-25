module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            sitecss: {
                files: {
                    'wwwroot/assets/css/styles.min.css': [
                        'bower_components/materialize/dist/css/materialize.css',
                        'bower_components/animate.css/animate.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            applib: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/materialize/dist/js/materialize.js',
                    'bower_components/angular/angular.js'
                ],
                dest: 'wwwroot/assets/js/scripts.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/materialize/font/',
                        src: '**',
                        dest: 'wwwroot/assets/font/',
                        flatten: false
                    }
                ]
            }
        }
    });

    grunt.registerTask("default", ["bower:install"]);
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
};