var gulp=require('gulp'),
	gUtil=require('gulp-util'),
	coffee=require('gulp-coffee');


gulp.task('log',function(){
	gUtil.log('Chasing for good things');
});

var coffeeSources=['components/coffee/tagline.coffee'];
gulp.task('coffee',function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true}))
		.on('error',gUtil.log)
	.pipe(gulp.dest('components/scripts'));
});