var webpack = require('webpack');
module.exports = {
    entry: {
        index_build: './src/index.js',
        insurance_build: './src/insurance.js',
        asset_build: './src/asset.js',
        casher_build: './src/casher.js',
        channel_build: './src/channel.js',
        uav_build: './src/uav.js',
        frame_build: './src/frame.js',
        category_build: './src/category.js',
        car_build: './src/car.js',
        claims_build: './src/claims.js',
        free_build: './src/free.js'
    },
    output: {
        path: './build',
        publicPath: 'build/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel-loader'
            },
            { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=4192&name=[path][name].[ext]' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css']
    },
    babel: {
        presets: ['es2015', 'stage-2', 'react'],
        plugins: ['transform-runtime', 'add-module-exports']
    },
    devServer: {
        proxy: {
            '/v1/*': {
                target: 'http://staging.mifi.pt.xiaomi.com/',
                secure: false,
                changeOrigin: true,
                onProxyReq: function(proxyReq, req, res) {
                    //此处设置cookie
                    proxyReq.setHeader(
                        'Cookie',
                        '_INS3C_ACCIDENT_REPORT_=0e8afa30-7585-4d48-9309-b56549ba98b6; userName=130***455; uLocale=zh_CN; serviceToken=oI0vHJBryqcok9hcebRpune7RQFhlQcIpbZlVINPPRKZTDrjJT3DYbUncaeq+L60FK5DbF6e9Hey2rd+cIkbUy9evThgizHwr/fOlrHu9QbjVM3ZdIb9AHI9zdiFiW2+8FG0OH9/O2LiyzakHxTEe1/AW5W+5e1w3jEg6QHme3mZ94dRtZNQ4vAOWZyhfze+2Yf40wlb8U9pflXx4xVxu/OSmPcKwpErIc5rnxx2Q1U=; userId=4166015; mifiapi_slh=QN/ICE70aPwmHRuW+aV7oETGd58=; mifiapi_ph=K8typuIW8oEjfYIyQVry7w=='
                    );
                },
                bypass: function(req, res, proxyOptions) {}
            }
        }
    }
};
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = 'cheap-module-eval-source-map';
}