import React from 'react';


const NoteContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFoldername: () => {}
});

export default NoteContext;