import { Outlet, createRootRoute } from "@tanstack/react-router"
import React, { Suspense } from "react"

import NotFound from "@/components/Common/NotFound"
import useUrlAuth from "@/hooks/useUrlAuth"

const loadDevtools = () =>
  Promise.all([
    import("@tanstack/router-devtools"),
    import("@tanstack/react-query-devtools"),
  ]).then(([routerDevtools, reactQueryDevtools]) => {
    return {
      default: () => (
        <>
          <routerDevtools.TanStackRouterDevtools />
          <reactQueryDevtools.ReactQueryDevtools />
        </>
      ),
    }
  })

const TanStackDevtools =
  process.env.NODE_ENV === "production" ? () => null : React.lazy(loadDevtools)

function RootComponent() {
  useUrlAuth()
  
  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
})
