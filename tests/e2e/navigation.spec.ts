import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display navigation menu', async ({ page }) => {
    // Check for navigation element
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
  });

  test('should have theme toggle button', async ({ page }) => {
    // Look for visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page.locator(
      'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible, button:has-text("theme"):visible'
    );
    
    await expect(themeToggle.first()).toBeVisible();
  });

  test('should toggle theme on button click', async ({ page }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page.locator(
      'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible'
    ).first();
    
    await expect(themeToggle).toBeVisible();
    
    // Get initial theme state from HTML element
    const initialTheme = await page.locator('html').getAttribute('class');
    
    // Click the toggle button
    await themeToggle.click();
    
    // Wait for theme change to apply
    await page.waitForTimeout(300);
    
    // Get new theme state
    const newTheme = await page.locator('html').getAttribute('class');
    
    // Verify theme changed (either 'dark' was added/removed)
    expect(initialTheme).not.toBe(newTheme);
  });

  test('should have navigation links', async ({ page }) => {
    // Check for navigation links - typically in the nav element
    const nav = page.locator('nav, [role="navigation"]').first();
    
    // Look for links within navigation
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    
    // Should have at least one navigation link
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should scroll to sections when navigation links are clicked', async ({ page }) => {
    // Find navigation links (skip the hidden skip-link by using nav context)
    const navLinks = page.locator('nav a[href^="#"]');
    const count = await navLinks.count();
    
    if (count > 0) {
      // Get the first visible navigation link
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute('href');
      
      // Click the link
      await firstLink.click();
      
      // Wait for potential smooth scroll animation
      await page.waitForTimeout(500);
      
      // If href exists, verify the target section is in viewport
      if (href && href !== '#' && href !== '#main-content') {
        const targetId = href.substring(1);
        const targetSection = page.locator(`#${targetId}, [id="${targetId}"]`);
        
        // Check if target section exists
        const sectionExists = await targetSection.count() > 0;
        
        if (sectionExists) {
          // Verify section is visible after click
          await expect(targetSection).toBeInViewport();
        }
      }
    }
  });

  test('should maintain navigation visibility on scroll', async ({ page }) => {
    const nav = page.locator('nav, [role="navigation"]').first();
    
    // Verify nav is visible initially
    await expect(nav).toBeVisible();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    
    // Nav should still be visible (either sticky or still in view)
    await expect(nav).toBeVisible();
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    
    // Nav should still be visible
    await expect(nav).toBeVisible();
  });

  test('should display logo or brand name', async ({ page }) => {
    // Look for logo image or brand text in navigation
    const nav = page.locator('nav, [role="navigation"]').first();
    
    // Check for logo image or brand text
    const logo = nav.locator('img, svg, [class*="logo"]');
    const brandText = nav.locator('text=/Felix Luciano/i, text=/portfolio/i');
    
    const hasLogo = await logo.count() > 0;
    const hasBrandText = await brandText.count() > 0;
    
    // Should have either a logo or brand text
    expect(hasLogo || hasBrandText).toBeTruthy();
  });

  test('should have proper navigation structure for mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Navigation should still be present
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
    
    // Check if there's a mobile menu button (hamburger)
    const mobileMenuButton = page.locator(
      'button[aria-label*="menu" i], button[aria-label*="navigation" i], button:has-text("☰"), [class*="hamburger"]'
    );
    
    const hasMobileMenu = await mobileMenuButton.count() > 0;
    
    if (hasMobileMenu) {
      // Click mobile menu button
      await mobileMenuButton.first().click();
      await page.waitForTimeout(300);
      
      // Verify menu is expanded/visible
      const menuPanel = page.locator('[role="dialog"], [class*="mobile-menu"], [class*="nav-menu"][class*="open"]');
      
      if (await menuPanel.count() > 0) {
        await expect(menuPanel.first()).toBeVisible();
      }
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    
    // Check that an element is focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Tab a few more times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should still have a focused element
    await expect(focusedElement).toBeVisible();
  });

  test('should have all navigation links functional', async ({ page }) => {
    // Get all links in navigation
    const nav = page.locator('nav, [role="navigation"]').first();
    const links = nav.locator('a[href]');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      // Verify each link has a valid href
      expect(href).toBeTruthy();
      
      // Verify external links have proper attributes
      if (href?.startsWith('http')) {
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        // External links should open in new tab and have proper rel
        expect(target).toBe('_blank');
        expect(rel).toContain('noopener');
      }
    }
  });
});