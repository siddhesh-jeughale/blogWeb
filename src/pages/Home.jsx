import React from 'react'
import { useEffect ,useState} from 'react'
import appwriteDBservice from "../Appwrite/DatabaseService/DataConfig"
import { PostCard } from '../component';

function Home() {

 const [post,setPost] = useState([]);
    useEffect(() => {
      appwriteDBservice.listofPost().then((post)=>{
        if (post) {
            setPost(post.documents)
        }
      })
    },[])

    if (post.length===0) {
        return(
          <section className='main' style={{height:"680px", width:"100%"}}>
                  <div className="container d-flex align-items-center justify-content-center"  style={{height:"100%", width:"100%"}}>
                        <h1>Login to Read Post</h1>
                  </div>
          </section>
        )
    }
  return (
    <div className="w-100" style={{height:"680px"}}>
            <div className="container py-4">
                <div className="d-flex">
                    {
                    post.map((post) => {
                      <div key={post.$id}>
                        <PostCard {...post}/>
                      </div>
                    }
                    )}
                </div>
            </div>
        </div>
  )
}

export default Home