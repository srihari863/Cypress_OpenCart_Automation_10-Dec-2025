import LoginPage from './login.page.js';
import ResultsPage from './results.page.js';

const loginPage = new LoginPage();
const resultsPage = new ResultsPage();

class myAccountPage {

    myAccountPageTitle = "//title[normalize-space()='My Account']";
    myAccountMenu = "(//a[text()='My Account'])[1]";
    accountBreadCrumb = "//div[@id='account-account']/ul/li[2]";
    searchEditBox = "input[placeholder='Search']";
    searchTorchIcon = "button[class='btn btn-default btn-lg']";
    myAccountRightLinks = "//div[@class='list-group']/a";
    myAccountHeaderList = "//div[@id='content']/h2";
    myAccountMenuOptionList = "//div[@id='top-links']/ul/li[2]/ul/li";
    myAccountHeaderMenuOptionList = "//div[@id='content']/ul[1]/li";
    myOrdersHeaderMenuOptionList = "//div[@id='content']/ul[2]/li";
    listHeaderText = "div[id='content'] h1";
    logoutLink = "//div[@class='list-group']/a[text()='Logout']";
    homeIcon = ".fa.fa-home";
    
    // click on My Account Menu
    clickMyAccountLink() {
        cy.xpath(this.myAccountMenu)
            .scrollIntoView()
            .should('exist')
            .click({ force: true });
    }

    // Verify if a specific link exists in the list
    verifyLinkExists(linkText) {
        cy.xpath(`${this.myAccountRightLinks}[normalize-space()='${linkText}']`)
            .should('exist');
    }

    // click on a specific link in My Account Menu
    clickMyAccountMenuLink(linkText) {
        cy.xpath(`${this.myAccountHeaderList}[normalize-space()='${linkText}']`)
            .scrollIntoView()
            .should('exist')
            .click();
    }

    //get my account Header options list
    getMyAccountHeaderOptionsList(optionsList) {
        // Define alias for menu options
        cy.xpath(this.myAccountHeaderList).as('menuOptions');
        cy.get('@menuOptions').each((item, index, list) => {
            cy.wrap(item).should('contain.text', optionsList[index]);
        });
    }

    getMyAccountMenuOptionList(expectedMenuOptions) {
        // Click My Account menu first
        loginPage.clickMyAccountMenu();
        // Validate submenu options
        cy.xpath(this.myAccountMenuOptionList, { timeout: 10000 })
            .should('have.length', expectedMenuOptions.length)
            .each(($el, index) => {
                cy.wrap($el)
                    .should('contain.text', expectedMenuOptions[index]);
            });
    }

    isSearchBoxExist() {
        return cy.get(this.searchEditBox)
            .should('exist')
            .and('be.visible');
    }

    isLogoutLinkExist() {
        return cy.xpath(this.logoutLink)
            .should('exist')
            .and('be.visible');
    }
   
    doProductSearch(product) {
        cy.log("Searching for product: " + product);
        if (this.isSearchBoxExist()) {
            cy.log("Search box is visible");
            cy.get(this.searchEditBox).type(product);
            cy.get(this.searchTorchIcon).click();
        }else{
            cy.log("Search box is not visible");
        }
        
    }


}
export default myAccountPage;