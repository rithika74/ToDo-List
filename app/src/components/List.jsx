import React, { useState } from 'react';

const List = () => {
    const [data, setData] = useState({});
    const [todo, setTodo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            const updatedTodos = todo.map((item, index) =>
                index === currentIndex ? data : item
            );
            setTodo(updatedTodos);
            setIsEditing(false);
            setCurrentIndex(null);
        } else {
            setTodo([...todo, data]); 
        }
        setData({}); 
    };

    const handleEdit = (index) => {
        setData(todo[index]);
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTodos = todo.filter((_, idx) => idx !== index);
        setTodo(updatedTodos);
    };

    return (
        <>
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Enter task title'
                            required
                            value={data.title || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder='Enter task description'
                            value={data.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            id="status"
                            value={data.status || 'notcompleted'}
                            onChange={handleChange}
                        >
                            <option value="notcompleted">Not Completed</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
                    </div>
                </form>
            </div>

            {todo.length > 0 ? (
                <>
                    {todo.map((item, index) => (
                        <div key={index} className='list'>
                            <div className='list1'>
                                <p>{item.title}</p>
                                <p style={{color:'rgb(121, 120, 120)', fontSize:'14px'}}>{item.description || '-'}</p>
                            </div>
                            <div className='list2'>
                                <p>{item.status || 'Not Completed'}</p>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div>No tasks added yet.</div>
            )}
        </>
    );
};

export default List;
