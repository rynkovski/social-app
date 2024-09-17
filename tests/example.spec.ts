import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("should have correct metadata and elements", async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle("Social App");

    // Check logo
    await expect(page.getByRole('link', { name: 'logo SocialApp SocialApp' })).toBeVisible();

    // Check hero section
    await expect(page.getByText('Social App')).toBeVisible();

    // Check mode toggle
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();


    // Check sign in button
    await expect(page.getByRole('button', { name: 'Get started!' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();

    //Check patch notes button
    await expect(page.getByRole('link', { name: '🎉 ' })).toBeVisible();
  });

  test("should navigate to sign in page when clicking sign in button", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
  test("should navigate to sign in page when clicking get started button", async ({
    page,
  }) => {
      await page.getByRole('button', { name: 'Get started!' }).click();

    await expect(page).toHaveURL("http://localhost:3000/login");
  });
  test('should change background color', async ({ page }) => {
  await page.getByRole('button', { name: 'Toggle theme' }).click();

  })
});


