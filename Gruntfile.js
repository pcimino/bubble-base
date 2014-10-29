module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    /*
     * Project settings.  These are properties defined in one place and reused throughout the build script.
     * Properties:
     *    app - the root directory of the source files
     *    dist - the directory where the final build output is stored
     *    tmp - the temporary working directory
     */ 
    properties: {
        targetDir: 'target/'
    },
    meta: {
        banner:
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.author %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= pkg.licenses.copyright %> \n' +
            ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
            ' \n'
    },
   
    // clean out packaging directories
    clean: {
      main: { src: [ 'build', 'target' ] }
    },
    
    // concatenate files in to one package
    concat: {
        options: {
          separator: ';'
        },
        dist: {
            src: [
              '<%= pkg.directories.source %>/app.js',
              '<%= pkg.directories.source %>/app/**/*.js',
              '!<%= pkg.directories.source %>/lib/**/*.js', 
              '!<%= pkg.directories.source %>/**/*.spec.js', 
              '!<%= pkg.directories.source %>/bower_components/**/*'
            ],
            dest: 'build/<%= pkg.name %>.js'
        }
    },
    
    /* ISSUE with cssmin
     * for now copy the css files
     * and set the file list in cssmin to NOT (!) 
     * cannot simply remove the cssmin task yet, breaks the usemin step
     */
    // copy files to packing directories 
    copy: {
        main: {
            files: [
              { expand: true, cwd: '<%= pkg.directories.source %>/', src: ['**/*.html', 'lib/**/*.js', 'assets/**/*', 'app/json/**/*'], dest: '<%= properties.targetDir %>'}
            ]
        },
        cssMin: {
            files: [
              { expand: true, cwd: '<%= pkg.directories.source %>/', src: ['app/css/**/*'], dest: 'build'}
            ]
        },
        expand: {
          files: [
            { expand: true, cwd: '<%= pkg.directories.source %>/', src: ['**/*.js', '!config/*.js'], dest: 'build/'}
          ]
        },
        externalLibraries: {
            files: [
              { expand: true, cwd: '<%= pkg.directories.source %>/', src: ['bower_components/**/*.map', 'bower_components/**/*.min.js', 'bower_components/**/*.css'], dest: '<%= properties.targetDir %>'}
            ]
        },
        rawBuildFile: {
            files: [
               { 
                   expand: true, cwd: 'build/', src: ['<%= pkg.name %>.js'], dest: '<%= properties.targetDir %>',
                   rename: function(dest, src) {
                       return dest + src.substring(0, src.indexOf('.js')) + '.min.js';
                     }
               }
            ]
        }
    },
    // minify the CSS files
    cssmin: {
      add_banner: {
        options: {
          banner: '/* NSB Minified CSS \n<%= meta.banner %> */\n'
        },
        files: {
          '<%= properties.targetDir %>css/<%= pkg.name %>.min.css': ['build/app/css/*.css']
        }
      }
    },
    
    // qunit test location
    qunit: {
        files: ['test/qunit/*.html']
    },
    // Karma runs jasmine tests
    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
 
    // lint for JS to check for consistent coding conventions and quality
    jshint: {
      options: {
        jshintrc: '<%= pkg.directories.source %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= pkg.directories.source %>/{app,components}/**/*.js',
        '!<%= pkg.directories.source %>/{app,components}/**/*.spec.js',
        '!<%= pkg.directories.source %>/{app,components}/**/*.mock.js'
      ]
    },
    // watch for file changes and rerun jobs as defined
    watch: {
      debug: {
        files: ['Gruntfile.js', '<%= jshint.files %>', '<%= pkg.directories.source %>{app,components}/**/*'],
        tasks: [ 'test' ] 
      },
      deploy: {
        files: ['Gruntfile.js', '<%= jshint.files %>', '<%= pkg.directories.source %>{app,components}/**/*'],
        tasks: [ 'preProcess-deployment', 'postProcess-deployment' ]
      },
      deployRaw: {
          files: ['Gruntfile.js', '<%= jshint.files %>', '<%= pkg.directories.source %>{app,components}/**/*'],
          tasks: [ 'preProcess-deployment', 'postProcess-deployment-raw' ]
      }
    },
    
    // Renames files for browser caching purposes
    rev: {
        files: {
            src: ['<%= properties.targetDir %>**/*.{js,css}']
        }
    },
   
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= pkg.directories.source %>/**/*.html',
      options: {
        flow: {
            html: {
            steps: {
              js: ['concat']
            },
            post: {}
          }
        }
      }
    },
    
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        html: ['<%= properties.targetDir %>**/*.html'],
        css: ['<%= properties.targetDir %>**/*.css']
    },
    uglify: {
        options: {
          banner: '/*! <%= meta.banner %> */\n',
          mangle: false,
          ascii_only: true,
          quote_keys: true,
          sourceMap: true,
          compress: {
              global_defs: {
                "DEBUG": false /* wrap code in if (DEBUG) {} and these code blocks will be removed, can setup build flag for local vs prod */
              },
              dead_code: true
          }
        },
        target: {
          files: {
            '<%= properties.targetDir %><%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
          }
        }
    },
     "regex-replace": {
         src: ['<%= properties.targetDir %>/index.html'],
         actions:[{
             name: 'indexStamp',
             search: 'BUILD_TIME_STAMP',
             replace: '<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
             flags: 'g'
         }]

     },
     'string-replace': {
         kit: {
           files: {
               '<%= properties.targetDir %>/index.html': '<%= properties.targetDir %>/index.html'
           },
           options: {
             replacements: [{
               pattern: /@@BUILD_TIME_STAMP@@/ig,
               replacement: '<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT Z") %>'
             }]
           }
         }
       }
  });
  
  /**
   * Load Grunt plugins
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-string-replace');
  
  /**
   * Register grunt tasks
   */
  grunt.registerTask('test', 'Run JSHint  and Jasmine tests', ['jshint', 'karma:unit']);
  grunt.registerTask('default', 'Build, run tests, build and watch', [ 'test', 'preProcess-deployment', 'postProcess-deployment']); // TODO , 'watch:debug']);
  grunt.registerTask('copyMainFiles', 'Copies files and runs string replace on the index.html build tag', [ 'copy:main', 'string-replace']);

  grunt.registerTask('preProcess-deployment', 'Pre deployment setup', ['test', 'clean:main', 'concat:dist', 'copy:cssMin', 'cssmin', 'copyMainFiles']);
  
  grunt.registerTask('postProcess-deployment', 'Windows Post deployment processing', [ 'useminPrepare', 'uglify', 'rev', 'usemin', 'copy:externalLibraries', 'test' ]);
  grunt.registerTask('postProcess-deployment-raw', 'Windows Post deployment processing', [ 'useminPrepare', 'copy:rawBuildFile', 'rev', 'usemin', 'copy:externalLibraries', 'test' ]);

  grunt.registerTask('build', 'Deployment build', [ 'preProcess-deployment', 'postProcess-deployment']);
  grunt.registerTask('build-raw', 'Buildst without minification', [ 'preProcess-deployment', 'postProcess-deployment-raw']);
  //grunt.registerTask('deploy', 'Deployment for local development', [ 'preProcess-deployment', 'postProcess-deployment']); // TODO , 'watch:deploy']);
  //grunt.registerTask('deploy-raw', 'Deployment for local development, but without minifying source code', [ 'preProcess-deployment', 'postProcess-deployment-raw']); // TODO , 'watch:deployRaw']);

  
};