
const commandHelper ={
returnElement(locator){
    const ElementLocatorFunction = (locator) => (this.isXpath(locator) ? cy.xpath(locator) 
    : cy.get(locator));
    const currentElement = ElementLocatorFunction(locator);
    return currentElement;
},
isXpath(selector){
		//common xpath functions
		const xpathPartterns = [
			/^\/\//,//starts with //
			/^\//,//starts with /
			/@[/w-]+/,//has @attribute
			/contains\s*\(/,//contains function
			/text\s*\(/,//text() function
			/::/,//axis link follwoing-sibling::
			/^\(/,//starts with(
		];
        return xpathPartterns.some((regex) => regex.test(selector));
    },
};
