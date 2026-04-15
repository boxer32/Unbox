import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Web3Provider } from '../providers/Web3Provider.js'

interface RouterContext {
  auth: ReturnType<typeof import('@clerk/react').useAuth>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Web3Provider>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </Web3Provider>
  ),
})
