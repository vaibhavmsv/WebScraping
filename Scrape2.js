const request = require('request');
const cheerio = require('cheerio');
const nexusURL = 'http://repo.release.cerner.corp/nexus/content/repositories/main-site/';
const groupId = 'com.cerner.careconcepts/';
const artifactId = 'patients/';
const version = '4.1.3/';
const targetJavadocHtml='apidocs/'
jsonObj = [];

function getData(){
request(nexusURL+groupId+artifactId+version+targetJavadocHtml+'allclasses-frame.html', (
    error, response, html) =>
     {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
           $('.indexContainer a').each((i, el) => {
                const link  = $(el).attr('href');
                jsonObj2 = [];
                request(nexusURL+groupId+artifactId+version+targetJavadocHtml+link, (
                    error, response, html) => {
                        if(!error && response.statusCode == 200) {
                            const $ = cheerio.load(html);
                            // $('.memberNameLink a').each((i, el) => {
                            //     const link = $(el).attr('href');
                            //     const regex = /(\.\.\/)/gm;
                            //     const finalLink = link.replace(regex,'');
                            //     const text = $(el).text();
                            //     console.log(text, finalLink, $(el).next().next().text());
                            // });

                            // $('.colLast').each((i, el) => {
                            //     const link = $(el).children(".a").html();;
                            //     const regex = /(\.\.\/)/gm;
                            //     //const finalLink = link.replace(regex,'');
                            //     // const text = $(el).text();
                            //     // console.log(text, finalLink);
                            //     console.log('Full text'+$(el).text());
                            //     console.log('link'+$(el).children("code").children("span").children("a").attr('href'));
                            // });

                            // $('h4').each((i,el) => {
                            //     const methodName = $(el).text();
                            //     console.log(methodName, $(el).next().next() ,$(el).next().next().text());
                            // });

                            // fix working = full text and link
                            // jsonObj = [];
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
                                // console.log(text);
                                // console.log(nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink);
                                detail = {
                                    "methodNameAndDesc": finalText,
                                    "methodLink": nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink
                                };
                                JSON.stringify(detail);
                                // detail.methodNameAndDesc = finalText;
                                // detail.methodLink = nexusURL+groupId+artifactId+version+targetJavadocHtml+finalLink;

                                jsonObj.push(detail);
                            });
                            //comsole.log(jsonObj)
                             
                        } else {
                            console.log(error);
                        }
                    });
           });
        }
     }
    );
    return (jsonObj);
}



console.log(getData());
// console.log(jsonObj);