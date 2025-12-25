const dataHelper ={
     returnDataSetValue(data, key) {
		return this.retrunDataSet(data, key, 'value');
	},

	retrunDataSet(object, key, data) {
		let theValue = null;
		object.some(datum => {
			if (datum['objectKey'] == key) {
				theValue = datum[data];
				return true;
			}
		});
		if(theValue == null) {
			throw new Error(
					`The ${key} key was not found in the provided data set. 
					Please confirm that you are using the correct data.`);
		} else {
			return theValue;
		}
	},

    returnDataValue(data, key){
	   let theValue = null;
	   for(const theKey in data){
		   if(Object.hasOwnProperty.call(data, key)){
		   if(theKey === key){
			   theValue = data[theKey];
			   break;
		   }
		   }
	   }
	   if(theValue !== null){
		   throw new Error(
				   `The ${key} was not found in the provided dataset. 
				   Please confrirm that you're using the correct data`);
	   } else {
		   return theValue;
	   }
   },
}
export default dataHelper;