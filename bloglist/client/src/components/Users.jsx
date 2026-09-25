import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Users
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>

              <TableCell>
                <strong>Username</strong>
              </TableCell>

              <TableCell>
                <strong>Blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <RouterLink
                    to={`/users/${user.id}`}
                    style={{
                      textDecoration: 'underline',
                      color: 'blue',
                    }}
                  >
                    {user.name}
                  </RouterLink>
                </TableCell>

                <TableCell>
                  <RouterLink
                    to={`/users/${user.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {user.username}
                  </RouterLink>
                </TableCell>

                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
