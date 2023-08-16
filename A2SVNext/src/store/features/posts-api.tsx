import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL: string = "http://localhost:3004" 
type PostType = {
    id: string;
    body: string;
    userId: number;
    title: string;
  };
const GetIndPost = async (id:number): Promise<PostType> => {
    let res = await fetch(`http://localhost:3004/posts/${id}`);
    const data: PostType = await res.json();
    return data
};

export const postsApi = createApi({
  reducerPath : 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
    }),
    getIndPost: builder.query<PostType, number>({
      query: (id) => `posts/${id}`,
      transformResponse: (response: any) => response, // Assuming the response contains the 'data' field with the post object
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: `posts/`,
        method: 'POST',
        body: newPost,
      }),
    }),
    updatePost: builder.mutation({
      query: (newPost) => ({
        url: `posts/${newPost.id}`,
        method: 'PATCH',
        body: newPost,
      }),
    }),
  }),
});


export const {useGetPostsQuery, useGetIndPostQuery, useAddPostMutation, useUpdatePostMutation } = postsApi;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// type Post = {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }
// export const postsApi = createApi({
//   reducerPath: 'postsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Replace '/api' with your actual API endpoint
//   endpoints: (builder) => ({
//     getPosts: builder.query<Array<Post>, void>({
//       query: () => 'posts',
//     }),
//     createPost: builder.mutation<Post, Partial<Post>>({
//       query: (newPost) => ({
//         url: 'posts',
//         method: 'POST',
//         body: newPost,
//       }),
//     }),
//   }),
// });

// export const { useGetPostsQuery, useCreatePostMutation } = postsApi;