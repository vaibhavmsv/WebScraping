const request = require('request');
const cheerio = require('cheerio');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-site/';
const groupId = 'com.cerner.careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
const targetJavadocHtml='apidocs/'


request(nexusURL+groupId+artifactId+version+targetJavadocHtml+'overview-summary.html', (
    error, response, html) =>
     {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
           $('.colFirst a').each((i, el) => {
                const link  = $(el).attr('href');
                request(nexusURL+groupId+artifactId+version+targetJavadocHtml+link, (
                    error, response, html) => {
                        if(!error && response.statusCode == 200) {
                            const $ = cheerio.load(html);
                            $('.colFirst a').each((i, el) => {
                                const link  = $(el).attr('href');
                                const regex = /(\.\.\/)/gm;
                                const finalLink = link.replace(regex,'');
                                if(finalLink != null){
                                    request(nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink, (error, response, html) => {
                                        if (!error && response.statusCode == 200) {
                                            const $ = cheerio.load(html);
                                            $('.colFirst a').each((i, el) => {
                                                const text = $(el).text();
                                                const link = $(el).attr('href');
                                                console.log(text, link);
                                            }
                                            );
                                        }
                                    });
                                }
                            }
                            );
                        } else {
                            console.log(error);
                        }
                    });
           });
        }
     }
    );