const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = "#email";
        this.passwordInput = '//input[@placeholder="Password"]';
        this.loginButton = '//button[@id="submit"]';
        this.logout = '//button[@id="logout"]';
        this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alertMessage = '//span[@id="error"]';
    }

    async login(username, password) {
        if (!username || !password) {
            throw new Error(`login() requires valid username and password. Received: ${username}, ${password}`);
        }

        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin() {
        await expect(this.page.locator(this.logout)).toBeVisible(); // correctly check logout
        await expect(this.page.locator(this.loginValidation)).toHaveText(
            'Click on any contact to view the Contact Details'
        );
    }

    async verifyInvalidLogin() {
        await expect(this.page.locator(this.alertMessage)).toHaveText(
            'Incorrect username or password'
        );
    }
};
