import { forgottenPasswordPage, loginPage } from "../pageObjects/index";
import Utils from "../utils/utils";
import SuccessUrls from "../fixtures/commonData.json";
import LoginData from "../fixtures/loginData.json";
import { faker } from '@faker-js/faker';

const utils = new Utils();
const loginData = LoginData;
const successUrl = SuccessUrls.successUrls;

describe('Forgotten Password Tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
    });

    it('Should reset password for empty email input', () => {
        cy.url().should('include', successUrl.loginPage);
        forgottenPasswordPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        forgottenPasswordPage.enterEmailForPasswordReset('');
        forgottenPasswordPage.clickContinueButton();
        utils.verifyInvalidAlet(forgottenPasswordPage.invalidAlert);
    });

    it('Should reset password for unregistered email', () => {
        const unregisteredEmail = faker.internet.email();
        forgottenPasswordPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        forgottenPasswordPage.enterEmailForPasswordReset(unregisteredEmail);
        forgottenPasswordPage.clickContinueButton();
        utils.verifyInvalidAlet(forgottenPasswordPage.invalidAlert);
    });

    it('Should reset password for registered email', () => {
        const registeredEmail = loginData.validCredentials.username;
        forgottenPasswordPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        cy.xpath(forgottenPasswordPage.forgotPasswordHeaderText).should('be.visible')
        .and('have.text', 'Forgot Your Password?');
        cy.get(forgottenPasswordPage.forgottenPwMessageText).should('be.visible');
        forgottenPasswordPage.enterEmailForPasswordReset(registeredEmail);
        cy.xpath(forgottenPasswordPage.backButton).should('be.visible');
        cy.xpath(forgottenPasswordPage.forgottenPwBreadCrumb).should('be.visible');
        forgottenPasswordPage.clickContinueButton();
        cy.url().should('include', successUrl.loginPage);
        utils.verifySuccessMessage(forgottenPasswordPage.alertSuccessMessage);
    });

});