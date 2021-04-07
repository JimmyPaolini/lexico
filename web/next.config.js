module.exports = {
  webpack: (config, { isServer }) => {
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
    //   test: /\.tsx?$/,
    //   use: "ts-loader",
    //   exclude: /node_modules/,
    // })
    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx")
    return config
  },
  typescript: {
    ignoreBuildErrors: true, // Dangerous; typecheck before run/build
  },
}
