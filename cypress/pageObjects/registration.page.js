class registrationPage {

    registerLink = "(//a[normalize-space()='Register'])[1]";
    firstNameInput = "input#input-firstname";
    lastNameInput = "input#input-lastname";
    emailInput = "input#input-email";
    telephoneInput = "input#input-telephone";
    passwordInput = "input#input-password";
    confirmPasswordInput = "input#input-confirm";
    subscribeYesRadio = "input[name='newsletter'][value='1']";
    subscribeNoRadio = "input[name='newsletter'][value='0']";
    privacyPolicyCheckbox = "input[name='agree']";
    continueButton = "input[value='Continue']";
    accountSuccessPageTitle = "//title[normalize-space()='Your Account Has Been Created!']";
    yourAccountCreatedMsg = "//div[@id='content']/h1";
    successMessageText = "//p[contains(text(),'Congratulations!')]";
    sucssBreadCrumb = "//div[@id='common-success']/ul/li[3]";
    sucessPageContinueButton = "a[class='btn btn-primary']";

    // Click on Register link
    clickRegisterLink() {
        cy.xpath(this.registerLink)
            .scrollIntoView()
            .should('exist')
            .click();
    }
    // Fill registration form
    fillRegistrationForm(firstName, lastName, email, telephone, password,subscribe) {
        cy.get(this.firstNameInput)
            .scrollIntoView()
            .should('exist')
            .clear()
            .type(firstName);
        cy.get(this.lastNameInput)
            .scrollIntoView()
            .should('exist')
            .clear()
            .type(lastName);
        cy.get(this.emailInput)
            .scrollIntoView()
            .should('exist')
            .clear()
            .type(email);
        cy.get(this.telephoneInput)
            .scrollIntoView()
            .should('exist')
            .clear()        
            .type(telephone);
        cy.get(this.passwordInput)
            .scrollIntoView()   
            .should('exist')
            .clear()     
            .type(password);
        cy.get(this.confirmPasswordInput)
            .scrollIntoView()
            .should('exist')
            .clear()        
            .type(password);
        if (subscribe.toLowerCase() === 'yes') {
            cy.get(this.subscribeYesRadio)
                .scrollIntoView()
                .should('exist')
                .check({force: true});
        } else {
            cy.get(this.subscribeNoRadio)
                .scrollIntoView()
                .should('exist')
                .check({force: true});
        }
    }
    // Agree to privacy policy
    agreeToPrivacyPolicy() {
        cy.get(this.privacyPolicyCheckbox)
            .scrollIntoView()
            .should('exist')
            .check({force: true});
    }
    // Submit registration form
    submitRegistration() {
        cy.get(this.continueButton)
            .scrollIntoView()
            .should('exist')
            .click();
    }
    // click continue button on success page
    clickSuccessPageContinueButton() {
        cy.get(this.sucessPageContinueButton)
            .scrollIntoView()
            .should('exist')
            .click();
    }

}
export default registrationPage