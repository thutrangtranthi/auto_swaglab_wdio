import Page from "./page.js";

class CheckoutStepOnePage extends Page {
    get firstNameInput() {
        return $('input[data-test="firstName"]');
    }

    get lastNameInput() {
        return $('input[data-test="lastName"]');
    }

    get postalCodeInput() {
        return $('input[data-test="postalCode"]');
    }

    get cancelCheckoutBtn() {
        return $('button[data-test="cancel"]');
    }

    get continueBtn() {
        return $('input[data-test="continue"]');
    }

    get errorMessage() {
        return $('h3[data-test="error"]');
    }

    async enterBuyerInfo(firstName, lastName, postalCode) {
        if (firstName !== "") {
            await this.firstNameInput.setValue(firstName);
        }

        if (lastName !== "") {
            await this.lastNameInput.setValue(lastName);
        }

        if (postalCode !== "") {
            await this.postalCodeInput.setValue(postalCode);
        }
    }
}

export default new CheckoutStepOnePage();
