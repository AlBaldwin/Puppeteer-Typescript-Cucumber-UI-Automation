import { CustomeWorld } from "../customWorld/world";
import { LoginPageObjects } from '../../locators/objectRepo';

const browserActions = new CustomeWorld();

export class LoginPage {

    async login(user_id: string, user_password: string) {
        await browserActions.findSelector('#password');
        await browserActions.waitAndType(LoginPageObjects.USERNAME_TEXTBOX, user_id);
        await browserActions.waitAndType(LoginPageObjects.PASSWORD_TEXTBOX, user_password);
        await browserActions.waitAndClick(LoginPageObjects.SIGNIN_BUTTON);
    }

    async loginError(){
        await browserActions.findSelector(LoginPageObjects.LOGIN_ERROR);
    }

    async hasAccess(){
        await browserActions.findSelector(LoginPageObjects.HAS_ACCESS);
    }

}