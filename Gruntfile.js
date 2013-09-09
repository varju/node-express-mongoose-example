'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'config/coverage_blanket',
          quiet: false
        },
        src: ['test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['test/**/*.js']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/**/*.js']
      },
      config: {
        src: ['config/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'mochaTest']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'mochaTest']
      },
      config: {
        files: '<%= jshint.config.src %>',
        tasks: ['jshint:config', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app/main.js',
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config', 'test']
        }
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Task aliases
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // Default task
  grunt.registerTask('default', ['test']);
};
