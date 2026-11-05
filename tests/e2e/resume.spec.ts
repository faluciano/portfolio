import { test, expect } from '@playwright/test';

test.describe('Resume page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume');
  });

  test('should render the resume sections', async ({ page }) => {
    await expect(page).toHaveTitle(/^Resume \| Felix Luciano$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Felix Luciano' })).toBeVisible();

    for (const section of ['Experience', 'Projects', 'Skills', 'Education']) {
      await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible();
    }

    await expect(page.getByText(/3\.5 billion protection samples daily/).first()).toBeVisible();
  });

  test('should offer PDF download and print', async ({ page }) => {
    const download = page.getByRole('link', { name: /^Download Felix's resume as a PDF$/ });
    await expect(download).toHaveAttribute('href', '/resume.pdf');
    await expect(page.getByRole('button', { name: 'Print' })).toBeVisible();
  });

  test('should mark Resume as the current nav item', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop nav only');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: 'Resume' })).toHaveAttribute('aria-current', 'page');
  });

  test('should be reachable from the homepage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /View full resume/ }).click();
    await expect(page).toHaveURL(/\/resume$/);
  });
});
