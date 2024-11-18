import React from 'react'
const PhoneMenu = ({ title, icon, link }) => {
    return (
        <div className=' hover:cursor-pointer flex flex-row gap-3 items-center p-3 group hover:text-[#FF4D6D] hover:transition-all transition-all border-b  border-gray-300'   >
            <div  className=' group-hover:text-[#FF4D6D] ' >{icon}</div>
            <a href={"http://localhost:5173/" + link} className='font-[Byekan] text-gray-400 group-hover:text-[#FF4D6D] ' >{title}</a>
        </div>
    )
}
export default PhoneMenu


