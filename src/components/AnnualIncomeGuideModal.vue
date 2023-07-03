<template>
  <div>
    [총급여 입력 방법]
    <br />
    원천징수영수증 2페이지의 (21)총급여 금액을 입력하세요.
    <img :src="annualIncomeGuide" alt="annualIncomeGuide" style="width: 100%" />
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
