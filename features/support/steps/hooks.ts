import { After, BeforeAll, AfterAll } from "cucumber";
import { CustomeWorld } from '../pages/customWorld/world';

const cw = new CustomeWorld();


After({timeout: 30000}, async () =>{
    await cw.closeBrowser();
});

