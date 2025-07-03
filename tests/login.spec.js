const { test, expect } = require('@playwright/test');

// ✅ VALID LOGIN USING SAVED SESSION
test.describe('Valid Login - GeeksforGeeks', () => {
  test.use({ storageState: 'storageState.json' });

  test('should show My Account or profile section after login', async ({ page }) => {
    await page.goto('https://www.geeksforgeeks.org/');
    await expect(page.locator('text=My Account')).toBeVisible(); // Adjust this based on what you see when logged in
  });
});

// ❌ INVALID LOGIN USING WRONG CREDENTIALS (IF DIRECT FORM EXISTS)
test.describe('Invalid Login - GeeksforGeeks', () => {
  test('should show error on wrong credentials', async ({ page }) => {
    await page.goto('https://www.geeksforgeeks.org/');

    // Click Sign In button
    await page.locator('//button[contains(@class, "gfg_loginModalBtn") and contains(text(), "Sign In")]').click();

    // Try to use email/password if the modal supports it
    await page.waitForSelector('input[placeholder="Email or username"]', { timeout: 5000 });
    await page.locator('input[placeholder="Email or username"]').fill('fakeuser@example.com');
    await page.locator('input[placeholder="Password"]').fill('wrongpassword');

    await page.locator('button:has-text("Login")').click();

    // Expect error message or failure (Adjust selector as needed)
    const errorMsg = page.locator('text=Invalid credentials'); // Update this if different
    await expect(errorMsg).toBeVisible();
  });
});
