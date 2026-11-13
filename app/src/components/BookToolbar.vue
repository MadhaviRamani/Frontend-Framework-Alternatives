<script setup lang="ts">
import { STATUSES, STATUS_LABELS } from '@/core/books'
import type { StatusFilter } from '@/core/types'

// Two-way bindings: the parent writes v-model:query and v-model:status.
const query = defineModel<string>('query', { required: true })
const status = defineModel<StatusFilter>('status', { required: true })

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
]
</script>

<template>
  <div class="toolbar">
    <div class="search">
      <label for="book-search" class="visually-hidden">Search by title</label>
      <input
        id="book-search"
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Search by title…"
      />
    </div>
    <div class="filters" role="group" aria-label="Filter by status">
      <button
        v-for="filter in FILTERS"
        :key="filter.value"
        type="button"
        class="btn filter"
        :aria-pressed="status === filter.value"
        @click="status = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.search {
  flex: 1 1 16rem;
}

.search-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.filter[aria-pressed='true'] {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-on-primary);
}
</style>
