import { Alert } from '@mui/material'
import useNotificationStore from '../store/notificationStore'

const Notification = () => {
  const message = useNotificationStore((state) => state.message)
  if (!message) {
    return null
  }

  return (
    <Alert
      severity="error"
      sx={{ mt: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Notification
