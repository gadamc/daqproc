function(doc, req) {
  var update = req.query.update;
  var value;

  var message = {};
  message['request'] = req;

  var results = {};
  results['update'] = {};
  results['remove'] = {};
  message['results'] = results;


  var updateDoc = false;

  if(req.query.update != undefined){

    try{
      value = JSON.parse(req.query.value);
      message['results']['update']['value'] = JSON.stringify(value);
    }
    catch(e){
      if(e instanceof SyntaxError){

        if(req.query.value != undefined) {

          if(isNaN(value))
            value = req.query.value;
          else
            value = parseFloat(value);
          
          message['results']['update']['value'] = value;
        }
        else
          message['results']['update']['error']= 'value is undefined';
      }
      else{
        message['results']['update']['exception'] = e.description;
        return [null, JSON.stringify(message)];
      }
    }

    
    if(value != undefined){
      message['results']['update']['success'] = "set doc["+update+"] = " + message['results']['update']['value'];
      message['results']['update']['type'] = typeof(value); 
      message['results']['update']['key'] = update;
      doc[update] = value;
      updateDoc = true;
    }

  }
  

  if (req.query.remove != undefined){
    if(doc[req.query.remove] != undefined){
      delete doc[req.query.remove];
      message['results']['remove']['key'] = req.query.remove;
      message['results']['remove']['success'] = "deleted doc["+ req.query.remove +"]";
      updateDoc = true;
    } 
    else{
      message['results']['remove']['error'] = "doc[" + req.query.remove + "] is undefined";
    }
  }

  if(updateDoc)
    return [doc, JSON.stringify(message)];
  else
    return [null, JSON.stringify(message)];

}
