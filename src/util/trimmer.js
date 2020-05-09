/*
  trimmer for object, array object / json file
  does not support nested array
*/

// if type of item is object {}, use this function to trim all string except null value
// common use: textfield or input field
function VtrimObject (item) {
  for (var key in item) {
    if (item[key] !== null) {
      if (item[key].trim) {
        item[key] = item[key].trim()
      }
    }
  }
}

// use in json api response.
// example: 0: { name: 'Admin'}, 1: { name 'moderator' }
function VtrimArrayObject (item) {
  item.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      item[key] = item[key].trim()
    })
  })
}

export { VtrimObject, VtrimArrayObject }
