import './Profile.css'
import {useEffect} from 'react'
import { getUser } from '../api'

const Profile = ( {user, token, setUser} ) => {
const fetchUser = async() => {
    try { 
    const userObj = await getUser(token)
    setUser(userObj)
    } catch(error) {
        console.error(error)
    }
}

    useEffect(() => {
        fetchUser();
      }, [])
    
    if (Object.keys(user).length === 0 || !user) {
        return (
            <div>Loading</div>
        )
    }

        return (
            <div className="profile">
                <h3>{user.username}'s Profile</h3>
                <div className="inbox">
                <h4>Incoming Messages</h4>
                {user.messages.map((message) => 
                    <div>
                        {user.username !== message.fromUser.username &&
                            <div className="messages">
                            <p>Message: {message.content}</p>  
                            <p>From: {message.fromUser.username}</p>
                            <p>Post: {message.post.title}</p>
                            </div>}
                    </div>
                )}
                <h4>Sent Messages</h4>
                {user.messages.map((message) => 
                    <div>
                        {user.username === message.fromUser.username &&
                            <div className="sent-messages">
                            <p>Message: {message.content}</p>  
                            <p>From: me</p>
                            <p>Post: {message.post.title}</p>
                            </div>}
                    </div>  
                    )}  
                    </div>   
            </div>
        )
    }

export default Profile; 