import { createRouter, createWebHistory } from 'vue-router';
import CalculatorPage from '../views/CalculatorPage.vue';
import FormMakerPage from '../views/FormMakerPage.vue';

const routes = [
  {
    path: '/',
    name: 'CalculatorPage',
    component: CalculatorPage,
  },
  {
    path: '/form-maker',
    name: 'FormMakerPage',
    component: FormMakerPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
