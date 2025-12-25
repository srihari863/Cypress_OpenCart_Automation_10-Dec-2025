const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      //implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    baseUrl: 'https://tutorialsninja.com/demo',
    loginUrl: 'https://tutorialsninja.com/demo/index.php?route=account/login',
  },
});

