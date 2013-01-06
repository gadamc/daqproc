function(doc) {
function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
    if(doc.type == "daqdocument" && doc.status == "closed" && !doc.proc0 && doc.Intitule != "Edelweiss 2, run 15"){
	emit( doc.run_name + "_" + zeroPad(doc.file_number,3), 1);
    }
}