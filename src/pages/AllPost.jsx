import React, {useState,useEffect}from 'react'
import appwriteDBService from "../Appwrite/DatabaseService/DataConfig"
import { PostCard } from "../component"

function AllPost() {
  const [Post, setPosts] = useState([])
  useEffect(() => {}, [])

//  i think in the .then we can also use value in place of posts arrgument
  appwriteDBService.listofPost([]).then((posts)=>{
     if (posts) {
      setPosts(posts.documents)
     }
  })
  
  return (
    <div className='w-100'>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-center">
          {
          Post.map((post) =>(
            <div key={post.$id} className='p-2'>
              <PostCard post={post}/>
            </div>
          ))
          } 
        </div>
      </div>
    </div>
  )
}

export default AllPost
