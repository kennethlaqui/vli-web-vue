function buildDescription (item = [], key, value, text) {
  return item.find(item => item.concat(key) === value).concat(text)
}

export { buildDescription }
