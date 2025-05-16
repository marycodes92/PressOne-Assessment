## Bug Analysis: Duplicate Todo Items on Rapid Entry

I am unable to reproduce this bug on my own end despite trying on different browsers and various speeds and intensities like holding down the `Enter` key, spamming it quickly, etc. 
To help with reproducing this bug, I'd appreciate if more details about the bug can be provided like;
- The environment the app was running when the bug was found (local or deployed)
- The device details where the bug was found, and
- The browser 

However, below are my response to your question if I had found the bug, although steps might differ depending on how I was able to reproduce the bug.
# Steps to Reproduce (based on my testing):
- Navigate to http://localhost:5173/.
- In the "Add a todo" input field, type a task (e.g., "Buy groceries").
- Press Enter repeatedly and quickly (2–3 times within a second).
- Observe that the same todo appears multiple times in the list.
- Attempt to delete one of the duplicates, multiple entries might be removed at once.

## Root Cause Hypothesis
The issue might likely stem from the ID generation logic in the addTodo() function `id: Math.floor(Date.now() / 1000)`
This line of code creates an ID based on seconds, not milliseconds. If Enter is pressed multiple times in rapid succession (within the same second), multiple todos will get assigned the same ID, making them indistinguishable in the app’s data structure. 
As a result of this:
- Duplicates tasks are created.
- Deleting one task might remove all tasks with the same ID.

## How to Prevent Regression
These would be my suggestion to prevent re-ocurrence and regression;
1. Update the ID logic to ensure true uniqueness, e.g `id: Date.now() + Math.random()`
2. Create a unit test or E2E test that;
   - Simulates rapid pressing of Enter on the same todo input.
   - Asserts that only one instance is added.
   - Verifies that deleting one does not affect others.
3. Disable the input temporarily after submission to prevent multiple rapid insertions.

## I have added a playwright test to ensure that this issue is caught if at all it's happening and I couldn't catch it manually.
Test is located in `e2e/rapid-entry.spec.js` file.


