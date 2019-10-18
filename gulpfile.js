const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server для удаленного полключения в браузере ввести http://localhost:3001/
// для запуска только сервера команда в терминале gulp server
gulp.task('server', function() {

    browserSync({
        server: {
            // baseDir: "src" // для отладки
            baseDir: "distr"     // для релиза
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// конвертируем sass или scsss в файл css
// для запуска команда в терминале gulp styles
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''})) // Добавляем файлу css префикс .min
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(gulp.dest("src/css"))  // для отладки
        .pipe(gulp.dest("distr/css"))   // для релиза
        .pipe(browserSync.stream());
});

// Отслеживаем изменения в файлах
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html')); // для релиза, задача ниже
});

// Для релиза. Получаем любой html файл в папке src, преобразовываем и кладем в dist
gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', function() {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});



// задача запускается в терминале коммандой gulp
// gulp.task('default', gulp.parallel('watch', 'server', 'styles')); // для отладки
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));