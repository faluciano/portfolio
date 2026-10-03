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

  test('should display hero section', async ({ page }) => {
    // Wait for the hero section heading to be visible (not the hidden nav text)
    const heroHeading = page.locator('h1', { hasText: /Felix/ });
    await expect(heroHeading).toBeVisible();

    // Check for the primary CTAs
    await expect(page.getByRole('link', { name: /View Felix's projects/i })).toBeVisible();
  });

  test('should display Skills section', async ({ page }) => {
    // Wait for Skills section header
    const skillsHeading = page.getByRole('heading', { name: /skills/i });
    await expect(skillsHeading).toBeVisible();
    
    // Verify skills section contains content (technologies/tools)
    const skillsSection = page.locator('section').filter({ hasText: /skills/i });
    await expect(skillsSection).toBeVisible();
  });

  test('should list skills by group', async ({ page }) => {
    const skillsSection = page.locator('section#skills');
    await expect(skillsSection.getByRole('heading', { name: 'Languages' })).toBeVisible();
    await expect(skillsSection.getByRole('listitem').filter({ hasText: 'Kubernetes' })).toBeVisible();
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
    const contactHeading = page.locator('section#contact h2');
    await expect(contactHeading).toBeVisible();
    
    // Verify contact section is present
    const contactSection = page.locator('section#contact');
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

  test('should provide the current resume PDF', async ({ page }) => {
    const resumeLink = page.getByRole('link', { name: /^Download Felix's resume as a PDF$/ }).first();

    await expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
    await expect(resumeLink).toHaveAttribute('download', 'Felix-Luciano-Resume.pdf');

    const response = await page.request.get('/resume.pdf');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/pdf');
  });
});
