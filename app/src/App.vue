<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addBook, filterBooks, updateBook } from '@/core/books'
import { loadBooks, saveBooks } from '@/core/storage'
import type { Book, NewBook, StatusFilter } from '@/core/types'
import AppHeader from './components/AppHeader.vue'
import BookToolbar from './components/BookToolbar.vue'
import BookList from './components/BookList.vue'
import BookFormDialog from './components/BookFormDialog.vue'

const books = ref<Book[]>(loadBooks())
const query = ref('')
const statusFilter = ref<StatusFilter>('all')

// Add/edit dialog: open or closed, and which book (null = a new book).
const formOpen = ref(false)
const editingBook = ref<Book | null>(null)

// Derived, never stored: recalculated when books, query or filter change.
const visibleBooks = computed(() =>
  filterBooks(books.value, { status: statusFilter.value, query: query.value }),
)

// Every change replaces the array, so a shallow watch is enough.
watch(books, (value) => saveBooks(value))

function openAdd(): void {
  editingBook.value = null
  formOpen.value = true
}

function openEdit(book: Book): void {
  editingBook.value = book
  formOpen.value = true
}

function closeForm(): void {
  formOpen.value = false
  editingBook.value = null
}

function saveForm(input: NewBook): void {
  books.value = editingBook.value
    ? updateBook(books.value, editingBook.value.id, input)
    : addBook(books.value, input)
  closeForm()
}

function askDelete(_book: Book): void {}
</script>

<template>
  <div class="page">
    <AppHeader @add="openAdd" />
    <main class="content">
      <BookToolbar v-model:query="query" v-model:status="statusFilter" />
      <BookList :books="visibleBooks" @edit="openEdit" @delete="askDelete" />
    </main>

    <BookFormDialog v-if="formOpen" :book="editingBook" @save="saveForm" @cancel="closeForm" />
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
