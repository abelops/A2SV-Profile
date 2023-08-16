"use client"; 
import React from 'react'
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {db}  from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useGetIndPostQuery, useUpdatePostMutation } from '@/store/features/posts-api';


type Props = {
    params: {
      id: string;
    };
  };

function IndividualPost({ params }: Props) {
    const [edit, setEdit] = useState(false);
    const [updatePost] = useUpdatePostMutation();
    const indPostValue  = useGetIndPostQuery(Number(params.id));
    // console.log(indPostValue, Number(params.id))
    type PostType = {
        id: string;
        body: string;
        userId: number;
        title: string;
      };
    const [indPost, setIndPost] = useState<PostType | undefined>();
    const router = useRouter()
    const id = params.id
    // const GetIndPost = async (): Promise<void> => {
    //     let res = await fetch(`http://localhost:3004/posts/${id}`);
    //     if(res.status == 200){
    //         const data: PostType = await res.json();
    //         setIndPost(data);
    //     }
    //     console.log(indPost)
    //     };


    // const GetIndPost = async (): Promise<void> =>{
    //     const docRef = doc(db, "posts", id);
    //     const data = await getDoc(docRef)
    //     let f = {...data.data()}
    //     const newDat = {id, title: f.title, body: f.body, userId: f.userId};
    //     console.log(newDat)
    //     setIndPost(newDat)
    // }

    useEffect(()=>{
        setIndPost(indPostValue.data)
        // console.log(indPost)
        // GetIndPost();
    },[indPostValue])

    const updateTitle = (e)=>{
        setIndPost((prevState:any)=>({
            ...prevState,
            title: e.target.value,
        }))
        // setEdit(false);
    }

    const updateBody = (e)=>{
        setIndPost((prevState:any)=>({
            ...prevState,
            body: e.target.value,
        }))
        // setEdit(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {id: indPost.id, title: indPost.title, body: indPost.body, useId: Math.floor(Math.random()*100)}
        updatePost(data); 
        setEdit(false);
    };
    
    if(indPost){
        return (
            edit?
            (<div key={indPost.id} className="bg-white flex flex-col justify-between shadow-md rounded-md p-4 relative mt-6">
            <h1 className='flex w-full justify-center text-3xl font-bold mb-4'> Update Post</h1>
            <div className='flex justify-center w-full'>
                <div className="p-2">
                    <label htmlFor="title" className='w-full text-sm'>
                        Post Title
                    </label>
                    <div className='w-full mb-4'>
                        <input type='text' id="title" value={indPost.title} onChange={updateTitle} placeholder='Post title' className='border-[1px] border-slate-500 py-[3px] px-2'/>
                    </div>
                    <textarea value={indPost.body} placeholder='Post Body' onChange={updateBody} className='border-[1px] border-slate-500 py-[3px] px-2'></textarea>
                </div>
            </div>
            <div className='flex gap-4 w-full justify-center align-bottom'>
                <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={() => router.push(`/`)}> Go back</button>
                <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={handleSubmit}> Update</button>
            </div>
        </div>):
            (<div key={indPost.id} className="bg-white flex flex-col justify-between shadow-md rounded-md p-4 relative mt-6">
                <div>
                    <div className="p-2">
                        <h2 className="text-xl font-semibold">{indPost.title}</h2>
                        <p className="text-sm text-gray-500">{indPost.body}</p>
                    </div>
                </div>
                <div className='flex gap-4 w-full justify-center align-bottom'>
                    <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={() => router.push(`/`)}> Go back</button>
                    <button className='bg-blue-700 end-0 px-2 rounded-sm py-2 text-white' onClick={() => setEdit(true)}> Edit</button>
                </div>
            </div>)
        )
    } 
    else{
        return (<h1> Loading ... </h1>)
    }
}

export default IndividualPost