import React, { createContext, useContext, useEffect, useState } from 'react'
import { usercontext } from './AuthContext'
import { comment } from 'postcss'

export let postscontext = createContext()

function PostContextProvider({ children }) {
    let [allpost, setallpost] = useState([])
    let [likes, setlikes] = useState(0)
    useEffect(() => {
        let getpost = JSON.parse(localStorage.getItem("instapost")) || []
        //   console.log(getpost);
        setallpost(getpost)
    }, [])

    let { currentuser } = useContext(usercontext)
    // console.log(currentuser);


    let addpost = (value) => {
        console.log("add", value);
        let newPost = { ...value, likes: [], likeCount: 0, comments: [],date: new Date().toDateString() };
        // let newPost = { ...value, likes: [], likeCount: 0, comments: [] };
        let allpostlist = [...allpost, newPost]
        setallpost(allpostlist)
        localStorage.setItem("instapost", JSON.stringify(allpostlist))
    }
    let likepost = (value, pos) => {
        let updatedPosts = allpost.map((post, index) => {
            if (index === pos) {
                if (post.likes.includes(currentuser.email)) {
                    console.log("User has already liked this post");
                    return post
                }
                return { ...post, likes: [...post.likes, currentuser.email], likeCount: post.likeCount + 1,};
            }
            return post;
        });
        setallpost(updatedPosts);
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

    return (
        <>
            <postscontext.Provider value={{ addpost, allpost, likepost, commentPost }}>
                {children}
            </postscontext.Provider>
        </>
    )
}

export default PostContextProvider