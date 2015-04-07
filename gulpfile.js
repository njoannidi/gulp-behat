gulp = require('gulp');
coffee = require('gulp-coffee');

gulp.task('coffee', function()
{
	gulp.src('./src/index.coffee')
	.pipe(coffee(), {bare: true})
	.pipe(gulp.dest('./'));
});