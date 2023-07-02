import Vue from "vue";
import Router from "vue-router";
import CalculatorPage from "../views/CalculatorPage.vue";
import FormMakerPage from "../views/FormMakerPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/calculator",
      name: "CalculatorPage",
      component: CalculatorPage,
    },
    {
      path: "/form-maker",
      name: "FormMakerPage",
      component: FormMakerPage,
    },
  ],
});
