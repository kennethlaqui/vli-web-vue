// this module is responsible for replacing corresponding value in the table.

function buildRateTypeFn (value) {
  switch (value) {
    case 'M':
      return 'Monthly'
    case 'D':
      return 'Daily'
  }
}

function VbuildRateTypeFn (value) {
  switch (value) {
    case 'M':
      return 'Monthly'
    case 'D':
      return 'Daily'
  }
}

export { VbuildRateTypeFn, buildRateTypeFn }
