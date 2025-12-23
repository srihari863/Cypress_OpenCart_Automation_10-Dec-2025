const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://tutorialsninja.com/demo/index.php',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    URL: 'http://tutorialsninja.com/demo/index.php',
  },
});
