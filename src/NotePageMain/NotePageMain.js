import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';

export default function NotePageMain(props) {

  const handleDeleteNote = id => {
    this.props.history.push('/')
  }
  console.log(props);
  const contextValue = {
    notes: props.notes,
        folders: props.folders,
        handleDeleteNote: props.handleDeleteNote,
        id: props.note.id,
        name: props.note.name,
        modified: props.note.modified
  }
  return (
    <section className='NotePageMain'>
      <NoteContext.Provider value={contextValue}>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
        onDeleteNote ={handleDeleteNote}
      />
      
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
      </NoteContext.Provider>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
