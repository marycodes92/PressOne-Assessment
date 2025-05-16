export class Todo {
    constructor(page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.todoInput = page.getByPlaceholder('Add a todo');
        this.deleteBtn = page.getByRole('button', { name: 'Delete' });
        this.selectFilter = page.locator('select');
        this.todoItems = page.locator('ul > li');
    }
    
    async login(username) {
        await this.usernameInput.fill(username);
        await this.loginBtn.click();
    }

    async addTodo(page, item) {
        await this.todoInput.fill(item)
        await page.keyboard.press('Enter');
    }

    async filterTodos(filter) {
        await this.selectFilter.selectOption(filter);
    }
    
    async deleteTodo(item) {
        const todoCount = await this.todoItems.count();
        for (let i = 0; i < todoCount; i++) {
            const todoItem = await this.todoItems.nth(i);
            if ((await todoItem.innerText()).includes(item)) {
                await todoItem.locator('button', { hasText: 'Delete' }).click();
                break;
            }
        }
    }
}

