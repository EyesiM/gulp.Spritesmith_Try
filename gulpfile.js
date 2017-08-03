var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
	var spriteData = gulp.src('src/images/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss',
		cssFormat: 'scss',
		cssTemplate:'scss.template.mustache',
		cssOpts: 'spriteSrc'
	}));
	return spriteData.pipe(gulp.dest('src/static'));
});
