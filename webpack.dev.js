const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            'modifyVars': { 'menu-dark-submenu-bg':'#147465', 'primary-color': '#1DA57A', 'layout-header-background': '#147465', 'tooltip-bg': 'rgba(20, 116, 101, 0.75);', 'tooltip-color': '#147465' }, // #1DA57A #147465 #CAFFF7 #96FFEF #FFFFFF
                            javascriptEnabled: true
                        }
                    }]
            }
        ]
    },
    externals: {
        'appsettings': JSON.stringify(require('./appsettings.dev.json'))
    }
});