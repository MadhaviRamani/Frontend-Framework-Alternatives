<script setup lang="ts">
const props = defineProps<{ rating: number | null }>()

const MAX_STARS = 5
</script>

<template>
  <span v-if="props.rating === null" class="unrated">Not rated</span>
  <span v-else class="stars" role="img" :aria-label="`${props.rating} of ${MAX_STARS} stars`">
    <span v-for="n in MAX_STARS" :key="n" aria-hidden="true">{{ n <= props.rating ? '★' : '☆' }}</span>
  </span>
</template>

<style scoped>
.stars {
  color: var(--color-star);
  letter-spacing: var(--space-1);
}

.unrated {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
