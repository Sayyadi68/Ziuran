import React from 'react'
const PhoneMenu = ({ title, icon, link }) => {
    return (
        <a  href={"http://localhost:5173/" + link} >
            <div className=' hover:cursor-pointer flex flex-row gap-3 items-center p-3 group hover:text-[#FF4D6D] hover:transition-all transition-all border-b  border-gray-300'   >
                <div className=' text-gray-600 group-hover:text-[#FF4D6D] ' >{icon}</div>
                <span className='font-[Byekan] text-gray-600 group-hover:text-[#FF4D6D] ' >{title}</span>
            </div>
        </a>
    )
}
export default PhoneMenu


