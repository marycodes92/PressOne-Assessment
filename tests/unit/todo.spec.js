import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import Todo from '../../src/components/Todo.vue'

describe('Todo App', () => {
  test('computes short todos correctly', async () => {
    const wrapper = mount(Todo)

    await wrapper.find('input').setValue('unit test')
    await wrapper.find('input').trigger('keydown.enter')

    await wrapper.find('input').setValue('Create e2e test using playwright')
    await wrapper.find('input').trigger('keydown.enter')

    await wrapper.find('select').setValue('short')

    const todos = wrapper.findAll('li')
    expect(todos.length).toBe(1)
    expect(todos[0].text()).toContain('unit test')
  })

  test('adds and deletes a todo', async () => {
    const wrapper = mount(Todo)

    const input = wrapper.find('input')
    await input.setValue('My tests')
    await input.trigger('keydown.enter')

    let todos = wrapper.findAll('li')
    expect(todos.length).toBe(1)
    expect(todos[0].text()).toContain('My tests')

    await todos[0].find('button').trigger('click')

    todos = wrapper.findAll('li')
    expect(todos.length).toBe(0)
  })

  test('shows error message on empty input', async () => {
    const wrapper = mount(Todo)

    await wrapper.find('input').setValue('')
    await wrapper.find('input').trigger('keydown.enter')

    const errorMsg = wrapper.find('.error')
    console.log(wrapper.html())
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toBe('Todo cannot be empty')
  })
})
