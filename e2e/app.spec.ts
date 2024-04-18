import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { CONFIG } from "../src/common/constants";
import assert from "assert";

const { testData } = CONFIG;

test("has title", async ({ page }) => {
	await page.goto("localhost:3000");
	await expect(page).toHaveTitle(CONFIG.appName);
});

const testSearchForCity = async (page: Page): Promise<void> => {
	await page.goto("localhost:3000");
	await page.fill(`input[id="${CONFIG.searchInputId}"]`, testData.city);
	await page.click(
		`.ant-select-item-option-content:has-text("${testData.city}")`
	);
	// Can't use `await page.keyboard.press("Enter")` as its not working for webkit safari

	await page.waitForSelector(".ant-modal-body .ant-card-head-title");
	await expect(
		page.locator(".ant-modal-body .ant-card-head-title")
	).toContainText(testData.city);
};

test("search for city", async ({ page }) => {
	await testSearchForCity(page);
});

test("validate weather data", async ({ page }) => {
	await testSearchForCity(page);
	const items = page.locator(".ant-modal-body .ant-descriptions-item-content");
	await expect(items).toHaveCount(11);

	// check if all values are not empty
	const values = await items.allInnerTexts();
	values.forEach((val) => {
		assert.notStrictEqual(val, "");
	});
});

test("add city to favorites", async ({ page }) => {
	await testSearchForCity(page);
	await page.click(`button > span:has-text("${CONFIG.addToFavorites}")`);
	await page.waitForSelector(".ant-layout-content .ant-card-head-title");
	await expect(
		page.locator(".ant-layout-content .ant-card-head-title")
	).toContainText(testData.city);
});
