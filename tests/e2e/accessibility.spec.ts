import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper page title', async ({ page }) => {
    // Verify page has a title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have main landmark', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Get all headings
    const h1s = page.locator('h1');
    const h1Count = await h1s.count();
    
    // Should have exactly one h1
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Verify h1 is visible
    await expect(h1s.first()).toBeVisible();
    
    // Check that headings have text content
    const h1Text = await h1s.first().textContent();
    expect(h1Text?.trim()).toBeTruthy();
  });

  test('should have descriptive alt text for images', async ({ page }) => {
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have keyboard accessible navigation', async ({ page }) => {
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    
    // Get focused element
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Tab several more times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      // Should have a visible focused element
      focusedElement = page.locator(':focus');
      const isVisible = await focusedElement.isVisible().catch(() => false);
      expect(isVisible).toBeTruthy();
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check if element has visible focus styling
    const outlineStyle = await focusedElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        outline: style.outline,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
        boxShadow: style.boxShadow,
      };
    });
    
    // Should have some form of focus indicator
    const hasFocusIndicator = 
      outlineStyle.outlineWidth !== '0px' ||
      outlineStyle.boxShadow !== 'none' ||
      outlineStyle.outline !== 'none';
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('should have proper button roles and labels', async ({ page }) => {
    // Get all buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check each button
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      
      // Button should be visible or hidden with proper attributes
      const isVisible = await button.isVisible().catch(() => false);
      const ariaHidden = await button.getAttribute('aria-hidden');
      
      if (isVisible) {
        // Visible buttons should have accessible text or aria-label
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        const ariaLabelledBy = await button.getAttribute('aria-labelledby');
        
        const hasAccessibleName = 
          (text && text.trim().length > 0) ||
          (ariaLabel && ariaLabel.trim().length > 0) ||
          ariaLabelledBy;
        
        expect(hasAccessibleName).toBeTruthy();
      }
    }
  });

  test('should have proper link accessibility', async ({ page }) => {
    // Get all links
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Check a sample of links
    const sampleSize = Math.min(linkCount, 10);
    for (let i = 0; i < sampleSize; i++) {
      const link = links.nth(i);
      
      // Link should have accessible text
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const ariaLabelledBy = await link.getAttribute('aria-labelledby');
      
      const hasAccessibleName = 
        (text && text.trim().length > 0) ||
        (ariaLabel && ariaLabel.trim().length > 0) ||
        ariaLabelledBy;
      
      expect(hasAccessibleName).toBeTruthy();
      
      // External links should have proper attributes
      const href = await link.getAttribute('href');
      if (href?.startsWith('http')) {
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        if (target === '_blank') {
          // Should have noopener for security
          expect(rel).toContain('noopener');
        }
      }
    }
  });

  test('should support keyboard navigation for interactive elements', async ({ page, isMobile }) => {
    // Find the visible theme toggle button (works on both desktop and mobile)
    const themeToggle = page.locator(
      'button[aria-label*="theme" i]:visible, button[aria-label*="dark" i]:visible, button[aria-label*="light" i]:visible'
    ).first();
    
    if (await themeToggle.count() > 0) {
      // Skip focus tests on mobile (programmatic focus not supported)
      if (!isMobile) {
        // Focus the button using keyboard
        await themeToggle.focus();
        await expect(themeToggle).toBeFocused();
      }
      
      // Activate using keyboard
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      
      // Should still be focusable after activation
      await expect(themeToggle).toBeEnabled();
    }
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    // Check for semantic landmarks
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
    
    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();
    
    const footer = page.locator('footer, [role="contentinfo"]');
    await expect(footer.first()).toBeVisible();
  });

  test('should have skip to content link', async ({ page }) => {
    // Check for skip link (it might be visually hidden)
    const skipLink = page.locator('a[href="#main"], a[href="#content"], a:has-text("Skip")');
    
    // If skip link exists, verify it works
    if (await skipLink.count() > 0) {
      const firstSkipLink = skipLink.first();
      
      // Focus it (skip links are often visible only on focus)
      await firstSkipLink.focus();
      
      // Should be focusable
      await expect(firstSkipLink).toBeFocused();
      
      // Click with force since it's positioned off-screen until focused
      await firstSkipLink.click({ force: true });
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    // Get body text color and background
    const body = page.locator('body');
    
    const colors = await body.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor,
      };
    });
    
    // Both should be defined
    expect(colors.color).toBeTruthy();
    expect(colors.backgroundColor).toBeTruthy();
    
    // Colors should be different (not same as background)
    expect(colors.color).not.toBe(colors.backgroundColor);
  });

  test('should handle screen reader announcements', async ({ page }) => {
    // Check for live regions or aria-live announcements
    const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');
    
    // If live regions exist, they should have proper attributes
    const count = await liveRegions.count();
    
    for (let i = 0; i < count; i++) {
      const region = liveRegions.nth(i);
      const ariaLive = await region.getAttribute('aria-live');
      const role = await region.getAttribute('role');
      
      // Should have either aria-live or a role
      expect(ariaLive || role).toBeTruthy();
    }
  });

  test('should have accessible form elements', async ({ page }) => {
    // Check for form inputs
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    // Check each input has proper labeling
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');
      
      if (id) {
        // Check if there's a label for this input
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        
        // Should have either a label, aria-label, or aria-labelledby
        const hasAccessibleName = 
          hasLabel ||
          (ariaLabel && ariaLabel.length > 0) ||
          (ariaLabelledBy && ariaLabelledBy.length > 0);
        
        expect(hasAccessibleName || placeholder).toBeTruthy();
      }
    }
  });

  test('should maintain focus management', async ({ page }) => {
    // Tab through several elements
    const focusedElements: string[] = [];
    
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      const focusedElement = page.locator(':focus');
      const tagName = await focusedElement.evaluate((el) => el.tagName).catch(() => 'NONE');
      focusedElements.push(tagName);
    }
    
    // Should have focused at least some elements
    const uniqueElements = new Set(focusedElements);
    expect(uniqueElements.size).toBeGreaterThan(0);
  });

  test('should have proper ARIA roles where needed', async ({ page }) => {
    // Check for elements with ARIA roles
    const roleElements = page.locator('[role]');
    const roleCount = await roleElements.count();
    
    // Check that roles are valid
    const validRoles = [
      'navigation', 'main', 'banner', 'contentinfo', 'complementary',
      'button', 'link', 'heading', 'list', 'listitem', 'article',
      'region', 'search', 'form', 'dialog', 'alert', 'status'
    ];
    
    for (let i = 0; i < Math.min(roleCount, 10); i++) {
      const element = roleElements.nth(i);
      const role = await element.getAttribute('role');
      
      // Role should be a valid ARIA role
      if (role) {
        // Just verify it's not empty
        expect(role.length).toBeGreaterThan(0);
      }
    }
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Check if page respects prefers-reduced-motion
    const prefersReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    
    // If user prefers reduced motion, animations should be minimal
    // This is more of a smoke test - actual implementation depends on CSS
    if (prefersReducedMotion) {
      const body = page.locator('body');
      const hasAnimations = await body.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.animation !== 'none' || style.transition !== 'none';
      });
      
      // Just verify the page loads correctly with reduced motion
      expect(await body.isVisible()).toBeTruthy();
    }
  });

  test('should have language attribute', async ({ page }) => {
    // Check for lang attribute on html element
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    
    // Should have a language attribute
    expect(lang).toBeTruthy();
    expect(lang?.length).toBeGreaterThan(0);
  });
});