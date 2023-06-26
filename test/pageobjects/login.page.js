import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    get loginLogo() {
        return $('div[class="login_logo"]')
    }

    get inputUsername() {
        return $("#user-name");
    }

    get inputPassword() {
        return $("#password");
    }

    get btnLogin() {
        return $('input[type="submit"]');
    }

    get messageLoginFail() {
        return $('h3[data-test="error"]');
    }

    async login(username, password) {
        await this.inputUsername.clearValue();
        await this.inputUsername.setValue(username);
        await this.inputPassword.clearValue();
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    open() {
        super.open("");
    }
}

export default new LoginPage();
