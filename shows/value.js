function(doc, req){

  var message = {};

  if(req.query._showrequest == 'true')
      message['request'] = req;


  message['results'] = {};


  if(req.query.field != undefined){
    var field = req.query.field;
    if (doc[field] != undefined){
      message['results']['success'] = "found '" + field + "' in document";
      message['results']['field'] = field
      message['results']['value'] = doc[field]
    }
    else{
      message['results']['error'] = 'doc[' + field + '] undefined';
    }
  }
  else{
    message['results']['error'] = 'req.query.field undefined';
  }

  return JSON.stringify(message);
}