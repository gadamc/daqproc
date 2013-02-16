function(doc) {
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
	
    if(doc.type == "daqdocument" && doc.status && doc.run_name && doc.file_number !== undefined && doc["status"].indexOf("failed") != -1){
	emit( doc.run_name + "_" + zeroPad(doc.file_number,3), doc.status);
    }
}