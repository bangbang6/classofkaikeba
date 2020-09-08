let circle = document.querySelector('.circle')
function getNum(distance) {
  return parseInt(distance.replace(/px/, ''))
}

circle.style.left = '1px'
circle.style.top = '1px'
document.onkeydown = (e) => {
  console.log(circle.style.top)
  switch (e.key) {
    case 'a':
      circle.style.left = getNum(circle.style.left) - 5 + 'px'
      break
    case 'w':
      circle.style.top = getNum(circle.style.top) - 5 + 'px'
      break
    case 'd':
      circle.style.left = getNum(circle.style.left) + 5 + 'px'
      break
    case 's':
      circle.style.top = getNum(circle.style.top) + 5 + 'px'
      break
  }
}
