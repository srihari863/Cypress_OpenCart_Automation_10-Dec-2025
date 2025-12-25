import { myAccountPage, loginPage } from '../pageObjects/index.js';
import LoginData from '../fixtures/loginData.json';
import CommonData from '../fixtures/commonData.json';
import ProductsData from '../fixtures/productsData.json'
import MyAccountData from '../fixtures/myAccountData.json'

const loginData = LoginData;
const commonData = CommonData.commonData;
const successUrls = CommonData.successUrls;
const productsData = ProductsData.products;
const myAccountData = MyAccountData;

describe('My Account Test Suite', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
        cy.login(loginData.validCredentials.username, loginData.validCredentials.password);
    });

    it('Should verify My Account Menu Links after login', () => {
        cy.url().should('contain', successUrls.accountPage);
        cy.xpath(myAccountPage.myAccountPageTitle).should('have.text', 'My Account');
        cy.xpath(myAccountPage.accountBreadCrumb).should('be.visible');
        myAccountPage.clickMyAccountLink();
        myAccountPage.verifyLinkExists(commonData.logoutLink);
    });

    it('Verify myAccount Header list', () => {
        // Verify we're on My Account page with the header visible
        myAccountPage.getMyAccountHeaderOptionsList(myAccountData.myAccountHeaderList);

    });

    it('Verify My Account Menu Options list', () => {
        myAccountPage.getMyAccountMenuOptionList(myAccountData.myAccountOptionsList);
        //cy.findBrokenLinksOnThePage();
    });

    it('Verify My Orders Menu Options list', () => {
        cy.verifyListText(myAccountPage.myAccountHeaderMenuOptionList);
        cy.verifyListText(myAccountPage.myOrdersHeaderMenuOptionList);
    });

    it('Should perform product search from My Account page', () => {
        cy.doProductSearch(
           productsData, myAccountPage.searchEditBox, 
           myAccountPage.searchTorchIcon,
           myAccountPage.listHeaderText
        )
    });

});