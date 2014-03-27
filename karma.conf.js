module.exports = function (config) {
    config.set({
        files: [
            'vendor/angular/angular.js',
            'vendor/angular-mocks/angular-mocks.js',
            'js/src/**/*.js',
            'js/test/unit/**/*Test.js'
        ],
        basePath: '',
        frameworks: ['jasmine'],
        preprocessors: {
            'js/src/**/*.js': 'coverage'
        },
        reporters: ['coverage', 'dots'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        port: 9999,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false
    });
};