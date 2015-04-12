var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rimraf = require('gulp-rimraf');
var es = require('event-stream');
var browserSync = require('browser-sync');

gulp.task('preBuild', function(){
	return gulp.src('MyProject/Scripts/BuildOutput/*.*', { read: false })
    .pipe(rimraf());
});

gulp.task('myScripts', function (){
	var scriptBundle = gulp.src('MyProject/Scripts/MyScripts/*.js')
			.pipe(concat('myScriptsBundle.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('MyProject/Scripts/BuildOutput'));			
});

gulp.task('myLibs', function (){
	var scriptBundle = gulp.src('MyProject/Scripts/Libs/*.js')
			.pipe(concat('myLibsBundle.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('MyProject/Scripts/BuildOutput'));			
});

// gulp.task('browser-sync', function(){
// 	browserSync.init(["MyProject/Css/*.css", "MyProject/Scripts/BuildOutput/*.js"], {
// 		server: {
// 			baseDir: "MyProject",
// 			index: "View/index.html"
// 		}
// 	});
// });

gulp.task('browser-sync', function(){
	browserSync.init(["MyProject/Css/*.css", "MyProject/Scripts/BuildOutput/*.js"], {
		proxy: {
			target: "localhost/MyFirstGulp/MyProject/View"
		}
	});
});

gulp.task('scripts', ['preBuild', 'myLibs', 'myScripts', 'browser-sync'], function (){
	return ;
});

gulp.task('watch', ['scripts'], function(){
	gulp.watch('MyProject/Scripts/MyScripts/*.js', ['myScripts']);
});