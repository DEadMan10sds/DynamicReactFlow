import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import App from './Demo.tsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.ts';


const router = createBrowserRouter([
  {
    index: true,
    path: "/*",
    element: <Home />
  },
  // {
  //   path: "/demo",
  //   element: <App />
  // }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
