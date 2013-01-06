function(doc, req) {

  var message = {};
  message['request'] = req;

  if (req.query.field != undefined){
    if(doc[req.query.field] != undefined){
      delete doc[req.query.field];
      message['success'] = "deleted " + req.query.field;
      message['field'] = req.query.field;
    } 
    else{
      message['error'] = "doc[" + req.query.field + "] is undefined";
    }
  }
  else{
    message['error'] = 'req.query.field is undefined';
  }
  
  return [doc, JSON.stringify(message)];
}
