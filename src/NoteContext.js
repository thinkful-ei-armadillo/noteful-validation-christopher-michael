import React from 'react';


const NoteContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolderName: () => {},
  addNoteName: () => {}
});

export default NoteContext;