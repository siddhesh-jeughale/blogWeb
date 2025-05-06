import React from 'react'
import { forwardRef, useId } from 'react';


function Select({
    label,
    options,
    className ,
    ...props
},ref) {
    const id = useId();
  return (
//     <div className="dropdown">
//   <button className="btn btn-secondary dropdown-toggle" type="button" id={id} data-bs-toggle="dropdown" aria-expanded="false">
    // {label}
//   </button>
//   <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//     <li><a class="dropdown-item" href="#">Action</a></li>
//     <li><a class="dropdown-item" href="#">Another action</a></li>
//     <li><a class="dropdown-item" href="#">Something else here</a></li>
    //   {
      // <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    //     {
    //         options?.map((option) => {
    //           <li key={option} value={option}>
    //             {option}
    //           </li>
    //         })
    //        }
    //   }
//   </ul>
// </div> 
    <div className='w-100'>
        {label && <label htmlFor={id} className={`${className}`}></label>}
        <select name="" 
        id={id}
         {...props}
         ref={ref}
         className={`${className}`}
         >
            /* if else loop also used */
            {/* {
              if(options){
                options.map((option) => {
                  <option key={option} value={option}>
                    {option}
                  </option>
                }
                )
              }
            } */}

           {
            options?.map((options) => {
              <option key={options} value={options}>
                {options}
              </option>
            })
           }
            </select>  
    </div>
  )
}

export default React.forwardRef(Select)
