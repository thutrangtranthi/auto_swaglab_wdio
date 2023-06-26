import Page from "./page.js";

class CheckoutCompletePage extends Page {
    get completeHeader() {
        return $('h2[class="complete-header"]');
    }

    get completeText() {
        return $('div[class="complete-text"]');
    }

    get backToProductPageBtn() {
        return $('button[data-test="back-to-products"]');
    }
}

export default new CheckoutCompletePage();
