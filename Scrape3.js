const request = require('request');
const cheerio = require('cheerio');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-site/';
const groupId = 'com.cerner.careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
const targetJavadocHtml='apidocs/';
const artifactId2 = 'providers/';
const version2 = '5.0.3/';
var artifacts = [ "patients/", "providers/"];
var versions = [ "4.1.3/", "5.0.3/"];
for (i = 0; i < artifacts.length ; i++) {
    request(nexusURL+groupId+artifacts[i]+versions[i]+targetJavadocHtml+'allclasses-frame.html', (
        error, response, html) =>
         {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
               $('.indexContainer a').each((i, el) => {
                    const link  = $(el).attr('href');
                    request(nexusURL+groupId+artifacts[i]+versions[i]+targetJavadocHtml+link, (
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
                                    const text = $(el).text().trim();
                                    const regex2 = /(\\n)/gm;
                                    const finalText = text.replace(regex2,'');
                                    detail = {};
                                    detail.methodNameAndDesc = finalText;
                                    detail.methodLink = nexusURL+groupId+artifacts[i]+versions[i]+targetJavadocHtml+finalLink;
                                    jsonObj.push(detail);
                                });
                                console.log(jsonObj);
                            } else {
                                console.log(error);
                            }
                        });
               });
            }
         }
    );
}