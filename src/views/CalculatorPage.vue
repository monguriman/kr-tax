<template>
  <div>
    <LayoutForm :menus="menus">

      <IntroBox />
      <TaxCalculator />
      
    </LayoutForm>
  </div>
</template>

<script>
import LayoutForm from "@/components/LayoutForm.vue";
import IntroBox from "@/components/IntroBox.vue";
import TaxCalculator from "@/components/TaxCalculator.vue";
export default {
  components: { LayoutForm, IntroBox, TaxCalculator },
  data() {
    return {
      menus: ['계산기']
    }
  }
};
</script>
