'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'config/coverage_blanket',
          quiet: false
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'build/coverage.html'
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
        tasks: ['jshint:gruntfile', '_runTests']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', '_runTests']
      },
      config: {
        files: '<%= jshint.config.src %>',
        tasks: ['jshint:config', '_runTests']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', '_runTests']
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
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Task aliases
  grunt.registerTask('_runTests', ['env:test', 'mochaTest']);
  grunt.registerTask('test', ['jshint', '_runTests']);
  grunt.registerTask('dev', ['env:dev', 'nodemon']);
  grunt.registerTask('prod', ['env:prod', 'nodemon']);

  // Default task
  grunt.registerTask('default', ['test']);
};
