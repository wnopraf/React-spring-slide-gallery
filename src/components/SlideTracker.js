import React from 'react'

export default ({ slides, slidePosition }) => {
  return (
    <div className="slide-tracker flex justify-center items-center">
      {Array(slides)
        .fill(null)
        .map((e, i) => {
          return (
            <span
              key={i}
              className={`w-2 h-2 mr-2 rounded-full border border-gray-200 ${
                slidePosition === i ? 'bg-gray-200' : ''
              }`}
            ></span>
          )
        })}
    </div>
  )
}
