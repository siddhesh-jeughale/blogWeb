import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import apiKey from "../Appwrite/AppwriteConfig/Config"


function RTE({name,
  label,
  control,
  defaultValue=""
}) {
  const key = apiKey.tinymceApikey;
  console.log(key)
  return (
    
    <div className="w-100 p-2">
     {
     label && <label >
            {label}
          </label>
      } l
      <Controller
        name={name||"content"}
        control={control}
        render={({field:{onChange}}) => (
          <Editor
          // apiKey='k7g5jtcdh5d146h0grli6599qjbi9ek6hse32s47dsh9ft8s'
          // apiKey={apiKey.tinymceApikey}
          init={{ 
            height:200,
            plugins: [
              // Core editing features
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until May 20, 2025:
              'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
          }}
          initialValue="Welcome to TinyMCE!"
          onEditorChange={onChange}
        />
        )}
      />
    </div>
  )
}

export default RTE