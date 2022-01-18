import './AddEditForm.css';
import { useEffect } from 'react';
import { addPost } from '../api'
import { useNavigate } from 'react-router-dom';

const AddForm = ({ posts, setPosts, token, title, setTitle, description, setDescription, price, setPrice, location, setLocation, willDeliver, setWillDeliver }) => {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const newPost = await addPost(token, title, description, price, willDeliver, location);
        setPosts([...posts, newPost])
        navigate('/posts')
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setTitle('')
        setDescription('')
        setPrice('')
        setLocation('')
        setWillDeliver(false)
    }, [])

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add Post</h3>
            <input className="add-input" placeholder="title" value={title} onChange={(event) => { setTitle(event.target.value) }} required />
            <input className="add-input" placeholder="description" value={description} onChange={(event) => { setDescription(event.target.value) }} required/>
            <input className="add-input" placeholder="price" value={price} onChange={(event) => { setPrice(event.target.value) }} required/>
            <input className="add-input" placeholder="location" value={location} onChange={(event) => { setLocation(event.target.value) }} />
            <label htmlFor="Delivery">Delivery Available?</label>
            <select
                value={willDeliver}
                onChange={(event) => { setWillDeliver(event.target.value) }}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <button className="add-button">CREATE</button>
        </form>
    )
}

export default AddForm;