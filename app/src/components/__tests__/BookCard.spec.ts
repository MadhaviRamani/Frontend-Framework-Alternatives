import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Book } from '@/core/types'
import BookCard from '../BookCard.vue'

const book: Book = {
  id: 'b1',
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'reading',
  rating: 4,
  notes: 'Slow start.',
}

describe('BookCard', () => {
  it('shows title, author, status label, rating and notes', () => {
    const wrapper = mount(BookCard, { props: { book } })
    const text = wrapper.text()

    expect(text).toContain('Dune')
    expect(text).toContain('Frank Herbert')
    expect(text).toContain('Reading')
    expect(text).toContain('Slow start.')
    expect(wrapper.find('[aria-label="4 of 5 stars"]').exists()).toBe(true)
  })

  it('shows "Not rated" and no notes when they are empty', () => {
    const wrapper = mount(BookCard, { props: { book: { ...book, rating: null, notes: '' } } })

    expect(wrapper.text()).toContain('Not rated')
    expect(wrapper.find('.notes').exists()).toBe(false)
  })

  it('emits edit and delete with the book', async () => {
    const wrapper = mount(BookCard, { props: { book } })
    const [editButton, deleteButton] = wrapper.findAll('button')

    await editButton?.trigger('click')
    await deleteButton?.trigger('click')

    expect(wrapper.emitted('edit')).toEqual([[book]])
    expect(wrapper.emitted('delete')).toEqual([[book]])
  })
})
