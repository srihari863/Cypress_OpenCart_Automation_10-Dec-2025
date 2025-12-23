class forgottenPasswordPage {

    forgottenPasswordLink = "//div[@class='form-group']//a[normalize-space()='Forgotten Password']";
    forgottenPasswordPageTitle = "//title[normalize-space()='Forgot Your Password?']";
    forgotPasswordHeaderText = "//h1[normalize-space()='Forgot Your Password?']";
    forgottenPwBreadCrumb = "//div[@id='account-forgotten']//li[3]";
    forgottenPwMessageText = "div[id='content'] p";
    emailInputField = "#input-email";
    continueButton = "input[value='Continue']";
    backButton = "//a[normalize-space()='Back']";
    invalidAlert = "//div[contains(@class, 'alert-danger')]";
    alertSuccessMessage = "//div[contains(@class, 'alert-success')]";
    
    clickForgottenPasswordLink() {
        cy.xpath(this.forgottenPasswordLink)
        .scrollIntoView()
        .should('exist')
        .click();
    }

    enterEmailForPasswordReset(email) {
        cy.get(this.emailInputField)
        .scrollIntoView()
        .should('exist')
        .clear();
        if (email) {
            cy.get(this.emailInputField).type(email);
        }
    }

    clickContinueButton() {
        cy.get(this.continueButton)
        .scrollIntoView()
        .should('exist')
        .click();
    }

}
export default forgottenPasswordPage;