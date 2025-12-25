import { myAccountPage,
    loginPage,logoutPage,
    productDetailsPage,resultsPage
 } from "../pageObjects/index.js";
import LoginData from '../fixtures/loginData.json';
import ProductData from '../fixtures/productsData.json';
import Utils from '../utils/utils.js';

const loginData = LoginData;
const productsData = ProductData;
const utils = new Utils();

describe('Product Details Test Suite', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        loginPage.clickMyAccountMenu();
        loginPage.clickLoginLink();
        cy.login(loginData.validCredentials.username, loginData.validCredentials.password);
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