import React from 'react'

class AddNewFolder extends React.Component{
    renderFolderForm(){
        return (
            
        )
    }
    
    render(){
        console.log('Add Folder');
        return (
            <div className="new-folder">
             <section className="test">
                <h2>Create A Folder</h2>
                  <form className="Noteful-form">
                    <label htmlFor="new-folder-name" />
                    <input type="text" id="new-folder-name" />
                    <button type="submit">Submit</button>
                  </form>
                </section>
            </div>
        )
    }
}

export default AddNewFolder