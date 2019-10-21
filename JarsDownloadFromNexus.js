const request = require('request');
const cheerio = require('cheerio');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-repos/';
const groupId = 'com.cerner.careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
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

var allRepos1stLevel = [];
var allRepos2ndLevel = [];
var allRepos3rdLevel = [];
function getAPIs() {
const repos2ndLevel = [];
request(nexusURL, (
        error, response, html) =>
         {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                var i=0;
               $('tr td a').each((i, el) => {
                   i=i+1;
                   if(i>=2) {
                    const link  = $(el).attr('href');
                    allRepos1stLevel.push(link);
                   }
               });
            }
            for(var j=0; j < allRepos1stLevel.length; j++) {
                request(allRepos1stLevel[j], (error, response, html) => {
                    if(!error && response.statusCode == 200) {
                        const $ = cheerio.load(html);
                        var k=0;
                        $('tr td a').each((i,el) => {
                            k=k+1;
                            if (k>=2) {
                                allRepos2ndLevel.push($(el).attr('href'));
                            }
                        });
                    }
                    console.log(allRepos2ndLevel);
                });
            }
         }
);
}


getAPIs();