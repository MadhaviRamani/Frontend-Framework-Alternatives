<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

/**
 * The live region is always rendered, so screen readers announce every new
 * message. A message hides itself after a few seconds.
 */
const props = defineProps<{ message: string | null }>()

const emit = defineEmits<{ dismiss: [] }>()

const DURATION_MS = 3000
let timer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.message,
  (message) => {
    clearTimeout(timer)
    if (message) {
      timer = setTimeout(() => emit('dismiss'), DURATION_MS)
    }
  },
)

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="region" role="status">
    <p v-if="props.message" class="toast">{{ props.message }}</p>
  </div>
</template>

<style scoped>
.region {
  position: fixed;
  right: var(--space-4);
  bottom: var(--space-4);
  left: var(--space-4);
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.toast {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-surface);
  box-shadow: var(--shadow-raised);
}
</style>
