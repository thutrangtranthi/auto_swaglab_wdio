import LoginPage from "../pageobjects/login.page.js";
import ProductPage from "../pageobjects/product.page.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const expect = require("chai").expect;
const loginData = require("../../testdata/loginTestData.json");
const productData = require("../../testdata/productTestData.json");

describe("Product test cases", () => {
    beforeEach("Login to swag lab", async () => {
        await LoginPage.open();

        await LoginPage.login(
            loginData.usernames.standard_user,
            loginData.password
        );

        await expect(await ProductPage.getUrl()).to.be.equal(productData.url);
    });

    it("Check product page display", async () => {
        console.log("Check app logo text!");
        await expect(
            await ProductPage.getTextElement(ProductPage.appLogo)
        ).to.be.equal(productData.app_logo);

        console.log("Check page title!");
        expect(
            await ProductPage.getTextElement(ProductPage.pageTitle)
        ).to.be.equal(productData.page_title);

        console.log("Check that we are able to choose sort options");
        await expect(
            await ProductPage.isElementClickable(ProductPage.listSortOption)
        ).to.be.true;

        console.log("Check that the add to cart buttons are clickable");
        await ProductPage.listButtonAddToCart.map(async (button) => {
            await expect(await ProductPage.isElementClickable(button)).to.be
                .true;
        });

        console.log("Check that the shopping cart link is clickable!");
        await expect(
            await ProductPage.isElementClickable(ProductPage.shoppingCartLink)
        ).to.be.true;

        console.log("Check that the social links are clickable!");
        await expect(
            await ProductPage.isElementClickable(ProductPage.socialTwitterLink)
        ).to.be.true;
        await expect(
            await ProductPage.isElementClickable(ProductPage.socialFacebookLink)
        ).to.be.true;
        await expect(
            await ProductPage.isElementClickable(ProductPage.socialLinkedinLink)
        ).to.be.true;

        console.log("Check footer text!");
        await expect(await ProductPage.footerText.getText()).to.be.equal(
            productData.footer_text
        );
    });

    it("Verify sorting products by name from A to Z", async () => {
        /* ==================================================================================================================== */
        console.log("Do sort name of product from A to Z!");
        await ProductPage.listSortOption.click();
        await ProductPage.sortAtoZOption.click();

        //get list product name after click sort
        const listNameAZResult = await ProductPage.getListProductName();

        //create a copy list to check sorting
        const listNameAZResultToSort = listNameAZResult.slice();

        //Sort the copy list to compare with origninal list
        await ProductPage.sortNameAscending(listNameAZResultToSort);

        console.log(
            "Validate the result of sorting name of product from A to Z!"
        );

        //compare 2 list to ensure sort function in web is correct
        await expect(
            ProductPage.compareObjects(listNameAZResult, listNameAZResultToSort)
        ).to.be.true;

        console.log("Finish sorting name of product from A to Z!");
        /* ===================================================================================================================== */
    });

    it("Verify sorting products by name from Z to A", async () => {
        /* ===================================================================================================================== */
        console.log("Do sort name of product from Z to A!");

        await ProductPage.listSortOption.click();
        await ProductPage.sortZtoAOption.click();

        //get list product name after click sort
        const listNameZAResult = await ProductPage.getListProductName();

        //create a copy list to check sorting
        const listNameZAResultToSort = listNameZAResult.slice();

        //Sort the copy list to compare with origninal list
        await ProductPage.sortNameDescending(listNameZAResultToSort);

        console.log(
            "Validate the result of sorting name of product from Z to A!"
        );

        //compare 2 list to ensure sort function in web is correct
        await expect(
            ProductPage.compareObjects(listNameZAResult, listNameZAResultToSort)
        ).to.be.true;

        console.log("Finish sorting name of product from Z to A!");
        /* ===================================================================================================================== */
    });

    it("Verify sorting products by price from Low to High", async () => {
        /* ===================================================================================================================== */
        console.log("Do sort price of product from Low to High!");
        await ProductPage.listSortOption.click();
        await ProductPage.sortLowHighOption.click();

        //get list product name after click sort
        const listPriceLowHighResult = await ProductPage.getListPrice();

        //create a copy list to check sorting
        const listPriceLowHighResultToSort = listPriceLowHighResult.slice();

        //Sort the copy list to compare with origninal list
        await ProductPage.sortPriceLowToHigh(listPriceLowHighResultToSort);

        console.log(
            "Validate the result of sorting name of product from Low to High!"
        );

        //compare 2 list to ensure sort function in web is correct
        await expect(
            ProductPage.compareObjects(
                listPriceLowHighResult,
                listPriceLowHighResultToSort
            )
        ).to.be.true;

        console.log("Finish sorting name of product from Low to High!");
        /* ===================================================================================================================== */
    });

    it("Verify sorting products by price from High to Low", async () => {
        /* ===================================================================================================================== */
        console.log("Do sort price of product from High to Low!");
        await ProductPage.listSortOption.click();
        await ProductPage.sortHighLowOption.click();

        //get list product name after click sort
        const listPriceHighLowResult = await ProductPage.getListPrice();

        //create a copy list to check sorting
        const listPriceHighLowResultToSort = listPriceHighLowResult.slice();

        //Sort the copy list to compare with origninal list
        await ProductPage.sortPriceHighToLow(listPriceHighLowResultToSort);

        console.log(
            "Validate the result of sorting name of product from High to Low!"
        );

        //compare 2 list to ensure sort function in web is correct
        await expect(
            ProductPage.compareObjects(
                listPriceHighLowResult,
                listPriceHighLowResultToSort
            )
        ).to.be.true;

        console.log("Finish sorting name of product from High to Low!");
        /* ===================================================================================================================== */
    });
});
