import {homePage} from '../pageObjects/index';

describe('OpenCart Home page Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

    it('Verify the open cart page title', () => {
        homePage.getHomePageTitle()
            .should('include', "Your Store");
        homePage.isOpenCartLogoExist();
        homePage.getFeatureProductListCount();  
    });

    it('Navigate to Myaccount menu', () => {
        homePage.navigateToLoginPage();
        cy.url().should('include', 'route=account/login');
        cy.go('back');
        cy.wait(3000);
        homePage.navigateToRegisterPage(); 
        cy.url().should('include', 'route=account/register');
        cy.go('back');
    });
});
