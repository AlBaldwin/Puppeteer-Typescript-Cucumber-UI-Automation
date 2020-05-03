const { Given, When, Then, Before, after } = require("cucumber");
import { CustomeWorld } from "../../pages/customWorld/world";
import { After } from "cucumber";
import { Config } from "../../config/config"
import { LoginPage } from "../../pages/login/loginPage";

const cw = new CustomeWorld();
const lp = new LoginPage();
var config = new Config();

Given('I am on the SF login page', async () => {
    await cw.launchBrowser();
    await cw.visit()
  });

  Given('I am logged in to the SF aplication', async () => {
    await cw.launchBrowser();
    await cw.visit();
    await lp.login(config.userName, config.password);
    await lp.hasAccess();
  });

  Given('I navigate to opp {string}', async (id: string) => {
    await cw.launchBrowser();
    await cw.visitOpp(id);
  });

  When('I login with the correct credentials', async () => {
    await lp.login(config.userName, config.password);
    await cw.delay(10000);
  });

  When('I login with the wrong credentials', async () => {
    await lp.login(config.wrongUsername, config.wrongPassword);
  });

  Then('I see the SF login error', async () =>{
    await lp.loginError();
  });

  Then('I have access to SF', async () => {
    await lp.hasAccess();

  });


