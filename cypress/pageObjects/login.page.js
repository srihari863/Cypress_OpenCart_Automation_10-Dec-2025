class LoginPage {
    pageTitle = "//title[normalize-space()='My Account']";
    myAccountMenu = "//span[normalize-space()='My Account']";
    loginLink = "//a[normalize-space()='Login']";
    newCustomerHeader = "//h2[normalize-space()='New Customer']";
    returningCustomerHeader = "//h2[normalize-space()='Returning Customer']";
    breadCrumbHomeIcon = "//div[@id='account-login']//li[1]";
    continueButton = "//a[normalize-space()='Continue']";
    emailInputField = "#input-email";
    passwordInputField = "#input-password";
    forgottenPasswordLink = "div[class='form-group'] a";
    loginButton = "input[value='Login']";
    loginPageTitle = "//title[normalize-space()='My Account']";
    loginBreadCrumb = "//div[@id='account-account']//li[1]";
    loginMyAccountHeaderText = "//h2[normalize-space()='My Account']";
    logoutLink = "(//a[normalize-space()='Logout'])[1]";
    invalidAlert = "//div[contains(@class, 'alert-danger')]";
    qaFoxLink = "//a[normalize-space()='Qafox.com']";

    clickMyAccountMenu() {
        cy.xpath(this.myAccountMenu)
        .scrollIntoView()
        .should('exist')
        .click({ force: true });
    }

    clickLoginLink() {
        cy.xpath(this.loginLink)
        .scrollIntoView()
        .should('exist')
        .click({ force: true });
    }
    doLogin(email, password) {
        cy.get(this.emailInputField).type(email);
        cy.get(this.passwordInputField).type(password);
        cy.get(this.loginButton).click();
    }

}
export default LoginPage;