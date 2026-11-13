<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterBooks } from '@/core/books'
import { loadBooks } from '@/core/storage'
import type { Book, StatusFilter } from '@/core/types'
import AppHeader from './components/AppHeader.vue'
import BookToolbar from './components/BookToolbar.vue'
import BookList from './components/BookList.vue'

const books = ref<Book[]>(loadBooks())
const query = ref('')
const statusFilter = ref<StatusFilter>('all')

// Derived, never stored: recalculated when books, query or filter change.
const visibleBooks = computed(() =>
  filterBooks(books.value, { status: statusFilter.value, query: query.value }),
)

function openAdd(): void {}
function openEdit(_book: Book): void {}
function askDelete(_book: Book): void {}
</script>

<template>
  <div class="page">
    <AppHeader @add="openAdd" />
    <main class="content">
      <BookToolbar v-model:query="query" v-model:status="statusFilter" />
      <BookList :books="visibleBooks"@edit="openEdit" @delete="askDelete" />
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-4);
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
</style>
