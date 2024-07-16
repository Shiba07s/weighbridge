import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from './Header'
import Sidebar from './Sidebar'

import { FaArchive, FaTh, FaUsers, FaBell } from 'react-icons/fa';



function Setup() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    const navigate = useNavigate();

    const handleCardClick = (path) => {
       navigate(path);
    };

  return (
    
    <main className='main-container'>

    <div> 
         <div className='main-cards'>
         <div className='card' onClick={() => handleCardClick('/get-supplier')}>
                <div className='card-inner'>
                    <h3>SUPPLIER</h3>
                    <FaArchive className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card' onClick={() => handleCardClick('/get-vehicles')}>
                <div className='card-inner'>
                    <h3>VEHICLE DETAILS</h3>
                    <FaTh className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card' onClick={() => handleCardClick('/get-transporters')}>
                <div className='card-inner'>
                    <h3>TRANSPORTER DETAILS</h3>
                    <FaUsers className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            {/* <div className='card' onClick={() => handleCardClick('/get-driver')}>
                <div className='card-inner'>
                    <h3>DRIVER DETAILS</h3>
                    <FaBell className='card_icon'/>
                </div>
                <h1>42</h1>
            </div> */}
        </div>
    </div>
    </main>
   )
}

export default Setup