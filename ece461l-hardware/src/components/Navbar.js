import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({toggle}){
  return (
    <nav className='flex justify-between items-center h-16 bg-gradient-to-r from-cyan-500 to-blue-600  text-white relative shadow-sm font-mono' role='navigation'>
      <Link to='/' className='pl-8'>
        Group 5
      </Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
         </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <Link className='p-4' to="/ProjectManagement">Projects</Link>
        <Link className='p-4' to="/AccountManagement">Account</Link>
        <Link className='p-4' to="/TeamManagement">Teams</Link>
        <Link className='p-4' to="/AboutUs">About Us</Link>
      </div>
    </nav>
  )
}
