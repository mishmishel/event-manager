import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './NewEvent.css';

export default function NewEvent({ user }) {
    const[title, setTitle] = useState("")
    const[date, setDate] = useState("")
    const[description, setDescription] = useState("")
    const[success, setSuccess] = useState("")
    const [buttonClickedWhileDisabled, setButtonClickedWhileDisabled] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()

        const userId = user.id;
        console.log("User ID (created_by):", userId);

        if (!title || !date || !description) {
            setButtonClickedWhileDisabled(true);
            return; // Don't proceed if form is incomplete
        }

        fetch('/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title: title,
                date: date,
                description: description,
                created_by: userId
            })
        })
        .then(response => response.json())
        .then(json=>{
            setSuccess("The Event "+json.title+" was added.");
            setTitle(""); 
            setDate(""); 
            setDescription(""); 
        })
    }

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='new-event-container'>
            <h1>New Event</h1>
            <form onSubmit={handleSubmit}>
                <label for="title">Title:</label>
                <input type="text"id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>

                <label for="date">Date:</label>
                <input type="date" id="date" onChange={(e) => setDate(e.target.value)} value={date}/>

                <label for="description">Description:</label>
                <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} value={description}/>

                <input type="submit" value="Add New Event" />
                {buttonClickedWhileDisabled && <p>You must complete all fields before submitting the form.</p>}
            </form>
            <p id="event-was-added">{success}</p>

            <button className="back-button" onClick={handleBack}>Back</button>
        </div>
    )
}