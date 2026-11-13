<script setup lang="ts">
const emit = defineEmits<{ add: [] }>()
</script>

<template>
  <header class="header">
    <h1 class="title">Reading List</h1>
    <button type="button" class="btn btn-primary" @click="emit('add')">+ Add book</button>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.title {
  font-size: var(--font-size-xl);
}
</style>
