<script lang="ts" setup>
import { useEntityStore } from '@/stores/entityStore';

const store = useEntityStore();

function handleClick() {
  store.createEntity();
}
</script>

<template>
  <button
    class="py-2 px-4 rounded"
    :disabled="store.selectedEntity === 'not-selected' || store.isLoading"
    :class="[
      store.selectedEntity === 'not-selected' ? 'bg-white text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white cursor-pointer',
      store.isLoading ? 'opacity-50' : ''
    ]"
    @click="handleClick"
  >
    <span v-if="store.isLoading" class="spinner"></span>
    <span v-else>Создать</span>
  </button>
</template>

<style scoped>
.spinner {
  border: 2px solid gray;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
  display: block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

  