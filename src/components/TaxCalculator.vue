<template>
  <div>
    <v-container>
      <h2>외납세 간이 계산기</h2>
      <v-form @submit.prevent="calculateForeignTaxCredit">
        <v-text-field
          v-model="annualIncome"
          label="연간 총급여"
          type="number"
          required
          @input="validateInput"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="foreignIncome"
          label="연간 총급여 중 국외근로소득"
          type="number"
          required
          @input="validateInput"
          variant="underlined"
          ><div v-if="foreignIncome < 0" class="error-text">
            <span>음수는 입력할 수 없습니다.</span>
          </div></v-text-field
        >
        <v-text-field
          v-model="koreanIncome"
          label="연간 총급여 중 국내근로소득"
          type="number"
          required
          @input="validateInput"
          variant="underlined"
          ><div v-if="koreanIncome < 0" class="error-text">
            <span>음수는 입력할 수 없습니다.</span>
          </div></v-text-field
        >
        <v-text-field
          v-model="calculatedTax"
          label="산출세액"
          type="number"
          required
          @input="validateInput"
          variant="underlined"
          ><div v-if="calculatedTax < 0" class="error-text">
            <span>음수는 입력할 수 없습니다.</span>
          </div></v-text-field
        >
        <v-btn type="submit" color="primary">계산</v-btn>
      </v-form>
      <div v-if="foreignTaxCredit !== null">
        <h2>외국납부세액공제 적용 가능액</h2>
        <p>
          {{ calculatedTax }} / {{ annualIncome }} *
          {{ foreignIncome }} = {{ foreignTaxCredit }}
        </p>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      annualIncome: 0,
      foreignIncome: 0,
      calculatedTax: 0,
      foreignTaxCredit: null,
    };
  },
  computed: {
    koreanIncome: {
      get() {
        return this.annualIncome - this.foreignIncome;
      },
      set(value) {
        this.foreignIncome = this.annualIncome - value;
      },
    },
  },
  methods: {
    calculateForeignTaxCredit() {
      if (this.annualIncome && this.foreignIncome && this.calculatedTax) {
        const foreignTaxCredit =
          (this.calculatedTax / this.annualIncome) * this.foreignIncome;
        this.foreignTaxCredit = foreignTaxCredit.toFixed(2);
      } else {
        this.foreignTaxCredit = null;
      }
    },
    validateInput(event) {
      const regex = /^[0-9]*$/;
      if (!regex.test(event.target.value)) {
        event.target.value = event.target.value.slice(0, -1);
      } else {
        event.target.value = parseInt(event.target.value).toString(); // 숫자로 변환하여 다시 문자열로 반환합니다.
      }
    },
  },
};
</script>

<style scoped>
.error-text {
  color: #d32f2f;
  font-weight: 900;
  font-size: 0.7em;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
