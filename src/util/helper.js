// non-function
// common use: Select/Dropdown
let Vgender = [
  {
    value: 'M',
    text: 'Male'
  },
  {
    value: 'F',
    text: 'Female'
  },
  {
    value: 'O',
    text: 'Others'
  }
]

let Vcivilstatus = [
  {
    value: 'S',
    text: 'Single'
  },
  {
    value: 'M',
    text: 'Married'
  }
]

let Vratetype = [
  {
    value: 'M',
    text: 'Monthly'
  },
  {
    value: 'D',
    text: 'Daily'
  }
]

let Vweek = [
  {
    value: '1',
    text: 'Monday'
  },
  {
    value: '2',
    text: 'Tuesday'
  },
  {
    value: '3',
    text: 'Wednesday'
  },
  {
    value: '4',
    text: 'Thursday'
  },
  {
    value: '5',
    text: 'Friday'
  },
  {
    value: '6',
    text: 'Saturday'
  },
  {
    value: '7',
    text: 'Sunday'
  }
]

let Vboolean = [
  {
    value: 'T',
    text: 'Yes'
  },
  {
    value: 'F',
    text: 'No'
  }
]

function VbooleanFn (value) {
  switch (value) {
    case 'T':
      return 'Yes'
    case 'F':
      return 'No'
  }
}

export { Vgender, Vcivilstatus, Vratetype, Vweek, Vboolean, VbooleanFn }
