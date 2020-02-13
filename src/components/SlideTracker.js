import React from 'react'

export default ({slideNumber,slidePosition}) => {

  return <div className="flex justify-center items-center">
    {[].fill(3).map((e,i) => {
      return <span key={i} className={`w-2 h-2 mr-2 rounded-full border border-gray-200 ${ slidePosition === i ? 'bg-gray-200' : ''}`}></span>
    })}
  </div>
}
