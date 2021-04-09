module.exports = {
  // future: { webpack5: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    // if (!isServer) {
    //   config.node = {
    //     fs: "empty",
    //   }
    // }

    // config.module.rules.push({
    //   test: /\\.+(ts|tsx)$/,
    //   include: [dir],
    //   exclude: /node_modules/,
    //   use: [
    //     defaultLoaders.babel,
    //     { loader: "ts-loader", options: { transpileOnly: true } },
    //   ],
    // })

    // config.resolve.modules.push(path.resolve("./"))

    // config.context = require("path").resolve(__dirname + "/../")

    // remove existing plugin
    config.plugins = config.plugins.filter((plugin) => {
      return plugin.constructor.name !== "ForkTsCheckerWebpackPlugin"
    })
    // only report errors on a matcher that doesn't match anything
    config.plugins.push(
      new require("fork-ts-checker-webpack-plugin")({
        reportFiles: ["does-not-exist"],
      }),
    )

    return config
  },
  typescript: {
    // Dangerous; manually typecheck before run/build
    ignoreBuildErrors: true,
    //   transpileOnly: true,
  },
}
