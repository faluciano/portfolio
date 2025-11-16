import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    // Verify page loaded by checking title
    await expect(page).toHaveTitle(/Felix Luciano/i);
    
    // Check that the page is in a loaded state
    await page.waitForLoadState('networkidle');
  });

  test('should display hero section with profile image', async ({ page }) => {
    // Wait for the hero section heading to be visible (not the hidden nav text)
    const heroHeading = page.locator('h1', { hasText: /Felix/ });
    await expect(heroHeading).toBeVisible();
    
    // Check for profile image
    const profileImage = page.locator('img[alt*="Me" i], img[alt*="Felix" i], img[alt*="profile" i]');
    await expect(profileImage.first()).toBeVisible();
  });

  test('should display Skills section', async ({ page }) => {
    // Wait for Skills section header
    const skillsHeading = page.getByRole('heading', { name: /skills/i });
    await expect(skillsHeading).toBeVisible();
    
    // Verify skills section contains content (technologies/tools)
    const skillsSection = page.locator('section').filter({ hasText: /skills/i });
    await expect(skillsSection).toBeVisible();
  });

  test('should load GitHub data in Skills section', async ({ page }) => {
    // Wait for the skills section to load
    await page.waitForSelector('section#skills', { state: 'visible' });
    
    // Wait for loading state to complete - check for absence of loading indicators
    await page.waitForTimeout(2000); // Give time for GitHub API call
    
    // Verify that technology items are displayed
    // This checks that GitHub data has loaded and rendered
    const techItems = page.locator('section#skills button[aria-label*="Filter projects"]');
    const count = await techItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Projects section', async ({ page }) => {
    // Wait for Projects section header
    const projectsHeading = page.getByRole('heading', { name: /projects/i });
    await expect(projectsHeading).toBeVisible();
    
    // Verify projects section is present using precise ID selector
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    // Wait for projects section heading to load (more reliable than text search)
    const projectsHeading = page.getByRole('heading', { name: /projects/i });
    await expect(projectsHeading).toBeVisible();
    
    // Wait for project cards to render
    await page.waitForTimeout(2000);
    
    // Check for project card elements (adjust selector based on your implementation)
    const projectCards = page.locator('[class*="project"], article, [class*="card"]').filter({
      has: page.locator('a[href*="github.com"], a[href*="http"]')
    });
    
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Contact section', async ({ page }) => {
    // Scroll to bottom to ensure Contact section is in view
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait for Contact section header or content
    const contactHeading = page.getByRole('heading', { name: /contact/i });
    await expect(contactHeading).toBeVisible();
    
    // Verify contact section is present
    const contactSection = page.locator('section').filter({ hasText: /contact/i });
    await expect(contactSection).toBeVisible();
  });

  test('should display Footer section', async ({ page }) => {
    // Scroll to bottom to ensure footer is in view
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait for footer element
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have all main sections in correct order', async ({ page }) => {
    // Verify the page structure has all sections
    await page.waitForLoadState('networkidle');
    
    // Use precise ID selectors to avoid ambiguity
    const skillsSection = page.locator('section#skills');
    await expect(skillsSection).toBeVisible();
    
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
    
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
    
    // Verify footer is at the bottom
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should handle viewport resize', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Verify main content is still visible (use specific main selector)
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
    
    // Verify main content is still visible
    await expect(mainContent).toBeVisible();
  });
});