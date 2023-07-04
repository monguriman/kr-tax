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
        :value="value"

      >
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      annualIncome: this.value,
    };
  },
  mounted() {
    this.annualIncome = this.value;
  },
  props: ["value"],
  methods: {
    validateInput() {
      // 코드 작성
    },
  },
};
</script>

<style scoped></style>
