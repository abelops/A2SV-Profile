import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store'; // Assuming you have a separate store file
import {
  editNoteAction,
  deleteNoteAction,
  addNoteAction,
} from './reducer';

const NoteList: React.FC = () => {
  const [noteInput, setNoteInput] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const notes = useSelector((state: RootState) => state.allNotes.notes);
  const dispatch = useDispatch<AppDispatch>();

  const handleNoteInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteInput(e.target.value);
  };

  const handleAddNote = () => {
    if (noteInput.trim()) {
      // Generate a unique ID for the note (you can use a library like `uuid` for this)
      const newNote = {
        id: Math.floor(Math.random() * 100),
        title: noteInput,
        content: '',
      };
      dispatch(addNoteAction(newNote));
      setNoteInput('');
    }
  };

  const handleEditNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      setNoteInput(note.title);
    }
  };

  const handleSaveNote = () => {
    if (selectedNoteId && noteInput.trim()) {
      dispatch(
        editNoteAction({
          id: selectedNoteId,
          title: noteInput,
        })
      );
      setNoteInput('');
      setSelectedNoteId(null);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    dispatch(deleteNoteAction(noteId));
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  };
  return (
    <div>
      <h2>My Notes</h2>
      <input
        type="text"
        value={noteInput}
        style={{paddingTop: 10, paddingBottom: 11}}
        onChange={handleNoteInputChange}
        onKeyDown={handleKeyPress}
      />
      {selectedNoteId ? (
        <button onClick={handleSaveNote} style={{borderRadius: 0,}}>Save</button>
      ) : (
        <button onClick={handleAddNote} style={{borderRadius: 0,}}>Add</button>
      )}

      <h2>Note List</h2>
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} style={{textAlign: "left", background: "rgb(50,50,50)", borderBottom: "5px solid rgb(40,40,40)",display: 'flex', paddingLeft: 20, justifyContent: "space-between", gap: 100}}>
              <span style={{display: "flex", alignItems:"center"}}>{note.title}</span>
              <div>
                <button onClick={() => handleEditNote(note.id)} style={{borderRadius: 0,}}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)} style={{borderRadius: 0,}}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;