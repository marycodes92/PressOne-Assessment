## TEST PLAN
Application Under Test: PressOne Todo App (served on http://localhost:5173/)
Prepared by: Mary Onuorah
Date: 15/05/2025
Version: 1.0

## Objective
To ensure the core features of the ToDo app function correctly, meet acceptance criteria, and provide a smooth user experience across devices and browsers.

## Scope
- Add Todo
- Delete Todo
- Filter Todo (All, Long, Short)
- Data persistence (on reload)

## Out of Scope
- Backend/database validation
- Security testing
- Performance testing 

## Test Items
- UI/UX elements (buttons, input fields)
- Task list behavior
- Local storage or backend data sync
- Responsive design

## Features to be Tested
---Feature-------Test Scenario-----
| Add todo     | User can add a todo using input field and Enter key
| filter todo  | User can filter by either All, Short (todo with <=10 characters) or Long (todo with >10 characters)
| Delete todo  | User can remove a task from the list
| Persist Data | Todo's remain after page refresh

## Types of Testing
Below are the various types of testing to be carried out on the Todo app.
- Unit testing
- Functional Testing
- End-to-End Testing
- Automated testing

## Tools
- Chrome Browser 
- Playwright/JavaScript (for automation)
- Jest (Unit test)

## Assumptions
- No user authentication is required.
- The app uses localStorage or similar client-side persistence.

## Entry Criteria
- App should be up and running 
- It is be stable 

## Exit Criteria
- All critical test cases must pass.
- No high-severity bugs should remain open.

## TEST CASES 
Find attached functional test document https://docs.google.com/spreadsheets/d/1eDLkXDYJL-bwi8vtcfDHPeA6uwn4nBghvidTQEWbo6s/edit?usp=sharing 