import React, { useState } from 'react'
import SignoutButton from './SignoutButton'
const PortalNavbar = () => {
  const [isClick, setIsClick] = useState(false)
  const toggleNavbar = () => setIsClick(!isClick)

  return (
    <nav className=" bg-gray-900 text-white shadow-md sticky w-full z-50">
      
          
          <SignoutButton />     
    
    </nav>
  )
}

export default PortalNavbar