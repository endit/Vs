const path = require('path');
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {VueLoaderPlugin} = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = module.exports = {
    mode: "production",
    plugins: [],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    }
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Client entry
config.entry = {
    Vs: path.resolve(__dirname, '../src/main')
};

// Basic output config
config.output = {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'Vs',
    libraryTarget: 'umd',
};

config.externals = ['vue'];
// Resolver config
config.resolve = {
    extensions: ['.js', '.vue', '.css', '.scss', '.ts'],
    alias: {
        '~': path.resolve(__dirname, '../node_modules'),
        './images/layers.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/layers.png'),
        './images/layers-2x.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/layers-2x.png'),
        './images/marker-icon.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-icon.png'),
        './images/marker-icon-2x.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-icon-2x.png'),
        './images/marker-shadow.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-shadow.png'),
        './fullscreen.png$': path.resolve(__dirname, '../node_modules/leaflet-fullscreen/dist/fullscreen.png'),
        './fullscreen@2x.png$': path.resolve(__dirname, '../node_modules/leaflet-fullscreen/dist/fullscreen@2x.png'),
    },
    enforceExtension: false
};

config.resolveLoader = {
    modules: config.resolve.modules
};

config.module = {
    rules: [
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: {
                loader: 'url-loader',
            },
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: (loader) => [
                        require('postcss-import')({root: loader.resourcePath}),
                        require('autoprefixer')(), require('cssnano')()
                    ]
                }
            }]
        },
        {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader',
                options: {
                    singleton: true,
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }
    ]
};
process.traceDeprecation = true;

config.output.filename = 'Vs.min.js';
config.devtool = '#source-map';

config.plugins.push(new BundleAnalyzerPlugin());
config.plugins.push(new VueLoaderPlugin());
