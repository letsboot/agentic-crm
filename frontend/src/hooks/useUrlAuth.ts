import { useEffect } from "react"
import useAuth, { isLoggedIn } from "./useAuth"

const useUrlAuth = () => {
  const { loginMutation } = useAuth()

  useEffect(() => {
    // Only enable in development mode
    if (import.meta.env.PROD) return
    
    // Skip if already logged in
    if (isLoggedIn()) return

    const urlParams = new URLSearchParams(window.location.search)

    // Check for devAutoLogin parameter (any value or no value)
    if (urlParams.has('devAutoLogin')) {
      const devUser = import.meta.env.VITE_DEV_USER
      const devPassword = import.meta.env.VITE_DEV_PASSWORD

      if (devUser && devPassword) {
        loginMutation.mutate({
          username: devUser,
          password: devPassword
        })

        // Clean URL after login attempt
        urlParams.delete('devAutoLogin')
        const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [loginMutation])
}

export default useUrlAuth
