var download = require('download-file');
var options = {
    directory: "/Users/sm050769/Downloads/downloads/",
    filename: "p-1.4.3.jar"
}
var url = "http://repo.release.cerner.corp/nexus/content/repositories/main-repo/com/cerner/careconcepts/patients/4.1.3/patients-4.1.3.jar";
download(url, options, function(err){
    if(err)
    throw err;
    console.log('downloaded');
})