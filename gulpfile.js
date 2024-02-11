const gulp = require('gulp')
const webpack = require("webpack-stream");
const _webpack = require('webpack')
const path = require('path')

let dist = "";
// Здесь должен быть путь к папке admin в вашем проекте на локальном сервере

if (process.platform === 'win32') {
    // Путь для операционных систем Windows
    dist = path.join('C:', 'MAMP', 'htdocs', 'react-admin', 'admin');
} else {
    // Путь для других операционных систем (например, Linux, macOS)
    dist = '/Applications/MAMP/htdocs/react-admin/admin';
}

gulp.task("copy-html", () => {
    return gulp.src("./app/src/index.html")
        .pipe(gulp.dest(dist));
});

gulp.task("build-js", () => {
    return gulp.src("./app/src/index.tsx")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'bundle.min.js'
            },
            watch: false,
            //devtool: "source-map",
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
                                    "@babel/preset-typescript",

                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.scss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        }), _webpack)
        .pipe(gulp.dest(dist));
});



gulp.task("copy-api", () => {

    gulp.src("./app/api/**/.*")
        .pipe(gulp.dest(dist + "/api"));

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