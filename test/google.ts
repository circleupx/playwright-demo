import { Browser, Page } from 'playwright/types/types';
import { expect } from 'chai';
import { chromium } from 'playwright';
import { describe } from 'mocha';

let browser: Browser;
before(async () => {
    browser = await chromium.launch();
});

after(async () => {
    await browser.close();
});

let page: Page;
beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(async () => {
    await page.close();
});

describe('loading google.com successfully', function () {
    context('page title', function () {
        it('Should be equal to Google', async () => {
            await page.goto('https://www.google.com');
            const pageTitle = await page.title();
            expect(pageTitle).to.equal('Google')
        });
    });
});

describe('loading google.com successfully', function () {
    context('response status code', function () {
        it('Should be 200 OK', async () => {
            const response = await page.goto('https://www.google.com');
            expect(response?.status()).to.equal(200);
        });
    });
});