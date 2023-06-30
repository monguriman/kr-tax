<template>
  <div>
    <v-app>
      <LayoutForm />
    </v-app>
  </div>
</template>

<script>
import LayoutForm from "./views/LayoutForm.vue";

export default {
  name: "App",
  components: {
    LayoutForm,
  },
};
</script>
