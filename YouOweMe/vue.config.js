const {HotModuleReplacementPlugin} = require('webpack');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
    configureWebpack: config => {
        console.log(config);
        config.entry = {
            main: ['./src/main.ts']
        }
        // Remove HMR, needed to work with ASP.NET Core's HMR
        for (let i=0; i<config.plugins.length; i++) {
            const plugin = config.plugins[i];
            if (HotModuleReplacementPlugin.prototype.isPrototypeOf(plugin)) {
                config.plugins.splice(i, 1);
                break;
            }
        }
    }
}
