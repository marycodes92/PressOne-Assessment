import { test, expect } from '@playwright/test';
import { Todo } from '../e2e/Todo.js'

test('Rapid Entry', async ({ page }) => {
    const todo = new Todo(page)
    await page.goto('/');

    await todo.todoInput.fill('Buy groceries.');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(500);
    
    const todos = await todo.todoItems.allTextContents();
    
    const matches = todos.filter(todo => todo.includes('Buy groceries'));  
    expect(matches.length).toBe(1);
})