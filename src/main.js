import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// Defina os feature flags
window.__VUE_PROD_DEVTOOLS__ = false; // Desativa o Vue DevTools em produção
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true; // Ativa os detalhes de mismatch durante a hidratação

const app = createApp(App);

app
  .use(router)
  .use(store)
  .mount('#app');
