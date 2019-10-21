const request = require('request');
const cheerio = require('cheerio');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-site/';
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

function getAPIs() {
request(nexusURL+groupId+artifactId+version+targetJavadocHtml+'allclasses-frame.html', (
        error, response, html) =>
         {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
               $('.indexContainer a').each((i, el) => {
                    const link  = $(el).attr('href');
                    request(nexusURL+groupId+artifactId+version+targetJavadocHtml+link, (
                        error, response, html) => {
                            if(!error && response.statusCode == 200) {
                                const $ = cheerio.load(html);
                                jsonObj = [];
                                jsonIndexObject = [];
                                $('.colLast').each((i, el) => {
                                    let finalLink;
                                    const link = $(el).children("code").children("span").children("a").attr('href');
                                    const regex = /(\.\.\/)/gm;
                                    if ( link != null ) {
                                        finalLink = link.replace(regex,'');
                                    }
                                    const text = $(el).text().trim();
                                    const regex2 = /(\\n)/gm;
                                    var finalText = text.replace(regex2,'');
                                    var indexValue = "{ \"_id\": "+ count++ +" }";
                                    var final = "{\"index\"" +":"+ indexValue;
                                    var newlINE = /\r?\n|\r/g ;
                                    finalText =finalText.replace(newlINE," ");
                                    var finalDetail = "{\"methodNameAndDesc\":" + "\""+finalText+"\"" +","+ "\"methodLink\":"+"\""+ nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink+"\""+"}";
                                    var call = final+"\n"+finalDetail.replace(regex3,' ')+"\n";
                                    fs.appendFile("Results.txt", call, function(err) {
                                        if(err) {
                                            return console.log(err);
                                        }
                                    });
                                });
                            } else {
                                console.log(error);
                            }
                        });
               });
            }
         }
);
}

function getAPIs2() {
    request(nexusURL+groupId+artifactId2+version2+targetJavadocHtml+'allclasses-frame.html', (
        error, response, html) =>
         {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
               $('.indexContainer a').each((i, el) => {
                    const link  = $(el).attr('href');
                    request(nexusURL+groupId+artifactId2+version2+targetJavadocHtml+link, (
                        error, response, html) => {
                            if(!error && response.statusCode == 200) {
                                const $ = cheerio.load(html);
                                jsonObj = [];
                                $('.colLast').each((i, el) => {
                                    let finalLink;
                                    const link = $(el).children("code").children("span").children("a").attr('href');
                                    const regex = /(\.\.\/)/gm;
                                    if ( link != null ) {
                                        finalLink = link.replace(regex,'');
                                    }
                                    var finalText = $(el).text().trim();
                                    //const regex2 = /(\\n)/gm;
                                    //var finalText = text.replace(regex2,'');
                                    var indexValue = "{ \"_id\": "+ count++ +" }";
                                    var final = "{\"index\"" +":"+ indexValue;
                                    var newlINE = /\r?\n|\r/g ;
                                    finalText =finalText.replace(newlINE," ");
                                    var finalDetail = "{\"methodNameAndDesc\":" + "\""+finalText+"\"" +","+ "\"methodLink\":"+"\""+ nexusURL+groupId+artifactId2+version2+targetJavadocHtml+finalLink+"\""+"}";
                                    var call = final+"\n"+finalDetail.replace(regex3,' ')+"\n";
                                    fs.appendFile("Results.txt", call, function(err) {
                                        if(err) {
                                            return console.log(err);
                                        }
                                    });

                                });
                            } else {
                                console.log(error);
                            }
                        });
               });
            } else {
                console.log(error);
            }
         }
);
}

getAPIs();
getAPIs2();