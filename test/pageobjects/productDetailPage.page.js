import Page from "./page.js";

class ProductDetailPage extends Page {
    get productDetailName() {
        return $('//div[contains(@class, "inventory_details_name")]');
    }

    get addToCartButton() {
        return $('//button[contains(@id, "add-to-cart")]');
    }

    get removeButton() {
        return $('//button[contains(@id, "remove")]');
    }

    async getProductName() {
        return await this.productDetailName.getText();
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

    async clickRemoveButton() {
        await this.removeButton.click();
    }

}
export default new ProductDetailPage();
