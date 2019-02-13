import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NoteContext from '../NoteContext'




class Note extends React.Component {
  
  
  handleDeleteNote = (id, callback) => {
    console.log('Note deleted');
    console.log(id);
    return fetch(`http://localhost:9090/notes/${id}`, {
            method: "DELETE",
    }) 
              .then(res => {
                if (!res.ok){
                  return res.json().then (error => {
                    throw error
                });
              }
                return res.json();
              })
               
               .then(data => {
                 callback(id)
               })
               .catch(error => {
                 console.log(error);
               })
                

  }
  // static contextType = NoteContext;
  render(){
    // const { id, name, modified } = this.context.notes;
    // console.log(this.context.notes);
  return (
   <NoteContext.Consumer>
     {(context) => (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={() => this.handleDeleteNote(this.props.id, context.deleteNote)}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
    )}
    </NoteContext.Consumer>
  )}
}


export default Note;
