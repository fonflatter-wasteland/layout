module.exports = function (grunt) {

    var globalConfig = {
        images: 'images',
        css: 'css',
        fonts: 'fonts',
        scripts: 'js',
        bower_path: 'bower_components'
    };

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        globalConfig: globalConfig,
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass-official/assets/fonts/',
                        src: ['**'],
                        dest: 'fonts/'
                    }
                ]
            }
        },
        cssmin: {
            minify: {
                files: {
                    '<%= globalConfig.css %>/<%= pkg.name %>.min.css': '<%= globalConfig.css %>/<%= pkg.name %>.css'
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
                    '<%= globalConfig.css %>/<%= pkg.name %>.css': '<%= globalConfig.css %>/<%= pkg.name %>.scss'
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
                    '<%= globalConfig.scripts %>/<%= pkg.name %>.min.js': require('wiredep')().js
                }
            }
        },
        wiredep: {
            target: {
                src: '<%= globalConfig.css %>/<%= pkg.name %>.scss'
            }
        }
    });

    grunt.registerTask('default', ['copy', 'wiredep', 'sass', 'uglify', 'cssmin']);
};
