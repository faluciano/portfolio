# E2E Testing Documentation

This directory contains end-to-end (E2E) tests for the portfolio website using [Playwright](https://playwright.dev/).

## Overview

The test suite covers critical user flows and functionality including:
- Homepage rendering and content loading
- Navigation and user interactions
- Dark mode theme switching
- Accessibility compliance

## Test Structure

```
tests/
└── e2e/
    ├── homepage.spec.ts      # Homepage content and rendering tests
    ├── navigation.spec.ts    # Navigation menu and links tests
    ├── dark-mode.spec.ts     # Theme toggle functionality tests
    └── accessibility.spec.ts # Accessibility and ARIA compliance tests
```

## Running Tests

### Prerequisites
- Ensure all dependencies are installed: `bun install`
- Playwright browsers are automatically installed during setup

### Run All Tests
```bash
bun run test:e2e
```

### Run Tests with UI Mode (Recommended for Development)
```bash
bun run test:e2e:ui
```
This opens Playwright's interactive UI where you can:
- See tests run in real-time
- Inspect each step
- Time-travel through test execution
- Debug failures easily

### Run Tests in Headed Mode (See Browser)
```bash
bun run test:e2e:headed
```

### Debug a Specific Test
```bash
bun run test:e2e:debug
```
This opens Playwright Inspector for step-by-step debugging.

### Run Specific Test File
```bash
bun run test:e2e tests/e2e/homepage.spec.ts
```

### Run Tests in Specific Browser
```bash
bun run test:e2e --project=chromium
bun run test:e2e --project=firefox
bun run test:e2e --project=webkit
```

### Run Tests in Mobile Viewports
```bash
bun run test:e2e --project="Mobile Chrome"
bun run test:e2e --project="Mobile Safari"
```

## Test Coverage

### Homepage Tests ([`homepage.spec.ts`](e2e/homepage.spec.ts))
- ✅ Page loads successfully
- ✅ Hero section with profile image displays
- ✅ Skills section renders with GitHub data
- ✅ Projects section shows project cards
- ✅ Contact section is present
- ✅ Footer displays correctly
- ✅ Responsive design on different viewports

### Navigation Tests ([`navigation.spec.ts`](e2e/navigation.spec.ts))
- ✅ Navigation menu is visible
- ✅ Theme toggle button exists and works
- ✅ Smooth scrolling to sections
- ✅ Navigation links are functional
- ✅ Keyboard navigation support
- ✅ Mobile menu functionality
- ✅ External links have proper attributes

### Dark Mode Tests ([`dark-mode.spec.ts`](e2e/dark-mode.spec.ts))
- ✅ Theme toggle switches between light/dark
- ✅ Theme preference persists on reload
- ✅ Proper CSS classes applied on theme change
- ✅ Theme-specific styles render correctly
- ✅ Rapid toggles handled gracefully
- ✅ Accessible theme toggle

### Accessibility Tests ([`accessibility.spec.ts`](e2e/accessibility.spec.ts))
- ✅ Proper page title exists
- ✅ Main landmark is present
- ✅ Heading hierarchy is correct
- ✅ Images have alt text
- ✅ Keyboard navigation works
- ✅ Focus indicators are visible
- ✅ Buttons have proper labels
- ✅ Links are accessible
- ✅ Semantic HTML structure
- ✅ ARIA attributes used correctly
- ✅ Color contrast is sufficient
- ✅ Language attribute is set

## Configuration

Tests are configured in [`playwright.config.ts`](../playwright.config.ts) with:
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Devices**: Pixel 5, iPhone 12
- **Screenshots**: Captured on test failure
- **Videos**: Recorded on test failure
- **Traces**: Collected on first retry
- **Web Server**: Automatically starts dev server before tests

## Debugging Tips

### 1. Use Playwright Inspector
```bash
bun run test:e2e:debug
```
- Step through tests one action at a time
- Inspect page state at each step
- Edit selectors in real-time

### 2. Use UI Mode
```bash
bun run test:e2e:ui
```
- Watch tests run with visual feedback
- Time-travel through test execution
- See DOM snapshots at each step

### 3. Add Debug Statements
```typescript
await page.pause(); // Pauses test execution
console.log(await page.title()); // Log page state
await page.screenshot({ path: 'debug.png' }); // Take screenshot
```

### 4. Run Single Test
```typescript
test.only('specific test', async ({ page }) => {
  // This test will run in isolation
});
```

### 5. View Test Reports
After running tests, open the HTML report:
```bash
npx playwright show-report
```

## Common Issues & Solutions

### Issue: Tests timing out
**Solution**: Increase timeout in test or use proper wait conditions:
```typescript
test.setTimeout(60000); // Increase timeout to 60s
await page.waitForLoadState('networkidle'); // Wait for network
```

### Issue: Flaky tests
**Solution**: Use proper waits instead of arbitrary timeouts:
```typescript
// ❌ Bad
await page.waitForTimeout(1000);

// ✅ Good
await page.waitForSelector('[data-testid="content"]', { state: 'visible' });
await page.waitForLoadState('networkidle');
```

### Issue: Element not found
**Solution**: Verify selector and ensure element is visible:
```typescript
// Check if element exists
const count = await page.locator('.my-element').count();
console.log(`Found ${count} elements`);

// Wait for element to be visible
await page.waitForSelector('.my-element', { state: 'visible' });
```

### Issue: Dev server not starting
**Solution**: Ensure no other process is using port 3000:
```bash
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
```

## Best Practices

1. **Use User-Facing Selectors**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Wait for Conditions**: Use `waitForSelector`, `waitForLoadState` instead of fixed timeouts
3. **Test User Behavior**: Focus on what users see and do, not implementation details
4. **Keep Tests Isolated**: Each test should be independent and not rely on others
5. **Use Page Object Model**: For complex pages, create page objects to reduce duplication
6. **Add Descriptive Names**: Test names should clearly describe what they verify
7. **Handle Async Properly**: Always await Playwright actions
8. **Clean Up**: Tests should not leave side effects (use `beforeEach`/`afterEach`)

## CI/CD Integration

Tests are configured to run in CI environments with:
- Retries on failure (2 retries in CI)
- Single worker for stability
- Automatic server startup
- Test reports archived on failure

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: bun install

- name: Install Playwright browsers
  run: bunx playwright install --with-deps

- name: Run E2E tests
  run: bun run test:e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Writing New Tests

### Example Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange - Set up test conditions
    const button = page.getByRole('button', { name: 'Click Me' });
    
    // Act - Perform actions
    await button.click();
    
    // Assert - Verify results
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Test Generators](https://playwright.dev/docs/codegen)

## Maintenance

Tests should be updated when:
- UI components change significantly
- New features are added
- Accessibility requirements evolve
- User flows are modified

Regular test maintenance ensures:
- Tests remain reliable and non-flaky
- Coverage stays comprehensive
- Test execution time is optimized
- False positives are minimized