import React from 'react'
import { Link } from 'react-router'
import appwriteService from "../Appwrite/DatabaseService/DataConfig"


function PostCard({ $id, title, featuredImage }) {

    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className="card" style={{ width: "18rem" }}>
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