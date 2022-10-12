import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import { initialFetch } from '@/stores/parc';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        title: 'Tableau de bord',
      },
    },
    {
      path: '/:propertyId/edit',
      name: 'EditProperty',
      component: () => import('@/views/EditPropertyView.vue'),
      meta: {
        title: 'Editer la propriété #',
      },
    },
    {
      path: '/add-property',
      name: 'AddProperty',
      component: () => import('@/views/AddPropertyView.vue'),
      meta: {
        title: 'Ajouter une propriété',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'EditProperty' && typeof to.meta.title === 'string') {
    to.meta.title += to.params.propertyId;
  }
  next();
});

router.afterEach(async () => {
  await initialFetch();
});

export default router;
