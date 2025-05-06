import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter,RouterProvider } from 'react-router'
import AuthLayout from './component/AuthLayout.jsx'

import Login from './component/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from "./pages/AddPost.jsx"
import AllPost from "./pages/AllPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Home from './pages/Home.jsx'



 const router = createBrowserRouter([
  {
    path:"/",
    element : <App/>,
    children:[
      {
        path: "/",
        element: <Home />,
    },
      
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPost />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
 
    ]
  }
 ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    {/* <App /> */}
    <RouterProvider router={router}/>
    </Provider>,
  </StrictMode>,
)
