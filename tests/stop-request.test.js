const ToBeTested = require('../src/index');
const {Crawler} = require('../src/puppeteer');

describe('stop-request', ()=> {
    it(`should stop the request on the server`, async () => {
        const crawler = await Crawler.build();
        const domain = `localhost`;
        const results = []; // collects all results

        let paused = true;
        let pausedRequests = [];

        crawler.page.on('console', message => console.log(`CONSOLE: ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
        crawler.page.on('pageerror', ({ message }) => console.log(`PAGEERROR: ${message}`));
        crawler.page.on('response', response =>  console.log(`RESPONSE: ${response.status()} ${response.url()}`));
        crawler.page.on('requestfailed', request => console.log(`REQUESTFAILED: ${request.failure().errorText} ${request.url()}`));

        crawler.page.on('request', async request => {
            console.log(`onRequest - START`);
            const information = {
                url: request.url(),
                method: request.method(),
                requestHeaders: request.headers(),
                requestPostData: request.postData()
            };

            

            console.log(`onRequest - END`);

            if (!paused) {
                console.log(`Pause is falsy it should send the request`);
                request.continue();
            } else{
                if(request.method() === 'POST'){
                    console.log(`condition is pausing, so we can exit`);
                    console.log(information);
                    request.abort();
                }                
            }
            /*
            if (paused) {
                console.log(request);
                pausedRequests.push(() => request.continue());
            } else {
                paused = true; // pause, as we are processing a request now
                request.continue();
            }*/
        });

        crawler.page.on('requestfinished', async (request) => {
            console.log(`onrequestfinished`);
            //const response = await request.response();
        });

        crawler.page.on('requestfailed', (request) => {
            console.log(`onrequestfailed`);
            // handle failed request
            //nextRequest();
        });

        await crawler.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
        await crawler.page.goto(`http://${domain}:8080/fake-html`, { waitUntil: 'networkidle2' });
        await crawler.page.setRequestInterception(true);
      

        await crawler.page.waitForSelector('#fake-form');
        await crawler.page.type('#fake-input', `set from test`);
        await crawler.page.click('#send-button');

        await crawler.browser.close();
    });
});