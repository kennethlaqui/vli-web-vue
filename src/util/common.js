// accepting plain object only.
function objectAssign (item, obj = {}) {
  Object.keys(item).forEach(key => {
    obj[key] = item[key]
  })
  return obj
}

export { objectAssign }
