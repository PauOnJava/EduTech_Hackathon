import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaQuestionCircle } from 'react-icons/fa';

function App() {
    const [selectedNotes, setSelectedNotes] = useState(null);

    const notes = [
        { id: 1, title: "nu stiui", content: "fdsfsdfdsf" },
        { id: 2, title: "am facuto de sange", content: "fdsfdsfsdfds" },
        { id: 3, title: "plm", content: "dasfaghjkgfd" },
        { id: 4, title: "sugem pla", content: "dasfdghfjgkhl" },
        { id: 5, title: "ajiafjoas", content: "Ndfgdshjkjljjhgdfsa" },
        { id: 6, title: "fgsgsf", content: "l;kjhgfdsghjk" },
        { id: 7, title: "fsdfdsfdsfsd", content: "Rfsdgfhjkjlk;kjhgfd" },
        { id: 8, title: "Expfsgfdgdfgdfg", content: "l;kjhgdsfgdhfjgkgl;lo" },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 collapse d-md-block vh-100 p-4" id="sidebar"
                     style={{
                         background: "linear-gradient(180deg, #2d2d2d, #1b1b1b)",
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                     }}
                >
                    <h5 className="fw-bold mb-4 text-center" style={{ color: '#e0e0e0' }}>Facem treaba</h5>
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
                                <FaQuestionCircle style={{ marginRight: '10px', color: selectedNotes && selectedNotes.id === notes.id ? '#f0f0f0' : '#c0c0c0' }} />
                                <div className="text-truncate" style={{ width: '100%' }}>{notes.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content area */}
                <div className="col-md-9 p-4">
                    <div className="card">
                        <div className="card-body">
                            {selectedNotes ? (
                                <div>
                                    <h2
                                        className="card-subtitle mb-2 text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => alert(`You clicked on "${selectedNotes.title}"!`)}
                                    >
                                        {selectedNotes.title}
                                    </h2>
                                    <p className="card-text">{selectedNotes.content}</p>
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

export default App;
