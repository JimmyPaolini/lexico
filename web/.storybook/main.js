module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  framework: "@storybook/react",
  core: { builder: "@storybook/builder-webpack5" },
  features: { previewMdx2: true },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    return config
  },
}
