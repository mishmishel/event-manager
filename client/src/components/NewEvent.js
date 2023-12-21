import React, {useState} from 'react'

export default function NewEvent() {
    const[title, setTitle] = useState("")
    const[date, setDate] = useState("")
    const[description, setDescription] = useState("")
    const[success, setSuccess] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        fetch('/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title: title,
                date: date,
                description: description
            })
        })
        .then(response => response.json())
        .then(json=>{
            setSuccess("The Event "+json.title+" was added.")
        })
    }

    return (
        <div>
            <h1>New Event</h1>
            <form onSubmit={handleSubmit}>
                <label for="title">Title:</label>
                <input type="text"id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>

                <label for="date">Date:</label>
                <input type="date" id="date" onChange={(e) => setDate(e.target.value)} value={date}/>

                <label for="description">Description:</label>
                <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} value={description}/>

                <input type="submit" value="Add New Event"/>
            </form>
            <p>{success}</p>
        </div>
    )
}