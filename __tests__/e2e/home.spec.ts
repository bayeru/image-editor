import { test, expect } from '@playwright/test';

const url = 'http://localhost:3000';

test.describe('Home page', () => {

	test('Open homepage and check title', async ({ page }) => {
		await page.goto(url);
		await expect(page).toHaveTitle(/imaged/i);
	});

	test('Verify visiting the main url redirects to images?page=1', async ({ page }) => {
		await page.goto(url);
		await expect(page).toHaveURL(`${url}/images?page=1`);
	});

	test('Homepage has 30 images', async ({ page }) => {
		await page.goto(url);
		await expect(page.locator("a[href^='/images/']")).toHaveCount(30);
	});
	
	test('Image item includes authors name', async ({ page }) => {
		await page.goto(url);
		await expect(page.getByRole('link', {name: /alejandro/i }).first()).toBeVisible();
	});

	test('Pagination is present', async ({ page }) => {
		await page.goto(url);
		await expect(page.getByRole('navigation')).toBeVisible();
	});

	test('Clicking on the image should open the edit page', async ({ page }) => {
		await page.goto(url);
		const item = await page.locator("a[href^='/images/']").first();
		await item.click();
		await expect(page).toHaveURL(/edit/i);
	});

	test('Clicking a page number should change the page', async ({ page }) => {
		await page.goto(url);
		const item = await page.getByLabel('Go to page 2');
		await item.click();
		await expect(page).toHaveURL(`${url}/images?page=2`);
	});

	test('App remembers the last page visited', async ({ page }) => {
		await page.goto(url);
		const item = await page.getByLabel('Go to page 2');
		await item.click();
		await expect(page).toHaveURL(`${url}/images?page=2`);
		await page.goBack();
		await expect(page).toHaveURL(`${url}/images?page=1`);
	});

});