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
Object.defineProperty(exports, "__esModule", { value: true });
const { Given, When, Then, Before, after } = require("cucumber");
const world_1 = require("../../pages/customWorld/world");
const config_1 = require("../../config/config");
const loginPage_1 = require("../../pages/login/loginPage");
const cw = new world_1.CustomeWorld();
const lp = new loginPage_1.LoginPage();
var config = new config_1.Config();
Given('I am on the SF login page', () => __awaiter(void 0, void 0, void 0, function* () {
    yield cw.launchBrowser();
    yield cw.visit();
}));
Given('I am logged in to the SF aplication', () => __awaiter(void 0, void 0, void 0, function* () {
    yield cw.launchBrowser();
    yield cw.visit();
    yield lp.login(config.userName, config.password);
    yield lp.hasAccess();
}));
Given('I navigate to opp {string}', (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield cw.launchBrowser();
    yield cw.visitOpp(id);
}));
When('I login with the correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
    yield lp.login(config.userName, config.password);
    yield cw.delay(10000);
}));
When('I login with the wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
    yield lp.login(config.wrongUsername, config.wrongPassword);
}));
Then('I see the SF login error', () => __awaiter(void 0, void 0, void 0, function* () {
    yield lp.loginError();
}));
Then('I have access to SF', () => __awaiter(void 0, void 0, void 0, function* () {
    yield lp.hasAccess();
}));
