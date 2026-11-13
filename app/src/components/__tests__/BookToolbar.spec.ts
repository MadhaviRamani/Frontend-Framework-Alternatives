import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BookToolbar from '../BookToolbar.vue'

function mountToolbar() {
  return mount(BookToolbar, { props: { query: '', status: 'all' } })
}

describe('BookToolbar', () => {
  it('shows "All" and the three statuses, with "All" pressed', () => {
    const wrapper = mountToolbar()
    const buttons = wrapper.findAll('button')

    expect(buttons.map((b) => b.text())).toEqual(['All', 'Want to read', 'Reading', 'Done'])
    expect(buttons[0]?.attributes('aria-pressed')).toBe('true')
  })

  it('updates the status when a filter is clicked', async () => {
    const wrapper = mountToolbar()

    await wrapper.findAll('button')[3]?.trigger('click')

    expect(wrapper.emitted('update:status')).toEqual([['done']])
  })

  it('updates the query when the reader types', async () => {
    const wrapper = mountToolbar()

    await wrapper.find('input[type="search"]').setValue('dune')

    expect(wrapper.emitted('update:query')).toEqual([['dune']])
  })
})
