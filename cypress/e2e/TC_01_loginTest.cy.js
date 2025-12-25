import LoginPage from '../pageObjects/login.page.js';
import LogoutPage from '../pageObjects/logout.page.js';
import common from '../fixtures/commonData.json';
import LoginData from '../fixtures/loginData.json';
import Utils from '../utils/utils.js';
const loginPage = new LoginPage();
const logoutPage = new LogoutPage();
const utils = new Utils();
const loginData = LoginData;
const commonData = common.successUrls;

describe('Login Test Suite', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
    }); 

    it('Should login with valid credentials', () => {
        cy.xpath(loginPage.newCustomerHeader).should('be.visible');
        cy.xpath(loginPage.returningCustomerHeader).should('be.visible');
        cy.xpath(loginPage.breadCrumbHomeIcon).should('be.visible');
        cy.get(loginPage.forgottenPasswordLink).should('be.visible');
        cy.xpath(loginPage.continueButton).should('be.visible');
        cy.login(loginData.validCredentials.username, loginData.validCredentials.password);
        cy.xpath(loginPage.loginPageTitle).should('have.text', 'My Account');
        cy.xpath(loginPage.loginBreadCrumb).should('be.visible');
        cy.xpath(loginPage.loginMyAccountHeaderText).should('be.visible');
    });

    it('Should logout successfully', () => {
        // First, login
        cy.login(loginData.validCredentials.username, loginData.validCredentials.password);
        // Then logout
        loginPage.clickMyAccountMenu();
        cy.xpath(loginPage.logoutLink)
        .scrollIntoView()
        .should('exist')
        .click();
        cy.xpath(logoutPage.logoutPageTitle).should('have.text', 'Account Logout');
        cy.xpath(logoutPage.accountLogoutHeaderTxt).should('be.visible');
        utils.verifySuccessMessage(logoutPage.accountLogoutMessage);
        cy.xpath(logoutPage.logoutBreadCrumb).should('be.visible');
        cy.xpath(logoutPage.accountLogoutContinueButton).should('be.visible').click();
        cy.url().should('contain', commonData.homePage);
        cy.title().should('eq', 'Your Store');
        cy.xpath(loginPage.qaFoxLink).should('be.visible');
    });
    // Data-driven tests for invalid credentials
    loginData.invalidCredentials.forEach((credentials) => {
        it(`Should verify login with ${credentials.description}`, () => {
            cy.login(credentials.username, credentials.password);
            utils.verifyInvalidAlet(loginPage.invalidAlert);
        });
    });
});
