module.exports = {
  future: { webpack5: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    config.resolve.preferRelative = true
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
    // config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx")
    // config.resolve.modules.push(path.resolve("./"))
    return config
  },
  // typescript: {
  //   ignoreBuildErrors: true, // Dangerous; manually typecheck before run/build
  // },
}
