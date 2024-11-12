import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaQuestionCircle } from 'react-icons/fa';
import {db} from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

function Work() {

    const[notes, setNotes]=useState([]);
    const[selectedNotes, setSelectedNotes] = useState(null);
    const[newTitle, setNewTitle] = useState('');
    const[newContent, setNewContent] = useState('');

    const fetchNotes = async() =>{
        const querySnapshot = await getDocs(collection(db,'notes'));
        const fetchedNotes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setNotes(fetchedNotes);
    };
    useEffect(() => {
        fetchNotes();
    },[]);

    const handleAddNote = async (e) => {
        e.preventDefault();

        if(newTitle.trim() &&newContent.trim()){
            const newNote = {title: newTitle, content: newContent};
            const docRef = await addDoc(collection(db,'notes'),newNote);
            setNotes([...notes, {id: docRef.id, ...newNote}]);
            setNewTitle('');
            setNewContent('');
        } else{
            alert("esti fraier")
        }
    };

    const handleTitleChange = async(e)=>{
        const updatedTitle = e.target.innerText;
        setNotes(notes.map(q =>
        q.id === selectedNotes.id ? {...q,title:updatedTitle} : q
        ));

        const notesDoc = doc(db,'notes',selectedNotes.id);
        await updateDoc(notesDoc, {title: updatedTitle});
    };


    const handleContentChange = async (e) => {
        const updatedNotes = e.target.innerText;
            setNotes(notes.map(q =>
            q.id === selectedNotes.id ? {...q,content:updatedNotes} : q
            ));

            const noteDoc = doc(db,'notes',selectedNotes.id);
            await updateDoc(noteDoc,{content:updatedNotes});
    };



    return (
        <div className="container-fluid " style={{
            background: "linear-gradient(180deg, #4b4b4b, #3d3d3d)",
        }}>
            <div className="row pt-4">
                <div className="col-md-3 collapse d-md-block vh-100 p-4" id="sidebar"
                     style={{
                         background: "linear-gradient(180deg, #2d2d2d, #1b1b1b)",
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                     }}
                >
                    <h5 className="fw-bold mb-4 " style={{color: '#e0e0e0'}}>Facem treaba</h5>

                    <form onSubmit={handleAddNote} className="mb-4">
                        <div className="mb2">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Enter Title"
                                   value={newTitle}
                                   onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb2">
                            <textarea
                                className="form-control"
                                placeholder="Enter Content"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                rows="3"
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value="Add Question"
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        />
                    </form>

                    <ul className="list-group list-group-flush">
                        {notes.map((notes) => (
                            <li
                                key={notes.id}
                                className={`list-group-item d-flex align-items-center ${
                                    selectedNotes && selectedNotes.id === notes.id ? 'active' : ''
                                }`}
                                onClick={() => setSelectedNotes(notes)}
                                style={{
                                    cursor: 'pointer',
                                    background: selectedNotes && selectedNotes.id === notes.id ? '#444444' : 'transparent',
                                    color: selectedNotes && selectedNotes.id === notes.id ? '#f0f0f0' : '#c0c0c0',
                                    borderRadius: '5px',
                                    marginBottom: '8px',
                                    padding: '10px',
                                    transition: 'background 0.3s, color 0.3s',
                                }}
                            >
                                <FaQuestionCircle style={{
                                    marginRight: '10px',
                                    color: selectedNotes && selectedNotes.id === notes.id ? '#f0f0f0' : '#c0c0c0'
                                }}/>
                                <div className="text-truncate" style={{width: '100%'}}>{notes.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-9 p-4">
                    <div className="card border-0">
                        <div className="card-body"
                             style={{
                                 background: "linear-gradient(180deg, #4b4b4b, #3d3d3d)",
                             }}>
                            {selectedNotes ? (
                                <div>
                                    <h2
                                        className="card-subtitle mb-2 text-primary"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => alert(`You clicked on "${selectedNotes.title}"!`)}
                                    >
                                        {selectedNotes.title}
                                    </h2>
                                    <div
                                        className="card-text"
                                        contentEditable="true"
                                        suppressContentEditableWarning={true}
                                        onInput={handleContentChange}
                                        style={{
                                            padding: '10px',
                                            background: "linear-gradient(180deg, #4b4b4b, #3d3d3d)",
                                            minHeight: '100px',
                                            outline: 'none',
                                        }}
                                    >
                                        {selectedNotes.content}
                                    </div>
                                </div>
                            ) : (
                                <p className="card-text">am facut treaba</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Work;
