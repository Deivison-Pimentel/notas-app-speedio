// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import CreateAnotacao from '../components/CreateAnotacao.vue';
import ListaAnotacoes from '../components/Anotacoes/ListaAnotacoes.vue';
import AnotacaoFormulario from '../components/Anotacoes/AnotacaoFormulario.vue';


const routes = [
  { path: '/', component: HelloWorld },
  { path: '/criar-anotacao', component: CreateAnotacao },
  { path: '/lista-anotacoes', component: ListaAnotacoes },
  { path: '/anotacao-formulario', component: AnotacaoFormulario },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
