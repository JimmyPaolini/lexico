module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.stories.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-material-ui",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    return config
  },
}
