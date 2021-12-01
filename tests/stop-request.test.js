const ToBeTested = require('../src/index');
const {Crawler} = require('../src/puppeteer');

describe('stop-request', ()=> {
    it(`should stop the request on the server`, async () => {
        const crawler = await Crawler.build();
        const domain = `localhost`;
        const results = []; // collects all results

        let paused = true;
        let pausedRequests = [];

        crawler.page.on('request', request => {
            console.log(`onRequest - START`);
            const information = {
                url: request.url(),
                method: request.method(),
                requestHeaders: request.headers(),
                requestPostData: request.postData()
            };

            console.log(information);

            console.log(`onRequest - END`);

            if (!paused) {
                console.log(`Pause is falsy it should send the request`);
                request.continue();
            };
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