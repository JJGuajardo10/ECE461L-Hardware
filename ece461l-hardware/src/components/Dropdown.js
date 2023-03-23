import React from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown({isOpen, toggle}){
  return (
    <div 
    className={
        isOpen 
        ? 'grid grid-rows-4 text-center items-center bg-blue-500' 
        : 'hidden'
    } 
    onClick={toggle}
    >
        <Link className='p-4 font-mono' to="/ProjectManagement">
            Projects
        </Link>
        <Link className='p-4 font-mono' to="/AccountManagement">
            Account
        </Link>
        <Link className='p-4 font-mono' to="/TeamManagement">
            Teams
        </Link>
        <Link className='p-4 font-mono' to="/AboutUs">
            About Us
        </Link>
    </div>
    
  )
}