const debug = process.env.NODE_ENV !== "production";

module.exports = {
    runtimeCompiler: true,
    // devServer: {
    //     proxy: "http://www.wanggh.cn:8000"
    // },
    configureWebpack: config => {
        if (debug) {
            config.devtool = "source-map";
        }
    }
};