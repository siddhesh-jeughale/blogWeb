import React, { Children } from 'react'

function Button({
    // i thin children c is capital or small
    children,
    type="submit",
    className="",
    bgcolor="",
    ...props

}) {
  return (
   <button className={`btn btn-primary mb-3 ${bgcolor} ${className}`} {...props}>{children}</button>
  )
}

export default Button