import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';

export default function NotePageMain(props) {
  console.log(props);
  const contextValue = {
    notes: this.state.notes,
        folders: this.state.folders,
        handleDeleteNote: this.handleDeleteNote,
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
        handleDeleteNote ={this.handleDeleteNote}
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
