<template>
  <div>
    계산기 페이지입니다.
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
      menus: ['계산기', '서식 자동작성']
    }
  }
};
</script>
