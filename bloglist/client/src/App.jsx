import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box } from '@mui/material'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import SingleBlog from './components/SingleBlog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import useNotificationStore from './store/notificationStore'
import useUserStore from './store/userStore'
import Users from './components/Users'
import User from './components/User'
import { getUser, saveUser, removeUser } from './services/persistentUser'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  const setNotification = useNotificationStore(
    (state) => state.setMessage
  )

  const clearNotification = useNotificationStore(
    (state) => state.clearMessage
  )

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = getUser()

    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)

      saveUser(user)

      clearNotification()

      navigate('/')
    } catch {
      setNotification('wrong username or password')
    }
  }

  const handleLogout = () => {
    removeUser()
    clearUser()
    blogService.setToken(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      clearNotification()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
    } catch {
      setNotification('error creating blog')
    }
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    ))
  }

  const deleteBlog = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?')

    if (!confirmed) {
      return
    }

    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    navigate('/')
  }

  const loginView = () => ( <Login
    handleLogin={handleLogin}
  />
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <BlogList
        blogs={blogs}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  )

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Blog App
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            blogs
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/users"
          >
            users
          </Button>

          {user && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/create"
              >
                new blog
              </Button>

              <Button
                color="inherit"
                onClick={handleLogout}
              >
                logout
              </Button>
            </>
          )}

          {!user && (
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={blogView()} />
          <Route path="/login" element={loginView()} />
          <Route
            path="/create"
            element={<CreateBlog addBlog={addBlog} />}
          />
          <Route
            path="/blogs/:id"
            element={
              <SingleBlog
                blogs={blogs}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )}

export default App
