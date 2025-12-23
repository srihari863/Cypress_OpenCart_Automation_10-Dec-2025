import HomePage from '../pageObjects/home.page';
import LoginData from "../fixtures/loginData.json";

const homePage = new HomePage();

describe('OpenCart Home page Tests', () => {
    beforeEach(() => {
        cy.visit(LoginData.baseUrl);
    });

    it('Verify the open cart page title', () => {
        homePage.getHomePageTitle()
            .should('include', "Your Store");
        homePage.isOpenCartLogoExist();
        homePage.getFeatureProductListCount();  
    });

    it('Navigate to Myaccount menu', () => {
        homePage.clickMyAccountMenu();
        homePage.navigateToLoginPage();
        cy.url().should('include', 'route=account/login');
        cy.go('back');
        homePage.navigateToRegisterPage(); 
        cy.url().should('include', 'route=account/register');
        cy.go('back');

    });
});
