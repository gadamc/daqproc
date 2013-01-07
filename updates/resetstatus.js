function(doc, req) {

  var old_status = req.query.old_status;
  var new_status = req.query.new_status;
  var test = req.query.test;

  var message = {};
  if(req.query._showrequest == 'true')
    message['request'] = req;

  message['results'] = {};
  if(test)
    message['results']['test'] = 'this was a test. nothing actually happened on the database.';

  var updateDoc = false;
  var value;

  if(new_status == undefined){
    message['results']['error'] = 'req.query.new_status undefined';
    message['results']['doc_updated'] = false;
    return[null, JSON.stringify(message)]
  }

  function updateStatus(aDoc, aNewStatus, theMessage){
    if(aNewStatus != undefined){
      aDoc['status'] = aNewStatus;
      theMessage['results']['new_status'] = aDoc['status'];
      return true;
    }
    else {
      theMessage['results']['new_status'] = aDoc['status'];
      return false;
    }
  } 

  if(old_status){
    if(doc['status'] == old_status){
      message['results']['status_condition'] = 'matched';
      message['results']['old_status'] = old_status;
      updateDoc = updateStatus(doc, new_status, message);
    }
    else{
      message['results']['status_condition'] = 'unmatched';
      //do nothing when the doc['status'] != old_status.
    }
  }
  else{
    updateDoc = updateStatus(doc, new_status, message);
  }
  

  if(updateDoc){
    message['results']['doc_updated'] = true;

    if (test)
      return [null, JSON.stringify(message)];
    else
      return [doc, JSON.stringify(message)];

  }
  else{
    message['results']['doc_updated'] = false;
    return [null, JSON.stringify(message)];
  }
}
