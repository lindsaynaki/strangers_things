import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Posts, Login, Register, Home, AddForm, EditForm, MessageForm, Profile } from './Components';
import { useEffect, useState } from 'react';
import { getUser } from './api';

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({messages: [], username: ''})
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [willDeliver, setWillDeliver] = useState(false)
  const [content, setContent] = useState('')

  const navigate = useNavigate();
  
  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token)
      setUser(userObject)
    }
  }

  const handleLogOut = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    handleUser();
  }, [token])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])


  return (
    <div className="app">
      <header>
        <nav>
          <h3>Stranger's Things</h3>
          <Link to='/'>Home</Link>
          <Link to='/posts'>Posts</Link>
          {!token && <Link to='/login'>Login</Link>}
          {!token && <Link to='/register'>Register</Link>}
          {token && <Link to='/profile'>Profile</Link>}
          {token && <button className="logout-button" onClick={handleLogOut} >Log Out</button>}
        </nav>
      </header>
      <Routes>
        <Route exact path='/' element={<Home user={user} token={token} />} />
        <Route path='/posts' element={<Posts posts={posts} setPosts={setPosts} token={token} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register token={token} setToken={setToken} />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} token={token} />} />
        <Route path='/posts/add' element={<AddForm posts={posts} setPosts={setPosts} token={token} title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} location={location} setLocation={setLocation} willDeliver={willDeliver} setWillDeliver={setWillDeliver} />} />
        <Route path='/posts/:postid/edit' element={<EditForm user ={user} posts={posts} setPosts={setPosts} title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} location={location} setLocation={setLocation} willDeliver={willDeliver} setWillDeliver={setWillDeliver} token={token} />} />
        <Route path='/posts/:postid/messages' element={<MessageForm token={token} content={content} setContent={setContent} />} />
        <Route path='/*' element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App;
