import React, { useCallback } from 'react'
const sleep = require('p-sleep')
/* global WebKitCSSMatrix */

const Swipable = ({ removeOnSwipe, children, onSwipe }) => {
  let offset = { x: null, y: null }
  let speed = { x: 0, y: 0 }
  let lastLocation = { x: 0, y: 0, time: new Date().getTime() }

  const settings = {
    snapBackDuration: 300,
    maxTilt: 5,
    bouncePower: 0.2,
    swipeThreshold: 300 // px/s
  }

  const getElementSize = (element) => {
    const elementStyles = window.getComputedStyle(element)
    const widthString = elementStyles.getPropertyValue('width')
    const width = Number(widthString.split('px')[0])
    const heightString = elementStyles.getPropertyValue('height')
    const height = Number(heightString.split('px')[0])
    return { x: width, y: height }
  }

  const pythagoras = (x, y) => {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  }

  const animateOut = async (element, speed) => {
    const startPos = getTranslate(element)
    const bodySize = getElementSize(document.body)
    const diagonal = pythagoras(bodySize.x, bodySize.y)

    const velocity = pythagoras(speed.x, speed.y)
    const time = diagonal / velocity
    const multiplier = diagonal / velocity

    const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y)
    const rotateString = rotationString(getRotation(element))

    element.style.transition = 'ease-out ' + time + 's'
    element.style.transform = translateString + rotateString

    await sleep(time * 1000)
    return true
  }

  const animateBack = (element) => {
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

  const returnSwipeDirection = (speed) => {
    if (Math.abs(speed.x) > Math.abs(speed.y)) {
      if (speed.x > 0) {
        onSwipe('right')
      } else {
        onSwipe('left')
      }
    } else {
      if (speed.y > 0) {
        onSwipe('up')
      } else {
        onSwipe('down')
      }
    }
  }

  const calcSpeed = (oldLocation, newLocation) => {
    const dx = newLocation.x - oldLocation.x
    const dy = oldLocation.y - newLocation.y
    const dt = (newLocation.time - oldLocation.time) / 1000
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

  const dragableTouchend = async (element, speed) => {
    if (Math.abs(speed.x) > settings.swipeThreshold | Math.abs(speed.y) > settings.swipeThreshold) { // Swipe recognized
      if (removeOnSwipe) {
        if (await animateOut(element, speed)) {
          returnSwipeDirection(speed)
        }
      } else {
        animateBack(element)
        returnSwipeDirection(speed)
      }
    } else {
      animateBack(element)
    }
  }

  const dragableTouchmove = (coordinates, element, offset, lastLocation) => {
    const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y }
    const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() }
    const translation = translationString(pos.x, pos.y)
    const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000
    const rotation = rotationString(rotCalc * settings.maxTilt)
    element.style.transform = translation + rotation
    return newLocation
  }

  const touchCoordinatesFromEvent = (e) => {
    const touchLocation = e.targetTouches[0]
    return { x: touchLocation.clientX, y: touchLocation.clientY }
  }

  const mouseCoordinatesFromEvent = (e) => {
    return { x: e.clientX, y: e.clientY }
  }

  const ref = useCallback((element) => {
    let mouseIsClicked = false

    element.addEventListener(('touchstart'), (ev) => {
      ev.preventDefault()
      offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y }
    })
    element.addEventListener(('mousedown'), (ev) => {
      ev.preventDefault()
      mouseIsClicked = true
      offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y }
    })

    element.addEventListener(('touchmove'), (ev) => {
      ev.preventDefault()
      const newLocation = dragableTouchmove(touchCoordinatesFromEvent(ev), element, offset, lastLocation)
      speed = calcSpeed(lastLocation, newLocation)
      lastLocation = newLocation
    })
    element.addEventListener(('mousemove'), (ev) => {
      ev.preventDefault()
      if (mouseIsClicked) {
        const newLocation = dragableTouchmove(mouseCoordinatesFromEvent(ev), element, offset, lastLocation)
        speed = calcSpeed(lastLocation, newLocation)
        lastLocation = newLocation
      }
    })

    element.addEventListener(('touchend'), (ev) => {
      ev.preventDefault()
      dragableTouchend(element, speed)
    })
    element.addEventListener(('mouseup'), (ev) => {
      ev.preventDefault()
      mouseIsClicked = false
      dragableTouchend(element, speed)
    })
    element.addEventListener(('mouseleave'), (ev) => {
      ev.preventDefault()
      mouseIsClicked = false
      dragableTouchend(element, speed)
    })
  })
  return <div ref={ref}>{children}</div>
}
export default Swipable
