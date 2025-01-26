<script lang="ts" setup>
import { useEntityStore } from '@/stores/entityStore';

const store = useEntityStore();
</script>

<template>
  <div>
    <h3>Результаты:</h3>
    <ul>
      <li v-for="(entity, index) in store.createdEntities" :key="index">
        {{ entity.entity }}: {{ entity.id }}
      </li>
    </ul>
    <p v-if="store.error" class="text-red-50">{{ store.error }}</p>
  </div>
</template>

