import { defineStore } from 'pinia';

import type { Property, PropertyForm } from '@/shared/interfaces';
import {
  fetchProperties,
  addProperty,
  editProperty,
} from '@/shared/services/property.service';

interface parcState {
  properties: Property[];
  isLoaded: boolean;
  currentPage: number;
  maxPropertiesPerPage: number;
}

export const useParcStore = defineStore('parc', {
  state: (): parcState => ({
    properties: [],
    isLoaded: false,
    currentPage: 1,
    maxPropertiesPerPage: 5,
  }),

  getters: {
    propertiesForThisPage(state) {
      const propertiesCopy = [...state.properties];
      return propertiesCopy.splice(
        (state.currentPage - 1) * state.maxPropertiesPerPage,
        state.maxPropertiesPerPage
      );
    },
    maxPage(state) {
      return Math.ceil(state.properties.length / state.maxPropertiesPerPage);
    },
  },

  actions: {
    async addProperty(property: PropertyForm) {
      const res = await addProperty(property);

      const newProperty = {
        ...property,
        id: Math.max(...this.properties.map((p) => p.id)) + 1,
        created_at: '2022-01-01 09:00:00',
        updated_at: '2022-01-04 09:00:00',
        rented_at: '2022-01-09 09:00:00',
      };

      // Je n'ai pas réussi à gérer la méthode POST via Mirage :(

      if (res) {
        this.properties.push(newProperty);
      }
    },
    async editProperty(propertyId: number, property: PropertyForm) {
      const editedProperty = await editProperty(propertyId, property);

      if (editedProperty) {
        console.log(this.properties)
        const correspondingPropertyIndex = this.properties.findIndex(
          (p) => p.id === editedProperty.property.id
        );
        this.properties[correspondingPropertyIndex] = editedProperty.property;
      }
    },
  },
});

export async function initialFetch() {
  const parcStore = useParcStore();

  if (!parcStore.isLoaded) {
    const properties = await fetchProperties();

    if (!parcStore.isLoaded) {
      parcStore.properties = properties;
      parcStore.isLoaded = true;
    }
  }
}
