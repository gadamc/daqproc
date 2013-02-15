function(doc) {

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }


    if(doc && doc.type == "daqdocument" &&  doc.run_name && doc.file_number && doc.status == "proc2 in progress"){
	emit( doc.run_name + "_" + zeroPad(doc.file_number,3), 1);
    }
}