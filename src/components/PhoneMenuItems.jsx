import React from 'react'
import { NavLink } from 'react-router-dom'
const PhoneMenu = ({ title, icon, link }) => {
    return (
        <NavLink to={link} >
            <div className=' hover:cursor-pointer flex flex-row gap-3 items-center p-3 group hover:text-[#FF4D6D] hover:transition-all transition-all border-b  border-gray-300'   >
                <span className='text-gray-600 group-hover:text-[#FF4D6D] ' >{icon}</span>
                <span className='font-[Byekan] text-gray-600 group-hover:text-[#FF4D6D] ' >{title}</span>
            </div>
        </NavLink>
    )
}
export default PhoneMenu


