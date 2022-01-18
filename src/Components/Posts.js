import './Posts.css'
import { fetchPosts, deletePost } from '../api';
import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Search } from './index';


const Posts = ({ token, posts, setPosts }) => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    const handlePosts = async () => {
        try {
            const newPosts = await fetchPosts(token)
            setPosts(newPosts)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handlePosts();
    }, [token])

    const handleDelete = async (postIdToDelete) => {
        try {
        const success = await deletePost(postIdToDelete, token)
        if (success) {
            const newPosts = posts.filter(post => post._id !== postIdToDelete);
            setPosts(newPosts);
        }} catch(error) {
            console.error(error)
        }
    }

    const filteredPosts = posts.filter(({title, description, price, location}) => {
        return title.toLowerCase().includes(searchTerm.toLowerCase()) || description.toLowerCase().includes(searchTerm.toLowerCase()) || price.toLowerCase().includes(searchTerm.toLowerCase()) || location.toLowerCase().includes(searchTerm.toLowerCase())  
    })    

    return (
        <div className='posts'>
            <h2>Posts</h2>
            <h3><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/></h3>
            {token && <Link to='/posts/add' className="add-post-button">Add Post</Link>}
            {filteredPosts.length > 0 &&
                filteredPosts.map((post) => {
                    const { _id, title, description, price, willDeliver, location, isAuthor, messages } = post;
                    return (
                        <div className="post" key={_id}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>Price: ${price}</p>
                            {location && <p>Location: {location}</p>}
                            {willDeliver && <p>Delivery Available</p>}
                            {isAuthor &&
                                <button className="edit-button" onClick={() => navigate(`/posts/${_id}/edit`)}>Edit</button>
                            }
                            {isAuthor && <button className="delete-button" onClick={() => handleDelete(_id)}>Delete</button>}
                            {token && !isAuthor && <button className="message-button" onClick={() => navigate(`/posts/${_id}/messages`)}>Send Message</button>}
                            {isAuthor && messages && <p>Messages:</p>}
                            {messages.map(( {content, fromUser}) => {
                                 return (
                                     <>
                                    {isAuthor && {content} && 
                                    <p>{fromUser.username}: {content}</p>}
                                    </>
                                 )})}
                        </div>
                    )
                })}
        </div>
    )
}

export default Posts;
