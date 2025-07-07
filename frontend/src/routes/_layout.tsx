import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import Navbar from "@/components/Common/Navbar"
import Sidebar from "@/components/Common/Sidebar"
import { isLoggedIn } from "@/hooks/useAuth"
import { LoginService } from "@/client"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async ({ location }) => {
    if (!isLoggedIn()) {
      // Check for devAutoLogin parameter in development mode
      if (!import.meta.env.PROD) {
        const urlParams = new URLSearchParams(location.search)
        if (urlParams.has('devAutoLogin')) {
          const devUser = import.meta.env.VITE_DEV_USER
          const devPassword = import.meta.env.VITE_DEV_PASSWORD

          if (devUser && devPassword) {
            try {
              // Perform login directly
              const response = await LoginService.loginAccessToken({
                formData: { username: devUser, password: devPassword }
              })
              localStorage.setItem("access_token", response.access_token)
              
              // Clean URL by removing the devAutoLogin parameter
              urlParams.delete('devAutoLogin')
              const newUrl = `${location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`
              window.history.replaceState({}, '', newUrl)
              
              // Continue to the protected route (login successful)
              return
            } catch (error) {
              console.error('Auto-login failed:', error)
              // Fall through to normal redirect if auto-login fails
            }
          }
        }
      }
      
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Flex flex="1" overflow="hidden">
        <Sidebar />
        <Flex flex="1" direction="column" p={4} overflowY="auto">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
