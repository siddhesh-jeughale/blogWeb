import React, { useState } from 'react'
import authservice from '../Appwrite/AuthService/auth'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login as authlogin } from '../store/storeSlice'
import { useForm } from 'react-hook-form'
import {Input,Button} from "../component"



function Login() {
  const [error,setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()

  const login = async(data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        window.alert("Login Successfully!.")
        const userdata = await authservice.getCurrentUser()
        if (userdata) {
          console.log("exsisting user data dispatch:",userdata);
          dispatch(authlogin(userdata))
          navigate("/");
        } 
      } 
    } 
    catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <>
      <section className='main' style={{height:"600px",width:"100%"}}>
        <div className="container d-flex justify-content-center" style={{height:"100%",width:"100%"}}>
          <div className="form-content p-3 mt-5 mb-5 rounded shadow-lg" style={{height:"480px",width:"400px"}}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(login)}>
        <Input
          label="Email :"
          placeholder="Enter your Email"
          type="email"
          {
          ...register("email", {
            required: true,
            validate: {
              matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                "Email address must be a valid address",
            }
          })
          }
        />
                 <Input
            label="Password :"
            type="password"
            placeholder="Enter password"
            {
            ...register("password", {
              required: true
            })
            }
          />
        <Button
          type='submit'
          className='text-center mt-3 w-100'
        >
          Login
        </Button>
        <p className='mt-2 text-center'>
          Don't have an account?
          <Link
            to="/signup"
            className='text-primary '
          >
            Signup
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

export default Login
