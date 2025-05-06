import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../Appwrite/AuthService/auth'
import { logout } from '../store/storeSlice'

function Logout() {
    const dispatch = useDispatch()
   
    // useEffect(() => {
    //   // Delete session on page load
    //   try {
    //     authservice.logout()
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // account.deleteSession('current').catch(console.error);
    // }, []);


    const logouthandler = () => {
      authservice.logout().then(() => {
        dispatch(logout())
      })
    }
    
    
  return (
    <div>
      <button className='btn btn-danger' onClick={logouthandler}>Logout</button>
    </div>
  )
}

export default Logout
