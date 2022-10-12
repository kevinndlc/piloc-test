import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { makeServer } from './server';

import './assets/main.css';

if (import.meta.env.MODE === 'development') {
  makeServer({ environment: 'development' });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
