function(doc) {

    if(doc.type == "daqmetadatadocuments" && doc.file_size){
      emit( doc._id, doc.file_size);
    }
}