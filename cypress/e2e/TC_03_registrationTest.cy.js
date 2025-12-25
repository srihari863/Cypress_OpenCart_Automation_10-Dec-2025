import { registrationPage, loginPage } from "../pageObjects/index";
import successUrls from "../fixtures/commonData.json";
import { faker } from '@faker-js/faker';

const successUrl = successUrls.successUrls;

describe('User Registration Tests', () => {

    beforeEach(() => {
         cy.visit(Cypress.env('baseUrl'));
    });

    it('Should register a new user successfully', () => {
        loginPage.clickMyAccountMenu();
        registrationPage.clickRegisterLink();

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const telephone = faker.phone.number('##########');
        const password = faker.internet.password({length: 8});
        const subscribe = 'Yes';

        registrationPage.fillRegistrationForm(firstName, lastName, email, telephone, password, subscribe);
        registrationPage.agreeToPrivacyPolicy();
        registrationPage.submitRegistration();
        cy.url().should('include', successUrl.accountCreationSuccess);
        cy.xpath(registrationPage.accountSuccessPageTitle)
        .should('exist').and('contain.text', 'Your Account Has Been Created!');
        cy.xpath(registrationPage.yourAccountCreatedMsg)
            .should('be.visible')
            .and('contain.text', 'Your Account Has Been Created!');
        cy.xpath(registrationPage.successMessageText)
            .should('be.visible')
            .and('contain.text', 'Congratulations! Your new account has been successfully created!');
        cy.xpath(registrationPage.sucssBreadCrumb)
            .should('be.visible')
            .and('contain.text', 'Success');
        registrationPage.clickSuccessPageContinueButton();
        cy.url().should('include', successUrl.accountPage);
    });
});