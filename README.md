# Puppeteer-Typescript-Cucumber-UI-Automation

#Feature example

```
  @login
   Scenario: Login with page-object model

      When I login with the correct credentials
      Then I have access to SF
 ```    
     
    
#Step example
```
  When('I login with the correct credentials', async () => {
    await lp.login(config.userName, config.password);
  });
```
  
#POM example
```
    async login(user_id: string, user_password: string) {
        await browserActions.findSelector('#password');
        await browserActions.waitAndType(LoginPageObjects.USERNAME_TEXTBOX, user_id);
        await browserActions.waitAndType(LoginPageObjects.PASSWORD_TEXTBOX, user_password);
        await browserActions.waitAndClick(LoginPageObjects.SIGNIN_BUTTON);
    });
```

#Custom method example

```
    async waitAndType(selector: string, text: string) {
        try {
            await page.waitForSelector(selector);
            await page.type(selector, text);
        } catch (error) {
            throw new Error(`Could not find selector: ${selector} to type`);
        }

    }
 ```
