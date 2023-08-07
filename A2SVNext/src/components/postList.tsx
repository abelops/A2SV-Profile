"use client"; 
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import {db}  from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function PostList() {
    const router = useRouter()
    const postCollection = collection(db, "posts");

    type PostType = {
        id: string;
        body: string;
        userId: number;
        title: string;
      };
      
      const [posts, setPosts] = useState<PostType[] | undefined>();
      
    //   const GetPosts = async (): Promise<void> => {
    //     try {
    //       const res = await fetch(`https://jsonplaceholder.typicode.com/posts?limit=6`);
    //       if (res.ok) {
    //         const data: PostType[] = await res.json();
    //         setPosts(data);
    //       } else {
    //         throw new Error('Failed to fetch posts');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching posts:', error);
    //     }
    //   };

    
    useEffect(()=>{
          const getPosts = async () =>{
              const data = await getDocs(postCollection)
              const newDat = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
              console.log(newDat) 
              setPosts(newDat)
          }
          getPosts();

      },[])

    return (
    <div>
        {/* post list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* post */}
            {posts ? posts.map((post) => {
                return (
                    <div key={post.id} className="bg-white flex flex-col justify-between shadow-md rounded-md p-4 relative mt-6">
                        <div>
                            <div className="p-2">
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-sm text-gray-500">{post.body}</p>
                            </div>
                        </div>
                        <div className='flex w-full justify-start align-bottom'>
                            <button className='bg-blue-700 end-0 px-2 ml-2 rounded-sm py-2 text-white' onClick={() => router.push(`/posts/${post.id}`)}> Read more</button>
                        </div>
                    </div>
                )
            }) : <h1> Loading ... </h1>
            }
        </div>
    </div>
  )
}

export default PostList