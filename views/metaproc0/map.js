function(doc) {

    if(doc.type == "daqmetadatadocuments" && doc.status == "closed" && !doc.metaproc0){
      emit( doc._id, doc.file_size);
    }
}