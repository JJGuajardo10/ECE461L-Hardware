import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({}){
  return (
    <nav className='flex justify-between items-center h-16 bg-gradient-to-r from-cyan-500 to-blue-600  text-white relative shadow-sm font-serif' role='navigation'>
      <Link to='/' className='pl-8 hover:text-amber-300'>
        Group 5
      </Link>
      <div className="pr-8">
        <Link className='p-4 hover:text-amber-300' to="/">Home</Link>
        <Link className='p-4 hover:text-amber-300' to="/Project">Projects</Link>
        <Link className='p-4 hover:text-amber-300' to="/Hardware">Hardware</Link>
        <Link className='p-4 hover:text-amber-300' to="/Dataset">Dataset</Link>
        <Link className='p-4 hover:text-amber-300' to="/logout">Logout</Link>
      </div>
    </nav>
  )
}