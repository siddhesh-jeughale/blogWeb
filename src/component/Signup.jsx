import React,{useState} from 'react'
import authservice from '../Appwrite/AuthService/auth';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router';
import { login } from '../store/storeSlice';
import { useForm } from 'react-hook-form';
import {Input,Button} from "../component"

function Signup() {
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register,handleSubmit} = useForm();

  const signup = async(data) => {
    console.log(data);
    setError("");
    try {
      const userdata = await authservice.createAccount(data);
      // console.log(userdata);
      if (userdata) {
        window.alert("Register Successfully! Please Login.");
        navigate("/login");
      }
     
      // if (userdata) {
      //   const currentUserData = await authservice.getCurrentUser();

      //   if (currentUserData) {
      //     dispatch(login(currentUserData))
      //     navigate("/");
      //   }
      // }
    } 
    catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <>
       <section className='main' style={{height:"600px",width:"100%"}}>
               <div className="container d-flex justify-content-center" style={{height:"100%",width:"100%"}}>
                 <div className="form-content p-3 mt-5 mb-5 rounded shadow-lg" style={{height:"500px",width:"400px", boxSizing:"border-box"}}>
                 <h2 className="text-center mb-4">Signup</h2>
                 <form onSubmit={handleSubmit(signup)} className="form">
    <div className="mb-3">
      {/* <!-- Name input field --> */}
      <Input
        label="Full Name :"
        placeholder="Enter your full name"
        type="text"
        {
        ...register('name', {
          required: true,
        })
        }
      />
      {/* <!-- Email input field --> */}
      <Input
        label="Email :"
        placeholder="Enter your Email"
        type="email"
        {
        ...register("email", {
          required: true,
          validate: {
            matchPattern: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
              "Email address must be a valid address",
          }
        })
        }
      />
      {/* <!-- Password input field --> */}
      <Input
        label="Password :"
        placeholder="Enter password"
        type="password"
        {
        ...register("password", {
          required: true,
          // minLength: {
          //   value: 6,
          //   message: "Password must be at least 6 characters long"
          // }
         
        })
        }
      />
    </div>
    <div className="mb-2">
      <Button 
      type="submit" 
      className="btn w-100">
        Register
        </Button>
    </div>
    <p className='text-center'>
        Already Registerd.
        <Link
          to="/login"
          className='text-primary '
        >
          Login
        </Link>
      </p>
  </form>
             {error && <p className='text-center ' style={{ color: "red" }}>
               {error}</p>}
                 </div>
               </div>
             </section>
    </>
  )
}

export default Signup
