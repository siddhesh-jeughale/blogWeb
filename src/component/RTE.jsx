import React from 'react'
import { Editor } from 'tinymce'
import { Controller } from 'react-hook-form'


function RTE({name,
  label,
  control,
  defaultValue=""
}) {
  return (
    
    <div className="w-100 p-2">
     {
     label && <label className='d-inline-block'>
            {label}
          </label>
      } l
      <Controller
        name={name||"content"}
        control={control}
        render={({field :{onChange}}) => {
          <Editor
          initialValue ={defaultValue}
          init={{
            initialValue: defaultValue,
            height:500,
            menubar:true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
          }}
          onEdtiorChange =  {onChange}
          />
        }
        }
      />
    </div>
  )
}

export default RTE