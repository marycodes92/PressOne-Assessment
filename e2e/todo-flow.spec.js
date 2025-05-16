import { test, expect } from '@playwright/test';
import { Todo } from './Todo.js';

test('Todo E2E test', async ({ page }) => {
    const todo = new Todo(page);
    await page.goto('/login');

    // Login
    await todo.login('testuser');
    await expect(page.locator('.todo-container')).toBeVisible()

    // Add todos
    await todo.addTodo(page, 'unit test')
    await todo.addTodo(page, 'Setup playwright')
    await todo.addTodo(page, 'Create e2e test using playwright')

    const listItems = await todo.todoItems.count()
    expect(listItems).toBe(3)

    // Filter todos
    await todo.selectFilter.selectOption('long')
    expect(await todo.todoItems.count()).toEqual(2)

    await todo.selectFilter.selectOption('short')
    expect(await todo.todoItems.count()).toEqual(1)

    await todo.selectFilter.selectOption('all')
    expect(await todo.todoItems.count()).toEqual(3)

    // Delete todo
    await todo.deleteTodo('unit test')

    // Verify filter reflects the change correctly
    await todo.selectFilter.selectOption('short')
    expect(await todo.todoItems.count()).toBeFalsy()

    // There is no logout feature in the app
})
