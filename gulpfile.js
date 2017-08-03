var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	runSequence = require('run-sequence');

var config = {
	//原图片地址
	spriteSource: 'src/images/',
	//生产成的雪碧图存放地址
	spriteSavePath: 'src/static',
	spriteConfig: {
		imgName: 'sprite.png',// 存放生产图片的文件名
		cssName: 'sprite.scss',//存放生产图片对应的样式表，这里选用的是 SCSS
		cssFormat: 'scss',//存放样式表的格式，这里写的是 scss 文件， 不填默认为 css 格式
		imgPath: 'src/images',//可选选项，CSS 中引用图片的路径
		padding: 0,// 表示生产出的雪碧图中图片的间隔像素，默认是 0
		algorithm: 'binary-tree',//定义打包成雪碧图的打包方式，默认是 binary-tree,还有:top-down、left-right、diagonal、alt-diagonal	
		algorithmOpts: {
			sort: true//默认是 true
		},//这里的配置是针对上面的 algorithm 做配置
		engine: 'pixelsmith',//对生产雪碧图图片的引擎的选用，默认选用 pixelsmith,其他的引擎例如 phantomjssmith、canvassmith、gmsmith 等需要 npm install 才可使用
		engineOpts: {
			// phantomjssmith 可接受超时的设置
			// timeout: 10000
		},//这里的配置是针对上面的 engine 做配置
		imgOpts: {
			// gmsmith 支持对图片质量的配置
			// quality: 75
		},
		cssTemplate: '',//spritesmith 支持 css 模版，例如 scss.template.mustache 等，但这里的例子不打算使用
		cssHandlebarsHelpers: {
			// half: function (num) {
				// return num/2; 
			// }
		},//可以用于对 cssTemplate 的配置
		cssVarMap: function() {

		},//这是一个可以设置每个文件名到 CSS 变量的映射函数
		cssSpritesheetName: '',
		cssOpts: {
			//例如设置跳过 mixin 的输出
			//functions: false
		}//这里可以对 CSS 模版的设置
	},

}

//生产雪碧图
gulp.task('sprite:images', function() {
	var spriteData = gulp.src( config.spriteSource + '*.+(png|jpg|jpeg|gif|svg)')
	.pipe(spritesmith(config.spriteConfig));
	return spriteData.pipe(gulp.dest(config.spriteSavePath));
});

//压缩
gulp.task('sprite:minify', function() {
  return gulp.src(config.spriteSavePath + '/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      interlaced: true,
    }))
  .pipe(gulp.dest(config.spriteSavePath))
});

gulp.task('sprite',function() {
	runSequence(
		'sprite:images',
		'sprite:minify'
	)//使用同步插件使任务按顺序执行
});