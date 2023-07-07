function deduction(income) {
  console.log('유틸에서받은 인컴값', income, typeof(income))
  income = isNaN(income) ? parseInt(income) : income;
  console.log('계산에사용되는 인컴값', income, typeof(income))
  let result = 0;

  if (income <= 5000000) {
    result = income * 0.7;
    console.log(result)
  } else if (income <= 15000000) {
    result = 3500000 + (income - 5000000) * 0.4;
    console.log(result)
  } else if (income <= 45000000) {
    result = 7500000 + (income - 15000000) * 0.15;
    console.log(result)
  } else if (income <= 100000000) {
    result = 12000000 + (income - 45000000) * 0.05;
    console.log(result)
  } else {
    result = 14750000 + (income - 100000000) * 0.02;
    console.log(result)
  }
  console.log(parseInt(result))
  return parseInt(result);
}

export { deduction };
