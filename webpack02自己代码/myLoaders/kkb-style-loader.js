module.exports = function (content) {
  return `const e = document.createElement('style')
  e.innerHTML = ${content}
  document.head.appendChild(e)
  `
}
//!暗号：可以做，但没必要
