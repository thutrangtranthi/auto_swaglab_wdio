import Page from "./page.js";

class ShoppingCartPage extends Page {
    get shoppingCartTotalItem() {
        return $('span[class="shopping_cart_badge"]');
    }

    get cartQtyLabel() {
        return $('div[class="cart_quantity_label"]');
    }

    get cartDescLabel() {
        return $('div[class="cart_desc_label"]');
    }

    get listCartItem() {
        return $$('div[class="cart_item"]');
    }

    get cartItemQuantity() {
        return $('div[class="cart_quantity"]');
    }

    get cartItemLabel() {
        return $('div[class="cart_item_label"]');
    }

    get listRemoveItemBtn() {
        return $$("button=Remove");
    }

    get goBackProductPageBtn() {
        return $('button[data-test="continue-shopping"]');
    }

    get checkOutBtn() {
        return $('button[data-test="checkout"]');
    }

    async getTotalItem() {
        return (await this.shoppingCartTotalItem.isExisting())
            ? parseInt(await this.shoppingCartTotalItem.getText())
            : 0;
    }

    async getNameAndPriceItem(indexOfItem) {
        return {
            product_name: await this.listCartItem[indexOfItem]
                .$('div[class="inventory_item_name"]')
                .getText(),
            product_price: await this.listCartItem[indexOfItem]
                .$('div[class="inventory_item_price"]')
                .getText(),
        };
    }

    async clickRemoveItemBtn(indexOfItem) {
        await this.listRemoveItemBtn[indexOfItem].click();
    }
}
export default new ShoppingCartPage();
