"use client"; 
import React from 'react'
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {db}  from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';


type Props = {
    params: {
      id: string;
    };
  };

function IndividualPost({ params }: Props) {
    const postCollection = collection(db, "posts");
    type PostType = {
        body: string;
        userId: number;
        title: string;
        id: string;
      };
    const [indPost, setIndPost] = useState<PostType | undefined>();
    const router = useRouter()
    const id = params.id
    // const GetIndPost = async (): Promise<void> => {
    //     let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    //     if(res.status == 200){
    //         const data: PostType = await res.json();
    //         setIndPost(data);
    //     }
    //     console.log(indPost)
    //     };


    const GetIndPost = async (): Promise<void> =>{
        const docRef = doc(db, "posts", id);
        const data = await getDoc(docRef)
        const newDat = {...data.data(), id: data.id}
        console.log(newDat)
        setIndPost(newDat)
    }

    useEffect(()=>{
        GetIndPost();
    },[])

    // const { id } = route.query
    // console.log(id)
    if(indPost){
        return (
            <div key={indPost.id} className="bg-white flex flex-col justify-between shadow-md rounded-md p-4 relative mt-6">
                <div>
                    <div className="p-2">
                        <h2 className="text-xl font-semibold">{indPost.title}</h2>
                        <p className="text-sm text-gray-500">{indPost.body}</p>
                    </div>
                </div>
                <div className='flex gap-4 w-full justify-center align-bottom'>
                    <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={() => router.push(`/`)}> Go back</button>
                    <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={() => router.push(`/`)}> Edit</button>
                </div>
            </div>
        )
    } 
    else{
        return (<h1> Loading ... </h1>)
    }
}

export default IndividualPost