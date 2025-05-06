import { useState ,useEffect} from 'react'
import "./Bootstrap"
import Header from './component/Header/Header'
import { Outlet } from 'react-router'
import Footer from './component/Footer/Footer'
import authservice from './Appwrite/AuthService/auth'
import { useDispatch } from 'react-redux'
import {login,logout} from './store/storeSlice'

function App() {
  // const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  // here i do change when i reload page i got login page And session still active
  // thats why i made change here
  useEffect(() => {
    authservice.getCurrentUser().then((existinguser) => {
      if (existinguser) {
        dispatch(login(existinguser));
      }
      else{
        dispatch(logout());
      }
    }
    )
  }, [])
  
  return (
    <>
   <Header/>
   <main>
   <Outlet/>
   </main>
   <Footer/>
    </>
  )
}

export default App
