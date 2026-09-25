import { useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import useUserStore from '../store/userStore'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const user = useUserStore((state) => state.user)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      updateBlog(returnedBlog)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  const canDelete =
    user && blog.user && blog.user.username === user.username

  return (
    <li>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>

      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.author}</p>

          {canDelete && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </li>
  )
}

export default Blog
