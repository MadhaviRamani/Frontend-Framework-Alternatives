<template>
  <div class="empty">
    <p class="headline">No books found</p>
    <p>Try another search or filter, or add a new book.</p>
  </div>
</template>

<style scoped>
.empty {
  padding: var(--space-6) var(--space-4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-align: center;
}

.headline {
  color: var(--color-text);
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
