module.exports = {
  future: { webpack5: true },
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

    config.resolve.modules.push(path.resolve("./"))

    config.context = require("path").resolve(__dirname)

    // console.log(JSON.stringify(config))
    return config
  },
  typescript: {
    // Dangerous; manually typecheck before run/build
    // this also causes webpack ModuleNotFoundError instead of a typescript TypeError
    ignoreBuildErrors: true,
  },
}
