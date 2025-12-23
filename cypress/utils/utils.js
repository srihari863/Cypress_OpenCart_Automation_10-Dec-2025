class utils {

    verifyInvalidAlet(invalidAlert) {
        cy.xpath(invalidAlert)
            .should('be.visible')
            .and(($element) => {
                const text = $element.text();
                expect(text).to.match(/Warning:/);
            });
    }
    verifySuccessMessage(message) {
    cy.xpath(message).should('exist').then(($el) => {
            cy.log('Logout message: ' + $el.text());
        });
    }
}
export default utils;