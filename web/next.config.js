module.exports = {
  // future: { webpack5: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    // config.module.rules.push({
    //   test: /\.\.\/.*\/\.ts$/,
    //   exclude: /node_modules/,
    //   loader: "next-babel-loader",
    //   // use: {
    //   //   options: {
    //   //     presets: ["@babel/env", "ES2020", "@babel/typescript"],
    //   //   },
    //   // },
    // })

    // config.resolve.modules.push(require("path").resolve("./"))

    // config.context = require("path").resolve(__dirname)

    // console.log(JSON.stringify(config))
    return config
  },
  // typescript: {
  //   // Dangerous; manually typecheck before run/build
  //   // this also causes webpack ModuleNotFoundError instead of a typescript TypeError
  //   ignoreBuildErrors: true,
  // },
}
