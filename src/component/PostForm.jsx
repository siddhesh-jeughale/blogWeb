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
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || "active"
        } 
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.author.userStatus)

    const submit = async (data) =>{
        // jr post asel tr
        if(post){
            const file = data.image[0] ? DBService.uploadFile(data.image[0]) 
            : null

            // jr old  post asel tr delete kara
            if(file){
                 DBService.deleteFile(post.featuredImage)
            }
            const dbpost = await DBService.UpdatePost(post.$id,{
                ...data,
                featuredImage: file? (await file).$id : undefined
            })
            if(dbpost){
              // hya sathi post component pahije
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
          // this is for me to check
          const file = await DBService.uploadFile(data.image[0])

          if (file) {
            const fileId = file.$id
            data.featuredImage = fileId
           const dbpost= await DBService.CreatePost({
              ...data,
              UserID :userData.$id,
            })
            if (dbpost) {
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
        .replace(/^[a-zA-z\d\s]/g,'-')
      }
      else{
        return ""
      }
    },[])

    React.useEffect(() => {
      const subscription = watch((value, { name }) => {
          if (name === "title") {
              setValue("slug", slugTransform(value.title), { shouldValidate: true });
          }
      });

      return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
    
  return (
    <div  style={{height:"700",width:"100%"}}>
           <form onSubmit={handleSubmit(submit)} className='row g-3'>
            <div className="col-8">
            <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

            </div>
            <div className="col-4">
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
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
            </div>
            <div className="col-8">
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
            <div className="col-4">
            <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
            </div>
            <div className="col-12">
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
           </form>
    </div>
  )
}

export default PostForm
