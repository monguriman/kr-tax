<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="annualIncome"
        label="연간 총급여"
        type="text"
        required
        @input="validateInput('annualIncome')"
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
        type="text"
        required
        @input="validateInput('foreignIncome')"
        variant="underlined"
      >
        <span
          class="modal-guide-text-in-input"
          @click="showForeignIncomeGuideModal = true"
        >
          어떻게 계산하나요?
        </span>
      </v-text-field>

      <v-text-field
        v-model="koreanIncome"
        label="연간 총급여 중 국내근로소득 (자동입력)"
        type="text"
        required
        @input="validateInput('koreanIncome')"
        variant="underlined"
        readonly
      ></v-text-field>
      <v-text-field
        v-model="calculatedTax"
        label="산출세액"
        type="text"
        required
        @input="validateInput('calculatedTax')"

        variant="underlined"
        ><span
          class="modal-guide-text-in-input"
          @click="showCalculatedTaxGuideModal = true"
          >어느 금액을 적나요?</span
        ></v-text-field
      >
    </v-form>
    <div>
      <h2>외국납부세액공제 적용 가능액</h2>
      <hr class="hr-under-title" />
      <p v-if="foreignTaxCredit == null">
        값을 모두 입력하세요. <span>{{ inputError }}</span>
      </p>

      <div v-if="foreignTaxCredit !== null && !inputError">
        <v-container style="width: 40em">
          <v-row no-gutters>
            <v-col cols="12" sm="3" align-self="center">
              <v-sheet class="ma-2 pa-2 text-center">
                <div style="font-size: 0.6em">결과</div>
                <span class="emphasis-text"
                  >{{ foreignTaxCredit.toLocaleString() }}원</span
                >
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="1" align-self="center">
              <v-sheet class="ma-2 pa-2 text-center"> = </v-sheet>
            </v-col>
            <v-col cols="12" sm="2" align-self="center">
              <v-sheet class="ma-2 pa-2 text-center">
                <div style="font-size: 0.6em">산출세액</div>
                {{ calculatedTax.toLocaleString() }}
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="1" align-self="center">
              <v-sheet class="ma-2 pa-2 text-center"> × </v-sheet>
            </v-col>
            <v-col cols="12" sm="5" align-self="center">
              <v-sheet class="ma-2 pa-2 text-center">
                <div style="font-size: 0.6em">국외근로소득 - 근로소득공제</div>
                ({{ foreignIncome.toLocaleString() }} -
                {{ deduction(isNaN(this.foreignIncome)? parseFloat(this.foreignIncome.replace(/,/g, "")) : this.foreignIncome).toLocaleString() }})
                <hr />
                ({{ annualIncome.toLocaleString() }} -
                {{ deduction(isNaN(this.annualIncome)? parseFloat(this.annualIncome.replace(/,/g, "")) : this.annualIncome).toLocaleString() }})
                <div style="font-size: 0.6em">국내근로소득 - 근로소득공제</div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <br />한국에서 동일 국외근로소득에 대해 이미 세금을 냈거나 월급에서
        원천징수되었다면, 최대
        <span class="emphasis-text"
          >{{ foreignTaxCredit.toLocaleString() }}원</span
        >의 세금을 환급받을 수 있습니다.
      </div>
    </div>
  </v-container>

  <v-dialog v-model="showAnnualIncomeGuideModal">
    <div class="modal">
      <v-icon
        icon="mdi-close"
        class="close-button"
        @click="showAnnualIncomeGuideModal = false"
      />
      <AnnualIncomeGuideModal />
      <v-btn
        @click="showAnnualIncomeGuideModal = false"
        color="primary"
        class="d-flex align-center justify-center mx-auto"
      >
        닫기
      </v-btn>
    </div>
  </v-dialog>

  <v-dialog v-model="showForeignIncomeGuideModal">
    <div class="modal">
      <v-icon
        icon="mdi-close"
        class="close-button"
        @click="showForeignIncomeGuideModal = false"
      />
      <ForeignIncomeGuideModal
        :value="parseFloat(annualIncome.replace(/,/g, ''))"
        @save="onForeignIncomeUpdated"
        @close="showForeignIncomeGuideModal = false"
      />
    </div>
  </v-dialog>

  <v-dialog v-model="showCalculatedTaxGuideModal">
    <div class="modal">
      <v-icon
        icon="mdi-close"
        class="close-button"
        @click="showCalculatedTaxGuideModal = false"
      />

      <CalculatedTaxGuideModal />
      <v-btn
        @click="showCalculatedTaxGuideModal = false"
        color="primary"
        class="d-flex align-center justify-center mx-auto"
      >
        닫기
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
import AnnualIncomeGuideModal from "./AnnualIncomeGuideModal.vue";
import ForeignIncomeGuideModal from "./ForeignIncomeGuideModal.vue";
import CalculatedTaxGuideModal from "./CalculatedTaxGuideModal.vue";

