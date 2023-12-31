<template>
  <div>
    <h3 class="modal-title">국외근로소득 입력</h3>
    <hr class="hr-under-title" />
    <ul style="padding-left: 2em; margin: 1em 0 1em 0">
      <li style="margin-bottom: 7px">
        연간 총급여 중, 국외에서 일하고 받은 소득은 국외근로소득입니다.
      </li>
      <li>
        아래에 기준년도의 국외근무기간을 입력하면 총 급여를 기준으로
        국외근로소득을 계산해 볼 수 있습니다.
      </li>
    </ul>
    <v-form class="mt-3">
      <v-combobox
        label="계산 기준년도"
        v-model="selectedYear"
        :items="['2023', '2022', '2021', '2020', '2019', '2018']"
        variant="underlined"
      ></v-combobox>
      <v-text-field
        v-model="startDate"
        :label="`${selectedYear}년의 해외근무 시작일 (${selectedYear}년 이전 시작의 경우, ${selectedYear}-01-01)`"
        required
        type="date"
        variant="underlined"
      />
      <v-text-field
        v-model="endDate"
        :label="`${selectedYear}년의 해외근무 종료일 (${selectedYear}년 이후 종료 예정의 경우, ${selectedYear}-12-31)`"
        required
        type="date"
        variant="underlined"
      />
    </v-form>
    <div>
      <span v-if="inputError"
        ><v-icon
          icon="mdi-alert"
          class="icon"
          color="yellow-darken-3"
          size="small"
        />{{ inputError }}</span
      >
    </div>
    <div v-if="!inputError">
      <table>
        <tr>
          <td>
            <v-icon
              icon="mdi-numeric-1-circle-outline"
              class="number-icon"
              size="small"
            />입력된 총급여
          </td>
          <td style="text-align: right">
            {{ isNaN(value) ? '0' : Number(value).toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td>
            <v-icon
              icon="mdi-numeric-2-circle-outline"
              class="number-icon"
              size="small"
            />해외근무 일수
          </td>
          <td style="text-align: right">
            {{ foreignDays }} / {{ daysInSelectedYear }}
          </td>
        </tr>
        <tr>
          <td>
            <v-icon
              icon="mdi-numeric-3-circle-outline"
              class="number-icon"
              size="small"
            />국외근로소득
            <v-icon
              icon="mdi-numeric-1-circle-outline"
              class="number-icon"
              size="x-small"
            /><v-icon
              icon="mdi-close"
              class="number-icon"
              size="x-small"
            /><v-icon
              icon="mdi-numeric-2-circle-outline"
              class="number-icon"
              size="x-small"
            />
          </td>
          <td style="text-align: right">
            <span class="emphasis-text">{{
              isNaN(foreignIncome) ? '0' : Number(foreignIncome).toLocaleString() 
            }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <v-icon
              icon="mdi-numeric-4-circle-outline"
              class="number-icon"
              size="small"
            />국내근로소득
            <v-icon
              icon="mdi-numeric-1-circle-outline"
              class="number-icon"
              size="x-small"
            /><v-icon
              icon="mdi-minus"
              class="number-icon"
              size="x-small"
            /><v-icon
              icon="mdi-numeric-3-circle-outline"
              class="number-icon"
              size="x-small"
            />
          </td>
          <td style="text-align: right">
            {{ isNaN(annualIncome - foreignIncome) ? '0' : Number(annualIncome - foreignIncome).toLocaleString()  }}
          </td>
        </tr>
      </table>
      <v-btn
        @click="onSave"
        color="primary"
        class="d-flex align-center justify-center mx-auto"
      >
        적용
      </v-btn>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      annualIncome: this.value,
      selectedYear: 2022,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
    };
  },
  watch: {
    selectedYear(newVal) {
      this.startDate = `${newVal}-01-01`;
      this.endDate = `${newVal}-12-31`;
    },
  },
  mounted() {
    this.annualIncome = this.value;
  },
  props: ["value"],
  methods: {
    onSave() {
      this.$emit("save", Number(this.foreignIncome));
      this.$emit("close");
    },
  },
  computed: {
    foreignDays() {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      return daysDiff;
    },
    daysInSelectedYear() {
      return moment(String(this.selectedYear)).isLeapYear() ? 366 : 365;
    },
    foreignIncome() {
      return Number(
        (
          (this.annualIncome * this.foreignDays) /
          this.daysInSelectedYear
        ).toFixed(0)
      );
    },
    dateInvalid() {
      const startDateIsValid = moment(
        this.startDate,
        "YYYY-MM-DD",
        true
      ).isValid();
      const endDateIsValid = moment(this.endDate, "YYYY-MM-DD", true).isValid();
      return !startDateIsValid || !endDateIsValid;
    },
    inputError() {
      let errorMsg = "";
      if (!this.dateInvalid && this.startDate > this.endDate) {
        errorMsg = "시작일이 종료일보다 빠른지 확인해주세요.";
      }
      if (this.annualIncome < 0) {
        errorMsg += (errorMsg ? " " : "") + "소득은 음수일 수 없습니다.";
      }
      if (this.dateInvalid) {
        errorMsg += (errorMsg ? " " : "") + "올바른 날짜를 입력해주세요.";
      }
      if (this.startDate.slice(0, 4) != this.endDate.slice(0, 4)) {
        errorMsg +=
          (errorMsg ? " " : "") + "시작년도와 종료년도는 같아야 합니다.";
      }
      return errorMsg;
    },
  },
};
</script>
<style scoped></style>
