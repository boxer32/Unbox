import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Web3Provider } from '../providers/Web3Provider'

export const Route = createRootRoute({
  component: () => (
    <Web3Provider>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </Web3Provider>
  ),
})
