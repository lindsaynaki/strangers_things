import { useState } from 'react';
import { register } from '../api'
import { Link, useNavigate } from 'react-router-dom';


const Register = ({token, 
    setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const newToken = await register(username, password);
            localStorage.setItem('token', newToken)
            setToken(newToken)
            navigate('/')
        } catch(error) {
            console.error(error)
    }}

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
            <input className="register-input" value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} required />
            <input className="register-input" type="password" placeholder="password" pattern=".{5,}" title="Password must be 5 characters" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
            <button className="register-button">CREATE ACCOUNT</button>
            <Link to='/login'>Already have an account? Sign in</Link>
        </form>
    )
}

export default Register;
