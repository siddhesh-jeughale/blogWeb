import React,{useCallback, useState}from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import DBService from "../Appwrite/DatabaseService/DataConfig"
import { useForm } from 'react-hook-form'
import {Input,Button,RTE,Select} from "../component"


function PostForm({post}) {
    const {register,handleSubmit,watch,control,getValues,setValue} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.$id || "",
            content:post?.content || "",
            status:post?.status || "active"
        } 
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.author.userData)
   console.log(userData)
    const submit = async (data) =>{
      console.log("submit data to appwrite",data);
        // jr post asel tr -edit post madhun recieved hoil hei post
        if(post){
            const file = data.image[0] ? DBService.uploadFile(data.image[0]) 
            : null
            // data.image[0] means first image present with in the data Array

            // jr old  post asel tr delete kara
            if(file){
                 DBService.deleteFile(post.featuredImage)
            }
            // here is an error 
            const dbpost = await DBService.UpdatePost(post.$id,{
                ...data,
                featuredImage: file? (await file).$id : undefined
            })
            if(dbpost){
              console.log(dbpost.$id)
              // hya sathi post component pahije pages madhe
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
          //to check the image prsent in data or not
          const file = await DBService.uploadFile(data.image[0])

          if (file) {
            console.log('file with image:',file);
            // assign to fileId is extra line we also use the line next 
            const fileId = file.$id;
            data.featuredImage = fileId;
           const dbpost= await DBService.CreatePost({
              ...data,
              userId: userData.$id
            })
            if (dbpost) {
              console.log("dbpost:",dbpost)
               console.log("dbpost id:",dbpost.$id)
              navigate(`/post/${dbpost.$id}`)
            }
          }
        }
        // jr post nasel tr
    }

    const slugTransform = useCallback((value) => {
      if(value && typeof value === 'string'){
        return value
        .trim()
        .toLowerCase()
        .replace(/^[\d\s]/g,'-')
        .replace(/\s/g, "-");
      }
      else{
        return ""
      }
    },[])

    React.useEffect(() => {
      const subscription = watch((value, {name}) => {
          if (name === "title") {
              setValue("slug", slugTransform(value.title), { shouldValidate: true });
          }
      });

      return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
    
  return (
    <div  style={{height:"700px",width:"100%"}} className='p-3'>
           <form onSubmit={handleSubmit(submit)} className='row g-3'>
            <div className="col-6">
            <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

            </div>
            <div className="col-6">
            <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={DBService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
            </div>
            <div className="col-6">
            <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>

            <div className="col-6">
            <Select
                    label="Status :"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />
            </div>

            <div className="col-12 d-flex align-items-center justify-content-center">
            <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            <div className="col-12">
            {/* <RTE 
            label="Content :"
             name="content" 
             control={control} 
             defaultValue={getValues("content")}
            /> */}
            </div>
           </form>
    </div>
  )
}

export default PostForm
