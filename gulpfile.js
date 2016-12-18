var gulp=require('gulp'),			
gUtil=require('gulp-util'),
coffee=require('gulp-coffee'),
concat=require('gulp-concat'),
browseify=require('gulp-browserify'),
compass=require('gulp-compass'),
connect=require('gulp-connect'),
gulpIf=require('gulp-if'),
gulpUglify=require('gulp-uglify'),
minifyHTML=require('gulp-minify-html');

var env,
	coffeeSources,
	jsonSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if(env==='development'){
	outputDir = 'builds/development/';
	sassStyle='expanded';
}
else {
	outputDir = 'builds/production/';	
	sassStyle='compressed';
}
coffeeSources=['components/coffee/tagline.coffee'];
jsSources=[
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'];
sassSources=['components/sass/style.scss'];
htmlSources=[outputDir + '*.html'];
jsonSources=[outputDir + 'js/*.json'];


gulp.task('log',function(){
	gUtil.log('Chasing for good things');
});

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
	.pipe(gulpIf(env === 'production',gulpUglify()))
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe(connect.reload());
});

gulp.task('compass',function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass:'components/sass',
		image:outputDir + 'images',
		style:sassStyle
	}))
	.on('error',gUtil.log)
	.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']);
	gulp.watch('builds/development/*.html',['html']);
	gulp.watch(jsonSources,['json']);
});

gulp.task('connect',function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html',function(){
	gulp.src('builds/development/*.html')
	.pipe(gulpIf(env === 'production',minifyHTML()))
	.pipe(gulpIf(env === 'production',gulp.dest(outputDir)))
	.pipe(connect.reload());
});
gulp.task('json',function(){
	gulp.src(jsonSources)
	.pipe(connect.reload());
});

gulp.task('default',['html','json','coffee','js','compass','connect','watch']);
