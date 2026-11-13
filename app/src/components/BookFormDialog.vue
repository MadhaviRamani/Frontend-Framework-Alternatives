<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { STATUSES, STATUS_LABELS, validateBook, type BookErrors } from '@/core/books'
import type { Book, NewBook } from '@/core/types'
import BaseDialog from './BaseDialog.vue'

/** `book` is the book to edit, or `null` to add a new one. */
const props = defineProps<{ book: Book | null }>()

const emit = defineEmits<{
  save: [book: NewBook]
  cancel: []
}>()

const RATINGS = [1, 2, 3, 4, 5]

const form = ref<NewBook>(
  props.book
    ? {
        title: props.book.title,
        author: props.book.author,
        status: props.book.status,
        rating: props.book.rating,
        notes: props.book.notes,
      }
    : { title: '', author: '', status: 'want-to-read', rating: null, notes: '' },
)
const errors = ref<BookErrors>({})

const titleInput = useTemplateRef<HTMLInputElement>('titleInput')
const authorInput = useTemplateRef<HTMLInputElement>('authorInput')

function submit(): void {
  errors.value = validateBook(form.value)
  if (errors.value.title) {
    titleInput.value?.focus()
    return
  }
  if (errors.value.author) {
    authorInput.value?.focus()
    return
  }
  emit('save', {
    ...form.value,
    title: form.value.title.trim(),
    author: form.value.author.trim(),
  })
}
</script>

<template>
  <BaseDialog :title="props.book ? 'Edit book' : 'Add book'" @close="emit('cancel')">
    <form class="form" novalidate @submit.prevent="submit">
      <div class="field">
        <label for="book-title">Title</label>
        <input
          id="book-title"
          ref="titleInput"
          v-model="form.title"
          type="text"
          aria-required="true"
          :aria-invalid="errors.title ? 'true' : undefined"
          :aria-describedby="errors.title ? 'book-title-error' : undefined"
        />
        <p v-if="errors.title" id="book-title-error" class="error">{{ errors.title }}</p>
      </div>

      <div class="field">
        <label for="book-author">Author</label>
        <input
          id="book-author"
          ref="authorInput"
          v-model="form.author"
          type="text"
          aria-required="true"
          :aria-invalid="errors.author ? 'true' : undefined"
          :aria-describedby="errors.author ? 'book-author-error' : undefined"
        />
        <p v-if="errors.author" id="book-author-error" class="error">{{ errors.author }}</p>
      </div>

      <div class="row">
        <div class="field">
          <label for="book-status">Status</label>
          <select id="book-status" v-model="form.status">
            <option v-for="status in STATUSES" :key="status" :value="status">
              {{ STATUS_LABELS[status] }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="book-rating">Rating</label>
          <select id="book-rating" v-model="form.rating">
            <option :value="null">Not rated</option>
            <option v-for="n in RATINGS" :key="n" :value="n">
              {{ n }} {{ n === 1 ? 'star' : 'stars' }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <label for="book-notes">Notes</label>
        <textarea id="book-notes" v-model="form.notes" rows="3" />
      </div>

      <div class="actions">
        <button type="button" class="btn" @click="emit('cancel')">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </BaseDialog>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.row > .field {
  flex: 1 1 10rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

label {
  font-weight: 600;
}

input,
select,
textarea {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}
</style>
