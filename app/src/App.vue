<script setup lang="ts">
import { ref } from 'vue'
import { loadBooks } from '@/core/storage'
import type { Book } from '@/core/types'
import AppHeader from './components/AppHeader.vue'
import BookList from './components/BookList.vue'

const books = ref<Book[]>(loadBooks())

function openAdd(): void {}
function openEdit(_book: Book): void {}
function askDelete(_book: Book): void {}
</script>

<template>
  <div class="page">
    <AppHeader @add="openAdd" />
    <main>
      <BookList :books="books" @edit="openEdit" @delete="askDelete" />
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
</style>
