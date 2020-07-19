// accepting plain object only.
function objectAssign (item, obj = {}) {
  Object.keys(item).forEach(key => {
    obj[key] = item[key]
  })
  return obj
}

function formatNumber (value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export { objectAssign, formatNumber }
