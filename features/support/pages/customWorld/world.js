"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = require("../../config/config");
var browser;
var page;
var config = new config_1.Config();
class CustomeWorld {
    launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            browser = yield puppeteer_1.default.launch({
                headless: config.isHeadless,
                slowMo: config.slowMo,
                devtools: config.isDevTools,
                timeout: config.launchTimeout,
            });
            page = yield browser.newPage();
            cucumber_1.setDefaultTimeout(config.waitingTimeout);
            yield page.setViewport({
                width: config.viewPortWidth,
                height: config.viewPortHeight
            });
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.close();
        });
    }
    //Visit 
    visit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.goto(config.baseUrl);
        });
    }
    visitOpp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.oppUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    visitContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.contactUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    visitFirm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.firmUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    visitLead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.leadUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    visitReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.reportUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    visitDashboard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.dashboardUrl}${id}/view`;
            yield page.goto(url);
        });
    }
    switchMianFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.frames()[0];
        });
    }
    //custom selectors
    findSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForSelector(selector);
        });
    }
    verifyRejectedAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForSelector('#error');
        });
    }
    waitAndClick(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page.waitForSelector(selector);
                yield page.click(selector);
            }
            catch (error) {
                throw new Error(`Could not find selector: ${selector} to click`);
            }
        });
    }
    waitAndType(selector, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page.waitForSelector(selector);
                yield page.type(selector, text);
            }
            catch (error) {
                throw new Error(`Could not find selector: ${selector} to type`);
            }
        });
    }
    getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page.waitForSelector(selector);
                const text = yield page.$eval(selector, e => e.innerHTML);
                return text;
            }
            catch (error) {
                throw new Error(`Could not find selector: ${selector} to get text`);
            }
        });
    }
    getTextFromXpath(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page.waitForXPath(selector);
                const text = yield page.$eval(selector, e => e.innerHTML);
                return text;
            }
            catch (error) {
                throw new Error(`Could not find selector: ${selector} to get text`);
            }
        });
    }
    getCount(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page.waitForSelector(selector);
                const count = yield page.$$eval(selector, items => items.length);
                return count;
            }
            catch (error) {
                throw new Error(`Could not find selector: ${selector} to get count`);
            }
        });
    }
    waitForXpathAndClick(xpath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForXPath(xpath);
            const elements = yield page.$x(xpath);
            if (elements.length > 1) {
                console.warn('WaitForXpathClick returned more than one result');
            }
            yield elements[0].click();
        });
    }
    isElementVisible(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let visible = true;
            yield page.waitForSelector(selector, { visible: true, timeout: 30000 }).catch(() => {
                visible = false;
            });
            return visible;
        });
    }
    isXpathVisible(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let visible = true;
            yield page.waitForXPath(selector, { visible: true, timeout: 30000 }).catch(() => {
                visible = false;
            });
            return visible;
        });
    }
    //timeout
    delay(time) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitFor(time);
        });
    }
    takeScreenshot() {
        return __awaiter(this, void 0, void 0, function* () {
            const screenshot = yield page.screenshot();
            return screenshot;
        });
    }
}
exports.CustomeWorld = CustomeWorld;
cucumber_1.setWorldConstructor(CustomeWorld);
