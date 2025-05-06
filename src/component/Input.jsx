import React, { useId } from 'react'

const Input =  React.forwardRef(

    function Input({
        type='text',
        label,
        className="",
        ...props
    },ref) {
        const id = useId();
      return (
        <>
        <div className="w-100 mb-3">
            {
                label && <label htmlFor={id} className='form-label'>{label}</label>
            }
            <input type={type} className={`form-control ${className}`}
            id={id}
            {...props}
            ref={ref}
            />
        </div>
        </>
      )
    }
)

export default Input;