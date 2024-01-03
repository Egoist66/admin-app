const gulp = require('gulp')
const webpack = require("webpack-stream");
const _webpack = require('webpack')

const dist = "/Applications/MAMP/htdocs/react-admin/admin";
// Здесь должен быть путь к папке admin в вашем проекте на локальном сервере

gulp.task("copy-html", () => {
    return gulp.src("./app/src/index.html")
        .pipe(gulp.dest(dist));
});

gulp.task("build-js", () => {
    return gulp.src("./app/src/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.(js|ts)x?$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                configFile: './.babelrc',
                                presets: [['@babel/preset-env', {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: "usage"
                                    }],
                                    "@babel/react",

                                ]
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        }), _webpack)
        .pipe(gulp.dest(dist));
});



gulp.task("copy-api", () => {
    return gulp.src("./app/api/**/*.*")
                .pipe(gulp.dest(dist + "/api"));
});

gulp.task("copy-assets", () => {
    return gulp.src("./app/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"));
});

gulp.task("watch", () => {
    gulp.watch("./app/src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./app/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./app/api/**/*.*", gulp.parallel("copy-api"));
    gulp.watch("./app/src/**/*.{js,ts,tsx,jsx}", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "copy-api", "build-js"));

gulp.task("default", gulp.parallel("watch", "build"));