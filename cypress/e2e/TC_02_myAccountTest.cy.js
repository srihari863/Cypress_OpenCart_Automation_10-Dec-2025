import MyAccountPage from '../pageObjects/myAccount.page.js';
import LoginPage from '../pageObjects/login.page.js';
import LoginData from '../fixtures/loginData.json';
import CommonData from '../fixtures/commonData.json';
import ProductsData from '../fixtures/productsData.json'
import ResultsPage from "../pageObjects/results.page";

const myAccountPage = new MyAccountPage();
const resultsPage = new ResultsPage();
const loginPage = new LoginPage();
const loginData = LoginData;
const commonData = CommonData.commonData;
const successUrls = CommonData.successUrls;
const productsData = ProductsData.products;

describe('My Account Test Suite', () => {
    beforeEach(() => {
        cy.visit(LoginData.baseUrl);
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
        loginPage.doLogin(loginData.validCredentials.username, loginData.validCredentials.password);
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
        const expectedHeaders = [
            'My Account',
            'My Orders',
            'My Affiliate Account',
            'Newsletter'];
        myAccountPage.getMyAccountHeaderOptionsList(expectedHeaders);

    });

    it('Verify My Account Menu Options list', () => {
        const expectedMenuOptions = [
            "My Account",
            "Order History",
            "Transactions",
            "Downloads",
            "Logout"];
        myAccountPage.getMyAccountMenuOptionList(expectedMenuOptions);
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