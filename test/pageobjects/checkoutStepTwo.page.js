import Page from "./page.js";

class CheckoutStepTwoPage extends Page {
    get listProductPrice() {
        return $$('div[class="inventory_item_price"]');
    }

    get itemPriceTotal() {
        return $('div[class="summary_subtotal_label"]');
    }

    get taxLabel() {
        return $('div[class="summary_tax_label"]');
    }

    get totalPayment() {
        return $('div[class="summary_info_label summary_total_label"]');
    }

    get finishBtn() {
        return $('button[data-test="finish"]');
    }

    get cancelBtn() {
        return $('button[data-test="cancel"]');
    }

    async canculateTotalPriceFromListProduct() {
        let totalPrice = 0.0;
        await this.listProductPrice.map(async (element) => {
            const price = await element.getText();
            totalPrice += parseFloat(price.replace("$", "").trim());
        });

        return totalPrice;
    }

    async getItemPriceTotal() {
        const priceTotal = await this.itemPriceTotal.getText();
        return parseFloat(priceTotal.substring(priceTotal.indexOf("$") + 1));
    }

    async getTax() {
        const tax = await this.taxLabel.getText();
        return parseFloat(tax.substring(tax.indexOf("$") + 1));
    }

    async getSummaryTotalPrice() {
        const summaryTotalPrice = await this.totalPayment.getText();
        return parseFloat(
            summaryTotalPrice.substring(summaryTotalPrice.indexOf("$") + 1)
        );
    }
}

export default new CheckoutStepTwoPage();
