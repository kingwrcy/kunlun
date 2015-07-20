/* 
* @Author: JerryWang
* @Date:   2015-07-19 10:31:41
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-19 11:47:13
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('default',['minjs','mincss','html','minimage','concat'], function() {
});

gulp.task('minjs', function() {
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js/'));
});

gulp.task('mincss',function(){
	gulp.src('css/*.css')
	.pipe(minifyCss())
	.pipe(gulp.dest('build/css/'));
});

gulp.task('html',function(){
	gulp.src('html/*.html')
	.pipe(gulp.dest('build/html/'));
});

gulp.task('minimage',function(){
	gulp.src('images/**/*')
	.pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
	.pipe(gulp.dest('build/images/'));
});

gulp.task('clean', function () {
	del(['build/']);
});


gulp.task('concat', function() {
	gulp.src(['build/js/jquery.min.js','build/js/jquery.mobile-events.min.js','build/js/welcome.js'])
    .pipe(concat('welcome-all.js'))
    .pipe(gulp.dest('build/js/'));

    gulp.src(['build/js/jquery.min.js','build/js/underscore-min.js','build/js/swiper.min.js','build/js/iscroll.js','build/js/load-image.all.min.js','build/js/cropper.min.js','build/js/imageCrop.js','build/js/list.js'])
    .pipe(concat('list-all.js'))
    .pipe(gulp.dest('build/js/'));

    gulp.src(['build/js/jquery.min.js','build/js/load-image.all.min.js','build/js/cropper.min.js','build/js/imageCrop.js','build/js/detail.js'])
    .pipe(concat('detail-all.js'))
    .pipe(gulp.dest('build/js/'));
});