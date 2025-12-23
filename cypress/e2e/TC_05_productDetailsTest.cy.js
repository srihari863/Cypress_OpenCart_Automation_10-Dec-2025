import MyAccountPage from "../pageObjects/myAccount.page";
import LoginPage from '../pageObjects/login.page.js';
import LogoutPage from '../pageObjects/logout.page.js'
import LoginData from '../fixtures/loginData.json';
import ProductDetailsPage from "../pageObjects/productDetails.page.js";
import ProductData from '../fixtures/productsData.json';
import ResultsPage from "../pageObjects/results.page.js";
import Utils from '../utils/utils.js';

const loginPage = new LoginPage();
const logoutPage = new LogoutPage();
const myAccountPage = new MyAccountPage();
const productDetailsPage = new ProductDetailsPage();
const resultsPage = new ResultsPage();
const loginData = LoginData;
const productsData = ProductData;
const utils = new Utils();

describe('Product Details Test Suite', () => {
    beforeEach(() => {
        cy.visit(LoginData.baseUrl);
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
        loginPage.doLogin(loginData.validCredentials.username, loginData.validCredentials.password);
    });

    afterEach(() => {
        cy.wait(2000);
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
    });

    productsData.productImageTestData.forEach(([searchProduct, productName, getProductImageCount]) => {
        it(`should display correct number of images for ${productName}`, () => {
            myAccountPage.doProductSearch(searchProduct);
            resultsPage.selectProduct(productName);
            productDetailsPage.getProductImageCount().should('eq', getProductImageCount);
            productDetailsPage.clickOnHomeIcon();
            cy.wait(3000);
            cy.go("back");
        });
    });

    it("product metadata test", () => {

        myAccountPage.doProductSearch("macbook");
        resultsPage.selectProduct("MacBook Pro");
        productDetailsPage.getProductHeaderText();
        cy.verifyProductMetaDataDetails(productDetailsPage.productMetaList,
            productsData.productMetaData
        );
        cy.verifyProductMetaDataDetails(productDetailsPage.productPriceList,
            productsData.productPriceData
        );
        productDetailsPage.setQuantity(2);
        productDetailsPage.clickOnAddToCart();
    });
});