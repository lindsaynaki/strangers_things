import { Link } from 'react-router-dom';

const Home = ({ user, token, postid, content }) => {
    return (
        <div>
            {token ? <h1>Welcome to Stranger's Things, {user.username} </h1> : <h1>Welcome to Stranger's Things</h1>}
            {token && <h3>View my <Link to='./profile' content={content} user={user}>Profile</Link> </h3>}
        </div>
    )
}

export default Home;
