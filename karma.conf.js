module.exports = function(config) {
config.set({
basePath: '',
frameworks: ['jasmine'],
files: [
'src/App.test.js'
],
exclude: [
'*'
],
presets: ["@babel/preset-env", "@babel/preset-react"],
preprocessors: {
'src/**/*.test.js': ['webpack']
},
webpack: {
mode: 'development',
module: {
rules: [
{
test: /\.jsx?$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader'
}
}
]
},
resolve: {
extensions: ['.js', '.jsx']
}
},
reporters: ['progress'],
port: 9876,
colors: true,
logLevel: config.LOG_INFO,
autoWatch: true,
browsers: ['Chrome'],
singleRun: true,
concurrency: Infinity
})
}