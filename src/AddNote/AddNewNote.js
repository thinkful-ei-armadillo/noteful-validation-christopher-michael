import React from 'react'
import NoteContext from '../NoteContext.js'

class AddNewNote extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: '',
            content: '',
            folderId: ''


        }
    }
    
    static contextType = NoteContext;



    handleNewNote = (noteName) => {
         fetch('http://localhost:9090/notes', {
            method: 'POST',
            header:{
                'Content Type': '/application/json'
            },
            body: JSON.stringify({
                name: noteName,
                
            })
        })
        .then(res => {
            if (!res.ok){
                return res.json()
                .then(error => {throw error});
            }
            return res.json(); })
        .then (data =>{ 
            console.log(data);
            this.context.addNoteName(data.folderId, noteName); 
        })
        .catch(error =>{
            console.log(error); 
        });
    }

    updateName = name => {
        this.setState({name})
        console.log(name);
    }

    updateContent(content){
        this.setState({content})
        console.log(content);
    }

    updateFolderId(folderId){
        this.setState({folderId})
        console.log(folderId);
    }
    
    
    render(){
        return (
            <div className="new-note">
            <section className="test">
                <h2>Create A Note</h2>
                    <form className="Noteful-form" onSubmit={(event) => {event.preventDefault();
                                                                        this.handleNewNote(event.currentTarget.newNoteName.value)}}>
                        <label htmlFor="new-note-name">Name</label>
                        
                        <input name="newNoteName" type="text" id="new-note-name" onChange={e => this.updateName(e.target.value)}/>
                        <br />
                        <label htmlFor="new-note-content">Content</label>
                        <input name="newNoteContent" type="text" id="new-note-content" onChange={e => this.updateContent(e.target.value)}/>
                        <br />
                        <select name="folder-option" form="folderform" onChange={e => this.updateFolderId(e.target.value)}>
                           {this.context.folders.map((folder, index) => {
                             return <option key={index} value={folder.id}>{folder.name}</option>
                           })
                        }
                            
                             
                             
                        </select> 
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }

}
export default AddNewNote;