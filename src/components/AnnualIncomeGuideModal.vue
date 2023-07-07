<template>
  <div>
    <h3 class="modal-title">총급여 입력</h3>
    <hr class="hr-under-title" />
    원천징수영수증 2페이지의 (21)총급여 금액을 입력하세요.
    <img :src="annualIncomeGuide" alt="annualIncomeGuide" class="guide-image" />
  </div>
</template>

<script>
import annualIncomeGuide from "../assets/annualIncomeGuide.png";

export default {
  data() {
    return {
      annualIncomeGuide,
    };
  },
};
</script>

<style scoped></style>
