import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, List, ListItem } from '@mui/material'
import userService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    userService.getAll().then(users => {
      const foundUser = users.find(user => user.id === id)
      setUser(foundUser)
    })
  }, [id])

  if (!user) {
    return null
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        {user.name || user.username}
      </Typography>

      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
        Added blogs
      </Typography>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default User
