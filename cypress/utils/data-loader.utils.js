import commandHelper from '../utils/command-helper.utils';
import dataHelper from '../utils/data.utils';

const dataLoader = {

    fillForm(dataSet, currentIterationFormData) {
        currentIterationFormData.forEach((currentStep) => {
            this.executeCurrentStep(dataSet, currentStep);
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(500); // This is here because it was going too fast to see
        });
    },

    executeCurrentStep(dataSet, step) {
        let { objectKey, action, value, text } = step;

        value = value ?? '';
        objectKey = objectKey ?? '';
        text = text ?? '';

        let locator = null;

        if (objectKey.startsWith('get:')) {
            cy.log('inside function to capture locator');
            locator = dataSet[objectKey](value);
        } else {
            locator = dataSet.getField(objectKey);
        }

        cy.log('locator is: ' + locator);
        cy.log('objectKey is: ' + objectKey);
        cy.log('action is: ' + action);
        cy.log('value is: ' + value);
        cy.log('text is: ' + text);

        const actionMap = {

            // ACTIONS
            // { "objectKey": "theField", "action": "type", "value", "text" }
            type: () => this.typeValue(locator, value),

            // { "objectKey": "theField", "action": "typeAndSave", "value", "text" }
            typeAndSave: () => this.typeValueAndSave(locator, value, objectKey),

            // { "objectKey": "theField", "action": "typeRandomData", "value": "fakerMap option" }
            typeRandomData: () => cy.actionTypeRandom(locator, value),

            // { "objectKey": "theField", "action": "typeSavedData", "value": "saved data name" }
            typeSavedData: () => cy.actionTypeSaved(locator, value),

            // { "objectKey": "theField", "action": "uploadFile", "value": "file/location" }
            uploadFile: () => this.uploadFile(locator, value),

            // { "objectKey": "theField", "action": "clearField" }
            clearFiled: () => this.actionClear(locator),

            // { "objectKey": "theField", "action": "click" }
            click: () => cy.actionClick(locator),

            // { "objectKey": "theField", "action": "forceClick" }
            forceClick: () => cy.actionClick(locator, true),

            // { "objectKey": "theField", "action": "select", "value": "Dropdown value" }
            select: () => cy.actionDropdown(locator, value),

            // The below option is for when the DOM has <select>
            // { "objectKey": "theField", "action": "selectbox", "value": "Dropdown Value" }
            selectbox: () => cy.actionSelect(locator, value),

            // The below option is for when there is a dropdown after you type data into an input field
            // { "objectKey": "theField", "action": "selectList", "value": "Dropdown Value" }
            selectList: () => cy.actionLookup(locator, value),

            // { "objectKey": "theField", "action": "check" }
            check: () => cy.actionCheck(locator),

            // { "objectKey": "theField", "action": "uncheck" }
            uncheck: () => cy.actionUncheck(locator),

            // { "objectKey": "theField", "action": "forceCheck" }
            forceCheck: () => cy.actionCheck(locator, true),

            // { "objectKey": "theField", "action": "forceUncheck" }
            forceUncheck: () => cy.actionUncheck(locator, true),

            // WAITS
            wait: () => cy.wait(value * 1000),

            scroll: () => cy.scrollToObject(locator),

            // VERIFICATIONS
            // { "objectKey": "theField", "action": "verifyFromData", "value": "other data from current dataset" }
            verifyFromData: () => this.verifyData(locator, dataSet),

            verification: () => {

                const verificationMap = {

                    // { "objectKey": "theField", "action": "verification", "value": "visible" }
                    visible: () => cy.verifyVisible(locator),

                    // { "objectKey": "theField", "action": "verification", "value": "invisible" }
                    invisible: () => cy.verifyNotVisible(locator),

                    // { "objectKey": "theField", "action": "verification", "value": "enabled" }
                    enabled: () => cy.verifyNotDisabled(locator),

                    // { "objectKey": "theField", "action": "verification", "value": "disabled" }
                    disabled: () => cy.verifyDisabled(locator),

                    // These verifications require a "text" tag

                    // { "objectKey": "theField", "action": "verification", "value": "text", "text": "expected text" }
                    text: () => cy.verifyValue(locator, text),

                    // { "objectKey": "theField", "action": "verification", "value": "textContains", "text": "expected partial text" }
                    textContains: () => cy.verifyContainsValue(locator, text),

                    // { "objectKey": "theField", "action": "verification", "value": "error", "text": "error name from error-messages.data.json" }
                    error: () => cy.verifyError(locator, text)
                };

                if (!verificationMap[value]) {
                    throw new Error(`Unsupported faker value: ${value}`);
                }

                cy.log('verificationMap[value] is: ' + verificationMap[value]);
                verificationMap[value]();
            }
        };

        if (actionMap[action]) {
            actionMap[action]();
        } else {
            throw new Error(`Unsupported action: ${action}`);
        }
    },

    typeValue(locator, value) {
        const theElement = commandHelper
            .returnElement(locator)
            .scrollIntoView();

        if (value === '@lastGeneratedValue') {
            cy.get('@lastGeneratedValue').then((val) => {
                if (!val) {
                    throw new Error('No lastGeneratedValue found!');
                }
                cy.log('Using lastGeneratedValue: ' + val);
                theElement.clear().type(val);
            });
        } else {
            if (!value) {
                throw new Error('Value for type is undefined!');
            }
            theElement.clear().type(value);
        }
    },

    verifyData(locator, dataSet) {
        const theValue = dataHelper.returnDataValue(
            dataSet,
            dataSet['value'],
            'value'
        );

        cy.verifyValue(locator, theValue);
    },
};
export default dataLoader;

