<template>
  <v-container>
    <v-form @submit.prevent="calculateForeignTaxCredit">
      <v-text-field
        v-model="annualIncome"
        label="연간 총급여"
        type="number"
        required
        @input="validateInput"
        variant="underlined"
      >
        <span
          class="modal-guide-text-in-input"
          @click="showAnnualIncomeGuideModal = true"
          >어느 금액을 적나요?</span
        ></v-text-field
      >
      <v-text-field
        v-model="foreignIncome"
        label="연간 총급여 중 국외근로소득"
        type="number"
        required
        @input="validateInput"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="koreanIncome"
        label="연간 총급여 중 국내근로소득 (자동입력)"
        type="number"
        required
        @input="validateInput"
        variant="underlined"
        readonly
      ></v-text-field>
      <v-text-field
        v-model="calculatedTax"
        label="산출세액"
        type="number"
        required
        @input="validateInput"
        variant="underlined"
      ></v-text-field>
      <v-btn type="submit" color="primary">계산</v-btn>
    </v-form>
    <div>
      <h2>외국납부세액공제 적용 가능액</h2>
      <p v-if="foreignTaxCredit == null">값을 모두 입력하세요.</p>
      <p v-if="foreignTaxCredit !== null">
        {{ calculatedTax }} / {{ annualIncome }} * {{ foreignIncome }} =
        {{ foreignTaxCredit }}
        <br />한국에서 동일 국외근로소득에 대해 이미 세금을 냈거나 월급에서
        원천징수되었다면, 최대
        <span style="font-weight: 900">{{
          foreignTaxCredit.toLocaleString()
        }}</span
        >원 만큼 세금을 환급받을 수 있습니다.
      </p>
    </div>
  </v-container>

  <v-dialog v-model="showAnnualIncomeGuideModal">
    <div class="modal">
      <AnnualIncomeGuideModal />
      <button @click="showAnnualIncomeGuideModal = false">닫기</button>
    </div>
  </v-dialog>
</template>

<script>
import AnnualIncomeGuideModal from "./AnnualIncomeGuideModal.vue";
export default {
  components: { AnnualIncomeGuideModal },
  data() {
    return {
      showAnnualIncomeGuideModal: false,
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
        this.foreignTaxCredit = foreignTaxCredit.toFixed(0);
      } else {
        this.foreignTaxCredit = null;
      }
    },
    validateInput(e) {
      console.log(e);
      const regex = /^[0-9]*$/;
      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.slice(0, -1);
      } else {
        e.target.value = parseInt(e.target.value).toString(); // 숫자로 변환하여 다시 문자열로 반환합니다.
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
