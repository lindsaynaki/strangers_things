import './MessageForm.css'
import { sendMessage } from '../api'
import {  useParams, useNavigate } from 'react-router-dom'

const MessageForm = ( { token, content, setContent }) => {
    const params = useParams()
    const { postid } = params
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const sentMessage = await sendMessage(postid, token, content)
        setContent(sentMessage)
        navigate('/profile')
        } catch(error) {
            console.error(error)
        }
    }

    return (
         <form className="message-form" onSubmit={handleSubmit}>
            <h3>Message Seller About This Post</h3>
                <textarea id="message" name="message" rows="30" cols="50" value={content} onChange={(event) => {setContent(event.target.value)}}></textarea>
                <button className="message-button">SEND MESSAGE</button>
         </form>
    )
}

export default MessageForm;