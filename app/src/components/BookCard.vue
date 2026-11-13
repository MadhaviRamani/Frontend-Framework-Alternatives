<script setup lang="ts">
import type { Book } from '@/core/types'
import StatusBadge from './StatusBadge.vue'
import StarRating from './StarRating.vue'

const props = defineProps<{ book: Book }>()

const emit = defineEmits<{
  edit: [book: Book]
  delete: [book: Book]
}>()
</script>

<template>
  <article class="card">
    <h2 class="title">{{ props.book.title }}</h2>
    <p class="author">{{ props.book.author }}</p>
    <div class="meta">
      <StatusBadge :status="props.book.status" />
      <StarRating :rating="props.book.rating" />
    </div>
    <p v-if="props.book.notes" class="notes">{{ props.book.notes }}</p>
    <div class="actions">
      <button type="button" class="btn" @click="emit('edit', props.book)">
        Edit<span class="visually-hidden"> {{ props.book.title }}</span>
      </button>
      <button type="button" class="btn" @click="emit('delete', props.book)">
        Delete<span class="visually-hidden"> {{ props.book.title }}</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.title {
  font-size: var(--font-size-lg);
}

.author {
  color: var(--color-text-muted);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.notes {
  font-size: var(--font-size-sm);
}

.actions {
  display: flex;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}
</style>
