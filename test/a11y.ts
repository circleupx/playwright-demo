import { Browser, Page } from 'playwright/types/types';
import { chromium } from 'playwright';
import { describe } from 'mocha';
import * as fs from 'fs';
import { AxePlugin, AxeResults } from 'axe-core';
import { expect } from 'chai';

declare global {
    interface Window {
        axe: AxePlugin
    }
}

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
    context('accesibility evaluation', function () {
        it('should pass accessibility test', async () => {
            await page.goto('https://www.google.com');
            const file: string = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
            await page.evaluate((minifiedAxe: string) => window.eval(minifiedAxe), file);
            const evaluationResult: AxeResults = await page.evaluate(() => window.axe.run(window.document))
            expect(evaluationResult.violations).to.be.empty;
        });
    });
});
