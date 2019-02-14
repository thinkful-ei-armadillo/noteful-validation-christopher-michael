import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'

import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import NoteContext from '../NoteContext'
import './App.css'
import AddNewFolder from './../AddFolder/AddNewFolder'
import AddNewNote from '../AddNote/AddNewNote';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  addFolderName = (id, folderName) => {
    this.setState({folders:[...this.state.folders, {id: id, name: folderName}] })
  }

  addNoteName = (id, noteName, content, folderId) => {
    this.setState({notes:[...this.state.notes, {id: id, folderId: folderId, name: noteName, content: content}] })
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(json => {
        this.setState({folders: json});
        console.log(this.state);
      });

    fetch('http://localhost:9090/notes')
      .then(res => res.json())
      .then(json => {
        this.setState({notes: json});
        console.log(this.state);
      });
  }

 deleteNote = id => {
   console.log('delete works');
   const newNotes = this.state.notes.filter(note => 
     note.id !== id
    )
    this.setState({
      notes: newNotes
    })
 }

  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteContext.Provider value={{
                  notes:notesForFolder,
                  deleteNote: this.deleteNote
                  }}>
                <NoteListMain
                  {...routeProps}
                />
                </NoteContext.Provider>
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddNewFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNewNote
                {...routeProps}
                folders={folders}
              />
            )
          }}
        />
      </>
    )
  }

  render() {
    return (
      <NoteContext.Provider value={{
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.deleteNote,
        addFolderName: this.addFolderName,
        addNoteName: this.addNoteName  
      }}>
      <div className='App'>
        <nav className='App__nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
      </div>
      </NoteContext.Provider>
    )
  }
}

export default App
