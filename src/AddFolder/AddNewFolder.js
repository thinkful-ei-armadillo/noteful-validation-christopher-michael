import React from 'react'

class AddNewFolder extends React.Component{

    addItem = (folderName) =>{
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: {folder: folderName}
        })
        .then(res => {
            if (!res.ok){
                return res.json()
                .then(error => {throw error});
            }
            return res.json(); })
        .then (data =>{
            console.log(data); 
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
                    <form className="Noteful-form" onSubmit={this.addItem}>
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