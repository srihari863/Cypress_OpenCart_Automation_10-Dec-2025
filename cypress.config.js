const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  includeShadowDom: true,
  video: true,
  //reporter: 'mocha-junit-reporter',
  reporterOptions:{
    mochaFile: 'results/test-results-[hash].xml',
    includePending: true,
    testCaseSwitchClassnameAndName: true,
  },
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

