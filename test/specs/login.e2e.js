import LoginPage from "../pageobjects/login.page.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const expect = require("chai").expect;
const loginData = require("../../testdata/loginTestData.json");
const productData = require("../../testdata/productTestData.json");

describe("Login Swag lab test cases", () => {
    beforeEach("Open login page", async () => {
        await LoginPage.open();
    });

    it("Check login page display", async () => {
        await expect(
            await LoginPage.getTextElement(LoginPage.loginLogo)
        ).to.be.equal(loginData.loginLogo);

        await expect(await LoginPage.inputUsername.isDisplayed()).to.be.true;
        await expect(await LoginPage.inputPassword.isDisplayed()).to.be.true;
        await expect(
            await LoginPage.isElementClickable(LoginPage.btnLogin)
        ).to.be.true;
    })

    it("Verify login successfully with valid credentials", async () => {
        console.log("Do login with valid credentials!");

        await LoginPage.login(
            loginData.usernames.standard_user,
            loginData.password
        );

        await expect(await LoginPage.getUrl()).to.be.equal(productData.url);

        console.log("Login successfully!");
    });

    it("Verify login fail with wrong username", async () => {
        console.log("Do login with wrong username!");

        await LoginPage.login(
            loginData.usernames.standard_user + "1234",
            loginData.password
        );

        await expect(await LoginPage.getUrl()).to.be.equal(loginData.url);

        await expect(
            await LoginPage.getTextElement(LoginPage.messageLoginFail)
        ).to.be.equal(loginData.msgLoginFail);

        console.log("Finish logging in with wrong username!");
    });

    it("Verify login fail with wrong password", async () => {
        console.log("Do login with wrong password!");

        await LoginPage.login(
            loginData.usernames.standard_user,
            loginData.password + "1234"
        );

        await expect(await LoginPage.getUrl()).to.be.equal(loginData.url);

        await expect(
            await LoginPage.getTextElement(LoginPage.messageLoginFail)
        ).to.be.equal(loginData.msgLoginFail);

        console.log("Finish logging in with wrong password!");
    });
});
