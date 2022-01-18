import { useParams, useNavigate } from "react-router-dom";
import { editPost, fetchPosts } from '../api'
import './AddEditForm.css';


const EditForm = ({ token, posts, setPosts, title, setTitle, description, setDescription, price, setPrice, location, setLocation, willDeliver, setWillDeliver }) => {
  const params = useParams()
  const { postid } = params
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const editedPost = await editPost(postid, title, description, price, willDeliver, location, token);
    const posts = await fetchPosts(token)
    setPosts([...posts, editedPost])
    navigate('/posts')
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Edit Post</h3>
      {posts.filter(post => postid === post._id).map(postToEdit => (
        <div key={postToEdit._id}>
          <input className="add-input" placeholder="title" defaultValue={postToEdit.title} onChange={(event) => { setTitle(event.target.value) }} />
          <input className="add-input" placeholder="description" defaultValue={postToEdit.description} onChange={(event) => { setDescription(event.target.value) }} />
          <input className="add-input" placeholder="price" defaultValue={postToEdit.price} onChange={(event) => { setPrice(event.target.value) }} />
          <input className="add-input" placeholder="location" defaultValue={postToEdit.location} onChange={(event) => { setLocation(event.target.value) }} />
          <label htmlFor="Delivery">Delivery Available?</label>
          <select
            defaultValue={postToEdit.willDeliver}
            onChange={(event) => { setWillDeliver(event.target.options[event.target.selectedIndex].value) }}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button className="add-button">SAVE</button>
        </div>
      ))}
    </form>
  );
}

export default EditForm;