// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginData from '../fixtures/loginData.json'

Cypress.Commands.add("login", () => {
  cy.session('user', () =>{
  cy.visit("?route=account/login");
  cy.log("Performing login");
  cy.get("#input-email").clear().type(LoginData.validCredentials.username);
  cy.get("#input-password").clear().type(LoginData.validCredentials.password);
  cy.get("input[value='Login']").click();
  cy.location('search').should('include', 'route=account/account');
   })
});

Cypress.Commands.add(
  "doProductSearch",
  (productNames, searchBox, searchIcon, resultHeader) => {

    // safety check
    expect(productNames, 'Product list').to.be.an('array');
    cy.wrap(productNames).each((product) => {
      cy.log(`Searching for the product: ${product}`);

      cy.get(searchBox)
        .first()
        .scrollIntoView()
        .clear()
        .type(product, { force: true });

      cy.get(searchIcon)
        .first()
        .scrollIntoView()
        .click({ force: true });

      cy.get(resultHeader)
        .should('be.visible')
        .and('contain.text', product);
    });
  }
);


Cypress.Commands.add('checkBrokenLinks', () => {
  cy.get('a').each(($link) => {
    const href = $link.prop('href');

    // Skip empty, anchor, mailto, tel links
    if (
      href &&
      !href.includes('mailto:') &&
      !href.includes('tel:') &&
      !href.includes('#')
    ) {
      cy.request({
        url: href,
        failOnStatusCode: false,
      }).then((response) => {
        expect(
          response.status,
          `Link failed: ${href}`
        ).to.be.lessThan(400);
      });
    }
  });
});

Cypress.Commands.add('findBrokenLinksOnThePage', () => {
  let brokenLinks = 0;
  let activeLinks = 0;

  cy.get('a').each(($link, index) => {
    const href = $link.attr('href');
    if (href) {
      cy.request({ url: href, failOnStatusCode: false }).then((response) => {
        if (response.status >= 400) {
          cy.log(`*** Link ${index + 1} is Broken Link *** ${href}`);
          brokenLinks++;
        } else {
          cy.log(`*** Link ${index + 1} is Active Link ***`);
          activeLinks++;
        }
      });
    }
  }).then(($link) => {
    const totalLinks = $link.length;
    cy.log(`**** total links **** ${totalLinks}`)
    cy.log(`**** broken links **** ${brokenLinks}`)
    cy.log(`**** active links **** ${activeLinks}`)
  });
});

Cypress.Commands.add('verifyListText', (locator) => {
  cy.xpath(locator)
    .should('exist')
    .and('have.length.greaterThan', 0)
    .each(($el) => {
      cy.wrap($el)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          cy.log(`List Item: ${text.trim()}`);
        });
    });
  });
  /*cy.xpath(locator).each((_, index) => {

 // Re-fetch element to avoid stale DOM issue
 cy.xpath(locator).eq(index)
     .scrollIntoView()
     .should('be.visible')
     .invoke('removeAttr', 'target')
     .wait(1000)
     .click({ force: true });
 
 // Verify header is visible and has text
 cy.get("div[id='content'] h1", { timeout: 10000 })
   .should('exist')
   .and('not.be.empty')
   .invoke('text')
   .then((text) => {
     cy.log(`Header Text: ${text.trim()}`);
   });

 // Navigate back for next link
 cy.go('back');
});*/

  Cypress.Commands.add('verifyProductMetaDataDetails', (locator, expectedDetails) => {
    // Get all the rows under the locator
    cy.xpath(locator).each(($row) => {
      const rowText = $row.text().trim();
      // Loop through each key-value in the expectedDetails object
      Object.entries(expectedDetails).forEach(([key, value]) => {
        if (rowText.includes(key)) {
          expect(rowText).to.contain(value);
        }
      });
    });
  });
