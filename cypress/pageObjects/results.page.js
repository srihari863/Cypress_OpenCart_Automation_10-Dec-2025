class resultsPage {
    productNameHeader = "div[id='content'] h1";
    productList = "div[class*= 'product-layout product-grid']";
    productLink = "//div[@class='caption']//a";

    getProductHeaderText() {
        return cy.get(this.productNameHeader)
            .should('exist')
            .and('be.visible')
            .invoke('text');
    }
    
    getPrductListCount() {
        return cy.get(this.productList)
            .should('exist')
            .and('be.visible')
            .its('length');
    }

    selectProduct(productName) {
        cy.log("Selecting product: " + productName);
        cy.xpath(this.productLink)
            .contains(productName)
            .should('exist')
            .and('be.visible')
            .click();
        cy.log("Clicked on product: " + productName);
        cy.wait(1000);
    }

}
export default resultsPage;