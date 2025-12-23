import registrationPage from "../pageObjects/registration.page";
import LoginPage from "../pageObjects/login.page";
import LoginData from "../fixtures/loginData.json";
import commonData from "../fixtures/commonData.json";
import successUrls from "../fixtures/commonData.json";
import { faker } from '@faker-js/faker';

const registration = new registrationPage();
const loginPage = new LoginPage();
const loginData = LoginData;
const common = commonData.commonData;
const successUrl = successUrls.successUrls;

describe('User Registration Tests', () => {

    beforeEach(() => {
        cy.visit(loginData.baseUrl);
    });

    it('Should register a new user successfully', () => {
        loginPage.clickMyAccountMenu();
        registration.clickRegisterLink();

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const telephone = faker.phone.number('##########');
        const password = faker.internet.password({length: 8});
        const subscribe = 'Yes';

        registration.fillRegistrationForm(firstName, lastName, email, telephone, password, subscribe);
        registration.agreeToPrivacyPolicy();
        registration.submitRegistration();
        cy.url().should('include', successUrl.accountCreationSuccess);
        cy.xpath(registration.accountSuccessPageTitle)
        .should('exist').and('contain.text', 'Your Account Has Been Created!');
        cy.xpath(registration.yourAccountCreatedMsg)
            .should('be.visible')
            .and('contain.text', 'Your Account Has Been Created!');
        cy.xpath(registration.successMessageText)
            .should('be.visible')
            .and('contain.text', 'Congratulations! Your new account has been successfully created!');
        cy.xpath(registration.sucssBreadCrumb)
            .should('be.visible')
            .and('contain.text', 'Success');
        registration.clickSuccessPageContinueButton();
        cy.url().should('include', successUrl.accountPage);
    });
});