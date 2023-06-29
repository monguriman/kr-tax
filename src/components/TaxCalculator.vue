<template>
  <div>
    <v-container>
      <h1>Foreign Tax Credit Calculator</h1>
      <v-form @submit.prevent="calculateForeignTaxCredit">
        <v-text-field
          v-model="annualIncome"
          label="Annual Total Income"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="foreignIncome"
          label="Foreign Income"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="taxableIncome"
          label="Taxable Income"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="foreignTaxPaid"
          label="Foreign Tax Paid"
          type="number"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Calculate</v-btn>
      </v-form>
      <div v-if="foreignTaxCredit !== null">
        <h2>Foreign Tax Credit:</h2>
        <p>
          Calculation: ({{ taxableIncome }} / {{ annualIncome }}) * {{ foreignIncome }} = {{ foreignTaxCredit }}
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
      taxableIncome: 0,
      foreignTaxPaid: 0,
      foreignTaxCredit: null,
    };
  },
  methods: {
    calculateForeignTaxCredit() {
      if (
        this.annualIncome &&
        this.foreignIncome &&
        this.taxableIncome &&
        this.foreignTaxPaid
      ) {
        const foreignTaxCredit =
          (this.taxableIncome / this.annualIncome) * this.foreignIncome;
        this.foreignTaxCredit = foreignTaxCredit.toFixed(2);
      } else {
        this.foreignTaxCredit = null;
      }
    },
  },
};
</script>
