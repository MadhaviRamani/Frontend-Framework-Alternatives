import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import type { Book } from '@/core/types'
import BookFormDialog from '../BookFormDialog.vue'

// jsdom does not implement the modal dialog API, so replace it with stubs.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
})

enableAutoUnmount(afterEach)

const book: Book = {
  id: 'b1',
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'done',
  rating: 5,
  notes: '',
}

describe('BookFormDialog', () => {
  it('does not save an empty form and shows the messages next to the fields', async () => {
    const wrapper = mount(BookFormDialog, { props: { book: null }, attachTo: document.body })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('save')).toBeUndefined()
    expect(wrapper.find('#book-title-error').text()).toBe('Title is required')
    expect(wrapper.find('#book-author-error').text()).toBe('Author is required')
    expect(wrapper.find('#book-title').attributes('aria-invalid')).toBe('true')
  })

  it('saves a new book with trimmed title and author', async () => {
    const wrapper = mount(BookFormDialog, { props: { book: null }, attachTo: document.body })

    await wrapper.find('#book-title').setValue('  Emma ')
    await wrapper.find('#book-author').setValue('Jane Austen')
    await wrapper.find('#book-rating').setValue('3')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('save')).toEqual([
      [{ title: 'Emma', author: 'Jane Austen', status: 'want-to-read', rating: 3, notes: '' }],
    ])
  })

  it('fills the fields when editing a book', () => {
    const wrapper = mount(BookFormDialog, { props: { book }, attachTo: document.body })

    expect(wrapper.find('h2').text()).toBe('Edit book')
    expect(wrapper.find<HTMLInputElement>('#book-title').element.value).toBe('Dune')
  })

  it('emits cancel when Cancel is clicked', async () => {
    const wrapper = mount(BookFormDialog, { props: { book }, attachTo: document.body })

    const cancel = wrapper.findAll('button').find((b) => b.text() === 'Cancel')
    await cancel?.trigger('click')

    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
