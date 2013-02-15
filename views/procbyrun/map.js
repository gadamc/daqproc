function(doc) {

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  

    if(doc.type == "daqdocument" && doc.run_name && doc.file_number && doc.proc0 && !doc.proc1){
	var runName = doc.run_name + "_" + zeroPad(doc.file_number,3);
	emit( [runName, "proc0"] , doc.status);
    }

   else if(doc.type == "daqdocument" && doc.run_name && doc.file_number &&  doc.proc0 && doc.proc1 && !doc.proc2){
	var runName = doc.run_name + "_" + zeroPad(doc.file_number,3);
	emit( [runName, "proc1"] , doc.status);
    }
   else if(doc.type == "daqdocument" && doc.run_name && doc.file_number &&  doc.proc0 && doc.proc1 && doc.proc2 && !doc.proc3){
	var runName = doc.run_name + "_" + zeroPad(doc.file_number,3);
	emit( [runName, "proc2"] , doc.status);
    }
  else if(doc.type == "daqdocument" && doc.run_name && doc.file_number ){
	var runName = doc.run_name + "_" + zeroPad(doc.file_number,3);
	emit( [runName, "mixed_state"], doc.status);
  }

}