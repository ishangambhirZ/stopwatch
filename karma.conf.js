module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        files: [
            '*.js',
            'tests/*.js'
        ],
        plugins: [
          'karma-chrome-launcher',
          'karma-jasmine'
        ],
        exclude: ['index.js', 'timer.js']
    });
};
