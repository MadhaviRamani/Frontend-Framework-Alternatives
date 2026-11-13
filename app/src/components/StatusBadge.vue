<script setup lang="ts">
import { STATUS_LABELS } from '@/core/books'
import type { Status } from '@/core/types'

defineProps<{ status: Status }>()
</script>

<template>
  <span class="badge" :class="`badge-${status}`">{{ STATUS_LABELS[status] }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.badge-want-to-read {
  background: var(--color-status-want-bg);
  color: var(--color-status-want-text);
}

.badge-reading {
  background: var(--color-status-reading-bg);
  color: var(--color-status-reading-text);
}

.badge-done {
  background: var(--color-status-done-bg);
  color: var(--color-status-done-text);
}
</style>
