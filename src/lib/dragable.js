/* global WebKitCSSMatrix */

const settings = {
  snapBackDuration: 300,
  maxTilt: 10,
  bouncePower: 0.2,
  swipeThreshold: 0.3 // px/s
}

const initDragebles = () => {
  const dragables = document.querySelectorAll('.dragable')
  dragables.forEach((dragable) => {
    let offset = { x: null, y: null }
    let speed = { x: 0, y: 0 }
    let lastLocation = { x: 0, y: 0, time: new Date().getTime() }
    dragable.addEventListener(('touchstart'), (e) => {
      offset = dragableTouchstart(e, dragable, offset)
    })
    dragable.addEventListener(('touchmove'), (e) => {
      const newLocation = dragableTouchmove(e, dragable, offset, lastLocation)
      speed = calcSpeed(lastLocation, newLocation)
      lastLocation = newLocation
    })
    dragable.addEventListener(('touchend'), (e) => {
      dragableTouchend(e, dragable, speed)
    })
  })
}

const dragableTouchstart = (e, element, offset) => {
  const touchLocation = e.targetTouches[0]
  offset.x = -touchLocation.clientX
  offset.y = -touchLocation.clientY
  // console.log('Offset: ' + offset.x + ', ' + offset.y)
  return offset
}

const dragableTouchmove = (e, element, offset, lastLocation) => {
  const touchLocation = e.targetTouches[0]
  const pos = { x: touchLocation.clientX + offset.x, y: touchLocation.clientY + offset.y }
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() }
  const translation = translationString(pos.x, pos.y)
  // const rotCalc = pos.x / (window.innerWidth + offset.x)
  const rotCalc = calcSpeed(lastLocation, newLocation).x
  const rotation = rotationString(rotCalc * settings.maxTilt)
  element.style.transform = translation + rotation
  return newLocation
}

const calcSpeed = (oldLocation, newLocation) => {
  const dx = newLocation.x - oldLocation.x
  const dy = oldLocation.y - newLocation.y
  const dt = newLocation.time - oldLocation.time
  return { x: dx / dt, y: dy / dt }
}

const translationString = (x, y) => {
  const translation = 'translate(' + x + 'px, ' + y + 'px)'
  return translation
}

const rotationString = (rot) => {
  const rotation = 'rotate(' + rot + 'deg)'
  return rotation
}

const getTranslate = (element) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)
  const ans = { x: matrix.m41, y: matrix.m42 }
  return ans
}

const getRotation = (element) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)
  const ans = -Math.asin(matrix.m21) / (2 * Math.PI) * 360
  return ans
}

const dragableTouchend = (e, element, speed) => {
  if (Math.abs(speed.x) > settings.swipeThreshold | Math.abs(speed.y) > settings.swipeThreshold) { // Swipe recognized
    if (Math.abs(speed.x) > Math.abs(speed.y)) {
      if (speed.x > 0) {
        console.log('Swipe right!')
      } else {
        console.log('Swipe left!')
      }
    } else {
      if (speed.y > 0) {
        console.log('Swipe up!')
      } else {
        console.log('Swipe down!')
      }
    }
  }
  element.style.transition = settings.snapBackDuration + 'ms'
  const startingPoint = getTranslate(element)
  const translation = translationString(startingPoint.x * -settings.bouncePower, startingPoint.y * -settings.bouncePower)
  const rotation = rotationString(getRotation(element) * -settings.bouncePower)
  element.style.transform = translation + rotation

  setTimeout(() => {
    element.style.transform = 'none'
  }, settings.snapBackDuration * 0.75)

  setTimeout(() => {
    element.style.transition = '10ms'
  }, settings.snapBackDuration)
}

initDragebles()
