module.exports = function (_a) {
    var file = _a.file, options = _a.options, env = _a.env;
    return ({
        parser: file.extname === '.css' ? 'sugarss' : false,
        plugins: {
            'postcss-import': {},
            'postcss-preset-env': {},
            'cssnano': {}
        }
    });
};
//# sourceMappingURL=postcss.config.js.map