module.exports = function (config) {
    config.set({
        files: [
            'vendor/angular/angular.js',
            'vendor/angular-mocks/angular-mocks.js',
            'js/src/**/*.js',
            'js/test/unit/**/*Test.js'
        ],
//        basePath: '',
        preprocessors: {
            'js/src/**/*.js': 'coverage'
        },
        reporters: ['coverage', 'dots'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        port: 9999,
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: false,
        colors: true
    });
};