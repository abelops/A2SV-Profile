"use client"; 
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import {db}  from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useGetPostsQuery } from '@/store/features/posts-api';

function PostList() {
    const router = useRouter()
    const postCollection = collection(db, "posts");
    const getPosts  = useGetPostsQuery({});

    type PostType = {
        id: string;
        body: string;
        userId: number;
        title: string;
      };
      
      const [posts, setPosts] = useState<PostType[] | undefined>();
      
      // const getPosts = async (): Promise<void> => {
      //   try {
      //     const res = await fetch(`http://localhost:3004/posts`);
      //     console.log(res)
      //     if (res.ok) {
      //       const data: PostType[] = await res.json();
      //       setPosts(data);
      //     } else {
      //       throw new Error('Failed to fetch posts');
      //     }
      //   } catch (error) {
      //     console.error('Error fetching posts:', error);
      //   }
      // };

    
      
      // const getPosts = async () => {
      //   const data = await getDocs(postCollection);
      //   const newDat = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //   console.log(newDat);
      //   let sth: PostType[] = newDat as PostType[];
      //   const fin = sth.map((f) => {
      //     let j = {
      //       id: f.id,
      //       title: f.title,
      //       body: f.body,
      //       userId: f.userId,
      //     };
      //     return j;
      //   });
      //   setPosts(fin);
      // };


      useEffect(()=>{        
        setPosts(getPosts.data);
      },[getPosts])

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