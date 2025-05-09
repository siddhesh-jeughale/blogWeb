import React,{useState,useEffect}from 'react'
import { useNavigate} from 'react-router'
import { useParams } from 'react-router'
import appwriteDBService from "../Appwrite/DatabaseService/DataConfig"
import { PostForm } from '../component'

function EditPost() {
    const [Post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
      if (slug) {
        appwriteDBService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        })
      }
      else
      {
        navigate("/")
      }
    }, [slug,navigate])
    
  return Post ? (
   <div className="w-100">
    <div className="container">
        <PostForm post={Post}/>
    </div>
   </div>
  ) : null
}

export default EditPost
