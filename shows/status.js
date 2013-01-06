function(doc, req){

	var message = {};
	message['request'] = req;

	if(req.query.field != undefined){
		var field = req.query.field;
		if (doc[field] != undefined){
			message['success'] = "found field in document";
			message['field'] = field
			message['value'] = doc[field]
		}
		else{
			message['error'] = field + " not in doc";
		}
	}
	else{
		message['error'] = "field not defined";
	}

	return JSON.stringify(message);
}