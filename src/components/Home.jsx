import React, { createContext, useContext, useEffect, useState } from 'react';
// import { BookOpen, Heart, MessageSquare, Share2 } from 'lucide-react';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { usercontext } from '../context/AuthContext';
import { postscontext } from '../context/PostContext';
import { CgProfile } from "react-icons/cg";

const Home = () => {

    let [commentText, setCommentText] = useState({});

    let navigate = useNavigate()

    let { currentuser } = useContext(usercontext)
    // console.log(currentuser.name);
    
    if (!currentuser.email) {
        navigate("/signin")
    }

    let { logoutdata } = useContext(usercontext)
    let { allpost } = useContext(postscontext)
    // console.log(allpost);

    let { likepost } = useContext(postscontext)
    // console.log(allpost)
    let {commentPost} = useContext(postscontext)
    let {deleteComment} = useContext(postscontext)

    let logout = () => {
        console.log("logout");
        logoutdata()
    }
    let handleLike = (val, index) => {
        likepost(val, index)
    }

    const handleCommentChange = (e, postId) => {
        let id = postId;
        let values = e.target.value
        setCommentText({ [id]: values })
    };
    const save = (postId) => {
        console.log(commentText[postId]);
        let newcomment = {
            comment: commentText[postId],
            user: currentuser.name
        }
        // console.log(newcomment);
        commentPost(newcomment, postId)
        setCommentText({})
    };
    let remove=(pos,commentid)=>{
        // let alldata={val,pos,i,}
        let alldata={pos,commentid}
        deleteComment(alldata)
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-yellow-200 text-black shadow-sm">
                <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            {/* <BookOpen className="h-8 w-8 text-blue-600" /> */}
                            <span className="ml-2 text-xl font-bold text-gray-900">Social Gram</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {currentuser.email ?
                                <>
                                    <div className='flex items-center gap-2'>
                                        <CgProfile className='text-2xl' />
                                        <h1 className='font-bold text-xl mb-2'>{currentuser.name}</h1>
                                    </div>
                                    <Link to={"/signin"} onClick={logout}>
                                        <button className="px-4 py-2  hover:text-gray-900 font-bold mb-1 text-red-400">
                                            Logout
                                        </button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to={"/signin"}>
                                        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link to={"signup"}>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            {/* <div className="bg-white"> */}
            <div className="bg-gray-900">
                <div className="max-w-[600px] mx-auto py-1 ">
                    <Link to={'/addpost'}>
                        <button className='bg-blue-500 text-white px-3 py-2 rounded ms-9 mt-4'>Add Post</button>
                    </Link>
                </div>
            </div>

            {/* Posts Section */}
            <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <h2 className="text-2xl font-bold text-white mb-8 ">Latest Posts</h2>
                <div className="flex flex-col">

                    {/* {allpost.map(post => ( */}
                    {allpost.map((post, i) => (
                        // {allpost.map((post)=>{

                        // })}
                        <div className='w-[100%] mb-5'>
                            <div key={post.id} className="bg-black rounded-lg shadow-md overflow-hidden">
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='text-white p-2 flex items-center gap-2  '>
                                            <CgProfile className='text-white text-2xl' />
                                            <p className='font-bold'>{post.name}</p>
                                        </div>
                                        <div>
                                            <p className='text-orange-300 font-medium text-sm ps-3 mb-2'>{post.location}</p>
                                        </div>
                                    </div>
                                    <div className='mt-2 me-2 text-blue-300'>
                                        <p className=''>{post.date}</p>
                                    </div>
                                </div>
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.image}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-red-200 mb-2">
                                        {post.caption}
                                    </h3>
                                    {/* <p className="text-gray-600 mb-4">{Date.now()}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                        <span>{post.author}</span>
                                        <span>{post.date}</span>
                                    </div> */}

                                    <div className="flex items-center space-x-6 pt-4 border-t">
                                        <button
                                            onClick={() => handleLike(post, i)}
                                            className="flex items-center space-x-2 group" >
                                            {/* <div className='bg-red-500 overflow-hidden'> */}
                                            <CiHeart className='text-white fill-red-900 rounded-lg  text-xl' />
                                            {/* </div> */}
                                            {/* <CiHeart className='text-white fill-red-600 text-xl' /> */}
                                            <span className="text-sm text-gray-500">{post.likeCount}</span>
                                            {/* <span className="text-sm text-white">{like}</span> */}
                                        </button>
                                        <FaRegComment className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                        {/* <span className="text-sm text-gray-500">{post.comments}</span> */}
                                    </div>
                                    {post.comments.map((val,pos) => {
                                        console.log(val.user);  
                                        return (
                                            <>
                                                <div className='bg-gray-700 ps-3 rounded py-2 mt-4 mb-2'>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <div className='flex items-center gap-2'>
                                                                <CgProfile className='text-white' />
                                                                <h1 className='text-white font-bold'>{val.user}</h1>
                                                            </div>
                                                            <p className='text-yellow-100'>{val.comment}</p>
                                                        </div>
                                                        {currentuser.name==val.user &&
                                                          <button className='me-4 text-red-500' onClick={()=>{remove(i,pos)}}>Delete</button>
                                                        }
                                                        {/* <button className='me-4 text-red-500' onClick={()=>{remove(i,pos)}}>Delete</button> */}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    }
                                    <div className='mt-4 rounded relative'>
                                        {/* <input type="text" name="" value={comment ? comment : ""} onChange={(e)=>{handleComments(e),(i)}} placeholder='Add Comment' className='bg-gray-700 text-white rounded w-full py-2 ps-2 ' /> */}
                                        <input
                                            type="text"
                                            // value={commentText[i] || ""}
                                            value={commentText[i] ? commentText[i] : ""}
                                            name='postcomment'
                                            onChange={(e) => handleCommentChange(e, i)}
                                            placeholder='Add Comment'
                                            className='bg-gray-700 text-white rounded w-full py-2 ps-2'
                                        />
                                        {/* <input type="text" name="" value={comment}  onChange={(e)=>setcomment(e.target.value)} placeholder='Add Comment' className='bg-gray-700 text-white rounded w-full py-2 ps-2 ' /> */}
                                        <button className='text-white  rounded  py-1 px-2 absolute right-1 top-1' onClick={() => { save(i, i) }} >Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;