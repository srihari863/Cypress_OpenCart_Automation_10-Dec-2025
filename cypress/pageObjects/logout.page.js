class LogoutPage {

  constructor() {
    this.logoutPageTitle = "//title[normalize-space()='Account Logout']";
    this.accountLogoutHeaderTxt = "//h1[normalize-space()='Account Logout']";
    this.accountLogoutMessage = "//div[@id='content']/p[1]";
    this.logoutBreadCrumb = "//div[@id='common-success']/ul/li[3]";
    this.accountLogoutContinueButton = "//a[normalize-space()='Continue']";
  }

  // Verify logout page title
  verifyPageTitle() {
    cy.title().should('eq', 'Account Logout');
  }

  // Verify logout header text
  verifyHeader() {
    cy.xpath(this.accountLogoutHeaderTxt)
      .should('be.visible')
      .and('have.text', 'Account Logout');
  }

  // Verify logout message
  verifyLogoutMessage(expectedMessage) {
    cy.xpath(this.accountLogoutMessage)
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  // Verify breadcrumb text
  verifyBreadCrumb(expectedText) {
    cy.xpath(this.logoutBreadCrumb)
      .should('be.visible')
      .and('contain.text', expectedText);
  }

  // Click Continue button
  clickContinue() {
    cy.xpath(this.accountLogoutContinueButton)
      .should('be.visible')
      .click();
  }

  // Full logout verification
  verifyLogoutPage(expectedMessage, expectedBreadCrumb) {
    this.verifyPageTitle();
    this.verifyHeader();
    this.verifyLogoutMessage(expectedMessage);
    this.verifyBreadCrumb(expectedBreadCrumb);
  }
}

export default LogoutPage;
