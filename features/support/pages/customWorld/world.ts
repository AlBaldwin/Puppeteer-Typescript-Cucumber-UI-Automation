import { setWorldConstructor, setDefaultTimeout } from "cucumber";
import puppeteer, { Browser, Page, ElementHandle } from "puppeteer";
import { Config } from "../../config/config";

var browser: Browser;
var page: Page;
var config = new Config();



export class CustomeWorld {

    async launchBrowser() {
        browser = await puppeteer.launch({ 
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevTools,
            timeout: config.launchTimeout,
            

        });

        page = await browser.newPage();
        setDefaultTimeout(config.waitingTimeout);
        await page.setViewport({
          width: config.viewPortWidth,
          height: config.viewPortHeight
        });
        
    }

    async closeBrowser() {
        await browser.close();
    }
    //Visit 

    async visit() {
        await page.goto(config.baseUrl);   
    }

    async visitOpp(id: string) {
        const url =  `${config.oppUrl}${id}/view`
        await page.goto(url);   
    }

    async visitContact(id: number) {
        const url =  `${config.contactUrl}${id}/view`
        await page.goto(url);   
    }

    async visitFirm(id: number) {
        const url =  `${config.firmUrl}${id}/view`
        await page.goto(url);   
    }

    async visitLead(id: number) {
        const url =  `${config.leadUrl}${id}/view`
        await page.goto(url);    
    }

    async visitReport(id: number) {
        const url =  `${config.reportUrl}${id}/view`
        await page.goto(url);  
    }

    
    async visitDashboard(id: number) {
        const url =  `${config.dashboardUrl}${id}/view`
        await page.goto(url);   
    }

    async switchMianFrame(){
        await page.frames()[0];
    }



    //custom selectors
    async findSelector(selector: string) {
        await page.waitForSelector(selector);
    }

    async verifyRejectedAccess() {
        await page.waitForSelector('#error');
    }

    async waitAndClick(selector: string) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to click`);
        }
    }

    async waitAndType(selector: string, text: string) {
        try {
            await page.waitForSelector(selector);
            await page.type(selector, text);
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to type`);
        }

    }

    async getText(selector: string) {
        try {
            await page.waitForSelector(selector);
            const text = await page.$eval(selector, e => e.innerHTML);
            return text;
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to get text`);
        }

    }


    async getTextFromXpath(selector: string) {
        try {
            await page.waitForXPath(selector);
            const text = await page.$eval(selector, e => e.innerHTML);
            return text;
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to get text`);
        }

    }

    async getCount(selector: string) {
        try {
            await page.waitForSelector(selector);
            const count = await page.$$eval(selector, items => items.length);
            return count;
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to get count`);
        }

    }

    async waitForXpathAndClick(xpath: string) {
        await page.waitForXPath(xpath)
        const elements = await page.$x(xpath)
        if (elements.length > 1) {
            console.warn('WaitForXpathClick returned more than one result')
        }
        await elements[0].click();
    }

    async isElementVisible(selector: string) {
        let visible = true
        await page.waitForSelector(selector, { visible: true, timeout: 30000 }).catch(() => {
            visible = false;
        });
        return visible;


    }

    async isXpathVisible(selector: string) {
        let visible = true
        await page.waitForXPath(selector, { visible: true, timeout: 30000 }).catch(() => {
            visible = false;
        });
        return visible;
    }

    //timeout
    async delay(time: number) {
        await page.waitFor(time);
     }
     
     async takeScreenshot() {
        const screenshot = await page.screenshot();
        return screenshot;
      }
}

setWorldConstructor(CustomeWorld);