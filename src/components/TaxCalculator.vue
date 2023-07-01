<template>
  <div>
    <v-container>
      <h2>외납세 간이 계산기</h2>
      <div>
        <h4>준비물</h4>
        원천징수영수증
        <span
          @click="showModalDownloadGuide = true"
          style="color: blue; cursor: pointer; font-size: 0.7em"
          >어디서 다운받나요?</span
        >
      </div>
      <div>
        <h4>유의사항</h4>
        <ul>
          <li>
            모든 급여가 원천징수영수증에 포함되어 있지 않다면 실제 공제액은
            달라질 수 있음.
          </li>
          <li>
            원천징수영수증에 없는 근로소득(해외지급액)은 별도의 종합소득세
            신고를 통해 신고하여야 할 수 있음.
          </li>
        </ul>
      </div>
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

      <v-dialog v-model="showModalDownloadGuide" width="500">
        <DownloadGuideModal />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import DownloadGuideModal from "@/components/DownloadGuideModal.vue";
export default {
  components: { DownloadGuideModal },
  data() {
    return {
      showModalDownloadGuide: false,
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
