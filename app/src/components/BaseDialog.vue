<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId, useTemplateRef } from 'vue'

/**
 * A modal dialog that is open while it is rendered. The parent shows it with
 * `v-if`, so every open starts with fresh state (like conditional rendering
 * in React). The native <dialog> with showModal() moves the focus inside,
 * traps it and handles Escape.
 */
const props = defineProps<{ title: string }>()

const emit = defineEmits<{ close: [] }>()

const titleId = useId()
const dialog = useTemplateRef<HTMLDialogElement>('dialog')

// Read during setup, before the dialog takes the focus: this is the opener.
const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null

onMounted(() => {
  dialog.value?.showModal()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  if (opener?.isConnected) {
    opener.focus()
  }
})

// Escape fires "cancel". The parent owns the open state, so ask it to close.
function onCancel(event: Event): void {
  event.preventDefault()
  emit('close')
}
</script>

<template>
  <dialog ref="dialog" class="dialog" :aria-labelledby="titleId" @cancel="onCancel">
    <h2 :id="titleId" class="title">{{ props.title }}</h2>
    <slot />
  </dialog>
</template>

<style scoped>
.dialog {
  width: min(100% - 2 * var(--space-4), 32rem);
  padding: var(--space-5);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-raised);
}

.dialog::backdrop {
  background: var(--color-backdrop);
}

.title {
  margin-bottom: var(--space-4);
  font-size: var(--font-size-lg);
}
</style>
