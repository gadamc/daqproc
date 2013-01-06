function(doc, req) {

  var procname = req.query.procname;
  var old_status = req.query.old_status;
  var new_status = req.query.new_status;

  var message = {};
  if(req.query._showrequest == 'true')
    message['request'] = req;

  message['results'] = {};

  var updateDoc = false;
  var value;


  if(procname == undefined){
    message['results']['error'] = 'req.query.procname undefined';
    message['results']['doc_updated'] = false;
    return[null, JSON.stringify(message)]
  }

  if(procname.search('proc[0-9]$') != 0){
    message['results']['error'] = 'req.query.procname not equal to proc[0-9]$';
    message['results']['doc_updated'] = false;
    return[null, JSON.stringify(message)]
  }

  function delFromDoc(aDoc, aprocName, theMessage){
    if(aDoc[aprocName]){
      theMessage['results']['success'] = 'removed ' + aprocName;
      delete aDoc[aprocName];
      return true;
    } 
    else{
      theMessage['results']['success'] = 'document did not contain ' + aprocName;
      return false;
    }
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

  if(old_status != undefined){
    if(doc['status'] == old_status){
      message['results']['status_condition'] = 'matched';
      message['results']['old_status'] = old_status;
      updateDoc = delFromDoc(doc, procname, message)
      updateDoc = updateStatus(doc, new_status, message) || updateDoc;
    }
    else{
      message['results']['status_condition'] = 'unmatched';
      //do nothing when the doc['status'] != old_status.
    }
  }
  else{
    updateDoc = delFromDoc(doc, procname, message)
    updateDoc = updateStatus(doc, new_status, message) || updateDoc;
  }
  

  if(updateDoc){
    message['results']['doc_updated'] = true;
    return [doc, JSON.stringify(message)];
  }
  else{
    message['results']['doc_updated'] = false;
    return [null, JSON.stringify(message)];
  }
}
