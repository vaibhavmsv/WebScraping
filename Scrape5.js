const request = require('request');
var convert = require('xml-js');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-repo/';
const groupId = 'com/cerner/careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
const finalURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-repo/com/cerner/careconcepts/patients/4.1.3/patients-4.1.3.jar';
const targetJavadocHtml='apidocs/';
const artifactId2 = 'providers/';
const version2 = '5.0.3/';
var count = 0;
const fs = require('fs');
const regex3 = /\s\s\s*/gm;
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
const allrepos =  "http://repo.release.cerner.corp/nexus/service/local/repo_groups/main-repos/content/?isLocal&_dc=1569313876307";
// http://repo.release.cerner.corp/nexus/content/repositories/main-repo/com/cerner/careconcepts/patients/4.1.3/patients-4.1.3.jar
function getAPIs() {
request("http://repo.release.cerner.corp/nexus/service/local/repo_groups/main-repos/content/?isLocal&_dc=1569314076911", (
        error, response, json) =>
         {
            if(!error && response.statusCode == 200) {
                const jsonResponse = convert.xml2json(response.body, {compact: true, spaces: 4});
                console.log(jsonResponse);
                const resources = jsonResponse.content.data.content-item;
                for(var i=0; i < resources.length; i++) {
                    console.log(resources[0].resourceURI);
                }
            }
            else {
                console.log(error);
            }
         }
);
}


getAPIs();