export const selectUserById = (users, userId) => {
  const user = users.find((user) => user.id === userId)
  return user?.name
}
