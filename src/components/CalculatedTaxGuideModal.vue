<template>
  <div>
    [산출세액 입력 방법]
    <br />
    원천징수영수증 2페이지의 (50)산출세액 금액을 입력하세요.
    <img
      :src="calculatedTaxGuide"
      alt="calculatedTaxGuide"
      style="width: 100%"
    />
  </div>
</template>

<script>
import calculatedTaxGuide from "../assets/calculatedTaxGuide.png";

export default {
  data() {
    return {
      calculatedTaxGuide,
    };
  },
};
</script>

<style scoped></style>
