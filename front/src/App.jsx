/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const URL = 'http://localhost:7777/notes';

  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  const getNotes = () => axios.get(URL).then((res) => setNotes(() => res.data));
  const removeNote = (id) => axios.delete(`${URL}/${id}`).then(() => getNotes());
  const handleTextChange = ({ target }) => setNewNoteText(target.value);

  const getNotesElements = () => notes.map((note) => (
    <li className="note" key={note.id}>
      <span>{note.content}</span>
      <span className="note-delete material-icons" onClick={() => removeNote(note.id)}>clear</span>
    </li>
  ));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText) {
      return;
    }
    axios.get(`${URL}/nextid`)
      .then((res) => axios.post(URL, { id: res.data, content: newNoteText }))
      .then(() => getNotes());
    setNewNoteText(() => '');
  };

  const Header = (
    <>
      <h1 className="head-title">Заметки</h1>
      <span className="head-refresh-icon material-icons" onClick={() => getNotes()}>refresh</span>
    </>
  );

  const NoteList = (notes.length
    ? <ul className="notes-list">{getNotesElements()}</ul>
    : <div className="notes-no-notes">Заметок нет</div>
  );

  const Form = (
    <form className="form" onSubmit={handleFormSubmit}>
      <textarea className="form-textarea" rows="5" onChange={handleTextChange} value={newNoteText} />
      <button className="form-send" type="submit">
        <span className="material-icons">send</span>
      </button>
    </form>
  );

  return (
    <div className="App">
      <div className="app-header">
        {Header}
      </div>

      <div className="app-notes">
        {NoteList}
      </div>

      <div className="app-form">
        {Form}
      </div>
    </div>
  );
}

export default App;
