import { test, expect } from '@playwright/test';

const url = 'http://localhost:3000';
const editUrl = 'http://localhost:3000/images/0/edit';

test.describe('Editor page', () => {
	test('Should goto editor page', async ({ page }) => {
		await page.goto(editUrl);
		await expect(page.getByRole('img', { name: /edit/i })).toBeVisible();
	});

	test('Back button goes to previous page', async ({ page }) => {
		await page.goto(url);
		const item = await page.locator("a[href^='/images/']").first();
		await item.click();
		const backButton = await page.getByRole('button', { name: /back/i });
		await backButton.click();
		await expect(page).toHaveURL(`${url}/images?page=1`);
	});

	test('User can change the image width and height', async ({ page }) => {
		await page.goto(editUrl);
		await page.getByLabel('Width').fill('300');
		await page.getByLabel('Height').fill('200');		
		await page.waitForTimeout(2000);
		const img = await page.getByRole('img', { name: /edit/i });
		const boundingBox = await img.boundingBox();
		expect(boundingBox).not.toBeNull();
		expect(boundingBox?.width).toBeCloseTo(300);
		expect(boundingBox?.height).toBeCloseTo(200);
	});

	test('User can change the greyscale value', async ({ page }) => {
		await page.goto(editUrl);
		await page.getByRole('checkbox', { name: /greyscale/i }).check();
		await page.waitForTimeout(2000);
		const img = await page.getByRole('img', { name: /edit/i });
		const src = await img.getAttribute('src');
		expect(src).toContain('blob');
	});

	test('User can change the blur value', async ({ page }) => {
		await page.goto(editUrl);
		await page.getByRole('slider', { name: /blur/i }).fill('10');
		await page.waitForTimeout(2000);
		const img = await page.getByRole('img', { name: /edit/i });
		const src = await img.getAttribute('src');
		expect(src).toContain('blob');
	});

	test('Clicking on the download button saves the image', async ({ page }) => {
		await page.goto(editUrl);
		const [download] = await Promise.all([
			page.waitForEvent('download'),
			page.getByRole('button', { name: /download/i }).click(),
		]);

		expect(download.suggestedFilename()).toBe('alejandro-escamilla-0.jpg');
	});
});
