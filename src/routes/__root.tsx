import { createRootRoute, Outlet } from '@tanstack/react-router'
import AppContext from '../AppContext'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import App from '../Components/App.tsx'

export const Route = createRootRoute({
  component: () => (
    <AppContext>
      <App>
        <div className="h-full w-full flex flex-col">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </App>
    </AppContext>
  ),
})
