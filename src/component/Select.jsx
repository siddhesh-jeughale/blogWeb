import React from 'react'
import { forwardRef, useId } from 'react';


function Select({
  label,
  options,
    className ,
    ...props
},ref) {
    const id = useId();
    // console.log(options)

  return (
    <div className='w-100 mb-4'>
        {label && <label htmlFor={id} className="mb-2">{label}</label>}
        <select  name=""
        id={id}
         {...props}
         ref={ref}
         className=" form-select"
         >
           {
            options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
           }
            </select>  
    </div>
  )
}

export default React.forwardRef(Select)
