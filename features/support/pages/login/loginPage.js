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
const world_1 = require("../customWorld/world");
const objectRepo_1 = require("../../locators/objectRepo");
const browserActions = new world_1.CustomeWorld();
class LoginPage {
    login(user_id, user_password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browserActions.findSelector('#password');
            yield browserActions.waitAndType(objectRepo_1.LoginPageObjects.USERNAME_TEXTBOX, user_id);
            yield browserActions.waitAndType(objectRepo_1.LoginPageObjects.PASSWORD_TEXTBOX, user_password);
            yield browserActions.waitAndClick(objectRepo_1.LoginPageObjects.SIGNIN_BUTTON);
        });
    }
    loginError() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browserActions.findSelector(objectRepo_1.LoginPageObjects.LOGIN_ERROR);
        });
    }
    hasAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browserActions.findSelector(objectRepo_1.LoginPageObjects.HAS_ACCESS);
        });
    }
}
exports.LoginPage = LoginPage;
