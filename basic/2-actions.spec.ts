import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
});

/**
 * Locators are used to represent a selector on a page and re-use them. They have
 * strictMode enabled by default. This option will throw an error if the selector
 * will resolve to multiple elements.
 * In this example we create a todo item, assert that it exists and then filter
 * by the completed items to ensure that the item is not visible anymore.
 * @see https://playwright.dev/docs/api/class-locator
 */
test('basic interaction', async ({page}) => {
  const inputBox = page.locator('input.new-todo');
  const todoList = page.locator('.todo-list');

  await inputBox.fill('Learn Playwright');
  await inputBox.press('Enter');
  await expect(todoList).toHaveText('Learn Playwright');
  await page.locator('.filters >> text=Completed').click();
  await expect(todoList).not.toHaveText('Learn Playwright');
});

/**
 * Playwright supports different selector engines which you can combine with '>>'.
 * @see https://playwright.dev/docs/selectors
 */
test('element selectors', async ({page}) => {
  // When no selector engine is specified, Playwright will use the css selector engine.
  await page.locator('.header input').fill('Learn Playwright');
  // So the selector above is the same as the following:
  await page.locator('css=.header input').press('Enter');

  // select by text with the text selector engine:
  await page.getByRole('link', { name: 'All' }).click();

  await page.locator('.todo-list > li').filter({ hasText: 'Playwright'}).click();
  await page.locator('.todoapp .footer', { hasText: 'Completed'}).click();

  // Selecting based on layout, with css selector
  expect(await page.innerText('a:right-of(:text("Active"))')).toBe('Completed');

  // Only visible elements, with css selector
  await page.getByText('Completed', { exact: true }).click();

  // XPath selector
  await page.getByTestId('text-input').click();
});
