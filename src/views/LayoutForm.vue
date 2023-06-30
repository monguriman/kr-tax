<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="menu in menus" :key="menu" link>
                  <v-list-item-title> {{ menu }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <tax-calculator></tax-calculator>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TaxCalculator from "@/components/TaxCalculator.vue";
export default {
  components: { TaxCalculator },
  props: {
    links: {
      type: Array,
      default: () => ["Calculator", "Form Guide"],
    },
  },
  data() {
    return {
      menus: ["계산기", "서식 자동작성"],
    };
  },
};
</script>
