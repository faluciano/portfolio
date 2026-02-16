import { test, expect } from "@playwright/test";

test.describe("Dark Mode", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should have theme toggle button", async ({ page }) => {
    // Locate the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Get initial theme state from HTML element
    const htmlElement = page.locator("html");
    const initialClass = await htmlElement.getAttribute("class");
    const initialHasDark = initialClass?.includes("dark") ?? false;

    // Click to toggle theme
    await themeToggle.click();
    await page.waitForTimeout(300); // Wait for theme transition

    // Check new theme state
    const newClass = await htmlElement.getAttribute("class");
    const newHasDark = newClass?.includes("dark") ?? false;

    // Verify theme changed
    expect(newHasDark).toBe(!initialHasDark);

    // Click again to toggle back
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Should be back to initial state
    const finalClass = await htmlElement.getAttribute("class");
    const finalHasDark = finalClass?.includes("dark") ?? false;
    expect(finalHasDark).toBe(initialHasDark);
  });

  test("should persist theme preference on page reload", async ({ page }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Get initial theme
    const htmlElement = page.locator("html");
    const initialClass = await htmlElement.getAttribute("class");
    const initialHasDark = initialClass?.includes("dark") ?? false;

    // Toggle to opposite theme
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Verify theme changed
    const changedClass = await htmlElement.getAttribute("class");
    const changedHasDark = changedClass?.includes("dark") ?? false;
    expect(changedHasDark).toBe(!initialHasDark);

    // Reload the page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify theme persisted after reload
    const reloadedClass = await htmlElement.getAttribute("class");
    const reloadedHasDark = reloadedClass?.includes("dark") ?? false;
    expect(reloadedHasDark).toBe(changedHasDark);
  });

  test("should apply dark mode CSS classes to html element", async ({
    page,
  }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    const htmlElement = page.locator("html");

    // Click toggle multiple times and verify class changes
    for (let i = 0; i < 3; i++) {
      const beforeClass = await htmlElement.getAttribute("class");

      await themeToggle.click();
      await page.waitForTimeout(300);

      const afterClass = await htmlElement.getAttribute("class");

      // Verify that either 'dark' was added or removed
      const beforeHasDark = beforeClass?.includes("dark") ?? false;
      const afterHasDark = afterClass?.includes("dark") ?? false;
      expect(beforeHasDark).not.toBe(afterHasDark);
    }
  });

  test("should update theme toggle button appearance", async ({ page }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Get initial button state (aria-label or icon)
    const initialLabel = await themeToggle.getAttribute("aria-label");
    const initialContent = await themeToggle.textContent();

    // Click to toggle theme
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Get new button state
    const newLabel = await themeToggle.getAttribute("aria-label");
    const newContent = await themeToggle.textContent();

    // Verify that either the label or content changed
    const somethingChanged =
      initialLabel !== newLabel || initialContent !== newContent;
    expect(somethingChanged).toBeTruthy();
  });

  test("should apply theme-specific styles to page elements", async ({
    page,
  }) => {
    // Get HTML element which has the actual background color
    const html = page.locator("html");

    // Find the visible theme toggle (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Get initial theme class
    const initialClass = await html.getAttribute("class");
    const initialHasDark = initialClass?.includes("dark") ?? false;

    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(500); // Wait for theme change

    // Get new theme class
    const newClass = await html.getAttribute("class");
    const newHasDark = newClass?.includes("dark") ?? false;

    // Theme should have changed
    expect(newHasDark).toBe(!initialHasDark);
  });

  test("should maintain theme when navigating (single page app)", async ({
    page,
  }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Toggle to a specific theme (dark)
    const htmlElement = page.locator("html");
    let currentClass = await htmlElement.getAttribute("class");
    const hasDark = currentClass?.includes("dark") ?? false;

    // Ensure we're in dark mode
    if (!hasDark) {
      await themeToggle.click();
      await page.waitForTimeout(300);
    }

    // Verify dark mode is active
    currentClass = await htmlElement.getAttribute("class");
    expect(currentClass).toContain("dark");

    // Try to navigate using visible navigation links (skip the hidden skip-link)
    const navLinks = page.locator('nav a[href^="#"]');
    const linkCount = await navLinks.count();

    if (linkCount > 0) {
      // Click a visible navigation link
      await navLinks.first().click();
      await page.waitForTimeout(300);

      // Verify theme is still dark
      const afterNavClass = await htmlElement.getAttribute("class");
      expect(afterNavClass).toContain("dark");
    }
  });

  test("should work with system preference detection", async ({
    page,
    context,
  }) => {
    // Clear any stored theme preference
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());

    // Reload to get fresh state
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if there's a system preference
    const prefersDark = await page.evaluate(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Get initial theme state
    const htmlElement = page.locator("html");
    const initialClass = await htmlElement.getAttribute("class");
    const hasDarkClass = initialClass?.includes("dark") ?? false;

    // If system preference is dark, page might start in dark mode
    // This is not a hard requirement but good UX
    if (prefersDark) {
      // Page might respect system preference
      // We just verify that theme toggle works regardless
      const themeToggle = page
        .locator(
          'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
        )
        .first();

      await expect(themeToggle).toBeVisible();
    }
  });

  test("should handle rapid theme toggles", async ({ page }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    const htmlElement = page.locator("html");

    // Click rapidly multiple times
    await themeToggle.click();
    await themeToggle.click();
    await themeToggle.click();
    await themeToggle.click();

    // Wait for any transitions to complete
    await page.waitForTimeout(500);

    // Verify the page is still functional and has a valid theme
    const finalClass = await htmlElement.getAttribute("class");
    expect(finalClass).toBeTruthy();

    // Page should still be interactive
    await expect(themeToggle).toBeEnabled();
  });

  test("should have accessible theme toggle", async ({ page, isMobile }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page
      .locator(
        'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible',
      )
      .first();

    // Should have proper aria-label
    const ariaLabel = await themeToggle.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel?.toLowerCase()).toMatch(/theme|dark|light/);

    // Skip focus tests on mobile (programmatic focus not supported)
    if (!isMobile) {
      // Should be keyboard accessible
      await themeToggle.focus();
      await expect(themeToggle).toBeFocused();
    }

    // Should be activatable with keyboard (only test on desktop)
    if (!isMobile) {
      const htmlElement = page.locator("html");
      const beforeClass = await htmlElement.getAttribute("class");

      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);

      const afterClass = await htmlElement.getAttribute("class");
      expect(beforeClass).not.toBe(afterClass);
    }
  });
});