import { deduction } from "../util/util";

export default {
  components: {
    AnnualIncomeGuideModal,
    ForeignIncomeGuideModal,
    CalculatedTaxGuideModal,
  },
  data() {
    return {
      showAnnualIncomeGuideModal: false,
      showForeignIncomeGuideModal: false,
      showCalculatedTaxGuideModal: false,
      annualIncome: "",
      foreignIncome: "",
      calculatedTax: "",
    };
  },
  computed: {
    koreanIncome: {
  get() {
    const annualIncomeParsed = this.annualIncome.replace(/,/g, "") !== "" ? parseFloat(this.annualIncome.replace(/,/g, "")) : 0;
    const foreignIncomeParsed = isNaN(this.foreignIncome) ? (this.foreignIncome.replace(/,/g, "") !== "" ? parseFloat(this.foreignIncome.replace(/,/g, "")) : 0) : this.foreignIncome;

    return annualIncomeParsed - foreignIncomeParsed;
  },
  set(value) {
    this.foreignIncome = parseFloat(this.annualIncome.replace(/,/g, "")) - value;
  },
},

    foreignTaxCredit() {
      if (this.annualIncome && this.foreignIncome && this.calculatedTax) {
        const annualIncome = parseFloat(this.annualIncome.replace(/,/g, ""));
        const foreignIncome = isNaN(this.foreignIncome)? parseFloat(this.foreignIncome.replace(/,/g, "")) : this.foreignIncome
        const calculatedTax = parseFloat(this.calculatedTax.replace(/,/g, ""))
        const foreignTaxCredit =
          (calculatedTax *
            (foreignIncome - deduction(isNaN(this.foreignIncome)? parseFloat(this.foreignIncome.replace(/,/g, "")) : this.foreignIncome))) /
          (annualIncome - deduction(isNaN(this.annualIncome)? parseFloat(this.annualIncome.replace(/,/g, "")) : this.annualIncome));
        return Number(foreignTaxCredit.toFixed(0));
      } else {
        return null;
      }
    },
    inputError() {
      let errorMsg = "";
      if (
        this.annualIncome < 0 ||
        this.foreignIncome < 0 ||
        this.calculatedTax < 0 ||
        this.koreanIncome < 0
      ) {
        errorMsg +=
          (errorMsg ? " " : "") +
          "국외근로소득은 연간 총급여보다 작아야 합니다.";
      }

      return errorMsg;
    },
  },
  methods: {
    validateInput(income) {
      let value = this[income];
      if (value !== null && value !== undefined) {
        value = Number(value.replaceAll(",", ""));
        if (isNaN(value)) {
          this[income] = 0;
        } else {
          const formatValue = value.toLocaleString("ko-KR");
          this[income] = formatValue;
        }
      }
    },
    onForeignIncomeUpdated(value) {
      this.foreignIncome = value;
    },
    deduction: deduction,
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
