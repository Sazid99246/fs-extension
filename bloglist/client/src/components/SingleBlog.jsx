import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, List, ListItem } from '@mui/material'
import blogService from '../services/blogs'

const SingleBlog = ({ blogs, updateBlog, deleteBlog, user }) => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()
  const [comment, setComment] = useState('')

  useEffect(() => {
    const foundBlog = blogs.find(blog => blog.id === id)
    setBlog(foundBlog)
  }, [blogs, id])

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      const returnedBlog = await blogService.update(
        blog.id,
        updatedBlog
      )

      updateBlog(returnedBlog)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()

    if (!comment.trim()) {
      return
    }

    try {
      const updatedBlog = await blogService.createComment(
        blog.id,
        comment
      )

      updateBlog(updatedBlog)
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  const canDelete =
    user &&
    blog.user &&
    blog.user.username === user.username

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2">
        {blog.title} {blog.author}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        {blog.url}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        likes {blog.likes}{' '}
        <button onClick={handleLike}>like</button>
      </Typography>

      <Typography sx={{ mt: 1 }}>
        added by {blog.user.name || blog.user.username}
      </Typography>

      {canDelete && (
        <button onClick={handleDelete}>remove</button>
      )}

      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write a comment..."
        />

        <button type="submit">
          add comment
        </button>
      </form>

      <Typography
        variant="h5"
        component="h3"
        sx={{ mt: 4, mb: 2 }}
      >
        Comments
      </Typography>

      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>
              {comment}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No comments yet.</Typography>
      )}
    </Container>
  )
}

export default SingleBlog
