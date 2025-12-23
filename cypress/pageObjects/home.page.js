class homePage {

    openCartLogo = "#logo";
    featrueProductList = "div[class*='product-layout']";
    myAccountMenu = "//span[normalize-space()='My Account']";
    loginLink = "//a[normalize-space()='Login']";
    registerLink = "//a[normalize-space()='Register']";

    getHomePageTitle() {
        return cy.title();
    }

    isOpenCartLogoExist() {
        return cy.get(this.openCartLogo)
            .should('exist')
            .and('be.visible');
    }

    clickMyAccountMenu() {
        cy.xpath(this.myAccountMenu)
            .scrollIntoView()
            .should('exist')
            .click({ force: true });
    }

    getFeatureProductListCount() {
        return cy.get(this.featrueProductList)
            .should('exist')
            .and('be.visible')
            .its('length');
    }

    navigateToLoginPage() {
        this.clickMyAccountMenu();
        cy.xpath(this.loginLink).wait(1000).click({force: true});
    }

    navigateToRegisterPage() {
        this.clickMyAccountMenu();
        cy.xpath(this.registerLink).wait(1000).click({force: true});

    }

}
export default homePage;