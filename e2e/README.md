## How I handled Flakiness
I handled flakiness in this test project using Playwright’s built-in auto-waiting and stable selectors like `getByRole` and `getByPlaceholder`, ensuring elements are interactable before actions. 
I made sure all user interactions and assertions are properly awaited. 
Additionally, after login, I use the `await expect(page.locator('.todo-container')).toBeVisible()` to ensure the UI is fully rendered before proceeding, handling flakiness that might occur due to delay in rendering the todo.

## How I’d report test failures
In the `playwright.config.js` file, I have added commands to collect screenshots, videos, and traces when a test fails, which is bundled into a playwright-report folder and a html reporter.

When a test fails, 
- I'd Review the Playwright test report, which includes detailed error messages, stack traces, and screenshots/videos of the failed step.
- I'd use the Playwright HTML reporter to visually inspect what went wrong, especially for UI or time-related issues.
- Identify whether the failure is due to:
    - An application bug 
    - A test logic issue (e.g., unstable selectors, incorrect assertions)
    - Flakiness (e.g., network delays, missing waits)

- Once I identify the root cause, I’d:
    - Log the issue in Jira/GitHub (or any applicable tool) with clear reproduction steps, error logs, and screenshots.
    - Tag it appropriately (e.g., Bug, Test Fix, Flaky Test).

- If it’s a test issue, I’d fix the script and commit with context.
- If it’s a product bug, I’d assign it to the appropriate dev with full reproduction steps and evidence.
- I can also integrate Allure-reporting, which is also a beautiful tool for reporting.

## How this fits into CI
This test project can be easily integrated into a CI pipeline using tools like GitHub Actions, GitLab CI, Azure, etc.

Here's how it fits:
- The Playwright test suite would run on every pull request, merge to main, or scheduled build.
- The test ensures that any code change doesn’t break the core functionality (login, add/delete todos, filters).
- Playwright’s ability to run headless mode in CI environment and generate artifact (screenshots, traces) makes easy to debug failures remotely.

An example CI setup would:
- Checkout the code
- Install dependencies
- Start the local server (e.g., npm run dev)
- Run the tests (npx playwright test)
- Publish results and fail the build if critical tests fail
This supports continuous quality and early detection of defects in the development lifecycle.

I have included a Github Actions flow to run the playwright test in CI. The `.yml` is located in `.github/workflows/test.yml` file.


