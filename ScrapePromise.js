const request = require('request');
const cheerio = require('cheerio');
var promise = require('promise');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-site/';
const groupId = 'com.cerner.careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
const targetJavadocHtml='apidocs/';
const artifactId2 = 'providers/';
const version2 = '5.0.3/';
var artifacts = [ "patients/", "providers/"];
var versions = [ "4.1.3/", "5.0.3/"];
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function get(url) {
    jsonFinalResponse = [];
    // Return a new promise.
    var promise = new Promise(function(resolve, reject) {
        request(url, (
            error, response, html) =>
             {
                if(!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    $('.indexContainer a').each((i, el) => {
                        jsonResponse = [];
                        const link  = $(el).attr('href');
                        request(nexusURL+groupId+artifactId+version+targetJavadocHtml+link, (
                            error, response, html) => {
                                if(!error && response.statusCode == 200) {
                                    const $ = cheerio.load(html);
                                    $('.colLast').each((i, el) => {
                                        jsonObj = [];
                                        let finalLink;
                                        const link = $(el).children("code").children("span").children("a").attr('href');
                                        const regex = /(\.\.\/)/gm;
                                        if ( link != null ) {
                                            finalLink = link.replace(regex,'');
                                        }
                                        const text = $(el).text().trim();
                                        const regex2 = /(\\n)/gm;
                                        const finalText = text.replace(regex2,'');
                                        detail = {};
                                        detail.methodNameAndDesc = finalText;
                                        detail.methodLink = nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink;
                                        jsonObj.push(detail); 
                                        jsonResponse.push(jsonObj);
                                    });
                            }
                        });
                        jsonFinalResponse.push(jsonResponse);
                    });
                }
             }
        );
        resolve(jsonFinalResponse);
    });
    return promise;
  }

get(nexusURL+groupId+artifactId+version+targetJavadocHtml+'allclasses-frame.html').then(
    function(data) {
        console.log(data);
    }
);