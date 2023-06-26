import Page from "./page.js";

const productNameLocatorFromAddToCartBtn =
    '//ancestor::div[@class="inventory_item_description"]//div[@class="inventory_item_name"]';
const priceLocatorFromAddToCartBtn =
    '//parent::div/div[@class="inventory_item_price"]';

class ProductPage extends Page {
    get appLogo() {
        return $('div[class="app_logo"]');
    }

    get shoppingCartLink() {
        return $('a[class="shopping_cart_link"]');
    }

    get listSortOption() {
        return $('span[class="select_container"]');
    }

    get sortAtoZOption() {
        return $('option[value="az"]');
    }

    get sortZtoAOption() {
        return $('option[value="za"]');
    }

    get sortLowHighOption() {
        return $('option[value="lohi"]');
    }

    get sortHighLowOption() {
        return $('option[value="hilo"]');
    }

    get listProductName() {
        return $$('div[class="inventory_item_name"]');
    }

    get listPrice() {
        return $$('div[class="inventory_item_price"]');
    }

    get listButtonAddToCart() {
        return $$("button=Add to cart");
    }

    get listRemoveButton() {
        return $$("button=Remove");
    }

    get socialTwitterLink() {
        return $('//li[@class="social_twitter"]/a');
    }

    get socialFacebookLink() {
        return $('//li[@class="social_facebook"]/a');
    }

    get socialLinkedinLink() {
        return $('//li[@class="social_linkedin"]/a');
    }

    get footerText() {
        return $('div[class="footer_copy"]');
    }

    async getListProductName() {
        const listResult = await this.listProductName.map(async (element) => {
            const productName = await element.getText();
            return productName;
        });

        return listResult;
    }

    sortNameAscending(listProductName) {
        listProductName.sort((a, b) => {
            return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
        });
    }

    sortNameDescending(listProductName) {
        listProductName.sort((a, b) => {
            return a.toLowerCase() < b.toLowerCase() ? 1 : -1;
        });
    }

    async getListPrice() {
        const listResult = await this.listPrice.map(async (element) => {
            const price = await element.getText();
            return parseFloat(price.replace("$", "").trim());
        });

        return listResult;
    }

    sortPriceLowToHigh(listPrice) {
        listPrice.sort((a, b) => {
            return a - b;
        });
    }

    sortPriceHighToLow(listPrice) {
        listPrice.sort((a, b) => {
            return b - a;
        });
    } 
    
    async getProductNameAndPriceAddingToCart(indexOfAddToCartBtn) {
        return {
            product_name: await this.listButtonAddToCart[indexOfAddToCartBtn]
                .$(productNameLocatorFromAddToCartBtn)
                .getText(),
            product_price: await this.listButtonAddToCart[indexOfAddToCartBtn]
                .$(priceLocatorFromAddToCartBtn)
                .getText(),
        };
    }

    async clickAddToCartButton(indexOfAddToCartBtn) {
        await this.listButtonAddToCart[indexOfAddToCartBtn].click();
    }

    async clickRemoveButton(indexOfRemoveBtn) {
        await this.listRemoveButton[indexOfRemoveBtn].click();
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }

    async clickGoToProductDetailPage(indexOfProduct) {
        await this.listProductName[indexOfProduct].click();

    }
}

export default new ProductPage();
