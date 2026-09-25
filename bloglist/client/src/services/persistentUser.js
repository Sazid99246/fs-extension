const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }

  return null
}

const saveUser = (user) => {
  window.localStorage.setItem(
    'loggedBloglistUser',
    JSON.stringify(user)
  )
}

const removeUser = () => {
  window.localStorage.removeItem('loggedBloglistUser')
}

export { getUser, saveUser, removeUser }
