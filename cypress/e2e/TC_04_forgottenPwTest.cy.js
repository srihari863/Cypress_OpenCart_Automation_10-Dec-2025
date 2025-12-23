import forgottenPasswordPage from "../pageObjects/forgottenPassword.page";
import LoginPage from "../pageObjects/login.page";
import Utils from "../utils/utils";
import SuccessUrls from "../fixtures/commonData.json";
import LoginData from "../fixtures/loginData.json";
import { faker } from '@faker-js/faker';

const forgottenPwPage = new forgottenPasswordPage();
const loginPage = new LoginPage();
const utils = new Utils();
const loginData = LoginData;
const successUrl = SuccessUrls.successUrls;

describe('Forgotten Password Tests', () => {

    beforeEach(() => {
        cy.visit(loginData.baseUrl);
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
    });

    it('Should reset password for empty email input', () => {
        cy.url().should('include', successUrl.loginPage);
        forgottenPwPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        forgottenPwPage.enterEmailForPasswordReset('');
        forgottenPwPage.clickContinueButton();
        utils.verifyInvalidAlet(forgottenPwPage.invalidAlert);
    });

    it('Should reset password for unregistered email', () => {
        const unregisteredEmail = faker.internet.email();
        forgottenPwPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        forgottenPwPage.enterEmailForPasswordReset(unregisteredEmail);
        forgottenPwPage.clickContinueButton();
        utils.verifyInvalidAlet(forgottenPwPage.invalidAlert);
    });

    it('Should reset password for registered email', () => {
        const registeredEmail = loginData.validCredentials.username;
        forgottenPwPage.clickForgottenPasswordLink();
        cy.url().should('include', successUrl.forgottenPasswordPage);
        cy.xpath(forgottenPwPage.forgotPasswordHeaderText).should('be.visible')
        .and('have.text', 'Forgot Your Password?');
        cy.get(forgottenPwPage.forgottenPwMessageText).should('be.visible');
        forgottenPwPage.enterEmailForPasswordReset(registeredEmail);
        cy.xpath(forgottenPwPage.backButton).should('be.visible');
        cy.xpath(forgottenPwPage.forgottenPwBreadCrumb).should('be.visible');
        forgottenPwPage.clickContinueButton();
        cy.url().should('include', successUrl.loginPage);
        utils.verifySuccessMessage(forgottenPwPage.alertSuccessMessage);
    });

});