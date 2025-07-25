import React, { useState } from 'react'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavLink,
} from '@coreui/react'

const NavbarMain = () => {
  const [visible, setVisible] = useState(false)

  return (
    <CNavbar expand="lg" className="bg-transparent ">
      <CContainer fluid className="flex justify-between items-center mb-[60px]">
        <CNavbarBrand href="#" className="text-white pt-9 pl-12 text-xl font-serif">
          PopFlix
        </CNavbarBrand>

        <CCollapse className="navbar-collapse flex justify-end" visible={visible}>
          <CNavbarNav className="flex gap-8 pt-9 pr-12">
            <CNavLink href="#" active className="text-white text-xl font-serif">
              Movies
            </CNavLink>
            <CNavLink href="#" className="text-white text-xl font-serif">
              Tv-Series
            </CNavLink>
            <CNavLink href="#" className="text-white text-xl font-serif">
              About-Us
            </CNavLink>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  )
}

export default NavbarMain
