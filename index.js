const factorial = (n) => {
  let num = 1;
  for (let index = 1; index <= n; index++) {
    num = num * index;
  }
  return num;
};



console.log(factorial(6));
