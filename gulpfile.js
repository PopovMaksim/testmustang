let progect_folder = 'dist',
    sourse_folder = 'src';

let path = {
    build:{ //путь хранения выгрузки файлов
        html: progect_folder + '/',
        css: progect_folder + '/css/',
        js: progect_folder + '/js/',
        img: progect_folder + '/img/',
        fonts: progect_folder + '/fonts/',
    },
    src:{ //путь хранения исходных файлов
        html: [sourse_folder + '/*.html','!' + sourse_folder + '/_*.html'],
        css: sourse_folder + '/scss/style.scss',
        js: sourse_folder + '/js/script.js',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: sourse_folder + '/fonts/*.ttf',
    },
    watch:{ //путь хранения прослушиваемых файлов
        html: sourse_folder + '/**/*.html',
        css: sourse_folder + '/scss/**/*.scss',
        js: sourse_folder + '/js/**/*.js',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + progect_folder + '/' //удаление папки папки проекта, при запуске галп
}

const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'), //подключение различных файлов к основному html
    del = require('del'), //для удаления папки dist 
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'), //объединение медиа запросов
    clean_css = require('gulp-clean-css'), //сжатие css
    rename = require('gulp-rename'), //переименовывание файлов
    uglify = require('gulp-uglify-es').default, //сжатие js файлов
    imagemin = require('gulp-imagemin'); //сжатие картинок

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + progect_folder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude()) //соединение файлов
        .pipe(dest(path.build.html)) //выгрузка исходников в папку с результатом
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe (
            scss({
                outputStyle: 'expanded' //формирование несжатого файла
            })
        )
        .pipe( //сборка всех медиа запросов 
            group_media()
        )
        .pipe ( //добавление автопрефиксов
            autoprefixer({
                overriderBrowserlist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css)) //выгрузка исходников в папку с результатом
        .pipe(clean_css()) //сжимаем css
        .pipe(
            rename({
                extname: '.min.css' //переименовываем файл
            })
        )
        .pipe(dest(path.build.css)) //выгрузка исходников в папку с результатом
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude()) //соединение файлов
        .pipe(dest(path.build.js)) //выгрузка исходников в папку с результатом
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: '.min.js' //переименовываем файл
            })
        )
        .pipe(dest(path.build.js)) //выгрузка исходников в папку с результатом
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({ //сжимаем картинки
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7 качество сжимаемой картинки
            })
        )
        .pipe(dest(path.build.img)) //выгрузка исходников в папку с результатом
        .pipe(browsersync.stream())
}

function watchFiles(params) { //функция слежки за изменяемыми файлами
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);

}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;