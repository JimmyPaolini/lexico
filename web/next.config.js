module.exports = {
  webpack: (config, { isServer, dir, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    if (!isServer) {
      config.node = {
        fs: "empty",
      }
    }
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
    return config
  },
  // typescript: {
  //   ignoreBuildErrors: true, // Dangerous; manually typecheck before run/build
  // },
}
