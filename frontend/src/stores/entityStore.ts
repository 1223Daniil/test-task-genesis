import { defineStore } from 'pinia';
import api from '../api';

export const useEntityStore = defineStore('entity', {
  state: () => ({
    selectedEntity: 'not-selected',
    createdEntities: [] as { id: number; entity: string }[],
    isLoading: false,
    error: '',
  }),
  actions: {
    async createEntity() {
      if (this.selectedEntity === 'not-selected') return;

      this.isLoading = true;
      this.error = '';

      try {
        const response = await api.post('/amocrm/create', {
          entity: this.selectedEntity,
        });

        this.createdEntities.push(response.data);
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create entity.';
      } finally {
        this.isLoading = false;
      }
    },
    selectEntity(entity: string) {
      this.selectedEntity = entity;
    },
  },
});

