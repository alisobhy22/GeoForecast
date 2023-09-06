import React from 'react'

export const Info = (props) => {
  return (
    <>
    <div>{props.country}</div>
    <div>{props.weather.toFixed(2)} C</div>
    </>
  )
}

export default Info