/* IMPORT MODULES */
var gulp = require('gulp');
var sass = require('gulp-sass');


/* DECLARE VARS */
var PATHS = {
    styles: {
        src: 'src/styles/',
        dest: './public/css/',
    }
};


/* DECLARE TASKS */
/**
 * 'Default' Gulp task, executed when `gulp` is run from the
 * command line with *no* arguments.
 *
 * The following tasks are executed *before* the contents of
 * the `default` task.
 * - `styles`
 * - `watch`
 */
gulp.task( 'default', [ 'styles', 'watch' ], function() {
    console.log( 'INSIDE TASK: `default`' );
} );


/**
 * Task converts contents of `styles.scss` file (plus any
 * `*.scss` linked via `@import)` to vanilla CSS.
 *
 * Resulting CSS file is saved to specified 'dest' directory
 */
gulp.task( 'styles', function() {
    console.log( 'INSIDE TASK: `styles`' );

    return gulp.src( PATHS.styles.src + 'styles.scss' )
        .pipe( sass(
            {
                outputStyle: 'compressed',
                includePaths: []
            }).on( 'error', sass.logError )
        )
        .pipe( gulp.dest( PATHS.styles.dest ) );
} );


/**
 * Task watches for changes to files in `src/` directory,
 * executes appropriate task.
 */
gulp.task( 'watch', function() {
    console.log( 'INSIDE TASK: `watch`' );

    gulp.watch( PATHS.styles.src + '**/*.scss', [ 'styles' ] );
} );
