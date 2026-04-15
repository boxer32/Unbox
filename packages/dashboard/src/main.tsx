import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClerkProvider, useAuth } from '@clerk/react'
import { routeTree } from './routeTree.gen'
import './styles/globals.css'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined! // We'll inject this via the InnerApp
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* @ts-ignore - Per User Guardrail: Do not manually pass publishableKey */}
    <ClerkProvider afterSignOutUrl="/">
      <InnerApp />
    </ClerkProvider>
  </React.StrictMode>,
)
