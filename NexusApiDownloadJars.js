const request = require('request');
const cheerio = require('cheerio');
var download = require('download-file');
var convert = require('xml-js');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-repos/';
function getAPIs() {
const repos2ndLevel = [];
var map = {};
request("http://repo.release.cerner.corp/nexus/service/local/lucene/search?repositoryId=main-repos&p=jar&g=com.cerner*", (
        error, response, xml) =>
         {
            if(!error && response.statusCode == 200) { 
                const result = convert.xml2json(xml, {compact: true, spaces: 4});
                const responseData = JSON.parse(result);
                for(var i =0; i< responseData.searchNGResponse.data.artifact.length; i++) {
                    var artifactId = responseData.searchNGResponse.data.artifact[i].artifactId._text;
                    var groupId = responseData.searchNGResponse.data.artifact[i].groupId._text;
                    var latestVersion = responseData.searchNGResponse.data.artifact[i].latestRelease._text;
                    var groupIdToPutInDownloadURL = groupId.replace(/[.]/g, '/');
                    map[artifactId] = latestVersion;
                    var options = {
                        directory: "/Users/sm050769/Downloads/downloads/jars2/",
                        filename: `${artifactId}-${latestVersion}.jar`,
                        timeout: 1000000
                    }
                    var url = `http://repo.release.cerner.corp/nexus/content/repositories/main-repos/${groupIdToPutInDownloadURL}/${artifactId}/${latestVersion}/${artifactId}-${latestVersion}.jar`;
                    download(url, options, function(err){
                        if(err) {
                            console.log(err);
                            throw err;
                        }
                    })
                }
                console.log(map);
                console.log(Object.keys(map).length);
            }
            else {
                console.log(error);
            }
         }
);
}
getAPIs();