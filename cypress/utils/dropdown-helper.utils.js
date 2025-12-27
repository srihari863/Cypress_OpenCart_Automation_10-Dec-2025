class dropdwonHelper {
    selectDropdownValue(name, value) {
        cy.log('Selecting dropdown value "${value}" for locator: ${name}"');
        //Detect whether locator refers to a <select> element or custom dropdown

        cy.xpath(name).scrollIntoView()
            .should('exist').then(($el) => {
                const tagName = $el.prop('tagName').toLowerCase();
                if (tagName === 'select') {
                    // Handle native <select> element
                    cy.wrap($el)
                        .should('not.be.disabled')
                        .select(value, { force: true })
                        .then(() =>
                            cy.log(`Selected value "${value}" from native <select> dropdown`));
                } else {
                    // Custom dropdown implementation
                    cy.wrap($el).click().as('dropdownElement'); // Open the dropdown
                    this.getDropdownOptions().then((optionsList) => {
                        let found = false;
                        const availableOptions = [];
                        optionsList.each((_index, option) => {
                            const text = Option.innerText.trim();
                            availableOptions.push(text);
                            if (text === value) {
                                cy.wrap(option).scrollIntoView().click({ force: true });
                                found = true;
                                return false; // Break
                            }
                        });
                        if (!found) {
                            throw new Error(
                                `Option "${value}" was not found in dropdown. Available options: ${availableOptions.join(', ')}`);

                        }
                    });
                }
            });
    }

    getDropdownOptions() {
        return cy.get('@dropdownElement').then(($elment) => {
            const id = $element[0].id;
            const upperID = id.toString().toUpperCase();

            let dropdownType = 'default';
            if (upperID.includes('LISTBOX')) {
                dropdownType = 'ListBox';
            } else if (upperID.includes('COMBO')) {
                dropdownType = 'Combo';
            }
            const xpathMap = {
                listBox: `//div[@id='${id}']//li/div[@role='option']`,
                combo: `//Lightning-base-combobox-item[contains(@id,'${id}')]`,
                default: `//div[@aria-labelledby='${id}']//li`,
            };
            return cy.xpath(xpathMap[dropdownType]).as('optionList');
        });
    }

    /**
     * this method validate the option present in the picklist dropdown
     * @param {*} dropdownElement takes the name of the picklist as an input
     * @param {*} optionToBeValidated the option(s) to be validated in the dropdown
     */

    verifyDropDownOptionPresent(dropdownElement, optionToBeVerified) {
        cy.xpath(`//button[@aria-label='${dropdownElement}']`).scrollIntoView().click();
        cy.xpath(`//div[@aria-label='${dropdownElement}']//lightning-base-combobox-item[@role='option']`)
            .then(($option) => {
                const optionsValues = array.from($option, el => el.getAttribute('data-value'));
                optionsToBeVerified.forEach((value) => {
                    expect(optionsValues).to.include(value);
                });
            }
            );
    }

    lookupSearchAndSelect(locator, searchText) {
        cy.xpath(locator)
            .scrollIntoView();
        cy.xpath(locator)
            .clear()
            .type(searchText);
        cy.xpath(`//lightning-base-combobox-formatted-text[@title='${searchText}']`)
            .scrollIntoView()
            .click();
    }
/**
 * This method works as select options from available to chosen in multiselect
 * @param {*} fieldLocators a locator to indentify the field label of the multipicklist field 
 * @param {*} options need to move to chosen
 */
    selectFromMultiSelectPickList(fieldLocators, options) {
        const listItems = Array.isArray(options) ? options : [options];

        cy.xpath(`${fieldLocators} / ancestor:: lightning - dual - listbox`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
                listItems.forEach((item) => {
                    // Check if the option exists in Available section
                    cy.xpath(`//ul[starts-with(@id,'source-list')]/div[@data-value='${item}']`)
                        .then($available => {
                            if ($available.length > 0) {
                                // Option exists, select it
                                cy.wrap($available).scrollIntoView().click();
                                // Move selected option to Chosen
                                cy.xpath("//button[@title='Move to Chosen']").click();
                                cy.log(`Option "${item}" moved to Chosen`);
                            } else {
                                // Option not found
                                cy.log(`Option "${item}" not found in Available section`);
                            }
                        });
                });
            });
    }
}
export default dropdwonHelper;