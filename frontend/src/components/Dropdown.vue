<script lang="ts" setup>
import { useEntityStore } from '@/stores/entityStore';

const store = useEntityStore();

function handleChange(event: Event) {
  const selected = (event.target as HTMLSelectElement).value;
  store.selectEntity(selected);
}
</script>

<template>
  <div>
    <label class="mr-4" for="entity-select">Выберите сущность:</label>
    <select id="entity-select" class="border p-2 rounded" @change="handleChange">
      <option value="not-selected">Не выбрано</option>
      <option value="leads">Сделка</option>
      <option value="contacts">Контакт</option>
      <option value="companies">Компания</option>
    </select>
  </div>
</template>
