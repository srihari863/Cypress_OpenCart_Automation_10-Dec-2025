import HomePage from '../pageObjects/home.page';

const homePage = new HomePage();

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
        homePage.navigateToRegisterPage(); 
        cy.url().should('include', 'route=account/register');
        cy.go('back');
    });
});
