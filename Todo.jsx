import React, { useState } from 'react'
import './Todo.css'

export default function Todo() {
    const [state, setState] = useState({ name: "", email: "" })
    const [list, setList] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    function handleText(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!state.name && !state.email) return
        if (editIndex === null) {
            setList([...list, state])
        } else {
            const updated = [...list]
            updated[editIndex] = state
            setList(updated)
            setEditIndex(null)
        }
        setState({ name: '', email: '' })
    }

    function handleDelete(index) {
        const updatedList = list.filter((item, i) => i !== index)
        setList(updatedList)
    }

    function handleEdit(index) {
        setState(list[index])
        setEditIndex(index)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleText}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleText}
                />
                <input type="submit" value={editIndex === null ? "Add" : "Update"} />
            </form>
            <ul>
                {list.map((el, i) => (
                    <li key={i}>
                        <span>{el.name}</span> - <span>{el.email}</span>
                        <button onClick={() => handleDelete(i)}>Delete</button>
                        <button onClick={() => handleEdit(i)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}