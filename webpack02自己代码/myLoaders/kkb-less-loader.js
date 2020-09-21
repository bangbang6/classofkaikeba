const less = require('less')
module.exports = function (content) {
  less.render(content, (err, output) => {
    this.callback(err, output.css)
  })
}
//!暗号：可以做，但没必要
