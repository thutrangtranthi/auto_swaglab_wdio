import LoginPage from "../pageobjects/login.page.js";
import ProductPage from "../pageobjects/product.page.js";
import ProductDetailPage from "../pageobjects/productDetailPage.page.js";
import ShoppingCartPage from "../pageobjects/shoppingCart.page.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const expect = require("chai").expect;
const loginData = require("../../testdata/loginTestData.json");
const productData = require("../../testdata/productTestData.json");
const shoppingCartData = require("../../testdata/shoppingCartTestData.json");

describe("Shopping cart test cases!", () => {
    beforeEach("Login to swag lab", async () => {
        await LoginPage.open();

        await LoginPage.login(
            loginData.usernames.standard_user,
            loginData.password
        );

        await expect(await ProductPage.getUrl()).to.be.equal(productData.url);
    });

    it("Verify adding product to cart at Product page successfully!", async () => {
        console.log("Verify adding product to cart at Product page!");

        //get total item in cart before adding product to cart
        const totalItemBeforeAdd = await ShoppingCartPage.getTotalItem();

        //get name and price of product will be added to cart
        const indexOfProduct = 0;
        const productNamePriceAddToCart =
            await ProductPage.getProductNameAndPriceAddingToCart(
                indexOfProduct
            );
        console.log(
            "Product name and price adding to cart: ",
            productNamePriceAddToCart
        );

        //add product to cart at product page
        await ProductPage.clickAddToCartButton(indexOfProduct);

        //go to shopping cart page
        await ProductPage.clickShoppingCartLink();

        //check url
        await expect(await ShoppingCartPage.getUrl()).to.be.equal(
            shoppingCartData.url
        );

        //check shopping cart page title
        await expect(await ShoppingCartPage.pageTitle.getText()).to.be.equal(
            shoppingCartData.page_title
        );

        //check quantity label
        await expect(await ShoppingCartPage.cartQtyLabel.getText()).to.be.equal(
            shoppingCartData.quantity_label
        );

        //check description label
        await expect(
            await ShoppingCartPage.cartDescLabel.getText()
        ).to.be.equal(shoppingCartData.description_label);

        //get total item in shopping cart after adding product to cart
        const totalItemAfterAdd = await ShoppingCartPage.getTotalItem();

        //check number of item in shopping cart
        await expect(totalItemAfterAdd - totalItemBeforeAdd).to.be.equal(1);

        //get name and price of product has just added to cart in shopping cart
        const productNamePriceInCart =
            await ShoppingCartPage.getNameAndPriceItem(totalItemBeforeAdd);
        console.log(
            "Product name and price just added to cart: ",
            productNamePriceInCart
        );

        //check product name and price are correct
        await expect(
            ShoppingCartPage.compareObjects(
                productNamePriceAddToCart,
                productNamePriceInCart
            )
        ).to.be.true;

        //check the button is clickable
        await expect(
            await ShoppingCartPage.isElementClickable(
                ShoppingCartPage.goBackProductPageBtn
            )
        ).to.be.true;

        await expect(
            await ShoppingCartPage.isElementClickable(
                ShoppingCartPage.checkOutBtn
            )
        ).to.be.true;

        console.log("Adding product to cart at Product page successfully!");
    });

    it("Verify adding product to cart at Product detail page successfully!", async () => {
        console.log("Verify adding product to cart at Product detail page!");

        //get total item in cart before adding product to cart
        const totalItemBeforeAdd = await ShoppingCartPage.getTotalItem();

        const indexOfProduct = 1;

        //add product to cart at product detail page
        await ProductPage.clickGoToProductDetailPage(indexOfProduct);
        await ProductDetailPage.clickAddToCartButton();

        //go to shopping cart page
        await ProductPage.clickShoppingCartLink();

        //check url
        await expect(await ShoppingCartPage.getUrl()).to.be.equal(
            shoppingCartData.url
        );

        //check shopping cart page title
        await expect(await ShoppingCartPage.pageTitle.getText()).to.be.equal(
            shoppingCartData.page_title
        );

        //check quantity label
        await expect(await ShoppingCartPage.cartQtyLabel.getText()).to.be.equal(
            shoppingCartData.quantity_label
        );

        //check description label
        await expect(
            await ShoppingCartPage.cartDescLabel.getText()
        ).to.be.equal(shoppingCartData.description_label);

        //get total item in shopping cart after adding product to cart
        const totalItemAfterAdd = await ShoppingCartPage.getTotalItem();

        //check number of item in shopping cart
        await expect(totalItemAfterAdd - totalItemBeforeAdd).to.be.equal(1);

        console.log("Adding product to cart at Product detail page successfully!");
    });

    it("Verify removing product from cart at product page successfully!", async () => {
        console.log("Verify removing product from cart at product page!");

        const indexOfProduct = 0;

        //add product to cart
        await ProductPage.clickAddToCartButton(indexOfProduct);

        //get total item in shopping cart after adding product to cart
        const totalItemAfterAdd = await ShoppingCartPage.getTotalItem();

        //click remove button
        await ProductPage.clickRemoveButton(indexOfProduct);

        //get total item in shopping cart after removing product from cart
        const totalItemAfterRemove = await ShoppingCartPage.getTotalItem();

        //check number of item in shopping cart after removing
        await expect(totalItemAfterAdd - totalItemAfterRemove).to.be.equal(1);

        console.log("Removing product from cart at product page successfully!");
    });

    it("Verify removing product from cart at product detail page successfully!", async () => {
        console.log("Verify removing product from cart at product detail page!");

        const indexOfProduct = 0;

        //add product to cart
        await ProductPage.clickAddToCartButton(indexOfProduct);

        //get total item in shopping cart after adding product to cart
        const totalItemAfterAdd = await ShoppingCartPage.getTotalItem();

        await ProductPage.clickGoToProductDetailPage(indexOfProduct);

        //click remove button
        await ProductDetailPage.clickRemoveButton();

        //get total item in shopping cart after removing product from cart
        const totalItemAfterRemove = await ShoppingCartPage.getTotalItem();

        //check number of item in shopping cart after removing
        await expect(totalItemAfterAdd - totalItemAfterRemove).to.be.equal(1);

        console.log("Removing product from cart at product detail page successfully!");
    });

    it("Verify removing product from cart at shopping cart successfully!", async () => {
        console.log("Verify removing product from cart at shopping cart!");

        //add product to cart
        await ProductPage.clickAddToCartButton(0);

        //go to shopping cart page
        await ProductPage.clickShoppingCartLink();

        //get total item in shopping cart after adding product to cart
        const totalItemAfterAdd = await ShoppingCartPage.getTotalItem();

        //click remove button
        await ShoppingCartPage.clickRemoveItemBtn(totalItemAfterAdd - 1);

        //get total item in shopping cart after removing product from cart
        const totalItemAfterRemove = await ShoppingCartPage.getTotalItem();

        //check number of item in shopping cart after removing
        await expect(totalItemAfterAdd - totalItemAfterRemove).to.be.equal(1);

        console.log("Removing product from cart at shopping cart successfully!");
    });
});
