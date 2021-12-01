const puppeteer = require('puppeteer');
class Crawler {
    constructor() {
        //init with whatever values you'll need in your class
        //or throw an error if the object wasn't created through build
    }
    static async build() {
        let crawler = new Crawler();
        await crawler._init();
        return crawler;
    }
    async _init() {
        //launch the browser and keep its state
        this._browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            //executablePath: '/usr/bin/chromium-browser',
            executablePath: `/usr/bin/google-chrome`,
            defaultViewport: {
                width: 1200,
                height: 1000
            },
            timeout: 10000,
            headless: false,
            slowMo: 500 // slow down by 500ms
        });
        //create a page and keep its state
        this._page = await this._browser.newPage();
    }
    //getter
    get browser() {
        return this._browser;
    }
    //getter
    get page() {
        return this._page;
    }
    async login(url) {
         await this._page.goto(url);
         //do whatever is related to the login process
    }
}

module.exports = {Crawler};
