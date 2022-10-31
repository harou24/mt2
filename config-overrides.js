module.exports = function override(config, env) {
    config.optimization.splitChunks = {
        cacheGroups: {
            default: false,
        },
    };
    config.output.filename = 'static/js/bundle.js'
    config.optimization.runtimeChunk = false;
    return config;
}