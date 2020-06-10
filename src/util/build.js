// this module is responsible for replacing corresponding value in the table.

function buildRateTypeFn (value) {
  // console.log(value)
  switch (value) {
    case 'M':
      return 'Monthly'
    case 'D':
      return 'Daily'
  }
}

export { buildRateTypeFn }
