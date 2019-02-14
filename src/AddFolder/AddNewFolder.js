import React from 'react'
import NoteContext from '../NoteContext.js'
class AddNewFolder extends React.Component{

    static contextType = NoteContext; 

    addItem = (folderName) =>{
        // const folder = e.currentTarget.value; 
        // console.log(folder);
        // console.log(e.currentTarget.value); 
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            header:{
                'Content Type': '/application/json'
            },
            body: JSON.stringify({name: folderName})
        })
        .then(res => {
            if (!res.ok){
                return res.json()
                .then(error => {throw error});
            }
            return res.json(); })
        .then (data =>{ 
            this.context.addFolderName(data.id, folderName); 
        })
        .catch(error =>{
            console.log(error); 
        })
    }

    render(){
        return (
            <div className="new-folder">
            <section className="test">
                <h2>Create A Folder</h2>
                    <form className="Noteful-form" onSubmit={(event) => {event.preventDefault();
                                                                        this.addItem(event.currentTarget.newFolderName.value)}}>
                        <label htmlFor="new-folder-name" />
                        <input name="newFolderName" type="text" id="new-folder-name" />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default AddNewFolder