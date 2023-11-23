const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Your existing Cypress configuration
  component: {
    // Your existing component configuration
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
