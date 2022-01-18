const BASE_URL = "https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT"

export const fetchPosts = async (token) => {
    try {
        let response;
        if (token) {
            response = await fetch(`${BASE_URL}/posts`, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
        } else {
            response = await fetch(`${BASE_URL}/posts`);
        }
        const {data: {posts}} = await response.json();
        return posts;
    } catch(error) {
        console.error(error)
    }
}

export const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password,
              }
            })
        })
        const {data: {token} } = await response.json();
        return token;
    } catch (error) {
        return error;
    }
} 

export const register = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            user: {
                username,
                password,
            }
            })
        })
        const {data: {token} } = await response.json();
           return token
    }
    catch(error) {
        console.error(error)
    }
}

export const getUser = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        })
        const { data: userObject } = await response.json();
        return userObject;
    } catch(error) {
        console.log('incorrect username/password')
        console.error(error)
    }
}

export const addPost = async (token, title, description, price, willDeliver, location) => {
    try {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver,
            location, 
          }
        })
      }) 
      const {data: {post}} = await response.json();
      return post;
    } catch(error) {
        console.error(error)
    }
}

export const editPost = async (postid, title, description, price, willDeliver, location, token) => {
    try {
    const response = await fetch(`${BASE_URL}/posts/${postid}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
        post: {
            title,
            description,
            price,
            willDeliver,
            location, 
        }
        })
    })
        const { data: {post} } = await response.json();
        return post;
    } catch(error) {
        console.error(error)
    }
}

export const deletePost = async (postIdToDelete, token) => {
    try {
    const response = await fetch(`${BASE_URL}/posts/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const { success } = await response.json();
      return success;
    } catch(error) {
        console.error(error)
    }
}

export const sendMessage = async (postid, token, content) => {
    try {
    const response = await fetch(`${BASE_URL}/posts/${postid}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content,
          }
        })
    })
    const data = await response.json();
    return data;
    } catch(error) {
        console.error(error)
    }
}

