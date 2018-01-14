const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const rootPath = __dirname;
let srcPath = path.resolve(rootPath, './src');
let binPath = path.resolve(rootPath, './bin');

module.exports = function(env, args) {
    const isProd = (env && env.production) || false;
    const isTest = (env && env.test) || false;
    const isWatch = (env && env.watch) || false;

    const webVersion = (args && args.webVersion) || '';
    const addCoverage = (args && args.addCoverage) || false;
    const addSourceMap = (args && args.addSourceMap) || true;

    const config = {
        entry: {
            'main': './src/main.js',
        },
        output: {
            path: path.resolve(binPath, './js'),
            filename: '[name].js',
            chunkFilename: '../js/[chunkhash].js',
        },
        resolve: {
            modules: [
                'src/',
                'node_modules'
            ],
            extensions: ['.webpack.js', '.web.js', '.js', '.js6', '.js7']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                ['env', {
                                    targets: {
                                        browsers: ['last 5 versions']
                                    }
                                }]
                            ],
                            plugins: ['transform-runtime']
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                'React': 'react',
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : '')
            })
        ]
    };

    if (isProd) {
        config.devtool = false;
    }
    else {
        config.devtool = 'inline-cheap-module-source-map';
        config.profile = true;
    }

    if (isTest) {
        config.devtool = false;
        if (addSourceMap) {
            config.devtool = 'inline-source-map';
        }
        if (addCoverage) {
            config.module.rules.push({
                test: /\.js$/,
                include: srcPath,
                exclude: [
                    path.join(srcPath, '3rd-parties')
                ],
                enforce: 'post',
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    query: {
                        esModules: true
                    }
                }
            });
        }
        config.module.rules.push({
            test: /\.html$/,
            exclude: /(node_modules)/,
            use: 'raw-loader'
        });
    }

    if (isWatch) {
        config.watch = true;
    }

    if (isWatch || isTest) {
        config.plugins.push(new WebpackNotifierPlugin({
            title: 'Build Finished',
            excludeWarnings: true,
            alwaysNotify: true
        }));
    }

    return config;
};