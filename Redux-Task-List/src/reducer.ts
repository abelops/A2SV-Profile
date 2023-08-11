import { createSlice } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  content: string;
};

type AllnotestateInterface = {
  notes: Note[];
};

const initialState: AllnotestateInterface = {
  notes: [],
};

export const allNotesSlice = createSlice({
  name: 'allProduct',
  initialState,
  reducers: {
    addNoteAction: (state, action) =>{
        const { id, title, content } = action.payload;
        state.notes.push({ id, title, content });
    },
    editNoteAction: (state, action) => {
      const { id, title, content } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = { id, title, content };
      }
    },
    deleteNoteAction: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
  },
});

export const {
  editNoteAction,
  deleteNoteAction,
  addNoteAction,
} = allNotesSlice.actions;

export default allNotesSlice.reducer;