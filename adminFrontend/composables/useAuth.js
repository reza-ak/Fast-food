export const useAuth = () => {
  const authUser = useState('auth-user', () => null)

  return {authUser}
}