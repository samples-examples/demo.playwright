import {test, expect} from '@playwright/test';

const fileToUpload = __dirname + '/upload.txt'; // '__filename' is the current test file.

/**
 * In this test we wait for an file chooser to appear while we click on an
 * input. Once the event was emitted we set the file and submit the form.
 * @see https://playwright.dev/docs/api/class-filechooser
 */
test('should be able to upload files', async ({page, context}) => {
  await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click('input[type=file]'),
  ]);
  await fileChooser.setFiles(fileToUpload);
  await page.locator('input[type=submit]').click();
  await expect(page.getByText('Uploaded', { exact: true })).toBeVisible();
});

/*
// Start waiting for download before clicking. Note no await.
const downloadPromise = page.waitForEvent('download');
await page.getByText('Download file').click();
const download = await downloadPromise;

// Wait for the download process to complete and save the downloaded file somewhere.
await download.saveAs('/path/to/save/at/' + download.suggestedFilename());
*/
