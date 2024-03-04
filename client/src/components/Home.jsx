import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Authentication demo </h1>

        <ul>
            <li><Link to="/register" >Register</Link></li>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/private" >Private</Link></li>
        </ul>


        <Outlet />

    </div>
  )
}
