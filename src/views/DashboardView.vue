<script setup lang="ts">
import { useParcStore } from '@/stores/parc';
import { watch } from 'vue';
import Input from '../components/atoms/Input.vue';
import Avatar from '../components/atoms/Avatar.vue';
import InputGroup from '../components/molecules/InputGroup.vue';

const parcStore = useParcStore();

watch(
  () => parcStore.maxPropertiesPerPage,
  () => {
    if (parcStore.currentPage > parcStore.maxPage) {
      parcStore.currentPage = parcStore.maxPage;
    }
  }
);
</script>

<template>
  <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div
        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
      >
        <table
          class="min-w-full divide-y max-h-[267px] overflow-hidden divide-gray-300"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="uppercase py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-800 sm:pl-6"
              >
                Designation
              </th>
              <th
                scope="col"
                class="uppercase px-3 py-3.5 text-left text-sm font-bold text-gray-800"
              >
                Statut
              </th>
              <th
                scope="col"
                class="uppercase px-3 py-3.5 text-left text-sm font-bold text-gray-800"
              >
                Loyer
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="property in parcStore.propertiesForThisPage"
              :key="property.id"
              class="hover:bg-gray-50 cursor-pointer"
              @click="
                $router.push({
                  name: 'EditProperty',
                  params: { propertyId: property.id },
                })
              "
            >
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <Avatar :img="property.image" />
                  </div>
                  <div class="ml-4">
                    <div class="uppercase font-medium text-gray-900">
                      {{ property.name }} #{{ property.id }}
                    </div>
                    <div class="text-gray-500">
                      🏠
                      {{ property.address?.number }}
                      {{ property.address?.street }},
                      {{ property.address?.postcode }}
                      {{ property.address?.city }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                  v-if="property.status === 'available'"
                  class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                  >Disponible</span
                >
                <template v-else>
                  <div class="font-medium text-gray-800">
                    Loué depuis le
                    {{ new Date(property.rented_at).toLocaleDateString() }}
                  </div>
                  <div class="text-gray-500">
                    👤{{ property.tenants?.length ?? 0 }} locataire{{
                      (property.tenants?.length ?? 0) > 1 ? 's' : ''
                    }}
                  </div>
                </template>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div class="font-medium text-gray-800">
                  {{ property.amount }}€ (CC) / mois
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="flex items-start justify-between mt-4 select-none">
    <InputGroup
      title="Max rows / page"
      v-model="parcStore.maxPropertiesPerPage"
      type="number"
      class="mt-4"
    />
    <div class="flex items-center gap-2 leading-none text-sm">
      <button
        class="bg-gray-200 flex items-center justify-center w-5 h-4 leading-none rounded-md font-serif pb-0.5"
        :class="parcStore.currentPage === 1 && 'opacity-0 pointer-events-none'"
        :disabled="parcStore.currentPage === 1"
        @click="
          () => {
            if (parcStore.currentPage !== 1) {
              parcStore.currentPage--;
            }
          }
        "
      >
        &lt;</button
      >Page {{ parcStore.currentPage }}/{{ parcStore.maxPage
      }}<button
        class="bg-gray-200 flex items-center justify-center w-5 h-4 leading-none rounded-md font-serif pb-0.5"
        :class="
          parcStore.currentPage === parcStore.maxPage &&
          'opacity-0 pointer-events-none'
        "
        :disabled="parcStore.currentPage === parcStore.maxPage"
        @click="
          () => {
            if (parcStore.currentPage < parcStore.maxPage) {
              parcStore.currentPage++;
            }
          }
        "
      >
        &gt;
      </button>
    </div>
  </div>
</template>
