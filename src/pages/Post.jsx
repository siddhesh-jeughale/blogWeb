import React from 'react'
import { useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router'
import appwriteService from '../Appwrite/DatabaseService/DataConfig'
import { Button } from '../component';
import parse from "html-react-parser";

function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=> state.author.userData);
    const isAuthor = post && userData? post.userId === userData.$id : false;

    useEffect(() => {
        // here i give the error Appwrite serive :: getPost :: error AppwriteException: Invalid `queries` param: Value must a valid array no longer than 100 items and Value must be a valid string and at least 1 chars and no longer than 4096 chars
        console.log("post component")
        if (slug) {
            console.log("slug in post-jsx:",slug);
            appwriteService.getPost(slug).then((Post) => {
                if (Post) {
                    setPost(Post);
                }
                else navigate("/");
            });
        }
        else navigate("/");
    },[slug,navigate]);

    const deletePost = () => {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/")
        }
      });
    }
    
  return post? (
    <div className="py-4" style={{height:"680px",backgroundColor:'yellow'}}>
        <div className="container">
            <div className="w-100 mb-4 rounded-3 p-2 position-relative" style={{backgroundColor:"gainsboro"}}>
                <img 
                src={appwriteService.getFilePreview(post.featuredImage)} 
                alt={post.title}
                className='rounded-3' 
                />

                {isAuthor &&(
                     <div className="">
                     <Link to={`/edit-post/${post.$id}`}>
                         <Button className="me-3 btn-success">
                             Edit
                         </Button>
                     </Link>
                     <Button className="btn-danger" onClick={deletePost}>
                         Delete.
                     </Button>
                 </div>
                )}
                 <div className="w-full mb-6">
                    <h1 className=" font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </div>
        </div>
    </div>
  ):null;
}

export default Post