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
   
      <div expand="lg" className="bg-transparent ">
     
        <div fluid className="flex justify-between items-center mb-[60px]">
        
      <Link to={`/`}>   
        <div className="text-white pt-9 pl-12 text-xl font-serif">
         
          PopFlix

        </div>
      </Link>
      
          <div className="navbar-collapse flex justify-end" visible={visible}>
            <div className="flex gap-8 pt-9 pr-12">
            <CNavLink href="#Movies" active className="text-white text-xl font-serif">
              Movies
            </CNavLink>
            <CNavLink href="#" className="text-white text-xl font-serif">
              Tv-Series
            </CNavLink>
            <CNavLink href="#" className="text-white text-xl font-serif">
              About-Us
            </CNavLink>
            </div>
          </div>
     </div> 
   </div> 
 
  )
}

export default NavbarMain
