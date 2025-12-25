// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';

// Import cypress-xpath to enable the use of cy.xpath()
import 'cypress-xpath';

Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    console.log(err.message);
    if (err.message.includes('c.Questionnaire$controller$controller$selectChiledAccount')) {
        return false
    }
    if (err.message.includes(`Cannot read properties of	undefind (reading 'value')`)) {
        return false
    }
    if (err.message.includes('Callback failed: apex://QuestionnaireController/ACTION$copyFilesApex')) {
        return false
    }
    if (err.message.includes('Action failed:forceSearch')) {
        return false
    }
    if (err.message.includes('Error during LWC component phase')) {
        return false
    } if (err.message.includes('resetFromValues')) {
        return false
    } if (err.message.includes('Cannot read properties of undefined (reading \'toLowerCase\')')) {
        return false
    }
});