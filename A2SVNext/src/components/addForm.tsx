"use client"; 
import { ChangeEvent, FormEvent, useState } from 'react';
// import app, { db } from '../../firebase';
// import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { useAddPostMutation } from '@/store/features/posts-api';

// import { addPost } from '@/store/features/todos-slice';

function AddForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addPost] = useAddPostMutation();
  

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = {title, body: description}
  //   try {
  //       const postsRef = collection(db, 'posts');
  //       const docRef = addDoc(postsRef, {
  //           title,
  //           body: description,
  //           userId: Math.floor(Math.random() * 20) + 1
  //       })
  //       console.log("Document written with ID: ");
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {title, body: description, useId: Math.floor(Math.random()*100)}
    addPost(data);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    
    <div className='flex justify-center'>
      <div className='w-full md:w-1/2 lg:w-1/3 bg-slate-200 px-10 py-10 flex justify-center'>
        <form method='post' onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='flex justify-center w-full font-bold text-xl'>Add Post</h1>
          <input
            type='text'
            className='px-2 py-[2px]'
            placeholder='Post title'
            value={title}
            onChange={handleTitleChange}
            name='title'
          />
          <textarea
            placeholder='Description'
            className='px-2 py-[2px] h-40'
            value={description}
            onChange={handleDescriptionChange}
            name='description'
          ></textarea>
          <button type='submit' className='bg-blue-700 end-0 px-2 ml-2 rounded-sm py-2 text-white'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddForm