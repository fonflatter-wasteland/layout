module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            minify: {
                files: {
                    'css/<%= pkg.name %>.min.css': 'css/<%= pkg.name %>.css'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    sourcemap: 'none'
                },
                files: {
                    'css/<%= pkg.name %>.css': 'css/<%= pkg.name %>.scss'
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'js/<%= pkg.name %>.min.js': require('wiredep')().js
                }
            }
        },
        wiredep: {
            target: {
                src: 'css/<%= pkg.name %>.scss'
            }
        }
    });

    grunt.registerTask('default', ['wiredep', 'sass', 'uglify', 'cssmin']);
};
