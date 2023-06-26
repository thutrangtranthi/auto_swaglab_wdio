import LoginPage from "../pageobjects/login.page.js";
import ProductPage from "../pageobjects/product.page.js";
import ShoppingCartPage from "../pageobjects/shoppingCart.page.js";
import CheckoutStepOnePage from "../pageobjects/checkoutStepOne.page.js";
import CheckoutStepTwoPage from "../pageobjects/checkoutStepTwo.page.js";
import CheckoutCompletePage from "../pageobjects/checkoutComplete.page.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const expect = require("chai").expect;
const loginData = require("../../testdata/loginTestData.json");
const productData = require("../../testdata/productTestData.json");
const checkoutStepOneData = require("../../testdata/checkoutStepOneTestData.json");
const checkoutStepTwoData = require("../../testdata/checkoutStepTwoTestData.json");
const checkoutCompleteData = require("../../testdata/checkoutCompleteTestData.json");

describe("Payment process test cases!", () => {
    beforeEach("Login and add product to cart", async () => {
        await LoginPage.open();

        await LoginPage.login(
            loginData.usernames.standard_user,
            loginData.password
        );

        await expect(await ProductPage.getUrl()).to.be.equal(productData.url);

        //add product to cart
        await ProductPage.clickAddToCartButton(0);

        //go to shopping cart page
        await ProductPage.clickShoppingCartLink();

        //go to buyer information page to enter
        await ShoppingCartPage.checkOutBtn.click();
    });

    it("Verify payment successfully!", async () => {
        //check page title - Checkout-step-one page
        await expect(
            await CheckoutStepOnePage.getTextElement(
                CheckoutStepOnePage.pageTitle
            )
        ).to.be.equal(checkoutStepOneData.page_title);

        //check that the buttons are clickable
        await expect(
            await CheckoutStepOnePage.isElementClickable(
                CheckoutStepOnePage.cancelCheckoutBtn
            )
        ).to.be.true;

        await expect(
            await CheckoutStepOnePage.isElementClickable(
                CheckoutStepOnePage.continueBtn
            )
        ).to.be.true;

        //check placeholder of the buyer's inputs
        await expect(
            await CheckoutStepOnePage.getPlaceholderValue(
                CheckoutStepOnePage.firstNameInput
            )
        ).to.be.equal(checkoutStepOneData.first_name_input_placeholder);

        await expect(
            await CheckoutStepOnePage.getPlaceholderValue(
                CheckoutStepOnePage.lastNameInput
            )
        ).to.be.equal(checkoutStepOneData.last_name_input_placeholder);

        await expect(
            await CheckoutStepOnePage.getPlaceholderValue(
                CheckoutStepOnePage.postalCodeInput
            )
        ).to.be.equal(checkoutStepOneData.postal_code_input_placeholder);

        //enter buyer's information
        await CheckoutStepOnePage.enterBuyerInfo(
            checkoutStepOneData.first_name_value,
            checkoutStepOneData.last_name_value,
            checkoutStepOneData.postal_code_value
        );

        //click continue button to go to step two
        await CheckoutStepOnePage.continueBtn.click();

        //check the page title - checkout-step-two page
        await expect(
            await CheckoutStepTwoPage.getTextElement(
                CheckoutStepTwoPage.pageTitle
            )
        ).to.be.equal(checkoutStepTwoData.page_title);

        //check the buttons are clickable
        await expect(
            await CheckoutStepTwoPage.isElementClickable(
                CheckoutStepTwoPage.cancelBtn
            )
        ).to.be.true;

        await expect(
            await CheckoutStepTwoPage.isElementClickable(
                CheckoutStepTwoPage.finishBtn
            )
        ).to.be.true;

        //check that the price calculated correctly
        const totalPriceCalculatedFromListProduct =
            await CheckoutStepTwoPage.canculateTotalPriceFromListProduct();

        const totalItemPriceDisplay =
            await CheckoutStepTwoPage.getItemPriceTotal();

        const taxValue = await CheckoutStepTwoPage.getTax();

        const summaryTotalPrice =
            await CheckoutStepTwoPage.getSummaryTotalPrice();

        await expect(totalPriceCalculatedFromListProduct).to.be.equal(
            totalItemPriceDisplay
        );

        await expect(totalItemPriceDisplay + taxValue).to.be.equal(
            summaryTotalPrice
        );

        await CheckoutStepTwoPage.finishBtn.click();

        //check page title - checkout-complete page
        await expect(
            await CheckoutCompletePage.getTextElement(
                CheckoutCompletePage.pageTitle
            )
        ).to.be.equal(checkoutCompleteData.page_title);

        //check checkout complete header
        await expect(
            await CheckoutCompletePage.getTextElement(
                CheckoutCompletePage.completeHeader
            )
        ).to.be.equal(checkoutCompleteData.complete_header);

        //check complete mesage
        await expect(
            await CheckoutCompletePage.getTextElement(
                CheckoutCompletePage.completeText
            )
        ).to.be.equal(checkoutCompleteData.complete_text);

        //check button backhome is clickable
        await expect(
            await CheckoutCompletePage.isElementClickable(
                CheckoutCompletePage.backToProductPageBtn
            )
        ).to.be.true;
    });

    it("Verify that the error message will be displayed if do not input the buyer's information!", async () => {
        /* ========================================================================================== */
        //click continue button without entering any information
        await CheckoutStepOnePage.continueBtn.click();

        //check that the error message require first name is displayed
        await expect(
            await CheckoutStepOnePage.getTextElement(
                CheckoutStepOnePage.errorMessage
            )
        ).to.be.equal(checkoutStepOneData.first_name_require_msg);
        /* ========================================================================================== */

        //enter first name
        await CheckoutStepOnePage.enterBuyerInfo(
            checkoutStepOneData.first_name_value,
            "",
            ""
        );

        //click continue button
        await CheckoutStepOnePage.continueBtn.click();

        //check that the error message require last name is displayed
        await expect(
            await CheckoutStepOnePage.getTextElement(
                CheckoutStepOnePage.errorMessage
            )
        ).to.be.equal(checkoutStepOneData.last_name_require_msg);
        /* ========================================================================================== */

        //enter first name and last name
        await CheckoutStepOnePage.enterBuyerInfo(
            checkoutStepOneData.first_name_value,
            checkoutStepOneData.last_name_value,
            ""
        );

        //click continue button
        await CheckoutStepOnePage.continueBtn.click();

        //check that the error message require postal code is displayed
        await expect(
            await CheckoutStepOnePage.getTextElement(
                CheckoutStepOnePage.errorMessage
            )
        ).to.be.equal(checkoutStepOneData.postal_code_require_msg);
    });
});
