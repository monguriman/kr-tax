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
        @input="updateDateYear"
      ></v-combobox>
      <v-text-field
        ref="startDatePicker"
        v-model="startDate"
        :label="`${selectedYear}년의 해외근무 시작일 (${selectedYear}년 이전 시작의 경우, ${selectedYear}-01-01)`"
        required
        type="date"
        @click="openStartDatePicker"
      />
      <v-text-field
        ref="endDatePicker"
        v-model="endDate"
        :label="`${selectedYear}년의 해외근무 종료일`"
        required
        type="date"
        @click="openEndDatePicker"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      annualIncome: this.value,
      selectedYear: '2022',
      startDate: null,
      endDate: null,
    };
  },
  mounted() {
    this.annualIncome = this.value;
  },
  props: ["value"],
  methods: {
    updateDateYear() {
      this.startDate = `${this.selectedYear}-01-01`;
      this.endDate = `${this.selectedYear}-01-01`;
    },
    openStartDatePicker() {
      this.$nextTick(() => {
        this.$refs.startDatePicker.$el.querySelector('input').focus();
      });
    },
    openEndDatePicker() {
      this.$nextTick(() => {
        this.$refs.endDatePicker.$el.querySelector('input').focus();
      });
    },
  },
};
</script>

<style scoped></style>
