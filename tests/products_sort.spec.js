import { test } from "../test-setup/test-setup.js";
import { users, sortOptions } from "../test-data";
import {
	expectSortedAsc,
	expectSortedDesc,
	expectSortedNumericAsc,
	expectSortedNumericDesc,
	expectSameMembers,
} from "../test-utils/sortExpectations.js";

test.describe("Sort Products", () => {
	test.beforeEach(async ({ loginPage }) => {
		await loginPage.open();
		await loginPage.login(users.standard.username, users.standard.password);
	});

	test.describe("Sort correctness", () => {
		test("display products sorted A to Z when selecting 'Name (A to Z)' from sort dropdown", async ({
			productsPage,
		}) => {
			await productsPage.selectSort(sortOptions.nameAsc.value);
			expectSortedAsc(await productsPage.getProductNames());
		});

		test("display products sorted Z to A when selecting 'Name (Z to A)' from sort dropdown", async ({
			productsPage,
		}) => {
			await productsPage.selectSort(sortOptions.nameDesc.value);
			expectSortedDesc(await productsPage.getProductNames());
		});

		test("display products sorted low to high when selecting 'Price (low to high)' from sort dropdown", async ({
			productsPage,
		}) => {
			await productsPage.selectSort(sortOptions.priceAsc.value);
			expectSortedNumericAsc(await productsPage.getProductPrices());
		});

		test("display products sorted high to low when selecting 'Price (high to low)' from sort dropdown", async ({
			productsPage,
		}) => {
			await productsPage.selectSort(sortOptions.priceDesc.value);
			expectSortedNumericDesc(await productsPage.getProductPrices());
		});

		test("display products in correct sort order after multiple changes", async ({
			productsPage,
		}) => {
			await productsPage.selectSort(sortOptions.nameAsc.value);
			expectSortedAsc(await productsPage.getProductNames());

			await productsPage.selectSort(sortOptions.nameDesc.value);
			expectSortedDesc(await productsPage.getProductNames());

			await productsPage.selectSort(sortOptions.priceAsc.value);
			expectSortedNumericAsc(await productsPage.getProductPrices());

			await productsPage.selectSort(sortOptions.priceDesc.value);
			expectSortedNumericDesc(await productsPage.getProductPrices());
		});
	});

	test.describe("State after page actions", () => {
		test("display products sorted A to Z by default after login", async ({ productsPage }) => {
			expectSortedAsc(await productsPage.getProductNames());
		});

		test("reset to default A to Z option after page reload", async ({ productsPage }) => {
			await productsPage.selectSort(sortOptions.nameDesc.value);
			expectSortedDesc(await productsPage.getProductNames());

			await productsPage.page.reload();
			expectSortedAsc(await productsPage.getProductNames());
		});

		test("reset to default A to Z option after navigating away and returning to products page", async ({
			productsPage,
			cartPage,
		}) => {
			await productsPage.selectSort(sortOptions.nameDesc.value);
			expectSortedDesc(await productsPage.getProductNames());

			await cartPage.open();
			await productsPage.open();

			expectSortedAsc(await productsPage.getProductNames());
		});

		test("display correct sort options in GUI after selecting each option", async ({
			productsPage,
		}) => {
			for (const option of Object.values(sortOptions)) {
				await productsPage.selectSort(option.value);
				await productsPage.activeSortOption.expectToHaveText(option.label);
			}
		});

		test("keep same products visible after changing sort option", async ({ productsPage }) => {
			const productNames = await productsPage.getProductNames();

			for (const option of Object.values(sortOptions)) {
				await productsPage.selectSort(option.value);
				expectSameMembers(productNames, await productsPage.getProductNames());
			}
		});
	});
});
