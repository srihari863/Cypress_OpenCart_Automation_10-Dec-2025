class productDetailsPage {

    productHeader = "//div[@id='content']//div[1]/div[2]/h1";
    productImageList = "//ul[@class='thumbnails']//li/a";
    productMetaList = "(//div[@id='content']/div/div[2]/ul[@class='list-unstyled'])[position()=1]/li";
    productPriceList = "(//div[@id='content']/div/div[2]/ul[@class='list-unstyled'])[position()=2]/li";
    homeIcon = "//i[@class='fa fa-home']";
    productNameBreadCrumb = "//ul[@class='breadcrumb']//li[1]";
    quantityEditBox = "//input[@id='input-quantity']";
    addToCartButton = "//button[@id='button-cart']";
    productAddedToCartSuccessMessage = ".alert.alert-success.alert-dismissible";
    shoppingCartLink = "//a[normalize-space()='shopping cart']";

    getProductHeaderText() {
        return cy.xpath(this.productHeader)
            .should('exist')
            .and('be.visible')
            .invoke('text');
    }

    getProductImageCount() {
        return cy.xpath(this.productImageList)
            .should('exist')
            .and('be.visible')
            .its('length');
    }

    clickOnHomeIcon() {
        cy.get(this.homeIcon)
            .should("be.visible")
            .click();
    }

    clickOnProduct(productName) {
        cy.xpath(this.productThumb)
            .contains(productName)
            .should('exist')
            .and('be.visible')
            .click();
    }

    clickOnAddToCart() {
        cy.xpath(this.addToCartButton)
            .should('exist')
            .and('be.visible')
            .click();
    }

    setQuantity(quantity) {
        cy.xpath(this.quantityEditBox)
            .should('exist')
            .and('be.visible')
            .clear()
            .type(quantity);
    }

    clickOnHomeIcon() {
        cy.xpath(this.homeIcon)
            .should('exist')
            .and('be.visible')
            .click();
    }
}
export default productDetailsPage;