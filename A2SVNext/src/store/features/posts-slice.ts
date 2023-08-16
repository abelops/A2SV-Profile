import { createSlice } from '@reduxjs/toolkit';

type PostType = {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostState {
    posts: PostType[];
}

const initialState: PostState = {
    posts: [],
  };

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload)
            state.posts.push(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            state.posts[index] = action.payload;
        },
    }
});

export const { addPost, removePost, updatePost} = notesSlice.actions;
export default notesSlice.reducer;