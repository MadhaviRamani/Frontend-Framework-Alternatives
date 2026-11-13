<script setup lang="ts">
import type { Book } from '@/core/types'
import BookCard from './BookCard.vue'
import EmptyState from './EmptyState.vue'

const props = defineProps<{ books: Book[] }>()

const emit = defineEmits<{
  edit: [book: Book]
  delete: [book: Book]
}>()
</script>

<template>
  <EmptyState v-if="props.books.length === 0" />
  <ul v-else class="grid">
    <li v-for="book in props.books" :key="book.id">
      <BookCard :book="book" @edit="emit('edit', $event)" @delete="emit('delete', $event)" />
    </li>
  </ul>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.grid > li {
  display: flex;
}

.grid > li > * {
  flex: 1;
}
</style>
