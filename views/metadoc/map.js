function(doc) {

    if(doc.type == "daqmetadatadocuments"){
      emit( doc._id, doc.file_size);
    }
}