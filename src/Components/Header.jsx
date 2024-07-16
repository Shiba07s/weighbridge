import React from 'react'
import { FaUserCircle,FaSearch,FaAlignJustify, FaEnvelope,FaTruck } from 'react-icons/fa';


function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <div className="sidebar-brand" style={{ color: 'white' }}>
    <FaTruck className='icon_header' style={{ fontSize: '2rem', color: 'white' }} /> WEIGH BRIDGE
  </div>
        <div className='menu-icon'>
            {/* <faJustify className='icon' onClick={OpenSidebar}/> */}
            <FaAlignJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <faSearch  className='icon'/> */}
            {/* <FaSearch className='icon'/> */}
        </div>
        <div className='header-right'>
            {/* <faFillBellFill className='icon'/> */}
            {/* <FaEnvelope className='icon'/> */}
            <FaUserCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header