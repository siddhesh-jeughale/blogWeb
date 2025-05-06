import React ,{useEffect,useState}from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import authservice from '../Appwrite/AuthService/auth'

function AuthLayout({children,authentication=true}) {
    const authstatus = useSelector((state) => state.author.userStatus);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
            //  authservice.getCurrentUser().then((existinguser) => {
            //     if (existinguser) {
            //         authservice.logout().then(() => {
            //             dispatch(logout())
            //           })
            //     }
            //  }
            //  )
            
            //  i think here is problem of reloading
        // first send user to the login
        // false && false !== false
        if (authentication && authstatus !==authentication) {
               navigate("/login");     
        }
        // and if user loginn successfully the send user to the home
        // !false means true && true !== false means true
        else if (!authentication && authstatus !==authentication) {
            navigate("/");
        }

        setLoading(false);

    }, [authstatus,authentication,navigate]) 

    

  return (
   Loading ?<h1 className='text-center'>Loading...</h1> : <>{children}</>
  )
}

export default AuthLayout