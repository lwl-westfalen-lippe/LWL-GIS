'use strict';

module.exports = function(grunt) {

	// Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['js/*.js'],
    },

    clean: {
      dist: 'dist'
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: './',
            dest: 'dist',
            src: [
              'index.html',
              'map.html'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: 'css/',
            dest: 'dist/css',
            src: [
              '*.css'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: 'js/',
            dest: 'dist/js',
            src: [
              '*.js'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: 'images/',
            dest: 'dist/images',
            src: [
              '*.png',
              '*.gif'
            ]
          }
        ]
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      html: {
        files: ['index.html','map.html'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/lwl-style.css','css/menuPane.css'],
        options: {
          livereload: true
        }
      },
      js: {
      	files: ['js/*.js'],
      	tasks: ['jshint:all'],
      	options: {
      		livereload: true
      	}
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 1337,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: {
            path: 'dist',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
    	'jshint:all',
    	'clean:dist',
      'copy:dist',
      'connect:livereload',
      'watch'
    ]);
  });
};
