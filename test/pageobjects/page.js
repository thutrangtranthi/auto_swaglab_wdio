"use strict";

export default class Page {
    open(path) {
        browser.maximizeWindow();
        browser.url(path);
    }

    async getUrl() {
        return await browser.getUrl();
    }

    get pageTitle() {
        return $('span[class="title"]');
    }

    async getTextElement(element) {
        return await element.getText();
    }

    async isElementClickable(element) {
        return await element.isClickable();
    }

    async getPlaceholderValue(element) {
        return await element.getAttribute("placeholder");
    }

    compareObjects(firstObject, secondObject) {
        return JSON.stringify(firstObject) === JSON.stringify(secondObject);
    }
}
