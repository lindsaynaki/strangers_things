import { useState } from 'react';
import { login } from '../api'
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const token = await login(username, password)
        localStorage.setItem('token', token)
        setToken(token)
        navigate('/') 
        } catch(error){
            console.error(error)
        }
}

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Log In</h2>
            <input className="login-input" value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} required />
            <input className="login-input" type="password" placeholder="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
            <button className="login-button">LOG IN</button>
            <Link to='/register'>Don't have an account? Sign up</Link>
        </form>
    )
}

export default Login;