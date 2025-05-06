import React from 'react'
import { useSelector } from 'react-redux'
import { Link,NavLink,useNavigate } from 'react-router'
import Logout from '../Logout';

function Header() {

  const authstatus = useSelector((state)=>state.author.userStatus);
  const navItems =[
    {
      name:"Home",
      url:"/",
      active:true
    },
    {
      name:"Login",
      url:"/login",
      active:!authstatus
    },
    {
      name:"Signup",
      url:"/signup",
      active:!authstatus
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authstatus,
  },
  {
      name: "Add Post",
      url: "/add-post",
      active: authstatus,
  },
  ] 
   return (
    <>
       <nav className="navbar main-navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm mb-2 bg-body rounded">
    <div className="container">
      <Link to="/" className='navbar-brand'>Blog</Link>
      {/* <a className="navbar-brand" href="#">Portfolio</a> */}
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ms-auto ">
          {
            navItems.map((item)=>(
             item.active ? (
              <li key={item.name} className="nav-item me-2">
                {/* <button
                onClick={()=>navigate(item.url)}
                >{item.name}</button> */}
                <NavLink to={item.url} className="nav-link text-capitalize">{item.name}</NavLink>
              </li>
             ) : null
            ))
          }

          {/* he true kadhe hoil check krne */}
          {/* i think jevha login hoil thevha store madhe dispatch login call krun status true hoil mahnje authstatus true hoil ani logout desel */}
          {authstatus && (
            <li className="nav-item me-2"><Logout/></li>
          )}
          {/* <li className="nav-item me-2">
          <NavLink to="/" className="nav-link text-capitalize">Home</NavLink>
          </li>
          <li className="nav-item me-2 dropdown">
            <NavLink to="/about" className="nav-link text-capitalize">About</NavLink>
          </li>
          <li className="nav-item me-2 dropdown">
          <NavLink to="/skill" className="nav-link text-capitalize">Skill</NavLink>
          </li>
          <li className="nav-item me-2 dropdown">
          <NavLink to="/work" className="nav-link text-capitalize">Work</NavLink>
          </li>
          <li className="nav-item me-2">
          <NavLink to="/Contact" className="nav-link text-capitalize">Contact Us</NavLink>
          </li> */}
        </ul> 
      </div>
    </div>
  </nav>
   </>
  )
}

export default Header
