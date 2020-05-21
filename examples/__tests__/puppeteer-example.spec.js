/*
 * Copyright (c) 2018 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

// eslint is looking for `puppeteer` at root level package.json
// eslint-disable-next-line import/no-unresolved
const puppeteer = require('puppeteer');
const path = require('path');

const screenshotsPath = path.resolve(__dirname, '.');

describe('jest-image-snapshot usage with an image received from puppeteer', () => {
  let browser;

  beforeAll(async () => {
    const args = ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized', '--lang=he-IL', '--font-render-hinting=medium'];
    browser = await puppeteer.launch({ headless: true, args });
  });

  it('works', async () => {
    const page = await browser.newPage();
    await page.goto('http://nothing.com');
    const image = await page.screenshot({ path: `${screenshotsPath}/test.png` });

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
