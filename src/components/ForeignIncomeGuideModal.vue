<template>
  <div>
    [국외근로소득 입력 방법]
    <ul>
      <li>국외에서 일하고 받은 소득은 모두 국외근로소득입니다.</li>
      <li>
        하기에 당해년도의 국외근무기간을 입력하면 총 급여를 기준으로 안분하여
        국외원천근로소득을 계산해 볼 수 있습니다.
      </li>
    </ul>
    <br />
    입력된 연간 총급여 | {{ value }}
    <v-form>
      <v-text-field
        v-model="annualIncome"
        label="연간 총급여"
        type="number"
        required
      />
      <v-combobox
        label="계산 기준년도"
        v-model="selectedYear"
        :items="['2023', '2022', '2021', '2020', '2019', '2018']"
      ></v-combobox>

      <v-text-field
        v-model="startDate"
        :label="`${selectedYear}년의 해외근무 시작일 (${selectedYear}년 이전 시작의 경우, ${selectedYear}-01-01)`"
        required
        type="date"
      />
      <v-text-field
        v-model="endDate"
        :label="`${selectedYear}년의 해외근무 종료일 (${selectedYear}년 이후 종료 예정의 경우, ${selectedYear}-12-31)`"
        required
        type="date"
      />
    </v-form>
    <div>
      해외근무 일수 | {{ daysInSelectedYear }}일 중 {{ foreignDays }}일
      <br />
      국외원천소득 | {{ foreignIncome.toLocaleString() }}원
      <br />
      국내원천소득 | {{ (annualIncome - foreignIncome).toLocaleString() }}원
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
  methods: {},
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
      return Number(((this.annualIncome * this.foreignDays) / this.daysInSelectedYear).toFixed(0));
    },
  },
};
</script>
<style scoped></style>
