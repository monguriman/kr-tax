function deduction(income) {
  income = parseInt(income);
  let result = 0;

  if (income <= 5000000) {
    result = income * 0.7;
  } else if (income <= 15000000) {
    result = 3500000 + (income - 5000000) * 0.4;
  } else if (income <= 45000000) {
    result = 7500000 + (income - 15000000) * 0.15;
  } else if (income <= 100000000) {
    result = 12000000 + (income - 45000000) * 0.05;
  } else {
    result = 14750000 + (income - 100000000) * 0.02;
  }

  return parseInt(result);
}

export { deduction };
