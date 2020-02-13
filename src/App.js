import React, { useState, useRef, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import images from './images'
import './styles.css'
import SlideTracker from './components/SlideTracker'

export default function App() {
  const stateCapturer = useRef(0)

  const [state, setState] = useState(0)
  const [slidePosition, setSlidePosition] = useState(0)
  const transition = useTransition(state, k => k, {
    initial: null,
    ...setStyle(),
    onDestroyed: () => setSlidePosition(galeryInterval(state))
  })
  const galeryInterval = fixedIntervalFactory(images.length)
  useEffect(() => {
    stateCapturer.current = state
  })
  const prevState = stateCapturer.current
  return (
    <div className="App relative w-screen h-screen flex justify-center item-center">
      {transition.map(({ item, key, props }) => {
        return (
          <animated.div key={key} style={props} className="w-full h-full absolute will-change">
            <img src={images[galeryInterval(item)]} alt="Nature" className="w-full h-full" />
          </animated.div>
        )
      })}
      <span
        className="point-left  p-3 rounded-full text-xl text-white text-center bg-black cursor-pointer"
        onClick={goLeft}
      >
        <IoIosArrowBack />
      </span>
      <span
        className="point-right p-3 rounded-full text-xl text-white text-center bg-black cursor-pointer"
        onClick={goRight}
      >
        <IoIosArrowForward />
      </span>
      <SlideTracker slides={images.length} slidePosition={slidePosition} />
    </div>
  )
  function goLeft() {
    setState(prevState - 1)
  }
  function goRight() {
    setState(prevState + 1)
  }
  function setStyle() {
    if (state > stateCapturer.current) {
      return {
        from: { opacity: 0, transform: 'translate3d(50%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0.5, transform: 'translate3d(-50%,0,0)' }
      }
    } else {
      return {
        from: {
          opacity: 0,
          transform: 'translate3d(-50%,0,0)'
        },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0.5, transform: 'translate3d(50%,0,0)' }
      }
    }
  }
}

function fixedIntervalFactory(interval) {
  return value => {
    value = Math.abs(value)
    console.log(value % interval, 'interval')
    return value % interval
  }
}
