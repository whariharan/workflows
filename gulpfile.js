var gulp=require('gulp'),
	gUtil=require('gulp-util'),
	coffee=require('gulp-coffee'),
	concat=require('gulp-concat'),
	browseify=require('gulp-browserify'),
	compass=require('gulp-compass');


gulp.task('log',function(){
	gUtil.log('Chasing for good things');
});

var coffeeSources=['components/coffee/tagline.coffee'];
var jsSources=[
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'];
var sassSources=['components/sass/style.scss'];

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true}))
		.on('error',gUtil.log)
	.pipe(gulp.dest('components/scripts'));
});

gulp.task('js',function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browseify())
	.pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass',function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass:'components/sass',
		image:'builds/development/images',
		style:'expanded'
	}))
	.on('error',gUtil.log)
	.pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']);
});

gulp.task('default',['coffee','js','compass','watch']);
