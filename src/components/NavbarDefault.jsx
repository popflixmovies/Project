import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavLink,
} from '@coreui/react'
import { Navbar } from '@material-tailwind/react'

const NavbarMain = () => {
  const [visible, setVisible] = useState(false)

  return (
   
      <div expand="lg" className="bg-transparent fixed top-0 left-0 w-full h-16 z-50">
     
        <div fluid className="flex justify-between items-center mb-[60px]">
       
        <div className="text-white  text-[24px] pt-9 pl-12 text-xl font-serif">
         
          PopFlix

        </div>
      
          <div className="navbar-collapse flex justify-end decoration-none" visible={visible}>
            <div className="flex gap-8 pt-9 pr-12">
            <a style={{textDecoration:"none" }} active className="text-white text-[20px]  font-serif">
              Movies
            </a>
            <a style={{textDecoration:"none" }} className="text-white text-[20px]  font-serif">
              Tv-Series
            </a>
            <a style={{textDecoration:"none" }} className="text-white text-[20px] font-serif">
              About-Us
            </a>
            </div>
          </div>
     </div> 
   </div> 
 
  )
}

export default NavbarMain
