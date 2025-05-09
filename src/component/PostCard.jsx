import React from 'react'
import { Link } from 'react-router'
import appwriteService from "../Appwrite/DatabaseService/DataConfig"


function PostCard({ $id, title, featuredImage }) {
     console.log(appwriteService.getFilePreview(featuredImage));
    return (
        <>
            <Link to={`/post/${$id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ width: "300px",height:"300px" }}>
                    <img src={appwriteService.getFilePreview(featuredImage)}
                        className='card-img-top'
                        alt={title} />

                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default PostCard;     