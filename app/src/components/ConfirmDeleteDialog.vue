<script setup lang="ts">
import type { Book } from '@/core/types'
import BaseDialog from './BaseDialog.vue'

const props = defineProps<{ book: Book }>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <BaseDialog title="Delete book" @close="emit('cancel')">
    <p class="message">
      Do you want to delete <strong>{{ props.book.title }}</strong>? This cannot be undone.
    </p>
    <div class="actions">
      <!-- The safe choice gets the focus when the dialog opens. -->
      <button type="button" class="btn" autofocus @click="emit('cancel')">Cancel</button>
      <button type="button" class="btn btn-danger" @click="emit('confirm')">Delete</button>
    </div>
  </BaseDialog>
</template>

<style scoped>
.message {
  margin-bottom: var(--space-5);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}
</style>
