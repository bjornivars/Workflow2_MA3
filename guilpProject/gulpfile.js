const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

function css() {
    // 1. Where is the file which we would like to work on
    return src('sass/**/*.scss')
    // 2. Compile the SCSS to CSS  
      .pipe(sass())
    // 3. Minify the CSS  
      .pipe(minifyCSS())
    // 4. Write the css file out to a specific destination
      .pipe(dest('css'))
      .pipe(browserSync.stream())  
}

function imageminify() {
    return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'))

}

function watch(){
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./images/*');
    gulp.watch('./*.html').on('change', browserSync.reload);

}

exports.watch = watch;
exports.minifyimages = imageminify;