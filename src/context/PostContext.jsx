import React, { createContext, useContext, useEffect, useState } from 'react'
import { usercontext } from './AuthContext'
import { comment } from 'postcss'

export let postscontext = createContext()

function PostContextProvider({ children }) {
    let [allpost, setallpost] = useState([])
    let [likes, setlikes] = useState(0)
    useEffect(() => {
        let getpost = JSON.parse(localStorage.getItem("instapost")) || []
        setallpost(getpost)
    }, [])

    let { currentuser } = useContext(usercontext)
    // console.log(currentuser);


    let addpost = (value) => {
        console.log("add", value);
        let newPost = { ...value, likes: [], likeCount: 0, comments: [], date: new Date().toDateString() };
        // let newPost = { ...value, likes: [], likeCount: 0, comments: [] };
        let allpostlist = [...allpost, newPost]
        setallpost(allpostlist)
        localStorage.setItem("instapost", JSON.stringify(allpostlist))
    }
    let likepost = (value, pos) => {
        // let updatedPosts = allpost.map((post, index) => {
        //     if (index === pos) {
        //         if (post.likes.includes(currentuser.email)) {
        //             console.log("User has already liked this post");
        //             return post
        //         }
        //         return { ...post, likes: [...post.likes, currentuser.email], likeCount: post.likeCount + 1,};
        //     }
        //     return post;
        // });
        // setallpost(updatedPosts);
        // localStorage.setItem('instapost', JSON.stringify(updatedPosts));

        // console.log(pos);
        let updatedPosts = allpost.map((val, i) => {
            if (pos == i) {
                if (val.likes.includes(currentuser.email)) {
                    // console.log(val.likes);
                    return { ...val, likeCount: val.likeCount - 1, likes: val.likes.filter(email => email !== currentuser.email) }
                    // return val
                }
                else {
                    return { ...val, likeCount: val.likeCount + 1, likes: [...val.likes, currentuser.email] }
                }
            }
            else {
                return val
            }
        })
        setallpost(updatedPosts)
        localStorage.setItem('instapost', JSON.stringify(updatedPosts));

    }
    let commentPost = (val, pos) => {
        // console.log(val, pos);
        let updatedPosts = allpost.map((post, index) => {
            if (index == pos) {
                return { ...post, comments: [...post.comments, val] }
            }
            return post
        })
        console.log(updatedPosts);

        setallpost(updatedPosts);
        localStorage.setItem('instapost', JSON.stringify(updatedPosts));
        // console.log(updatedPosts[0].comments);
    }
    let deleteComment = (postid) => {
        // console.log(postid.commentid);
        let deletedcomment = allpost.map((post, i) => {
            if (i==postid.pos) {
                return {...post,comments:post.comments.filter((val,i)=>{
                    return i!=postid.commentid
                })} 
            }
            return post
        })
        console.log(deletedcomment);
        setallpost(deletedcomment)
        localStorage.setItem('instapost', JSON.stringify(deletedcomment));
    }

    return (
        <>
            <postscontext.Provider value={{ addpost, allpost, likepost, commentPost, deleteComment }}>
                {children}
            </postscontext.Provider>
        </>
    )
}

export default PostContextProvider