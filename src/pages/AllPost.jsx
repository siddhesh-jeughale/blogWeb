import React, {useState,useEffect}from 'react'
import appwriteDBService from "../Appwrite/DatabaseService/DataConfig"
import { PostCard } from "../component"

function AllPost() {
  const [Post, setPosts] = useState([])

//  todo:-here is an another problem listof post query
  useEffect(() => {
    appwriteDBService.listofPost([]).then((posts)=>{
       if (posts) {
        setPosts(posts.documents)
       }
    })
  }, [])


  
  return (
    <div className='w-100' style={{height:"680px",backgroundColor:"rebeccapurple"}}>
      <div className="container py-4 h-100">
        <div className="d-flex align-items-center justify-content-center" style={{flexWrap:"wrap"}}>
          {
          Post.map((post) =>(
            <div key={post.$id} className='p-2'>
              <PostCard {...post}/>
            </div>
          ))
          } 
        </div>
      </div>
    </div>
  )
}

export default AllPost
